import { Post } from "../../types";
import { Avatar } from "../Avatar";
import TextLink from "../ui/TextLink";

interface Props {
	data: Post;
}

export function PostCard({ data }: Props) {
	return (
		<div className="bg-dark-100 rounded-md w-full p-4 flex space-x-4">
			<div className="flex flex-col items-center w-8 text-light-600 text-sm">
				<span className="material-icons">arrow_upward</span>
				<div>{data.upvotes.toLocaleString()}</div>
			</div>
			<div className="flex flex-col space-y-4">
				<div className="font-bold font-montserrat">{data.title}</div>
				<div className="text-light-600 leading-5">{data.content}</div>
				<div className="flex items-center justify-between text-light-600">
					<div className="flex items-center space-x-2">
						<Avatar
							size="20px"
							link="http://example.com"
							id={(~~(Math.random() * 1000)).toString()}
						/>
						<div className=" text-sm">
							Posted by{" "}
							<TextLink
								href={`/community/profile/${data.author}`}
							>
								Badosz
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
							{data.comments.toLocaleString()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
