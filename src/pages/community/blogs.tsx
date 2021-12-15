import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { Ad } from "../../components/Ad";
import { BlogPost } from "../../components/community/blog/BlogPost";
import { Title } from "../../components/Title";
import Container from "../../components/ui/Container";
import { Blog, PageProps } from "../../types";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function Blogs({ user }: PageProps) {
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		axios("/api/community/blogs/all").then(({ data }) => {
			setBlogs(data);
		});
	}, []);

	return (
		<Container title="Blog Posts" user={user}>
			<div className="flex flex-col my-16 space-y-4 mx-8 xl:mx-0">
				<Ad
					id="top"
					platform="desktop"
					sizes={[
						[728, 90],
						[970, 90],
						[970, 250],
					]}
				/>
				<Ad
					id="top"
					platform="mobile"
					sizes={[
						[320, 50],
						[300, 50],
						[300, 250],
					]}
				/>
				<Title size="big">Blog Posts</Title>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
					{blogs.map((blog) => (
						<div className="m-2">
							<BlogPost data={blog} />
						</div>
					))}
				</div>
				<Ad
					id="bottom"
					platform="mobile"
					sizes={[
						[320, 50],
						[300, 50],
						[300, 250],
					]}
				/>
				<Ad
					id="bottom"
					platform="desktop"
					sizes={[
						[728, 90],
						[970, 90],
						[970, 250],
					]}
				/>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
