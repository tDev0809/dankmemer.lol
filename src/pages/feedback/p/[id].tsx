import { GetServerSideProps } from "next";
import Container from "../../../components/ui/Container";
import { Comment, PageProps, Post } from "../../../types";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format, formatDistance } from "date-fns";
import axios from "axios";
import clsx from "clsx";
import Button from "../../../components/ui/Button";
import FeedbackComment from "../../../components/feedback/FeedbackComment";
import { urlify } from "../../../util/feedback";
import FeedbackLabel from "../../../components/feedback/FeedbackLabel";
import { toast } from "react-toastify";
import Tooltip from "../../../components/ui/Tooltip";
import FeedbackUpvote from "../../../components/feedback/FeedbackUpvote";
import Dropdown from "../../../components/ui/Dropdown";
import { FEEDBACK_LABELS } from "../../../constants";
import Link from "next/link";

const LOAD_COMMENTS_AMOUNT = 25;

export default function PostPage({ user }: PageProps) {
	const [post, setPost] = useState<Post>();
	const [comments, setComments] = useState<Comment[]>([]);
	const [comment, setComment] = useState("");
	const [from, setFrom] = useState(0);
	const [replyingTo, setReplyingTo] = useState("");
	const [reply, setReply] = useState("");
	const [all, setAll] = useState(false);

	const router = useRouter();
	const { id } = router.query;

	const loadComments = async () => {
		axios(
			`/api/feedback/comments/${id}?from=${from}&amount=${LOAD_COMMENTS_AMOUNT}`
		)
			.then(({ data }) => {
				setComments([...comments, ...data.comments]);
				setAll(data.all);
			})
			.catch((e) => {
				router.push("/feedback");
			});
	};

	const postReply = async () => {
		const res = await fetch("/api/feedback/reply/new", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				reply,
				id,
				replyingTo,
			}),
		});

		if (res.status !== 200) {
			toast.dark((await res.json()).error);
			return;
		}

		const comment = comments.find((c) => c._id == replyingTo);

		if (user) {
			comment!.replies.push({
				_id: (await res.json()).id,
				cID: replyingTo,
				pID: id as string,
				reply: reply,
				createdAt: Date.now(),
				author: {
					id: user.id,
					discriminator: user.discriminator,
					username: user.username,
					developer: user.isAdmin,
					moderator: user.isModerator,
				},
			});
		}

		setComments([...comments]);
		setReplyingTo("");
	};

	const postComment = async () => {
		const res = await fetch("/api/feedback/comment/new", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id,
				comment,
			}),
		});

		if (res.status !== 200) {
			toast.dark((await res.json()).error);
			return;
		}

		if (user) {
			comments.push({
				_id: (await res.json()).id,
				pID: id as string,
				comment: comment,
				replies: [],
				createdAt: Date.now(),
				author: {
					id: user.id,
					discriminator: user.discriminator,
					username: user.username,
					developer: user.isAdmin,
					moderator: user.isModerator,
				},
			});
		}

		setComments([...comments]);
		setComment("");
	};

	const loadNewComments = async () => {
		setFrom(from + LOAD_COMMENTS_AMOUNT);
	};

	const deletePost = async () => {
		if (
			!confirm(
				"Are you sure you want to delete this post? You will not be able to get anything back once it is gone."
			)
		)
			return;
		axios.delete(`/api/feedback/post/delete/${id as string}`);
		window.location.replace(`/feedback/`);
	};

	const changeLabel = (label: Post["label"]) => {
		axios
			.patch(
				`/api/feedback/post/label/${id}?label=${label.replace(
					"no label",
					""
				)}`
			)
			.then(({ data }) => {
				const copy = { ...(post as Post) };
				copy.label = data.label;
				setPost(copy);
			});
	};

	useEffect(() => {
		axios(`/api/feedback/post/get/${id}`)
			.then(({ data }) => {
				setPost(data.post);
			})
			.catch((e) => {
				router.push("/feedback");
			});
	}, []);

	useEffect(() => {
		loadComments();
	}, [from]);

	useEffect(() => {
		setReply("");
	}, [replyingTo]);

	return (
		<Container title="Feedback" user={user}>
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
						<div className="flex flex-col xl:flex-row justify-start xl:justify-between space-y-8 xl:space-y-0">
							<div
								className={clsx(
									"flex flex-col",
									post ? "-space-y-1" : "space-y-2"
								)}
							>
								<div className="text-3xl mb-3 break-all font-bold font-montserrat text-dank-300 dark:text-white">
									{post?.title || (
										<div className="animate-pulse bg-gray-800 dark:bg-gray-300 rounded h-6 w-32" />
									)}
								</div>
								{post && (
									<div className="text-light-600 cursor-pointer">
										by&nbsp;
										<Link
											href={`/profile/${post.author.id}`}
										>
											<a className="hover:underline hover:text-dark-100 dark:hover:text-light-400">
												{post.author.username}#
												{post.author.discriminator}
											</a>
										</Link>{" "}
										<Tooltip
											content={format(
												post.createdAt,
												"MMMM dd, yyyy"
											)}
										>
											<span className="cursor-default">
												{formatDistance(
													new Date(post.createdAt),
													new Date(),
													{ addSuffix: true }
												)}
											</span>
										</Tooltip>
									</div>
								)}
								{!post && (
									<div className="animate-pulse bg-gray-900 rounded h-3 w-64" />
								)}
								<div className="flex space-x-2 pt-2">
									{post?.label && (
										<FeedbackLabel type={post.label} />
									)}
									{post?.developerResponse && (
										<FeedbackLabel type="developer" />
									)}
								</div>
							</div>

							<div className="flex space-x-4 items-center">
								{user && post && user.isModerator && (
									<Dropdown
										content={
											<div className="flex justify-between w-full px-4 text-dark-100 dark:text-white">
												<span>Label</span>
												<span className="material-icons">
													expand_more
												</span>
											</div>
										}
										variant="big"
									>
										<div className="rounded-md mt-2 bg-light-500 dark:bg-dark-100 text-dark-100 dark:text-white">
											{FEEDBACK_LABELS.filter(
												(f) => !f.includes("all")
											)
												.concat("no label")
												.map((label) => (
													<div
														className={clsx(
															"cursor-pointer py-1 px-2 hover:bg-light-200 dark:hover:bg-dark-200"
														)}
														onClick={() => {
															changeLabel(
																label as Post["label"]
															);
														}}
													>
														{label
															.charAt(0)
															.toUpperCase() +
															label
																.substr(1)
																.toLowerCase()}
													</div>
												))}
										</div>
									</Dropdown>
								)}

								{user &&
									post &&
									(user.id === post.author.id ||
										user.isModerator) && (
										<Tooltip content="Delete this post">
											<div
												className="p-2 flex items-center rounded-md bg-red-500 hover:bg-red-700 cursor-pointer"
												onClick={() => deletePost()}
											>
												<span className="material-icons">
													delete
												</span>
											</div>
										</Tooltip>
									)}
								{post && (
									<FeedbackUpvote
										id={post?._id || ""}
										upvotes={post?.upvotes || 0}
										upvoted={post?.upvoted || false}
									/>
								)}
							</div>
						</div>
					</div>
					<div>
						{post && (
							<div className="text-dank-400 dark:text-light-300 whitespace-pre-line">
								{urlify(post.description)}
							</div>
						)}
						{!post && (
							<div className="flex flex-col space-y-1">
								<div className="animate-pulse bg-gray-300 rounded h-3 w-64" />
								<div className="animate-pulse bg-gray-300 rounded h-3 w-32" />
								<div className="animate-pulse bg-gray-300 rounded h-3 w-96" />
							</div>
						)}
					</div>
					<div className="flex flex-col space-y-2">
						<div>
							<div className="font-bold text-xl font-montserrat text-dank-300 dark:text-white">
								Comments ({post?.comments || "?"})
							</div>
							<div className="text-gray-400 text-sm">
								{user ? (
									`You're signed in as, ${user.username}#${user.discriminator}. Ensure this is the account you want to appear as the comment author.`
								) : (
									<span className="text-red-400">
										You need to be signed in to post a
										comment!
									</span>
								)}
							</div>
						</div>
						<textarea
							className="w-full bg-light-500 dark:bg-dark-400 drop-shadow-xl dark:drop-shadow-none p-3 outline-none text-black dark:text-light-300 text-sm resize-none h-24 rounded-md placeholder-gray-500"
							maxLength={1024}
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							placeholder={"..."}
						/>
						<div className="flex justify-end">
							<Button
								size="medium"
								className="text-white bg-dank-300 hover:bg-opacity-75"
								disabled={
									comment.length < 5 || comment.length > 1024
								}
								onClick={() => {
									if (
										comment.length >= 5 &&
										comment.length <= 1024
									) {
										postComment();
									}
								}}
							>
								Submit
							</Button>
						</div>
					</div>
					<div className="flex flex-col space-y-4">
						{comments.map((comment) => (
							<div>
								<FeedbackComment
									id={comment._id}
									author={comment.author}
									createdAt={comment.createdAt}
									type="COMMENT"
									content={comment.comment}
									setReplyingTo={setReplyingTo}
									user={user}
									deleted={comment.deleted}
									key={comment._id}
									pinned={comment.pinned}
								/>
								{comment.replies.length > 0 && (
									<div className="ml-8">
										{comment.replies.map((reply) => (
											<div
												className={clsx(
													"flex justify-between items-center rounded-md"
												)}
											>
												<FeedbackComment
													id={reply._id}
													author={reply.author}
													createdAt={reply.createdAt}
													type="REPLY"
													content={reply.reply}
													user={user}
													key={reply._id}
												/>
											</div>
										))}
									</div>
								)}

								{replyingTo === comment._id && (
									<div className="ml-8 p-4 flex space-x-4 rounded-md">
										<textarea
											className="w-full bg-gray-200 dark:bg-dank-500 p-3 outline-none text-sm resize-none h-10 overflow-hidden rounded-md placeholder-gray-500"
											maxLength={1024}
											onChange={(e) =>
												setReply(e.target.value)
											}
											value={reply}
											placeholder={`Replying to ${comment.author.username}`}
										/>
										<Button
											size="medium"
											className="bg-gray-200 hover:bg-gray-300 dark:bg-dank-500 dark:hover:bg-dark-100 text-dark-400 dark:text-white"
											disabled={
												reply.length < 5 ||
												reply.length > 200
											}
											onClick={() => {
												if (
													reply.length >= 5 &&
													reply.length <= 200
												) {
													postReply();
												}
											}}
										>
											Reply
										</Button>
									</div>
								)}
							</div>
						))}
					</div>
					{!all && (
						<div className="w-full">
							<Button
								block
								className="bg-light-400 text-dark-300 dark:bg-dark-400 dark:text-white"
								onClick={loadNewComments}
							>
								Load More
							</Button>
						</div>
					)}
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
