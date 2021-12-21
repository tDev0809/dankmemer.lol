import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { PostCard } from "../../../components/community/PostCard";
import Button from "../../../components/ui/Button";
import Container from "../../../components/ui/Container";
import Dropdown from "../../../components/ui/Dropdown";
import { POST_CATEGORIES, POST_LABELS } from "../../../constants";
import { PageProps, Post } from "../../../types";
import { sanitizeCategory } from "../../../util/feedback";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";
import { toTitleCase } from "../../../util/string";

const SORTING: Record<string, string> = {
	hot: "local_fire_department",
	top: "trending_up",
	new: "star",
	old: "restore",
};

const LOAD_AMOUNT = 20;

export default function Posts({ user }: PageProps) {
	const router = useRouter();
	const top = useRef<HTMLDivElement>(null);
	const [category, setCategory] = useState<Post["category"] | "all">(
		POST_CATEGORIES.includes(router.query.category as Post["category"])
			? (router.query.category as Post["category"])
			: "all"
	);

	const [posts, setPosts] = useState<Post[]>([]);
	const [sorting, setSorting] = useState(
		Object.keys(SORTING).includes(router.query.sorting as string)
			? (router.query.sorting as string)
			: "hot"
	);
	const [filter, setFilter] = useState(
		POST_LABELS.includes(router.query.filter as string)
			? (router.query.filter as string)
			: "all"
	);
	const [page, setPage] = useState(
		Math.max(
			1,
			router.query.page ? Number(router.query.page as string) || 1 : 1
		)
	);
	const [loadingPosts, setLoadingPosts] = useState(false);

	const loadPosts = () => {
		router.replace({
			pathname: router.pathname,
			query: {
				sorting,
				category,
				filter,
				page,
			},
		});
		setLoadingPosts(true);
		axios(
			`/api/community/posts/all?${new URLSearchParams({
				from: (LOAD_AMOUNT * (page - 1)).toString(),
				amount: LOAD_AMOUNT.toString(),
				category: category,
				filter: filter,
				sorting: sorting,
			})}`
		).then(({ data }) => {
			setPosts(data.posts);
			setLoadingPosts(false);
		});
	};

	useEffect(() => {
		window.scrollTo(1, 0);
	}, [page]);

	useEffect(() => {
		setPage(-1);
	}, [sorting, filter, category]);

	useEffect(() => {
		if (page == -1) {
			setPage(1);
		} else {
			loadPosts();
		}
	}, [page]);

	return (
		<Container title="Posts" user={user}>
			<div className="flex flex-col space-y-4 my-16">
				<div
					className="flex justify-between items-center p-2 rounded-md bg-dark-100"
					ref={top}
				>
					<div className="flex space-x-4">
						<Dropdown
							content={
								<Button variant="dark">
									<div className="flex space-x-2 items-center">
										<div
											className="material-icons"
											style={{ fontSize: "18px" }}
										>
											{SORTING[sorting]}
										</div>
										<div>{toTitleCase(sorting)}</div>
									</div>
								</Button>
							}
							options={Object.entries(SORTING).map(
								([name, icon]) => ({
									label: toTitleCase(name),
									icon: icon,
									onClick: () => setSorting(name),
								})
							)}
						/>
						<Dropdown
							content={
								<Button variant="dark">
									<div className="flex space-x-2 items-center w-28">
										<div
											className="material-icons"
											style={{ fontSize: "18px" }}
										>
											filter_alt
										</div>
										<div>
											{toTitleCase(
												filter.replace(
													"all",
													"all posts"
												)
											)}
										</div>
									</div>
								</Button>
							}
							options={POST_LABELS.map((name) => ({
								label: toTitleCase(
									name.replace("all", "all posts")
								),
								onClick: () => setFilter(name),
							}))}
						/>
					</div>
					<div>
						<Dropdown
							content={
								<Button variant="dark" className="w-48">
									{sanitizeCategory(category)}
								</Button>
							}
							options={[
								{
									label: "All",
									onClick: () => setCategory("all"),
								},
							].concat(
								POST_CATEGORIES.map((postCategory) => ({
									label: sanitizeCategory(postCategory),

									onClick: () => setCategory(postCategory),
								}))
							)}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					{loadingPosts
						? [...Array(10)].map((i) => <PostCard key={i} />)
						: posts.map((data) => (
								<PostCard data={data} key={data._id} />
						  ))}
				</div>
				<div className="flex justify-between items-center p-2 space-x-4 rounded-md bg-dark-100">
					<Button
						block
						variant="dark"
						disabled={page <= 1}
						onClick={() => {
							setPage(page - 1);
							top.current?.scrollIntoView();
						}}
					>
						Previous Page
					</Button>
					<Button
						block
						variant="dark"
						disabled={posts.length < LOAD_AMOUNT}
						onClick={() => {
							setPage(page + 1);
							top.current?.scrollIntoView();
						}}
					>
						Next Page
					</Button>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
