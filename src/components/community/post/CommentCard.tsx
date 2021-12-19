import { Comment, UserData } from "../../../types";
import { Avatar } from "../../Avatar";
import Link from "next/link";

interface Props {
	comment: Comment;
}

export default function CommentCard({ comment }: Props) {
	return (
		<div>
			<div>
				<div>
					{" "}
					<Link
						href={`/community/profile/${
							(comment.author as UserData).id
						}`}
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
						</a>
					</Link>
				</div>
				<div></div>
			</div>
			<div className="text-light-600">{comment.content}</div>
		</div>
	);
}
