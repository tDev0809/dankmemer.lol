import axios from "axios";
import * as html2md from "html-to-md";
import MarkdownIt from "markdown-it";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import { Blog, PageProps } from "../../types";
import { adminRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function ControlBlogsPage({ user }: PageProps) {
	const router = useRouter();
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [currentBlog, setCurrentBlog] = useState<number | null>(null);
	const [blogContent, setBlogContent] = useState("");
	const [editingExisting, setEditingExisting] = useState(false);
	const [htmlBlog, setHTMLBlog] = useState("");
	const [blogTitle, setBlogTitle] = useState("");
	const [blogDescription, setBlogDescription] = useState("");
	const [blogDate, setBlogDate] = useState(0);
	const [blogAuthor, setBlogAuthor] = useState(user!.username);
	const [blogDraft, setBlogDraft] = useState(false);

	const [submittable, setSubmittable] = useState(false);
	const [draftable, setDraftable] = useState(false);

	const mdParser = new MarkdownIt();

	const selectBlog = (i: number) => {
		if (
			!confirm(
				"All unsaved changes will be lost. Do you wish to continue?\n\nIf you wish to save the changes, you will need to do so yourself, either online or on your personal computer."
			)
		)
			return;
		setCurrentBlog(i);
		setEditingExisting(true);
	};

	function handleEditorChange({
		html,
		text,
	}: {
		html: string;
		text: string;
	}) {
		setHTMLBlog(html);
		setBlogContent(text);
	}

	const publish = (draft = false) => {
		if (
			!draft &&
			!confirm(
				"You are about to publish this blog post. Once you publish it you will be redirected to the blog page.\n\n Do you wish to continue?"
			)
		)
			return;
		axios({
			url: "/api/blog/publish",
			method: "POST",
			data: {
				id: blogTitle
					.toLowerCase()
					.replace(/ /g, "-")
					.replace(/[^a-zA-Z0-9 -]/, ""),
				name: blogTitle,
				date: blogDraft && !draft ? Date.now() : blogDate,
				desc: blogDescription,
				author: blogAuthor,
				content: htmlBlog,
				draft: draft,
			},
		})
			.then(() => {
				if (!draft) {
					return router.push(
						`/blogs/${blogTitle.toLowerCase().replace(/ /g, "-")}`
					);
				} else {
					location.reload();
				}
			})
			.catch((e) => {
				console.group("Blog publishing error");
				console.error(e.message);
				console.groupEnd();
				toast.dark(
					"There was an issue publish this blog post. If this persists, check the console for errors."
				);
			});
	};

	const deleteBlog = () => {
		if (
			!confirm(
				"You are about to delete this blog post forever. This action cannot be reversed.\n\nDo you wish to continue?"
			)
		)
			return;
		axios(`/api/blog/delete/${blogs[currentBlog!]._id}`)
			.then(() => {
				return window.location.reload();
			})
			.catch((e) => {
				console.group("Blog publishing error");
				console.error(e.message);
				console.groupEnd();
				toast.error(
					"There was an issue publish this blog post. If this persists, check the console for errors."
				);
			});
	};

	const clearEditor = () => {
		if (
			!confirm(
				"All unsaved changes will be lost. Do you wish to continue?\n\nIf you wish to save the changes, you will need to do so yourself, either online or on your personal computer."
			)
		)
			return;
		setCurrentBlog(null);
		setBlogTitle("");
		setBlogDescription("");
		setBlogAuthor(user!.username);
		setBlogContent("");
		setBlogDraft(false);
		setEditingExisting(false);
	};

	useEffect(() => {
		axios("/api/blog/all").then(({ data: blogs }) => {
			setBlogs(blogs);
		});
	}, []);

	useEffect(() => {
		setDraftable(blogTitle.length >= 5 && blogContent.length >= 1);
		setSubmittable(
			blogTitle.length >= 5 &&
				blogDescription.length >= 20 &&
				blogContent.length >= 200
		);
	}, [blogTitle, blogDescription, blogContent]);

	useEffect(() => {
		if (currentBlog === null || !blogs) return;
		setBlogTitle(blogs[currentBlog].name);
		setBlogDate(blogs[currentBlog].date);
		setBlogAuthor(blogs[currentBlog].author);
		setBlogDescription(blogs[currentBlog].desc);
		setBlogDraft(blogs[currentBlog].draft || false);
		axios(`/api/blog/get/${blogs[currentBlog]._id}`).then(
			({ data: blog }) => {
				setBlogContent(
					html2md(blog.content.replaceAll('\\"', '"')).replaceAll(
						"\\n",
						""
					)
				);
				setHTMLBlog(blog.content);
			}
		);
	}, [currentBlog]);

	return (
		<Container title="Control" user={user}>
			<div className="mx-8 xl:mx-0">
				<div className="flex flex-col my-20 space-y-8">
					<div className="flex flex-col space-y-4">
						<div
							className="flex space-x-2 cursor-pointer text-sm items-center text-dark-300 dark:text-light-100"
							onClick={() => router.back()}
						>
							<span className="material-icons">arrow_back</span>
							<div>Go Back</div>
						</div>
						<div className="flex">
							<div className="flex flex-col space-y-4 w-1/4">
								<div className="flex flex-col">
									<div className="text-3xl font-bold font-montserrat text-dark-400 dark:text-white">
										Blog posts
									</div>
									<div className="text-gray-400 dark:text-gray-300">
										Here you are able to create new and edit
										existing blog posts!
									</div>
								</div>
								<Button
									size="medium"
									className="text-white bg-gray-400 dark:bg-dark-100 hover:bg-opacity-75"
									onClick={() => clearEditor()}
								>
									Write a blog post
								</Button>
								<div className="flex flex-col space-y-4 max-h-[700px] overflow-y-scroll">
									{blogs.map((blog, i) => (
										<div
											className="rounded-md p-4 bg-light-500 dark:bg-dark-400"
											key={i}
											onClick={() => selectBlog(i)}
										>
											<div className="text-md font-bold font-montserrat text-dark-400 dark:text-white">
												{blog.name}{" "}
												{blog.draft && (
													<span className="text-dank-300 text-sm">
														DRAFT
													</span>
												)}
											</div>
											<div className="text-gray-400">
												{blog.desc.substr(0, 50)}...
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="flex flex-col flex-1 ml-8 space-y-4">
								<div className="flex flex-col">
									<input
										onChange={(e) =>
											setBlogTitle(e.target.value)
										}
										disabled={editingExisting && !blogDraft}
										className="text-4xl font-bold font-montserrat outline-none appearance-none bg-transparent text-dark-400 dark:text-white placeholder-gray-600"
										placeholder={"Blog title"}
										value={blogTitle}
									/>
									<input
										onChange={(e) =>
											setBlogDescription(e.target.value)
										}
										disabled={editingExisting && !blogDraft}
										className="text-xl font-montserrat outline-none appearance-none bg-transparent text-dark-400 dark:text-white  placeholder-gray-600"
										placeholder={
											"Write a short description for your blog"
										}
										value={blogDescription}
									/>
								</div>
								<div className="flex space-x-4">
									<Button
										disabled={!submittable}
										size="medium"
										className="text-white bg-gray-400 dark:bg-dark-100 hover:bg-opacity-75"
										onClick={() => publish()}
									>
										Publish this blog post
									</Button>
									<Button
										disabled={!draftable}
										size="medium"
										className="text-white bg-gray-400 dark:bg-dark-100 hover:bg-opacity-75"
										onClick={() => publish(true)}
									>
										Add to drafts
									</Button>
									{currentBlog !== null && (
										<Button
											size="medium"
											className="text-white bg-gray-400 dark:bg-dark-100 hover:bg-opacity-75"
											onClick={() => deleteBlog()}
										>
											Delete
										</Button>
									)}
								</div>
								<div className="text-white z-50">
									<MdEditor
										id="blog-editor"
										renderHTML={(text) =>
											mdParser.render(text)
										}
										onChange={handleEditorChange}
										value={blogContent}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = withSession(adminRoute);
