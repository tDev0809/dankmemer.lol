import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../components/community/blog/BlogPost";
import { BlogPostPlaceholder } from "../../components/community/blog/BlogPostPlaceholder";
import { Title } from "../../components/Title";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import { Blog, PageProps } from "../../types";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function Blogs({ user }: PageProps) {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const router = useRouter();

	useEffect(() => {
		axios("/api/community/blogs/all").then(({ data }) => {
			setBlogs(data);
		});
	}, []);

	return (
		<Container title="Blog Posts" user={user}>
			<div className="flex flex-col my-16 space-y-4 mx-8 xl:mx-0">
				<div className="flex justify-between items-center">
					<Title size="big">Blog Posts</Title>
					{user?.developer && (
						<Button
							size="small"
							variant="primary"
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
					)}
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
					{blogs.length > 0
						? blogs.map((blog) => (
								<div className="m-2">
									<BlogPost data={blog} user={user} />
								</div>
						  ))
						: [...Array(20)].map(() => (
								<div className="m-2">
									<BlogPostPlaceholder />{" "}
								</div>
						  ))}
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
