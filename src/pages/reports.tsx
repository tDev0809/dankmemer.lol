import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { REPORTS } from "../constants";
import { PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

export default function Reports({ user }: PageProps) {
	const [type, setType] = useState("user");
	const [id, setId] = useState("");
	const [brokenRules, setBrokenRules] = useState<number[]>([]);
	const [report, setReport] = useState("");

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
		const res = await fetch("/api/report", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id,
				report,
				rules: brokenRules.map((i) => REPORTS[type][i]),
				type,
			}),
		});

		if (res.status !== 200) {
			toast.dark((await res.json()).error);
			return;
		}

		setId("");
		setBrokenRules([]);
		setReport("");
		toast.dark("Your report has been submitted.");
	};

	useEffect(() => {
		setBrokenRules([]);
	}, [type]);

	return (
		<Container title="Reports" user={user}>
			<div className="relative my-16 flex justify-center">
				<div className="max-w-3xl bg-gray-200 dark:bg-dark-200 flex flex-col rounded-md">
					<div className="p-8 text-center border-b-8 border-gray-300 dark:border-dark-100">
						<div className="text-3xl font-bold font-montserrat text-dark-400 dark:text-white">
							Report a {type}
						</div>
						<div className="text-gray-500 dark:text-gray-400 max-w-2xl">
							Please provide as much detail as possible when
							submitting your report. We are unable to provide
							details on the punishment from this report.
						</div>
					</div>
					<div className="flex flex-col p-4 space-y-2">
						<div className="flex flex-col space-y-2">
							<div className="text-lg font-bold font-montserrat text-dark-400 dark:text-white">
								What type of report is this?
							</div>
							<div>
								{["User report", "Server report"].map(
									(stype) => (
										<label
											key={stype}
											htmlFor={"type-" + stype}
											onClick={() =>
												setType(
													stype === "User report"
														? "user"
														: "server"
												)
											}
											className="flex items-center space-x-6 select-none text-dark-400 dark:text-white"
										>
											<span
												className={clsx(
													"absolute rounded-full h-4 w-4",
													stype
														.toLowerCase()
														.includes(type)
														? "bg-dank-300"
														: "bg-gray-400 dark:bg-dank-400"
												)}
											/>
											<span>{stype}</span>
										</label>
									)
								)}
							</div>
							<div className="flex items-start sm:items-center space-x-0 sm:space-x-2 flex-col-reverse sm:flex-row">
								<textarea
									className="w-48 bg-gray-100 dark:bg-dank-500 px-2 py-1 outline-none text-black dark:text-light-300 text-sm h-8 overflow-hidden rounded-md placeholder-gray-500 resize-none"
									maxLength={22}
									onChange={(e) => setId(e.target.value)}
									value={id}
									placeholder={""}
								/>
								<div className="text-dark-400 dark:text-white">
									ID of {type} you are reporting.
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col p-4 space-y-2">
						<div className="flex flex-col space-y-2">
							<div className="text-lg font-bold font-montserrat text-dark-400 dark:text-white">
								Which rules did they break?
							</div>
							<div className="flex flex-col space-y-1">
								{REPORTS[type].map((rule, i) => (
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
								Please write your report below.
							</div>
							<textarea
								className="w-full bg-light-500 dark:bg-dank-500 px-2 py-1 outline-none text-black dark:text-light-300 text-sm h-48 overflow-hidden rounded-md placeholder-gray-500"
								maxLength={2000}
								onChange={(e) => setReport(e.target.value)}
								value={report}
								placeholder={""}
							/>
						</div>
					</div>

					<div className="flex justify-end p-4">
						<Button
							variant="dark"
							disabled={
								!(
									brokenRules.length >= 1 &&
									report.length >= 20 &&
									report.length <= 2000 &&
									id.length >= 1 &&
									id.length <= 22
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
