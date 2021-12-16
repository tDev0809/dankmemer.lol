import axios from "axios";
import { format } from "date-fns";
import MarkdownIt from "markdown-it";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Ad } from "../../../../components/Ad";
import BottomCTA from "../../../../components/BottomCTA";
import LoadingPepe from "../../../../components/LoadingPepe";
import Container from "../../../../components/ui/Container";
import { Blog, PageProps } from "../../../../types";
import { tailwindHtml } from "../../../../util/blog";
import { unauthenticatedRoute } from "../../../../util/redirects";
import { withSession } from "../../../../util/session";
import Link from "next/link";

export default function BlogPage({ user }: PageProps) {
	const [blog, setBlog] = useState<Blog>();

	const router = useRouter();
	const mdParser = new MarkdownIt();
	const { id } = router.query;

	useEffect(() => {
		axios(`/api/community/blogs/get/${id}`)
			.then(({ data }) => {
				setBlog(data);
			})
			.catch(() => {
				router.push("/community/blogs");
			});
	}, []);

	return (
		<Container title="Blog" user={user}>
			<div className="mx-8 lg:mx-auto relative flex justify-center">
				<div className="max-w-5xl flex flex-col items-center space-y-8 my-16">
					{blog ? (
						<>
							<div className="flex flex-col items-center space-y-1">
								<div className="text-5xl font-montserrat font-bold text-dark-400 dark:text-white text-center">
									{blog.title}
								</div>
								<div className="flex flex-col items-center -space-y-1">
									<div className="text-gray-400">
										Written by{" "}
										<Link
											href={`/community/profile/${blog.author.id}`}
										>
											<a className="hover:underline">
												{blog.author.name}
											</a>
										</Link>
									</div>
									<div className="text-gray-400">
										Published on{" "}
										{format(blog.date, "MMMM dd, yyyy")}
									</div>
								</div>
							</div>
							<div
								className="text-dark-400 dark:text-white"
								dangerouslySetInnerHTML={{
									__html: tailwindHtml(
										mdParser.render(blog.content)
									),
								}}
							/>
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
							<BottomCTA />
						</>
					) : (
						<LoadingPepe />
					)}
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
