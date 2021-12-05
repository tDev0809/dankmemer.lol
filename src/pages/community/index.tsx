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
import { Blog, PageProps } from "../../types";
import { sanitizeCategory } from "../../util/feedback";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function Community({ user }: PageProps) {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [postCategory, setPostCategory] = useState<
		typeof POST_CATEGORIES[number]
	>(POST_CATEGORIES[0]);

	useEffect(() => {
		axios("/api/community/blogs/all").then(({ data }) => {
			setBlogs(data);
		});
	}, []);

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
								{POST_CATEGORIES.map((category) => (
									<div
										className={clsx(
											"py-2 px-4 bg-dark-100 rounded-md cursor-pointer select-none",
											category == postCategory
												? "text-dank-300"
												: "text-white"
										)}
										onClick={() =>
											setPostCategory(category)
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
								{new Array(10).fill(0).map((p) => (
									<PostCard
										data={{
											_id: "normie-beaker-newplayerpack-newplayerpack",
											title: "Be able to trade with the bot",
											content:
												"So say you wanted 100 dragons but no-one would trade you can trade with the bot or dank shop. You would give say 100k for every dragon.\nPlease do this",
											category: "currency_commands",
											createdAt: 1631790161382,
											author: "825997660812083221",
											label: "denied",
											upvotes: 1234,
											comments: 10,
										}}
									/>
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
