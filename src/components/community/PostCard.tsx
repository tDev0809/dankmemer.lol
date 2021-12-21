import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { Post, UserData } from "../../types";
import { truncate } from "../../util/string";
import { Avatar } from "../Avatar";
import TextLink from "../ui/TextLink";
import Link from "next/link";
import { Label } from "./PostLabel";

interface Props {
	data?: Post;
}

export function PostCard({ data }: Props) {
	const [upvotes, setUpvotes] = useState(data?.upvotes || 0);
	const [upvoted, setUpvoted] = useState(data?.upvoted || false);

	const upvote = async () => {
		axios
			.patch(`/api/community/post/upvote/${data?._id}`)
			.then(({ data }) => {
				setUpvotes(upvotes + data.upvote);
				setUpvoted(data.upvote == 1);
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	return (
		<Link href={data ? `/community/post/${data?._id}` : "#"}>
			<a
				className="bg-dark-100 rounded-md w-full p-4 flex space-x-4 cursor-pointer"
				key={data?._id}
			>
				<div
					className={clsx(
						"flex flex-col items-center w-8 text-sm cursor-pointer select-none",
						upvoted ? "text-dank-300" : "text-light-600 "
					)}
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						upvote();
					}}
				>
					<span className="material-icons">arrow_upward</span>
					<div>{upvotes.toLocaleString()}</div>
				</div>
				<div className="flex flex-col justify-between space-y-4 relative w-full">
					<div className="flex flex-col space-y-1">
						<div className="font-bold font-montserrat">
							{data?.title ?? (
								<div
									className={clsx(
										"animate-pulse h-5 bg-gray-400 dark:bg-gray-300 rounded w-72"
									)}
								/>
							)}
						</div>
						{data && data.labels?.length > 0 && (
							<div className="flex space-x-2">
								{data.labels.map((label) => (
									<Label label={label} />
								))}
							</div>
						)}
						<div className="text-light-600 leading-5 break-all  md:break-words">
							{data ? (
								truncate(data.content, 250)
							) : (
								<div>
									{[...Array(3)].map((_) => (
										<div
											className={clsx(
												"animate-pulse h-5 bg-gray-300 dark:bg-gray-600 rounded mt-2 max-w-full"
											)}
										/>
									))}
								</div>
							)}
						</div>
					</div>
					<div className="flex items-center justify-between text-light-600">
						<div className="flex items-center space-x-2">
							{data ? (
								<Avatar
									size="20px"
									link={(data.author as UserData).avatar}
									id={(data.author as UserData).id}
								/>
							) : (
								<div className="animate-pulse bg-gray-600 rounded-full w-[20px] h-[20px]" />
							)}
							<div className="text-sm">
								<span className="hidden md:inline-block">
									Posted by{" "}
								</span>
								<TextLink
									href={
										data
											? `/community/profile/${
													(data?.author as UserData)
														.id
											  }`
											: "#"
									}
								>
									{(data?.author as UserData)?.name || "???"}
								</TextLink>
							</div>
						</div>
						<div className="flex space-x-2 items-center">
							<span
								className="material-icons-outlined"
								style={{ fontSize: "14px" }}
							>
								chat_bubble_outline
							</span>
							<div className="text-sm">
								{data?.comments.toLocaleString() ?? 0}
							</div>
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
}
