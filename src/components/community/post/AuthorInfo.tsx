import { Post, UserData } from "../../../types";
import Link from "next/link";
import { Avatar } from "../../Avatar";
import { sanitizeCategory } from "../../../util/feedback";
import { format, formatDistance } from "date-fns";
import Tooltip from "../../ui/Tooltip";

interface AuthorProps {
	post: Post;
}

export default function AuthorInfo({ post }: AuthorProps) {
	return (
		<div className="text-light-600 cursor-pointer flex space-x-1 items-center">
			by&nbsp;
			<Link href={`/community/profile/${(post.author as UserData).id}`}>
				<a className="flex space-x-1 items-center">
					<Avatar
						id={(post.author as UserData).id}
						link={(post.author as UserData).avatar}
						size="16px"
					/>
					<a className="hover:underline hover:text-dark-100 dark:hover:text-light-400">
						{(post.author as UserData).name}#
						{(post.author as UserData).discriminator}
					</a>
				</a>
			</Link>
			<span>in</span>
			<Link href={`/community/posts/${post.category}`}>
				<a className="hover:underline hover:text-dark-100 dark:hover:text-light-400">
					{sanitizeCategory(post.category)}
				</a>
			</Link>
			,{" "}
			<Tooltip content={format(post.createdAt, "MMMM dd, yyyy")}>
				<span className="cursor-default">
					{formatDistance(new Date(post.createdAt), new Date(), {
						addSuffix: true,
					})}
				</span>
			</Tooltip>
		</div>
	);
}
