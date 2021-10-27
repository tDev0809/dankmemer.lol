import axios from "axios";
import clsx from "clsx";
import { format, formatDistance } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { CommentAuthor, User } from "../../types";
import { urlify } from "../../util/feedback";
import Tooltip from "../ui/Tooltip";
import Link from "next/link";
import { DeveloperBadge, ModeratorBadge } from "../Badge";

const commentType = {
	COMMENT: 0,
	REPLY: 1,
};

interface CommentActionProps {
	icon: string;
	description: string;
	destructive?: boolean;
	onClick?: () => void;
}

function CommentAction({
	icon,
	description,
	onClick,
	destructive = false,
}: CommentActionProps) {
	return (
		<Tooltip content={description}>
			<div
				className="bg-black bg-opacity-20 dark:bg-white dark:bg-opacity-5 dark:hover:bg-opacity-10 hover:bg-opacity-40 p-1 rounded-md select-none cursor-pointer hidden group-hover:flex items-center"
				onClick={onClick}
				key={icon}
			>
				<span
					className={clsx(
						"material-icons",
						destructive && "text-red-400"
					)}
				>
					{icon}
				</span>
			</div>
		</Tooltip>
	);
}

interface CommentProps {
	id: string;
	author: CommentAuthor;
	createdAt: number;
	content: string;
	user?: User;
	type: keyof typeof commentType;
	deleted?: boolean;
	pinned?: boolean;
	setReplyingTo?: Dispatch<SetStateAction<string>>;
}

export default function Comment({
	id,
	author,
	createdAt,
	content,
	user,
	type,
	pinned = false,
	deleted = false,
	setReplyingTo,
}: CommentProps) {
	const [oAuthor, setAuthor] = useState(author);
	const [oDeleted, setDeleted] = useState(deleted);
	const [oContent, setContent] = useState(content);
	const [oPinned, setPinned] = useState(pinned);

	const pinComment = async () => {
		const r = await axios.post(`/api/feedback/comment/pin/${id}`);
		setPinned(r.data.pinned);
	};

	const deleteComment = async () => {
		if (
			!confirm(
				"Are you sure you want to remove this comment? This will delete it from the post, like it did ever exist 😭"
			)
		)
			return;
		await axios.delete(`/api/feedback/${type.toLowerCase()}/delete/${id}`);
		setAuthor({
			id: "[deleted]",
			discriminator: "0000",
			username: "[deleted]",
			moderator: false,
			developer: false,
		});
		setDeleted(deleted);
		setContent("[deleted]");
	};

	return (
		<div
			className={clsx(
				"flex justify-between items-center p-2 group w-full hover:bg-gray-100 dark:hover:bg-dark-400"
			)}
		>
			<div className="flex flex-col -space-y-1">
				<div className="flex space-x-2">
					<div
						className={clsx(
							oAuthor.developer
								? "text-dank-300"
								: oAuthor.moderator
								? "text-blue-400"
								: "text-dark-400 dark:text-white"
						)}
					>
						<Link href={`/profile/${oAuthor.id}`}>
							<a>
								{oAuthor.username}#{oAuthor.discriminator}
							</a>
						</Link>
					</div>
					{(oAuthor.developer || oAuthor.moderator) && (
						<div className="flex space-x-2">
							{oAuthor.developer ? (
								<DeveloperBadge />
							) : oAuthor.moderator ? (
								<ModeratorBadge />
							) : null}
						</div>
					)}
					<Tooltip content={format(createdAt, "MMMM dd, yyyy")}>
						<p className="text-gray-400 cursor-default">
							{formatDistance(new Date(createdAt), new Date(), {
								addSuffix: true,
							})}
						</p>
					</Tooltip>
					{oPinned && (
						<span className="flex items-center">
							<span
								className="material-icons text-gray-400"
								style={{ fontSize: "16px" }}
							>
								push_pin
							</span>
						</span>
					)}
				</div>
				<p className="text-gray-500 dark:text-gray-300">
					{urlify(oContent)}
				</p>
			</div>

			<div className="flex space-x-2 mr-2">
				{type == "COMMENT" && (
					<>
						{user?.isAdmin && (
							<CommentAction
								icon="push_pin"
								description="Pin"
								onClick={() => pinComment()}
							/>
						)}
						{!oDeleted && (
							<CommentAction
								icon="reply"
								description="Reply"
								onClick={() => setReplyingTo?.(id)}
							/>
						)}
					</>
				)}
				{(user?.isAdmin ||
					user?.isModerator ||
					user?.id === author.id) &&
					!oDeleted && (
						<CommentAction
							destructive
							icon="delete"
							description="Delete"
							onClick={() => deleteComment()}
						/>
					)}
			</div>
		</div>
	);
}
