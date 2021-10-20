import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { APPEALS } from "../constants";
import { PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

export default function Appeals({ user }: PageProps) {
	const [type, setType] = useState("Bot Ban");
	const [brokenRules, setBrokenRules] = useState<number[]>([]);
	const [appeal, setAppeal] = useState("");

	const updateBrokenRules = (index: number) => {
		if (brokenRules.includes(index)) {
			setBrokenRules(brokenRules.filter((i) => i != index));
		} else if (!brokenRules.includes(index)) {
			setBrokenRules((oldBrokenRulesState) => [
				...oldBrokenRulesState,
				index,
			]);
		}
	};

	const submit = async () => {
		const res = await fetch("/api/appeal", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				appeal,
				rules: brokenRules.map(
					(i) => APPEALS[type.includes("Bot") ? "user" : "server"][i]
				),
				type,
			}),
		});

		if (res.status !== 200) {
			toast.dark((await res.json()).error);
			return;
		}

		setBrokenRules([]);
		setAppeal("");
		toast.dark("Your appeal has been submitted.");
	};

	useEffect(() => {
		setBrokenRules([]);
	}, [type]);

	return (
		<Container title="Appeal" user={user}>
			<div className="max-w-4xl xl:max-w-4xl mx-8 lg:mx-auto relative my-16 flex justify-center">
				<div className="max-w-3xl bg-gray-200 dark:bg-dark-200 flex flex-col rounded-md">
					<div className="p-8 text-center border-b-8 border-gray-300 dark:border-dark-100">
						<div className="text-3xl font-bold font-montserrat text-dark-400 dark:text-white">
							Appeal{" "}
							{
								{
									"Bot Ban": "a permanent ban",
									"Bot Blacklist": "a temporary ban",
									"Community Server Ban": "a community ban",
									"Support Server Ban": "a support ban",
								}[type]
							}
						</div>
						<div className="text-gray-500 dark:text-gray-400 max-w-2xl">
							Please provide as much detail as possible when
							submitting your appeal. Appealing does not guarantee
							a reprieval of the punishment.
						</div>
					</div>
					<div className="flex flex-col p-4 space-y-2">
						<div className="text-lg font-bold font-montserrat text-dark-400 dark:text-white">
							Which rules did you break?
						</div>
						<div>
							{[
								"Bot Ban",
								"Bot Blacklist",
								"Community Server Ban",
								"Support Server Ban",
							].map((stype) => (
								<label
									key={stype}
									htmlFor={"type-" + stype}
									onClick={() => setType(stype)}
									className="flex items-center space-x-6 select-none text-dark-400 dark:text-white"
								>
									<span
										className={clsx(
											"absolute rounded-full h-4 w-4 border-4 bg-gray-500 dark:bg-dank-400",
											stype === type
												? "border-dank-300"
												: "border-gray-500 dark:border-dank-400"
										)}
									/>
									<span>{stype}</span>
								</label>
							))}
						</div>
					</div>

					<div className="flex flex-col p-4 space-y-2">
						<div className="flex flex-col space-y-2">
							<div className="text-lg font-bold font-montserrat text-dark-400 dark:text-white">
								Which rules did you break?
							</div>
							<div className="flex flex-col space-y-1">
								{APPEALS[
									type.includes("Bot") ? "user" : "server"
								].map((rule, i) => (
									<label
										key={i}
										htmlFor={"rule-" + i}
										onClick={(e) => updateBrokenRules(i)}
										className="flex items-center space-x-6 select-none text-dark-400 dark:text-white"
									>
										<span
											className={clsx(
												"absolute text-sm rounded-md h-5 w-5 flex items-center justify-center text-white",
												brokenRules.includes(i)
													? "bg-dank-300"
													: "bg-gray-500 dark:bg-dank-400"
											)}
										>
											{i}
										</span>
										<span>{rule}</span>
									</label>
								))}
							</div>
						</div>
					</div>

					<div className="flex flex-col p-4 space-y-2">
						<div className="flex flex-col space-y-2">
							<div className="text-lg font-bold font-montserrat text-dark-400 dark:text-white">
								Please write your appeal below.
							</div>
							<textarea
								className="w-full bg-light-500 dark:bg-dank-500 px-2 py-1 outline-none text-black dark:text-light-300 text-sm h-48 overflow-hidden rounded-md placeholder-gray-500"
								maxLength={2000}
								onChange={(e) => setAppeal(e.target.value)}
								value={appeal}
								placeholder={""}
							/>
						</div>
					</div>

					<div className="flex justify-end p-4">
						<Button
							className="text-gray-900 dark:text-white bg-light-500 dark:bg-dank-500 hover:bg-opacity-75"
							disabled={
								!(
									brokenRules.length >= 1 &&
									appeal.length >= 20 &&
									appeal.length <= 2000
								)
							}
							onClick={() => submit()}
						>
							Submit
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
