import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { PostCard } from "../../../components/community/PostCard";
import Button from "../../../components/ui/Button";
import Container from "../../../components/ui/Container";
import Dropdown from "../../../components/ui/Dropdown";
import Input from "../../../components/ui/Input";
import { POST_CATEGORIES, POST_LABELS } from "../../../constants";
import { PageProps, Post } from "../../../types";
import { sanitizeCategory } from "../../../util/community";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";
import { toTitleCase } from "../../../util/string";

const SORTING: Record<string, string> = {
	hot: "local_fire_department",
	top: "trending_up",
	new: "star",
	old: "restore",
};

const TIME: Record<string, number> = {
	"All Time": 365 * 10,
	"This Year": 365,
	"This Month": 31,
	"This Week": 7,
	Today: 1,
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
	const [time, setTime] = useState(
		Object.keys(TIME).includes(router.query.time as string)
			? (router.query.time as string)
			: "All Time"
	);
	const [page, setPage] = useState(
		Math.max(
			1,
			router.query.page ? Number(router.query.page as string) || 1 : 1
		)
	);
	const [loadingPosts, setLoadingPosts] = useState(false);
	const [search, setSearch] = useState((router.query.search as string) || "");
	const [oldSearch, setOldSearch] = useState(search);

	const loadPosts = () => {
		router.replace({
			pathname: router.pathname,
			query: {
				sorting,
				category,
				filter,
				time,
				page,
				...(search.length > 0 ? { search } : {}),
			},
		});
		setLoadingPosts(true);

		axios(
			`/api/community/posts/all?${new URLSearchParams({
				from: (LOAD_AMOUNT * (page - 1)).toString(),
				amount: LOAD_AMOUNT.toString(),
				category: category,
				filter: filter,
				time: TIME[time].toString(),
				sorting: sorting,
				search: search,
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
		if (page == -1) {
			setPage(1);
		} else {
			setOldSearch("");
			loadPosts();
		}
	}, [page]);

	return (
		<Container title="Posts" user={user}>
			<div className="flex flex-col space-y-4 my-16">
				<div
					className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between md:items-center p-2 rounded-md bg-light-500 dark:bg-dark-100"
					ref={top}
				>
					<div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-2 md:space-y-0">
						<div className="flex space-x-4">
							<Dropdown
								className="w-full md:w-auto"
								content={
									<Button
										variant="dark"
										className="w-full md:w-auto"
									>
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
										onClick: () => {
											setSorting(name);
											setPage(-1);
										},
									})
								)}
							/>
							<Dropdown
								className="w-full md:w-auto"
								content={
									<Button
										variant="dark"
										className="w-full md:w-auto"
									>
										<div className="flex space-x-2 justify-center  items-center w-28">
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
								options={POST_LABELS.filter((l) =>
									user?.moderator
										? true
										: !["denied", "duplicate"].includes(l)
								).map((name) => ({
									label: toTitleCase(
										name.replace("all", "all posts")
									),
									onClick: () => {
										setFilter(name);
										setSearch("");
										setPage(-1);
									},
								}))}
							/>
						</div>
						<Dropdown
							className="w-full md:w-auto"
							content={
								<Button
									variant="dark"
									className="w-full md:w-auto"
								>
									<div className="flex space-x-2 justify-center items-center w-28">
										<div
											className="material-icons"
											style={{ fontSize: "18px" }}
										>
											history
										</div>
										<div>{toTitleCase(time)}</div>
									</div>
								</Button>
							}
							options={Object.keys(TIME).map((name) => ({
								label: name,
								onClick: () => {
									setTime(name);
									setSearch("");
									setPage(-1);
								},
							}))}
						/>
					</div>
					<div>
						<Dropdown
							className="w-full md:w-auto"
							content={
								<Button
									variant="dark"
									className="w-full md:w-48"
								>
									{sanitizeCategory(category)}
								</Button>
							}
							options={[
								{
									label: "All",
									onClick: () => {
										setCategory("all");
										setSearch("");
										setPage(-1);
									},
								},
							].concat(
								POST_CATEGORIES.map((postCategory) => ({
									label: sanitizeCategory(postCategory),

									onClick: () => {
										setCategory(postCategory);
										setSearch("");
										setPage(-1);
									},
								}))
							)}
						/>
					</div>
				</div>
				<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4 md:items-center p-2 rounded-md bg-light-500 dark:bg-dark-100">
					<Input
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								if (search != oldSearch) {
									setOldSearch(search);
									setCategory("all");
									setFilter("all");
									setPage(-1);
								}
							}
						}}
						block
						variant="short"
						placeholder="..."
						value={search}
					/>
					<Button
						className="h-10"
						variant="dark"
						disabled={search.length < 3 && search.length != 0}
						onClick={() => {
							if (search != oldSearch) {
								setOldSearch(search);
								setCategory("all");
								setFilter("all");
								setPage(-1);
							}
						}}
					>
						Search
					</Button>
				</div>
				{(loadingPosts || posts.length > 0) && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{loadingPosts
							? [...Array(10)].map((i) => <PostCard key={i} />)
							: posts.map((data) => (
									<PostCard data={data} key={data._id} />
							  ))}
					</div>
				)}
				{posts.length == 0 && (
					<div className="flex flex-col items-center space-y-2 bg-light-500 dark:bg-dark-100 p-4 rounded-md">
						<img
							src="/img/memer.png"
							width={160}
							className="grayscale"
						/>
						<div className="italic">Woah... so empty</div>
					</div>
				)}
				<div className="flex justify-between items-center p-2 space-x-4 rounded-md bg-light-500 dark:bg-dark-100">
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
