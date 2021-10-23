import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Expandable from "../components/Expandable";
import Container from "../components/ui/Container";
import Dropdown from "../components/ui/Dropdown";
import Searchbox from "../components/ui/Searchbox";
import { FAQ } from "../constants";
import { PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

export default function FaqPage({ user }: PageProps) {
	const categories = Object.keys(FAQ);
	const [currentCategory, setCurrentCategory] = useState<string>(
		categories[0]
	);
	const [questions, setQuestions] = useState<{ q: string; a: string }[]>();
	const [expandedIds, setExpandedIds] = useState<string[]>([]);
	const [search, setSearch] = useState("");

	const allQuestions: { q: string; a: string }[] = [];
	Object.values(FAQ).forEach((questions) => allQuestions.push(...questions));

	useEffect(() => {
		setExpandedIds([]);
		setQuestions(
			currentCategory.startsWith("all")
				? allQuestions.filter(
						(question) =>
							question.q
								.toLowerCase()
								.includes(search.toLowerCase()) ||
							question.a
								.toLowerCase()
								.includes(search.toLowerCase())
				  )
				: FAQ[currentCategory]
		);
	}, [currentCategory]);

	useEffect(() => {
		setCurrentCategory(search.length > 0 ? `all-${search}` : categories[0]);
	}, [search]);

	return (
		<Container title="FAQ" user={user}>
			<div className="my-40 flex flex-col space-y-8 relative">
				<div>
					<div className="text-4xl font-bold font-montserrat text-dank-200 dark:text-white">
						FREQUENTLY ASKED QUESTIONS
					</div>
					<svg
						className="absolute -top-8 -left-5 z-[-1] w-[130px]"
						viewBox="0 0 52 24"
						fill="#16c458"
					>
						<defs>
							<pattern
								id="dots"
								x="0"
								y="0"
								width=".15"
								height=".28"
							>
								<circle cx="1" cy="1" r="1"></circle>
							</pattern>
						</defs>
						<rect fill="url(#dots)" width="42" height="20"></rect>
					</svg>
					<div className="max-w-3xl text-lg text-light-600 dark:text-light-300">
						The most frequently asked questions can be found below.
						Split into categories depending on what they are related
						to.
					</div>
				</div>
				<div className="flex items-center space-x-0 lg:space-x-4">
					<div className="hidden lg:flex space-x-6">
						{categories.map((category) => (
							<div
								className={clsx(
									"text-lg cursor-pointer",
									currentCategory == category
										? "text-dank-300"
										: "text-light-600 dark:text-light-300"
								)}
								onClick={() => setCurrentCategory(category)}
							>
								{category}
							</div>
						))}
					</div>
					<div className="visible lg:hidden">
						<Dropdown
							content={
								<div className="flex justify-between w-full px-4 text-dark-100 dark:text-white">
									<span>
										{currentCategory.startsWith("all")
											? "Search Results"
											: currentCategory}
									</span>
									<span className="material-icons">
										expand_more
									</span>
								</div>
							}
							variant="wide"
						>
							<div className="mt-2 rounded-md bg-light-500 dark:bg-dark-100 text-dark-100 dark:text-white">
								{categories.map((category) => (
									<div
										className={clsx(
											"cursor-pointer py-1 px-2 hover:bg-light-200 dark:hover:bg-dark-200"
										)}
										onClick={() => {
											setCurrentCategory(category);
										}}
									>
										{category}
									</div>
								))}
							</div>
						</Dropdown>
					</div>
					<div className="pl-4 lg:pl-0">
						<Searchbox
							placeholder="Find an answer for your quest"
							setSearch={setSearch}
						/>
					</div>
				</div>
				<div className="flex flex-col space-y-4">
					{questions?.map((question) => (
						<Expandable
							name={question.q}
							fields={{
								Answer: question.a,
							}}
							setExpandedIds={setExpandedIds}
							expandedIds={expandedIds}
						/>
					))}
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
