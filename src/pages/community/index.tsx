import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../components/community/blog/BlogPost";
import { ViewMore } from "../../components/community/blog/ViewMore";
import { PostCard } from "../../components/community/PostCard";
import Section from "../../components/community/Section";
import UpdateBanner from "../../components/community/UpdateBanner";
import { ViewingAs } from "../../components/community/ViewingAs";
import { Title } from "../../components/Title";
import Container from "../../components/ui/Container";
import { POST_CATEGORIES } from "../../constants";
import { Blog, PageProps, Post } from "../../types";
import { sanitizeCategory } from "../../util/feedback";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function Community({ user }: PageProps) {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [postCategory, setPostCategory] = useState<
		typeof POST_CATEGORIES[number] | "all"
	>("all");
	const [posts, setPosts] = useState<Post[]>([]);
	const [loadingPosts, setLoadingPosts] = useState(false);

	useEffect(() => {
		axios("/api/community/blogs/all").then(({ data }) => {
			setBlogs(data);
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
			<div className="flex flex-col my-16 space-y-4 mx-8 xl:mx-0">
				<div className="flex justify-between items-center">
					<Title size="big">Community</Title>
					<ViewingAs user={user} />
				</div>
				<UpdateBanner
					title="Update 9.6.0 is OUT!"
					description="Woah this update is so big! We added streaming and stuff"
					image="https://imgur.com/kspUVKW.png"
					id="xqc"
				/>
				<Section title="Our Blog">
					<div className="flex justify-between">
						{blogs.slice(0, 4).map((blog) => (
							<BlogPost data={blog} />
						))}
						<ViewMore />
					</div>
				</Section>
				<Section title="Top Contributions">
					<div className="bg-dark-100 h-20 rounded-md"></div>
				</Section>
				<Section title="Community Posts">
					<div className="flex space-x-4">
						<div className="flex flex-col space-y-2">
							<div className="text-lg">Categories</div>
							<div className="flex flex-col space-y-2 w-52">
								{["all"]
									.concat(POST_CATEGORIES)
									.map((category) => (
										<div
											className={clsx(
												"py-2 px-4 bg-dark-100 rounded-md cursor-pointer select-none",
												category == postCategory
													? "text-dank-300"
													: "text-white"
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
							<div className="text-lg">Trending posts</div>
							<div className="grid grid-cols-2 gap-4">
								{loadingPosts
									? [...Array(10)].map((_) => <PostCard />)
									: posts.map((data) => (
											<PostCard data={data} />
									  ))}
							</div>
						</div>
					</div>
				</Section>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
