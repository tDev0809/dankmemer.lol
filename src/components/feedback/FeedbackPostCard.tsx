import clsx from "clsx";
import Link from "next/link";
import { Post, User } from "../../types";
import { randomInArray } from "../../util/random";
import FeedbackLabel from "./FeedbackLabel";
import FeedbackUpvote from "./FeedbackUpvote";

interface Props {
	postData?: Post;
	user?: User;
}

export default function FeedbackPostCard({ postData }: Props) {
	return (
		<Link href={postData ? `/feedback/p/${postData._id}` : "#"} passHref>
			<a
				className={clsx(
					"bg-light-500 dark:bg-dark-100 rounded-md p-4 cursor-pointer",
					"w-full flex",
					"flex-col md:flex-row",
					"justify-start md:justify-between",
					"items-start md:items-center",
					"border border-light-500 dark:border-dark-100 hover:border-dank-300 dark:hover:border-dank-300"
				)}
			>
				<div className="flex flex-col w-full md:w-4/6 xl:w-4/5">
					<div className="flex space-x-2 items-center">
						<div className="text-lg font-montserrat line-clamp-1 font-bold text-dank-500 dark:text-white">
							{postData?.title || (
								<div
									className={clsx(
										"animate-pulse h-5 bg-gray-400 dark:bg-gray-300 rounded",
										randomInArray(["w-32", "w-36", "w-44"])
									)}
								/>
							)}
						</div>
						<div className="space-x-2 hidden md:flex">
							{postData?.label && (
								<FeedbackLabel type={postData.label} />
							)}
							{postData?.developerResponse && (
								<FeedbackLabel type="developer" />
							)}
						</div>
					</div>
					<div className="text-light-600 dark:text-light-300 line-clamp-2">
						{postData?.description || (
							<div
								className={clsx(
									"animate-pulse mt-2 h-4 bg-gray-300 dark:bg-gray-600 rounded",
									randomInArray([
										"w-52",
										"w-60",
										"w-64",
										"w-72",
										"w-96",
									])
								)}
							/>
						)}
					</div>
				</div>
				<div
					className={clsx(
						"flex items-center",
						"space-x-0 md:space-x-4 space-y-2 md:space-y-0",
						"w-full md:w-48"
					)}
				>
					<div className="space-x-2 text-gray-400 hidden md:flex font-montserrat">
						<span className="material-icons-outlined">forum</span>
						<div>{postData?.comments || 0}</div>
					</div>
					<FeedbackUpvote
						id={postData?._id || ""}
						upvotes={postData?.upvotes || 0}
						upvoted={postData?.upvoted || false}
					/>
				</div>
			</a>
		</Link>
	);
}
