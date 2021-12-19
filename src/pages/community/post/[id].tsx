import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthorInfo from "../../../components/community/post/AuthorInfo";
import CommentCard from "../../../components/community/post/CommentCard";
import { Label } from "../../../components/community/PostLabel";
import Button from "../../../components/ui/Button";
import Container from "../../../components/ui/Container";
import Input from "../../../components/ui/Input";
import { Comment, PageProps, Post, UserData } from "../../../types";
import { urlify } from "../../../util/feedback";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";

const LOAD_COMMENTS_AMOUNT = 10;

export default function PostPage({ user }: PageProps) {
	const [post, setPost] = useState<Post>();
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState<Comment[]>([]);

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
				console.log(data);
			})
			.catch((e) => {
				router.push("/community");
			});
	}, [from]);

	return (
		<Container title="Post" user={user}>
			<div className="my-8 p-4 bg-dark-100 rounded-md">
				{post && (
					<div className="flex flex-col space-y-8 w-full">
						<div className="flex justify-between items-start">
							<div className="flex flex-col space-y-2">
								<div>
									<div className="text-2xl font-bold font-montserrat">
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
							<div className="flex space-x-2 items-center">
								{user?.id === (post.author as UserData).id ||
									(user?.moderator && (
										<Button variant={"danger"}>
											Delete
										</Button>
									))}
								<Button
									variant={post.upvoted ? "primary" : "dark"}
									onClick={() => upvote()}
								>
									<span
										className="material-icons"
										style={{ fontSize: "20px" }}
									>
										arrow_upward
									</span>
								</Button>
							</div>
						</div>
						<div className="whitespace-pre-line">
							{urlify(post.content)}
						</div>
						<div className="flex flex-col space-y-2 border-t-4 pt-4 border-dark-200">
							<div>
								<div className="text-lg font-bold font-montserrat">
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
								<Button variant="primary" onClick={() => {}}>
									Submit
								</Button>
							</div>
						</div>
						<div className="flex flex-col space-y-6 border-t-4 pt-4 border-dark-200">
							{comments.map((comment) => (
								<CommentCard comment={comment} />
							))}
						</div>
					</div>
				)}
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
