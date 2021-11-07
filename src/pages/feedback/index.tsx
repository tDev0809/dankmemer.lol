import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import FeedbackPostCard from "../../components/feedback/FeedbackPostCard";
import Container from "../../components/ui/Container";
import FancyButton from "../../components/ui/FancyButton";
import {
	FEEDBACK_CATEGORIES,
	FEEDBACK_CATEGORIES_DESCRIPTIONS,
} from "../../constants";
import { PageProps, Post } from "../../types";
import { sanitizeCategory } from "../../util/feedback";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";
import Link from "next/link";
import Tooltip from "../../components/ui/Tooltip";
import Button from "../../components/ui/Button";
import { useRouter } from "next/router";

export default function FeedbackPage({ user }: PageProps) {
	const [feedbackCategories, setFeedbackCategories] = useState<
		Record<string, number>
	>({});
	const [posts, setPosts] = useState<Post[]>([]);
	const [postsLoaded, setPostsLoaded] = useState(false);
	const router = useRouter();

	useEffect(() => {
		axios("/api/feedback/categoriesCount").then((data) => {
			setFeedbackCategories(data.data);
		});
		axios(`/api/feedback/posts/all?from=0&amount=5`).then(({ data }) => {
			setPostsLoaded(true);
			setPosts([...posts, ...data.posts]);
		});
	}, []);

	return (
		<Container title="Feedback" user={user}>
			<div className="flex flex-col my-16 space-y-6 mx-8 xl:mx-0">
				<div className="flex justify-between items-center">
					<div className="font-bold font-montserrat text-3xl text-dank-300 dark:text-light-100">
						Feedback
					</div>
					<div className="flex items-center space-x-4">
						{user && (
							<Button
								className="bg-gray-200 hover:bg-gray-300 dark:bg-dank-500 dark:hover:bg-dark-100 text-dark-400 dark:text-white"
								onClick={() =>
									router.push(`/profile/${user?.id}`)
								}
							>
								<div className="flex items-center space-x-2">
									<div className="material-icons">person</div>
									<div>Your Profile</div>
								</div>
							</Button>
						)}
						<Button
							className="text-white bg-dank-300 hover:bg-opacity-75"
							onClick={() => router.push(`/feedback/new`)}
						>
							<div className="flex items-center space-x-2">
								<div className="material-icons">post_add</div>
								<div>New Post</div>
							</div>
						</Button>
					</div>
				</div>
				<div className="flex flex-col space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
						{FEEDBACK_CATEGORIES.map((category) => (
							<Tooltip
								key={category}
								content={
									FEEDBACK_CATEGORIES_DESCRIPTIONS[category]
								}
							>
								<Link href={`/feedback/c/${category}`} passHref>
									<a
										className={clsx(
											"flex flex-col items-center justify-center -space-y-1",
											"py-8 rounded-md select-none cursor-pointer",
											"bg-light-500 dark:bg-dark-100",
											"border border-light-500 dark:border-dark-100 hover:border-dank-300 dark:hover:border-dank-300"
										)}
									>
										<div className="text-xl font-bold font-montserrat text-dank-500 dark:text-white">
											{sanitizeCategory(category)}
										</div>
										<div className="text-gray-400">
											{feedbackCategories[category] || 0}{" "}
											post
											{feedbackCategories[category] === 1
												? ""
												: "s"}
										</div>
									</a>
								</Link>
							</Tooltip>
						))}
					</div>
					<Link href={`/feedback/c/all`} passHref>
						<a
							className={clsx(
								"flex flex-col items-center justify-center -space-y-1",
								"py-2 rounded-md select-none cursor-pointer",
								"bg-light-500 dark:bg-dark-100",
								"border border-light-500 dark:border-dark-100 hover:border-dank-300 dark:hover:border-dank-300"
							)}
						>
							<div className="text-xl font-bold font-montserrat text-dank-500 dark:text-white">
								All
							</div>
							<div className="text-gray-400">
								{Object.values(feedbackCategories).reduce(
									(p, c) => p + c,
									0
								)}{" "}
								posts
							</div>
						</a>
					</Link>
				</div>
				<div className="flex flex-col space-y-1">
					<h3 className="text-2xl font-bold font-montserrat text-dank-200 dark:text-light-100">
						Latest hot posts:
					</h3>
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
							new Array(5)
								.fill(0)
								.map((post, i) => (
									<FeedbackPostCard key={post._id} />
								))}
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
