import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FeedbackPostCard from "../../../components/feedback/FeedbackPostCard";
import Button from "../../../components/ui/Button";
import Container from "../../../components/ui/Container";
import Dropdown from "../../../components/ui/Dropdown";
import FancyButton from "../../../components/ui/FancyButton";
import GoBack from "../../../components/ui/GoBack";
import { FEEDBACK_CATEGORIES, FEEDBACK_LABELS } from "../../../constants";
import { PageProps, Post } from "../../../types";
import { sanitizeCategory } from "../../../util/feedback";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";

const LOAD_POSTS_AMOUNT = 25;
const SORTING: Record<string, string> = {
	Hot: "local_fire_department",
	Top: "trending_up",
	New: "star",
	Old: "restore",
};

export default function CategoryPage({ user }: PageProps) {
	const router = useRouter();
	const { id } = router.query;
	const [posts, setPosts] = useState<Post[]>([]);
	const [sorting, setSorting] = useState("Hot");
	const [filter, setFilter] = useState("all posts");
	const [postsLoaded, setPostsLoaded] = useState(false);
	const [all, setAll] = useState(false);

	const loadPosts = async (newList = false) => {
		axios(
			`/api/feedback/posts/${id as string}?${new URLSearchParams({
				from: (newList ? 0 : posts.length).toString(),
				amount: LOAD_POSTS_AMOUNT.toString(),
				sorting: sorting,
				filter: filter,
			})}`
		).then(({ data }) => {
			if (newList) {
				setPosts([...data.posts]);
			} else {
				setPosts([...posts, ...data.posts]);
			}
			if (!postsLoaded) setPostsLoaded(true);
			setAll(data.all);
		});
	};

	useEffect(() => {
		if (
			(FEEDBACK_CATEGORIES as typeof FEEDBACK_CATEGORIES & "all")
				.concat("all")
				.includes(id as string)
		) {
			loadPosts(true);
		} else {
			router.push("/feedback");
		}
	}, [filter, sorting]);

	return (
		<Container title="Feedback" user={user}>
			<div className="mx-8 xl:mx-0">
				<div className="flex flex-col space-y-4 my-8">
					<GoBack />
					<div className="flex justify-between items-center">
						<div className="text-4xl font-bold font-montserrat">
							{sanitizeCategory(id as string)} feedback
						</div>
						<FancyButton
							link="/feedback/new"
							text="New post"
							variant="small"
						/>
					</div>

					<div className="flex space-x-4 justify-between sm:justify-start">
						<Dropdown
							content={
								<div className="flex justify-between w-full px-4 text-dark-100 dark:text-white">
									<div className="flex space-x-2">
										<div className="material-icons">
											{SORTING[sorting]}
										</div>
										<div>
											{sorting.charAt(0).toUpperCase() +
												sorting.substr(1).toLowerCase()}
										</div>
									</div>
									<span className="material-icons">
										expand_more
									</span>
								</div>
							}
							variant="wide"
						>
							<div className="rounded-md mt-2 bg-light-500 dark:bg-dark-100 text-dark-100 dark:text-white border-2 dark:border-dank-500 border-gray-300">
								{Object.entries(SORTING).map(([mode, icon]) => (
									<div
										className={clsx(
											"cursor-pointer py-1 px-2 hover:bg-light-200 dark:hover:bg-dark-200"
										)}
										onClick={() => {
											setSorting(mode);
										}}
									>
										<div className="flex space-x-2">
											<div className="material-icons">
												{icon}
											</div>
											<div>
												{mode.charAt(0).toUpperCase() +
													mode
														.substr(1)
														.toLowerCase()}
											</div>
										</div>
									</div>
								))}
							</div>
						</Dropdown>

						<Dropdown
							content={
								<div className="flex justify-between w-full px-4 text-dark-100 dark:text-white">
									<div className="flex space-x-2">
										<div className="material-icons-outlined">
											filter_alt
										</div>
										<div>
											{filter.charAt(0).toUpperCase() +
												filter.substr(1).toLowerCase()}
										</div>
									</div>
									<span className="material-icons">
										expand_more
									</span>
								</div>
							}
							variant="wide"
						>
							<div className="rounded-md mt-2 bg-light-500 dark:bg-dark-100 text-dark-100 dark:text-white border-2 dark:border-dank-500 border-gray-300">
								{FEEDBACK_LABELS.map((label) => (
									<div
										className={clsx(
											"cursor-pointer py-1 px-2 hover:bg-light-200 dark:hover:bg-dark-200"
										)}
										onClick={() => {
											setFilter(label);
										}}
									>
										{label.charAt(0).toUpperCase() +
											label.substr(1).toLowerCase()}
									</div>
								))}
							</div>
						</Dropdown>
					</div>

					<div className="flex flex-col space-y-4">
						{postsLoaded &&
							posts.map((post) => (
								<FeedbackPostCard
									postData={post}
									user={user}
									key={post._id}
								/>
							))}

						{!postsLoaded &&
							new Array(25)
								.fill(0)
								.map((post) => (
									<FeedbackPostCard key={post._id} />
								))}

						{!all && (
							<div className="w-full">
								<Button
									block
									className="bg-light-400 text-dark-300 dark:bg-dark-400 dark:text-white"
									onClick={() => loadPosts()}
								>
									Load More
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
