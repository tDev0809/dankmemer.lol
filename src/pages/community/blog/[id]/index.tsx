import axios from "axios";
import { format } from "date-fns";
import MarkdownIt from "markdown-it";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BottomCTA from "../../../../components/BottomCTA";
import LoadingPepe from "../../../../components/LoadingPepe";
import Container from "../../../../components/ui/Container";
import { Blog, PageProps, UserData } from "../../../../types";
import { tailwindHtml } from "../../../../util/blog";
import { unauthenticatedRoute } from "../../../../util/redirects";
import { withSession } from "../../../../util/session";
import Link from "next/link";
import { TIME } from "../../../../constants";

export default function BlogPage({ user }: PageProps) {
	const [blog, setBlog] = useState<Blog>();

	const router = useRouter();
	const mdParser = new MarkdownIt();
	const { id } = router.query;

	useEffect(() => {
		axios(`/api/community/blogs/get/${id}`)
			.then(({ data }) => {
				setBlog(data);

				if (Date.now() - data.date > TIME.week * 2) {
					localStorage.removeItem(`read-${data._id}`);
				} else {
					localStorage.setItem(`read-${data._id}`, "1");
				}
			})
			.catch(() => {
				router.push("/community/blogs");
			});
	}, []);

	return (
		<Container title="Blog" user={user}>
			<div className="relative flex justify-center">
				<div className="my-16 flex max-w-5xl flex-col items-center space-y-8">
					{blog ? (
						<>
							<div className="flex flex-col items-center space-y-1">
								<div className="text-center font-montserrat text-5xl font-bold text-dark-400 dark:text-white">
									{blog.title}
								</div>
								<div className="flex flex-col items-center -space-y-1">
									<div className="text-gray-400">
										Written by{" "}
										<Link
											href={`/@${
												(blog.author as UserData)
													.vanity ||
												(blog.author as UserData).id
											}`}
										>
											<a className="hover:underline">
												{(blog.author as UserData).name}
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
								className="max-w-[80vw] text-left text-dark-400 dark:text-white lg:text-justify"
								dangerouslySetInnerHTML={{
									__html: tailwindHtml(
										mdParser.render(blog.content)
									),
								}}
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
