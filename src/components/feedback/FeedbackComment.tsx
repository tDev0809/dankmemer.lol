import axios from "axios";
import clsx from "clsx";
import { formatDistance } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { CommentAuthor, User } from "../../types";
import { urlify } from "../../util/feedback";

const commentType = {
	COMMENT: 0,
	REPLY: 1,
};

interface CommentActionProps {
	icon: string;
	onClick?: () => void;
}

function CommentAction({ icon, onClick }: CommentActionProps) {
	return (
		<div
			className="bg-dank-600 hover:bg-dank-500 p-2 rounded-md select-none cursor-pointer hidden group-hover:flex items-center"
			onClick={onClick}
			key={icon}
		>
			<span className="material-icons">{icon}</span>
		</div>
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
				"flex justify-between items-center p-4 rounded-md bg-dank-800 group w-full"
			)}
		>
			<div className="flex flex-col -space-y-1">
				<div className="flex space-x-2">
					<div
						className={clsx(
							oAuthor.developer
								? "text-blue-500"
								: oAuthor.moderator
								? "text-yellow-600"
								: "text-white"
						)}
					>
						{oAuthor.username}#{oAuthor.discriminator}
					</div>
					<div className="text-gray-400">
						{formatDistance(new Date(createdAt), new Date(), {
							addSuffix: true,
						})}
					</div>
					{oPinned && (
						<span className="material-icons">push_pin</span>
					)}
				</div>
				<div>{urlify(oContent)}</div>
			</div>

			<div className="flex space-x-2">
				{type == "COMMENT" && (
					<>
						{user?.isAdmin && (
							<CommentAction
								icon="push_pin"
								onClick={() => pinComment()}
							/>
						)}
						{!oDeleted && (
							<CommentAction
								icon="reply"
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
							icon="delete"
							onClick={() => deleteComment()}
						/>
					)}
			</div>
		</div>
	);
}
