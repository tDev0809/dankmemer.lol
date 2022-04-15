import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Ad } from "../../../components/Ad";
import AuthorInfo from "../../../components/community/post/AuthorInfo";
import CommentCard from "../../../components/community/post/CommentCard";
import { Label } from "../../../components/community/PostLabel";
import LoadingPepe from "../../../components/LoadingPepe";
import Button from "../../../components/ui/Button";
import Container from "../../../components/ui/Container";
import Dropdown from "../../../components/ui/Dropdown";
import Input from "../../../components/ui/Input";
import { POST_CATEGORIES, POST_LABELS } from "../../../constants";
import { Comment, PageProps, Post, UserData } from "../../../types";
import { sanitizeCategory, urlify } from "../../../util/community";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";

const LOAD_COMMENTS_AMOUNT = 10;

export default function PostPage({ user }: PageProps) {
	const [post, setPost] = useState<Post>();
	const [comment, setComment] = useState("");
	const [reply, setReply] = useState("");
	const [comments, setComments] = useState<Comment[]>([]);
	const [replyingTo, setReplyingTo] = useState("");

	const [from, setFrom] = useState(0);
	const [allComments, setAllComments] = useState(false);

	const router = useRouter();
	const { id } = router.query;

	const upvote = async () => {
		axios
			.patch(`/api/community/post/upvote/${post?._id}`)
			.then(({ data }) => {
				const copy = { ...post };
				copy.upvotes += data.upvote;
				copy.upvoted = data.upvote == 1;
				setPost(copy as Post);
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	const postComment = async () => {
		const res = await fetch("/api/community/comment/new", {
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
				content: comment,
				replies: [],
				createdAt: Date.now(),
				author: {
					id: user.id,
					avatar: user.avatar,
					discriminator: user.discriminator,
					name: user.username,
					developer: user.developer,
					moderator: user.moderator,
					botModerator: user.botModerator,
					honorable: user.honorable,
					modManager: user.modManager,
				},
			});
		}

		setComments([...comments]);
		setComment("");
	};

	const postReply = async () => {
		const res = await fetch("/api/community/reply/new", {
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
				content: reply,
				createdAt: Date.now(),
				author: {
					id: user.id,
					avatar: user.avatar,
					discriminator: user.discriminator,
					name: user.username,
					developer: user.developer,
					moderator: user.moderator,
					botModerator: user.botModerator,
					honorable: user.honorable,
					modManager: user.modManager,
				},
			});
		}
		setComments([...comments]);
		setReplyingTo("");
		setReply("");
	};

	const loadNewComments = async () => {
		setFrom(from + LOAD_COMMENTS_AMOUNT);
	};

	const changeLabel = (label: string) => {
		axios
			.patch(
				`/api/community/post/label/${id}?label=${label.replace(
					"no label",
					""
				)}`
			)
			.then(({ data }) => {
				const copy = { ...(post as Post) };
				copy.labels = data.labels;
				setPost(copy);
			});
	};

	const changeCategory = (category: Post["category"]) => {
		axios
			.patch(`/api/community/post/category/${id}?category=${category}`)
			.then(() => {
				const copy = { ...(post as Post) };
				copy.category = category;
				setPost(copy);
			});
	};

	const deletePost = async () => {
		if (
			!confirm(
				"Are you sure you want to delete this post? You will not be able to get anything back once it is gone."
			)
		)
			return;
		axios.delete(`/api/community/post/delete/${id as string}`);
		window.location.replace(`/community/`);
	};

	useEffect(() => {
		axios(`/api/community/post/get/${id}`)
			.then(({ data }) => {
				setPost(data.post);
			})
			.catch((e) => {
				router.push("/community");
			});
	}, []);

	useEffect(() => {
		axios(
			`/api/community/post/comments/${id}?from=${from}&amount=${LOAD_COMMENTS_AMOUNT}`
		)
			.then(({ data }) => {
				setComments([...comments, ...data.comments]);
				setAllComments(data.all);
			})
			.catch((e) => {
				router.push("/community");
			});
	}, [from]);

	return (
		<Container title="Post" user={user}>
			<div className="my-8 p-4 bg-light-500 dark:bg-dark-100 rounded-md text">
				{post && (
					<div className="flex flex-col space-y-8 w-full">
						<div className="flex flex-col lg:flex-row justify-between items-start space-y-2 lg:space-y-0">
							<div className="flex flex-col space-y-2">
								<div>
									<div className="text-2xl font-bold font-montserrat text-black dark:text-white break-all mr-2">
										{post.title}
									</div>
									<AuthorInfo post={post} />
								</div>
								{post.labels?.length > 0 && (
									<div className="flex space-x-2">
										{post.labels.map((label) => (
											<Label label={label} />
										))}
									</div>
								)}
							</div>
							<div className="flex flex-col lg:flex-row space-x-0 lg:space-x-2 space-y-2 lg:space-y-0 items-center w-full lg:w-auto">
								{user?.moderator && (
									<>
										{" "}
										<Dropdown
											className="w-full lg:w-auto"
											content={
												<Button variant="dark" block>
													Change Label
												</Button>
											}
											options={POST_LABELS.filter(
												(f) => f != "all"
											)
												.concat("no label")
												.map((label) => ({
													label:
														label
															.charAt(0)
															.toUpperCase() +
														label
															.substring(1)
															.toLowerCase(),
													onClick: () => {
														changeLabel(label);
													},
												}))}
										/>
										<Dropdown
											className="w-full lg:w-auto"
											content={
												<Button
													block
													variant="dark"
													className="lg:w-40"
												>
													Move
												</Button>
											}
											options={POST_CATEGORIES.map(
												(category) => ({
													label: sanitizeCategory(
														category
													),
													onClick: () => {
														changeCategory(
															category
														);
													},
												})
											)}
										/>
									</>
								)}
								{(user?.id === (post.author as UserData).id ||
									user?.moderator) && (
									<Button
										variant={"danger"}
										className="w-full lg:w-auto"
										onClick={() => deletePost()}
									>
										Delete
									</Button>
								)}
								<Button
									variant={post.upvoted ? "primary" : "dark"}
									onClick={() => upvote()}
									className="w-full lg:w-auto"
								>
									<div className="flex items-center space-x-1">
										<span
											className="material-icons"
											style={{ fontSize: "20px" }}
										>
											arrow_upward
										</span>
										<div>
											{post.upvotes.toLocaleString()}
										</div>
									</div>
								</Button>
							</div>
						</div>
						<div className="whitespace-pre-line text-black dark:text-white">
							{urlify(post.content)}
						</div>
						<div className="flex flex-col space-y-2 border-t-4 pt-4 border-light-400 dark:border-dark-200">
							<div>
								<div className="text-lg font-bold font-montserrat text-black dark:text-white">
									Comments ({post.comments})
								</div>
								<div className="text-sm text-light-600">
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
							<Input
								variant="medium"
								block
								onChange={(e) => setComment(e.target.value)}
								value={comment}
								placeholder={"..."}
							/>
							<div className="flex justify-end">
								<Button
									variant="primary"
									disabled={
										comment.length < 5 ||
										comment.length > 1024 ||
										!user
									}
									onClick={() => postComment()}
								>
									Submit
								</Button>
							</div>
						</div>
						{comments.length > 0 && (
							<div className="flex flex-col space-y-6 border-t-4 pt-4 border-light-400 dark:border-dark-200">
								{comments.map((comment) => (
									<div>
										<CommentCard
											data={comment}
											setReplyingTo={setReplyingTo}
											user={user}
										/>
										{comment.replies.length > 0 && (
											<div className="border-l-4 border-light-400 dark:border-dark-200 mt-3 flex flex-col space-y-3">
												{comment.replies.map(
													(reply) => (
														<CommentCard
															data={reply}
															reply={true}
															user={user}
														/>
													)
												)}
											</div>
										)}
										{replyingTo === comment._id && (
											<div className="p-4 flex space-x-2 rounded-md">
												<Input
													block
													variant="short"
													onChange={(e) =>
														setReply(e.target.value)
													}
													value={reply}
													placeholder={`Replying to ${
														(
															comment.author as UserData
														).name
													}`}
												/>
												<Button
													size="medium"
													variant="dark"
													disabled={
														reply.length < 5 ||
														reply.length > 200
													}
													onClick={() => {
														postReply();
													}}
												>
													Reply
												</Button>
											</div>
										)}
									</div>
								))}
							</div>
						)}
						{!allComments && (
							<Button
								block
								variant="dark"
								onClick={loadNewComments}
							>
								Load More
							</Button>
						)}
					</div>
				)}
				{!post && <LoadingPepe />}
			</div>
			<Ad
					id="communitypost-bottom-mobile"
					platform="mobile"
					sizes={[
						[320, 50],
						[160, 600],
						[300, 50],
						[300, 250],
					]}
				/>
				<Ad
					id="communitypost-bottom-desktop"
					platform="desktop"
					sizes={[
						[728, 90],
						[970, 90],
						[970, 250],
						[300, 250],
					]}
				/>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
