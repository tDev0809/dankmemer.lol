import clsx from "clsx";
import Link from "next/link";
import { Post, User } from "../../types";
import { randomInArray } from "../../util/random";
import FeedbackLabel from "./FeedbackLabel";

interface Props {
	postData?: Post;
	user?: User;
}

export default function FeedbackPostCard({ postData }: Props) {
	return (
		<Link href={postData ? `/feedback/p/${postData._id}` : "#"}>
			<div
				className={clsx(
					"bg-dank-500 rounded-md p-4 cursor-pointer",
					"w-full flex",
					"flex-col md:flex-row",
					"justify-start md:justify-between",
					"items-start md:items-center",
					"border border-dank-500 hover:border-dank-200 bg-dan"
				)}
			>
				<div className="flex flex-col">
					<div className="flex space-x-2 items-center">
						<div className="text-lg font-montserrat font-bold">
							{postData?.title || (
								<div
									className={clsx(
										"animate-pulse h-5 bg-gray-300 rounded",
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
					<div className="text-gray-400">
						{postData?.description || (
							<div
								className={clsx(
									"animate-pulse mt-2 h-4 bg-gray-600 rounded",
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
						"w-full md:w-auto"
					)}
				>
					<div className="space-x-2 text-gray-400 hidden md:flex font-montserrat">
						<span className="material-icons-outlined">forum</span>
						<div>{postData?.comments || 0}</div>
					</div>
					<div
						className={clsx(
							"flex space-x-1 justify-center text-white font-montserrat",
							"px-8 py-2 md:py-4",
							"bg-dank-400 rounded-md",
							"flex-1 md:flex-initial"
						)}
					>
						<span className="material-icons-outlined">
							expand_less
						</span>
						<div>{postData?.upvotes || 0}</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
