import axios from "axios";
import MarkdownIt from "markdown-it";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingPepe from "../../../../components/LoadingPepe";
import Button from "../../../../components/ui/Button";
import Container from "../../../../components/ui/Container";
import Input from "../../../../components/ui/Input";
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
			<div className="flex flex-col my-16 space-y-8">
				{blog ? (
					<div className="flex flex-col space-y-4 bg-light-500 dark:bg-dark-100 p-4 rounded-md">
						<div className="flex flex-col space-y-2">
							{blog.draft && (
								<div className="text-dank-100 font-bold">
									DRAFT
								</div>
							)}

							<Input
								onChange={(e) => {
									const copy = { ...blog };
									copy.title = e.target.value;
									setBlog(copy);
								}}
								label={"Blog Tile"}
								variant="short"
								placeholder="..."
								value={blog.title}
							/>
							<Input
								onChange={(e) => {
									const copy = { ...blog };
									copy.description = e.target.value;
									setBlog(copy);
								}}
								variant="short"
								label="Blog Description"
								placeholder="..."
								value={blog.description}
							/>
							<div className="flex items-end space-x-4 w-full">
								<div className="w-full">
									<Input
										onChange={(e) => {
											const copy = { ...blog };
											copy._id = e.target.value;
											setBlog(copy);
										}}
										variant="short"
										label="Blog ID"
										placeholder="..."
										value={blog._id}
									/>
								</div>
								<Button
									className="h-10"
									variant="dark"
									size="medium"
									onClick={() => {
										const copy = { ...blog };
										copy._id = blog.title
											.toLowerCase()
											.replace(/ /g, "-")
											.replace(/[^a-zA-Z0-9 -]/, "");
										setBlog(copy);
									}}
								>
									Generate
								</Button>
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
							<Input
								label="Blog Content"
								onChange={(e) => {
									const copy = { ...blog };
									copy.content = e.target.value;
									setBlog(copy);
								}}
								scrollable
								resizable
								variant="long"
								placeholder="..."
								value={blog.content}
							/>
						)}
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
									variant="primary"
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
									variant="danger"
									onClick={() => deleteBlog()}
								>
									Delete
								</Button>
							</div>
						</div>
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
