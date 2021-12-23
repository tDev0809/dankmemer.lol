import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../components/community/blog/BlogPost";
import { BlogPostPlaceholder } from "../../components/community/blog/BlogPostPlaceholder";
import { ViewMore } from "../../components/community/blog/ViewMore";
import { PostCard } from "../../components/community/PostCard";
import Section from "../../components/community/Section";
import { TopContributors } from "../../components/community/TopContributors";
import UpdateBanner from "../../components/community/UpdateBanner";
import { Title } from "../../components/Title";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import Dropdown from "../../components/ui/Dropdown";
import { POST_CATEGORIES } from "../../constants";
import { Banner, Blog, PageProps, Post } from "../../types";
import { sanitizeCategory } from "../../util/community";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function Community({ user }: PageProps) {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [postCategory, setPostCategory] = useState<
		typeof POST_CATEGORIES[number] | "all"
	>("all");
	const [posts, setPosts] = useState<Post[]>([]);
	const [loadingPosts, setLoadingPosts] = useState(false);
	const router = useRouter();
	const [banner, setBanner] = useState<Banner>();

	useEffect(() => {
		axios("/api/community/blogs/all").then(({ data }) => {
			setBlogs(data);
		});
		axios("/api/community/update/get").then(({ data }) => {
			setBanner(data);
		});
	}, []);

	useEffect(() => {
		setLoadingPosts(true);
		axios(
			`/api/community/posts/all?${new URLSearchParams({
				from: "0",
				amount: "10",
				category: postCategory,
			})}`
		).then(({ data }) => {
			setPosts(data.posts);
			setLoadingPosts(false);
		});
	}, [postCategory]);

	return (
		<Container title="Community" user={user}>
			<div className="flex flex-col my-16 space-y-12">
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
						<Title size="big">Community</Title>
						{user && (
							<div className="flex space-x-2">
								{user.developer && (
									<Button
										size="small"
										className="w-full sm:w-auto"
										variant="dark"
										href="/community/update"
									>
										<div className="flex items-center space-x-2">
											<div className="material-icons">
												aspect_ratio
											</div>
											<div>New Update</div>
										</div>
									</Button>
								)}
								<Button
									size="small"
									className="w-full sm:w-auto"
									variant="dark"
									onClick={() =>
										router.push(
											`/community/profile/${user?.id}`
										)
									}
								>
									<div className="flex items-center space-x-2">
										<div className="material-icons">
											person
										</div>
										<div>Your Profile</div>
									</div>
								</Button>
							</div>
						)}
					</div>
					{banner && (
						<UpdateBanner
							title={banner.title}
							description={banner.description}
							image={banner.image}
							url={banner.url}
							buttonText={banner.buttonText}
						/>
					)}
				</div>
				<Section
					title="Our Blog"
					button={
						user?.developer && (
							<Button
								size="small"
								variant="dark"
								onClick={() =>
									router.push(`/community/blog/new/edit`)
								}
							>
								<div className="flex items-center space-x-2">
									<div className="material-icons">
										description
									</div>
									<div>New Blog</div>
								</div>
							</Button>
						)
					}
				>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
						{blogs.length > 0
							? blogs
									.slice(0, 4)
									.map((blog) => (
										<BlogPost data={blog} user={user} />
									))
							: [...Array(4)].map(() => <BlogPostPlaceholder />)}
						<ViewMore />
					</div>
				</Section>
				<Section title="Top Contributors This Month">
					<TopContributors />
				</Section>
				<Section title="Community Posts">
					<div className="flex space-x-0 md:space-x-4">
						<div className="hidden md:flex flex-col space-y-3 ">
							<div className="text-lg text-black dark:text-white">
								Categories
							</div>
							<div className="flex flex-col space-y-2 w-52">
								{["all"]
									.concat(POST_CATEGORIES)
									.map((category) => (
										<div
											className={clsx(
												"py-2 px-4 bg-light-500 dark:bg-dark-100 rounded-md cursor-pointer select-none",
												category == postCategory
													? "text-dank-300"
													: "text-black dark:text-white"
											)}
											onClick={() =>
												setPostCategory(
													category as typeof postCategory
												)
											}
										>
											{sanitizeCategory(category)}
										</div>
									))}
							</div>
						</div>
						<div className="flex flex-col space-y-2 w-full">
							<div className="flex flex-col md:flex-row items-start justify-between">
								<div className="text-lg text-black dark:text-white">
									Trending posts
								</div>
								<div className="flex justify-between space-x-4 w-full md:w-auto">
									<Button
										size="small"
										variant="dark"
										href="/community/post/"
									>
										<div className="flex items-center space-x-2 w-20 sm:w-32 md:w-auto">
											<div className="material-icons">
												post_add
											</div>
											<div>
												New{" "}
												<span className="hidden sm:inline-block">
													Post
												</span>
											</div>
										</div>
									</Button>
									<div className="inline-block md:hidden w-full">
										<Dropdown
											content={
												<Button variant="dark" block>
													{sanitizeCategory(
														postCategory
													)}
												</Button>
											}
											options={["all"]
												.concat(POST_CATEGORIES)
												.map((category) => ({
													label: sanitizeCategory(
														category
													),
													onClick: () =>
														setPostCategory(
															category as typeof postCategory
														),
												}))}
										/>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
								{loadingPosts
									? [...Array(10)].map((i) => (
											<PostCard key={i} />
									  ))
									: posts.map((data) => (
											<PostCard
												data={data}
												key={data._id}
											/>
									  ))}
							</div>

							<Button
								block
								variant="dark"
								href={`/community/posts?category=${postCategory}`}
							>
								View More
							</Button>
						</div>
					</div>
				</Section>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
