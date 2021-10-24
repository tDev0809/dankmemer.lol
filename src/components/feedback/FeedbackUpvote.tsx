import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
	upvotes: number;
	upvoted: boolean;
	id: string;
}

export default function FeedbackUpvote({ upvotes, upvoted, id }: Props) {
	const [oUpvotes, setUpvotes] = useState(upvotes);
	const [oUpvoted, setUpvoted] = useState(upvoted);

	const upvote = async () => {
		axios
			.patch(`/api/feedback/post/upvote/${id}`)
			.then(({ data }) => {
				setUpvotes(oUpvotes + data.upvote);
				setUpvoted(data.upvote == 1);
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	return (
		<div
			className={clsx(
				"flex space-x-1 justify-center cursor-pointer",
				"flex-1",
				"px-8 py-2 md:py-4 rounded-md",
				"text-white  hover:bg-dank-300 dark:hover:bg-dank-300 rounded-md",
				"transition duration-150 ease-in-out",
				oUpvoted ? "bg-dank-300" : "bg-dank-100 dark:bg-dank-500"
			)}
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				upvote();
			}}
		>
			<span className="material-icons-outlined">expand_less</span>
			<div>{oUpvotes}</div>
		</div>
	);
}
