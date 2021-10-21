import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import {
	FEEDBACK_CATEGORIES,
	FEEDBACK_CATEGORIES_DESCRIPTIONS,
} from "../../constants";
import { PageProps } from "../../types";
import { sanitizeCategory } from "../../util/feedback";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function FeedbackPage({ user }: PageProps) {
	const [category, setCategory] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const router = useRouter();

	const submit = async () => {
		const res = await fetch("/api/feedback/post/new", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				category,
				title,
				content,
			}),
		});

		if (res.status !== 200) {
			toast.dark((await res.json()).error);
			return;
		}

		router.push(`/feedback/p/${(await res.json()).id}`);
	};

	return (
		<Container title="Feedback" user={user}>
			<div className="max-w-4xl mx-8 lg:mx-auto relative">
				<div className="flex flex-col my-16 space-y-6">
					<div className="flex justify-center">
						<div
							className="py-4 px-6 bg-red-500 text-center text-md rounded-md leading-5 max-w-max"
							style={{
								boxShadow: "0 0 20px rgb(219 71 71 / 73%)",
							}}
						>
							This is strictly for feedback only! We will not
							provide support through the feedback pages.
							<br />
							If you are looking for help with Dank Memer join{" "}
							<a
								href="https://discord.gg/meme"
								target="_blank"
								className="underline"
							>
								our support server.
							</a>
						</div>
					</div>
					<div className="text-dark-400 dark:text-white">
						<div className="text-3xl font-bold font-montserrat">
							Give us Feedback
						</div>
						<div>
							Do you have an opinion or suggestion about the bot?
							Fill out this form and we will look over them. Make
							sure that there isn't a feedback post on your topic
							by searching through the category feeds. Warning:
							This is NOT for support, your post will just be
							deleted.
						</div>
					</div>
					<div className="text-dark-400 dark:text-white">
						<div className="text-lg">
							Select the category that best fits your feedback:
						</div>
						<div>
							{FEEDBACK_CATEGORIES.map((fcategory) => (
								<label
									key={fcategory}
									htmlFor={"category-" + category}
									onClick={() => setCategory(fcategory)}
									className="flex items-center space-x-6"
								>
									<span
										className={clsx(
											"absolute rounded-full h-4 w-4",
											category === fcategory
												? "bg-dank-300"
												: "bg-gray-400 dark:bg-dank-400"
										)}
									/>
									<span>
										{sanitizeCategory(fcategory)}{" "}
										<span className="text-sm text-gray-500">
											-{" "}
											{
												FEEDBACK_CATEGORIES_DESCRIPTIONS[
													fcategory
												]
											}
										</span>
									</span>
								</label>
							))}
						</div>
					</div>
					<div>
						<div className="text-lg text-dark-400 dark:text-white">
							Post Title
						</div>
						<textarea
							className="w-full bg-light-500 dark:bg-dank-500 drop-shadow-xl dark:drop-shadow-none p-3 outline-none text-black dark:text-light-300 text-sm resize-none h-10 overflow-hidden rounded-md placeholder-gray-500"
							maxLength={100}
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							placeholder={"Give me infinite money"}
						/>
					</div>
					<div>
						<div className="text-lg text-dark-400 dark:text-white">
							Post Content
						</div>
						<textarea
							className="w-full bg-light-500 dark:bg-dank-500 drop-shadow-xl dark:drop-shadow-none p-3 outline-none text-black dark:text-light-300 text-sm h-24 rounded-md placeholder-gray-500"
							maxLength={2000}
							onChange={(e) => setContent(e.target.value)}
							value={content}
							placeholder={
								"This would benefit me and nobody else. It would allow a sole user to control the economy!"
							}
						/>
					</div>
					<div className="flex justify-end">
						<Button
							className="text-gray-900 dark:text-white bg-light-500 dark:bg-dank-500 hover:bg-opacity-75"
							disabled={
								!(
									title.length >= 3 &&
									title.length <= 100 &&
									content.length >= 20 &&
									content.length <= 2000 &&
									category.length > 0
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
