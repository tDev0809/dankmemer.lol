import axios from "axios";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import { Blog, PageProps } from "../../types";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";
import Link from "next/link";

export default function BlogPage({ user }: PageProps) {
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		axios("/api/blog/list").then((data) => {
			setBlogs(data.data);
		});
	}, []);

	return (
		<Container title="Blogs" user={user}>
			<div className="relative my-16">
				<div className="flex justify-center">
					<div className="flex flex-col pb-16 space-y-6 items-center border-b border-light-500 dark:border-dark-100">
						<div className="text-6xl font-bold font-montserrat text-dark-200 dark:text-white">
							BLOG POSTS
						</div>
						<div className="max-w-2xl text-center text-lg text-gray-400 mx-16">
							Blogs are written by the developers and are
							community focused, news and updates regarding Dank
							Memer and related topics.
						</div>
					</div>
				</div>
				<div className="mt-8 flex flex-col space-y-4">
					<div className="text-gray-400 text-3xl font-montserrat">
						Most recent posts
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5 xl:gap-20">
						{blogs.slice(0, 3).map((blog, i) => (
							<Link href={`/blogs/${blog._id}`}>
								<div className="rounded-lg h-72 p-6 cursor-pointer border bg-light-500 dark:bg-dark-400 border-light-500 dark:border-dark-400 hover:border-dank-300 dark:hover:border-dank-300">
									<div className="flex flex-col space-y-4 text-dark-400 dark:text-white">
										<div className="font-bold text-2xl font-montserrat">
											{blog.name}
										</div>
										<div className="text-sm text-gray-500 dark:text-gray-400">
											Written by {blog.author}
											<br /> On{" "}
											{format(blog.date, "MMMM dd, yyyy")}
										</div>
										<div>{blog.desc}</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
				<div className="mt-8 flex flex-col space-y-4">
					<div className="text-gray-400 text-3xl font-montserrat">
						Older posts
					</div>
					<div className="grid grid-cols-1 gap-4">
						{blogs.slice(3, blogs.length - 1).map((blog, i) => (
							<Link href={`/blogs/${blog._id}`} key={i}>
								<div className="rounded-lg p-6 cursor-pointer bg-light-500 dark:bg-dark-400 border-light-500 dark:border-dark-400 border hover:border-dank-300 dark:hover:border-dank-300">
									<div className="flex flex-col space-y-2 text-dark-400 dark:text-white">
										<div className="font-bold text-2xl font-montserrat">
											{blog.name}
										</div>
										<div className="text-sm text-gray-400">
											Written by {blog.author}
											<br /> On{" "}
											{format(blog.date, "MMMM dd, yyyy")}
										</div>
										<div>{blog.desc}</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
