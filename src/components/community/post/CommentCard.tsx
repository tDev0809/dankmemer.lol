import { Comment, Reply, User, UserData } from "../../../types";
import { Avatar } from "../../Avatar";
import Link from "next/link";
import { Badge } from "../../Badge";
import clsx from "clsx";
import Button from "../../ui/Button";
import { urlify } from "../../../util/feedback";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { randomAvatar } from "../../../util/random";

interface Props {
	data: Comment | Reply;
	reply?: boolean;
	user?: User;
	setReplyingTo?: Dispatch<SetStateAction<string>>;
}

export default function CommentCard({
	data,
	reply,
	user,
	setReplyingTo,
}: Props) {
	const [comment, setComment] = useState(data);

	const pinComment = async () => {
		const r = await axios.post(`/api/community/comment/pin/${comment._id}`);
		const copy = { ...comment };
		(copy as Comment).pinned = r.data.pinned;
		setComment(copy);
	};

	const deleteComment = async () => {
		if (
			!confirm(
				"Are you sure you want to remove this comment? This will delete it from the post, like it did ever exist 😭"
			)
		)
			return;
		await axios.delete(
			`/api/community/${reply ? "reply" : "comment"}/delete/${
				comment._id
			}`
		);
		const copy = { ...comment };
		(copy.author as UserData).id = "#";
		(copy.author as UserData).discriminator = "0000";
		(copy.author as UserData).name = "[deleted]";
		(copy.author as UserData).avatar = randomAvatar("0");
		copy.content = "[deleted]";
		setComment(copy);
	};

	return (
		<div
			className={clsx(
				"flex flex-col md:flex-row items-start md:items-center justify-between group",
				reply && "ml-4"
			)}
		>
			<div>
				<div className="flex space-x-2 items-center">
					<div>
						<Link
							href={
								(comment.author as UserData).id == "#"
									? "#"
									: `/community/profile/${
											(comment.author as UserData).id
									  }`
							}
						>
							<a className="flex space-x-1 items-center">
								<Avatar
									id={(comment.author as UserData).id}
									link={(comment.author as UserData).avatar}
									size="16px"
								/>
								<a className="hover:underline hover:text-dark-100 dark:hover:text-light-400">
									{(comment.author as UserData).name}#
									{(comment.author as UserData).discriminator}
								</a>
								<div className="flex">
									{(comment.author as UserData).developer && (
										<Badge
											role="developer"
											size={16}
											tooltip={false}
										/>
									)}
									{(comment.author as UserData).moderator && (
										<Badge
											role="moderator"
											size={16}
											tooltip={false}
										/>
									)}
									{(comment.author as UserData)
										.botModerator && (
										<Badge
											role="botModerator"
											size={16}
											tooltip={false}
										/>
									)}
									{(comment.author as UserData)
										.modManager && (
										<Badge
											role="modManager"
											size={16}
											tooltip={false}
										/>
									)}
								</div>
							</a>
						</Link>
					</div>
					{(comment as Comment).pinned && (
						<div
							className="material-icons"
							style={{ fontSize: "16px" }}
						>
							push_pin
						</div>
					)}
				</div>
				<div className="text-light-600">{urlify(comment.content)}</div>
			</div>
			<div className="hidden space-x-2 items-center group-hover:flex">
				{!reply && (
					<>
						{user?.developer && (
							<Button
								variant="dark"
								size="small"
								onClick={() => pinComment()}
							>
								<span
									className="material-icons"
									style={{ fontSize: "20px" }}
								>
									push_pin
								</span>
							</Button>
						)}
						<Button variant="dark" size="small">
							<span
								className="material-icons"
								style={{ fontSize: "20px" }}
								onClick={() => setReplyingTo?.(comment._id)}
							>
								reply
							</span>
						</Button>
					</>
				)}
				{(user?.developer ||
					user?.id == (comment.author as UserData).id) && (
					<Button
						variant="dark"
						size="small"
						onClick={() => deleteComment()}
					>
						<span
							className="material-icons text-rose-500"
							style={{ fontSize: "20px" }}
						>
							delete
						</span>
					</Button>
				)}
			</div>
		</div>
	);
}
