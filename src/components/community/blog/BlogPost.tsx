import { format } from "date-fns";
import { TIME } from "../../../constants";
import { Blog } from "../../../types";
import Button from "../../ui/Button";
import Link from "next/link";

interface Props {
	data: Blog;
}

export function BlogPost({ data }: Props) {
	return (
		<div className="p-4 bg-dark-100 rounded-md h-72 w-60">
			<div className="flex flex-col justify-between h-full">
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col">
						<div className="flex items-center text-2xl font-montserrat font-bold">
							<div>{data.title}</div>
							{Date.now() - data.date < TIME.week * 2 && (
								<div className="bg-red-500 ml-2 px-2 py-0.5 text-xs rounded-full text-white">
									NEW
								</div>
							)}
						</div>
						<div className="text-light-600 text-sm">
							Written by{" "}
							<Link href={`/community/profile/${data.author}`}>
								<a className="hover:underline">
									{data.authorName || "???"}
								</a>
							</Link>
							<br /> On {format(data.date, "MMMM dd, yyyy")}
						</div>
					</div>
					<div className="text-sm">{data.description}</div>
				</div>
				<Button
					variant="dark"
					// onClick={() => router.push(`/community/updates/${id}`)}
				>
					Continue Reading
				</Button>
			</div>
		</div>
	);
}
