import axios from "axios";
import MarkdownIt from "markdown-it";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingPepe from "../../../../components/LoadingPepe";
import Button from "../../../../components/ui/Button";
import Container from "../../../../components/ui/Container";
import { Blog, PageProps } from "../../../../types";
import { tailwindHtml } from "../../../../util/blog";
import { developerRoute } from "../../../../util/redirects";
import { withSession } from "../../../../util/session";

export default function BlogEditPage({ user }: PageProps) {
	const [blog, setBlog] = useState<Blog>();
	const [preview, setPreview] = useState(false);

	const router = useRouter();
	const { id } = router.query;
	const mdParser = new MarkdownIt();

	useEffect(() => {
		if (id == "new") {
			setBlog({
				_id: "",
				title: "",
				author: user!.id,
				description: "",
				draft: false,
				content: "",
				date: Date.now(),
			});
		} else {
			axios(`/api/community/blogs/get/${id}`)
				.then(({ data }) => {
					setBlog(data);
				})
				.catch(() => {
					router.push("/community/blogs");
				});
		}
	}, []);

	const publish = (draft = false) => {
		if (
			!draft &&
			!confirm(
				"You are about to publish this blog post. Once you publish it you will be redirected to the blog page.\n\n Do you wish to continue?"
			)
		)
			return;

		if (draft) {
			const copy = { ...blog };
			copy.draft = true;
			setBlog(copy as Blog);
		}

		blog!.draft = draft;

		axios({
			url: `/api/community/blogs/publish/${id}`,
			method: "POST",
			data: blog,
		})
			.then(() => {
				if (!draft) {
					return router.push(`/community/blog/${blog!._id}`);
				} else {
					return router.push(`/community/blog/${blog!._id}/edit`);
				}
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	const deleteBlog = () => {
		if (
			!confirm(
				"You are about to delete this blog post forever. This action cannot be reversed.\n\nDo you wish to continue?"
			)
		)
			return;
		axios(`/api/community/blogs/delete/${id}`)
			.then(() => {
				return window.location.reload();
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	return (
		<Container title="Blog Editor" user={user}>
			<div className="flex flex-col my-16 space-y-8 mx-8 xl:mx-0">
				{blog ? (
					<div className="flex flex-col space-y-4 bg-dark-100 p-4 rounded-md">
						<div className="flex flex-col space-y-2">
							{blog.draft && (
								<div className="text-dank-100 font-bold">
									DRAFT
								</div>
							)}
							<input
								onChange={(e) => {
									const copy = { ...blog };
									copy.title = e.target.value;
									setBlog(copy);
								}}
								className="w-full bg-light-500 dark:bg-dank-600 drop-shadow-xl dark:drop-shadow-none p-3 outline-none text-black dark:text-light-300 text-sm resize-none h-10 overflow-hidden rounded-md placeholder-gray-500"
								placeholder={"Blog title"}
								value={blog.title}
							/>
							<input
								onChange={(e) => {
									const copy = { ...blog };
									copy.description = e.target.value;
									setBlog(copy);
								}}
								className="w-full bg-light-500 dark:bg-dank-600 drop-shadow-xl dark:drop-shadow-none p-3 outline-none text-black dark:text-light-300 text-sm resize-none h-10 overflow-hidden rounded-md placeholder-gray-500"
								placeholder={"Blog Description"}
								value={blog.description}
							/>
							<input
								onChange={(e) => {
									const copy = { ...blog };
									copy._id = e.target.value;
									setBlog(copy);
								}}
								className="w-full bg-light-500 dark:bg-dank-600 drop-shadow-xl dark:drop-shadow-none p-3 outline-none text-black dark:text-light-300 text-sm resize-none h-10 overflow-hidden rounded-md placeholder-gray-500"
								placeholder={"Blog ID"}
								value={blog._id}
							/>

							<div className="flex justify-between">
								<div className="w-40">
									<Button
										variant="dark"
										onClick={() => setPreview(!preview)}
										block
									>
										{preview ? "Edit " : "Preview"}
									</Button>
								</div>
								<div className="flex space-x-2">
									<Button
										variant="dark"
										onClick={() => publish(false)}
									>
										Publish
									</Button>
									<Button
										variant="dark"
										onClick={() => publish(true)}
									>
										Draft
									</Button>
									<Button
										variant="dark"
										onClick={() => deleteBlog()}
									>
										Delete
									</Button>
								</div>
							</div>
						</div>

						{preview ? (
							<div
								className="text-dark-400 dark:text-white bg-dank-600 rounded-md p-4"
								dangerouslySetInnerHTML={{
									__html: tailwindHtml(
										mdParser.render(blog.content)
									),
								}}
							/>
						) : (
							<textarea
								className="w-full bg-light-500 dark:bg-dank-600 outline-none text-black dark:text-light-300 text-sm p-3 h-96 rounded-md placeholder-gray-500"
								onChange={(e) => {
									const copy = { ...blog };
									copy.content = e.target.value;
									setBlog(copy);
								}}
								value={blog.content}
								placeholder={"..."}
							/>
						)}
					</div>
				) : (
					<LoadingPepe />
				)}
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(developerRoute);
