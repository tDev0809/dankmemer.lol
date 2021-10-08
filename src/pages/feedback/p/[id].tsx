import { GetServerSideProps } from "next";
import Container from "../../../components/ui/Container";
import { Comment, PageProps, Post } from "../../../types";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import axios from "axios";
import clsx from "clsx";
import Button from "../../../components/ui/Button";
import FeedbackComment from "../../../components/feedback/FeedbackComment";
import { urlify } from "../../../util/feedback";
import FeedbackLabel from "../../../components/feedback/FeedbackLabel";
import { toast } from "react-toastify";

const LOAD_COMMENTS_AMOUNT = 10;

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
		).then(({ data }) => {
			setComments([...comments, ...data.comments]);
			setAll(data.all);
		});
	};

	// TODO: delete replies on post deletion
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

		comment!.replies.push({
			reply: reply,
			createdAt: Date.now(),
			author: {
				// TODO: remove hack
				...user,
				developer: user?.isAdmin,
				moderator: user?.isModerator,
			},
		});

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
					discriminator: user?.discriminator,
					username: user?.username,
					developer: user?.isAdmin,
					moderator: user?.isModerator,
				},
			});
		}

		setComments([...comments]);
		setComment("");
	};

	useEffect(() => {
		axios(`/api/feedback/post/${id}`).then(({ data }) => {
			setPost(data.post);
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
			<div className="max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-8 lg:mx-auto relative">
				<div className="flex flex-col my-20 space-y-8">
					<div className="flex flex-col space-y-4">
						<div
							className="flex space-x-2 cursor-pointer text-sm items-center"
							onClick={() => router.back()}
						>
							<span className="material-icons">arrow_back</span>
							<div>Go Back</div>
						</div>
						<div className="flex justify-between">
							<div
								className={clsx(
									"flex flex-col",
									post ? "-space-y-1" : "space-y-2"
								)}
							>
								<div className="text-3xl font-bold font-montserrat">
									{post?.title || (
										<div className="animate-pulse bg-gray-300 rounded h-6 w-32" />
									)}
								</div>
								{post && (
									<div className="text-gray-400">
										by {post.author.username}#
										{post.author.discriminator}{" "}
										{formatDistance(
											new Date(post.createdAt),
											new Date(),
											{ addSuffix: true }
										)}
									</div>
								)}
								{!post && (
									<div className="animate-pulse bg-gray-300 rounded h-3 w-64" />
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

							<div>
								<div
									className={clsx(
										"flex space-x-1 justify-center font-montserrat cursor-pointer",
										"px-8 py-4",
										"text-white bg-dank-400 rounded-md"
									)}
								>
									<span className="material-icons-outlined">
										expand_less
									</span>
									<div>{post?.upvotes || 0}</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						{post && (
							<div className="text-gray-300 whitespace-pre-line">
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
							<div className="font-bold text-xl font-montserrat">
								Comments ({post?.comments || "?"})
							</div>
							<div className="text-gray-400 text-sm">
								{user
									? `You're signed in as, ${user.username}#${user.discriminator}. Ensure this is the account you want to appear as the comment author.`
									: "You are not signed in. Do it to post a comment."}
							</div>
						</div>
						<textarea
							className="w-full bg-dank-400 p-3 outline-none text-sm resize-none h-24 rounded-md placeholder-gray-500"
							maxLength={1024}
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							placeholder={"..."}
						/>
						<div className="flex justify-end">
							<Button
								size="medium"
								className="bg-dank-400 hover:bg-dank-500"
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

								{/* Replies */}
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
									<div className="ml-8 bg-dank-800 p-4 flex space-x-4 rounded-md">
										<textarea
											className="w-full bg-dank-400 p-3 outline-none text-sm resize-none h-10 overflow-hidden rounded-md placeholder-gray-500"
											maxLength={1024}
											onChange={(e) =>
												setReply(e.target.value)
											}
											value={reply}
											placeholder={`Replying to ${comment.author.username}`}
										/>
										<Button
											size="medium"
											className="bg-dank-400 hover:bg-dank-500"
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
				</div>
			</div>
		</Container>
	);
}
// TODO: load more comments
export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);