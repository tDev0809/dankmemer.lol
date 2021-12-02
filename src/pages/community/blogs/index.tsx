import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../../components/community/blog/BlogPost";
import { Title } from "../../../components/Title";
import Container from "../../../components/ui/Container";
import { Blog, PageProps } from "../../../types";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";

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
				<Title size="big">Blog Posts</Title>
				<div id="nitropay-blogs-top" className="nitropay" />
				<div className="flex flex-wrap justify-center">
					{blogs.map((blog) => (
						<div className="m-2">
							<BlogPost data={blog} />
						</div>
					))}
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
