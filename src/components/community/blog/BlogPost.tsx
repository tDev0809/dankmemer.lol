import { format } from "date-fns";
import { TIME } from "../../../constants";
import { Blog } from "../../../types";
import Button from "../../ui/Button";
import Link from "next/link";
import { truncate } from "../../../util/string";
import clsx from "clsx";
import { useRouter } from "next/router";

interface Props {
	data: Blog;
}

export function BlogPost({ data }: Props) {
	const router = useRouter();

	return (
		<div className="p-4 bg-dark-100 rounded-md h-72 w-60">
			<div className="flex flex-col justify-between h-full">
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col">
						<div
							className={clsx(
								"flex items-center font-montserrat font-bold",
								data.title.length > 30
									? "text-lg"
									: data.title.length > 20
									? "text-xl"
									: "text-2xl"
							)}
						>
							<div>{data.title}</div>
							{Date.now() - data.date < TIME.week * 2 && (
								<div className="bg-red-500 ml-2 px-2 py-0.5 text-xs rounded-full text-white">
									NEW
								</div>
							)}
						</div>
						<div className="text-light-600 text-sm">
							Written by{" "}
							<Link href={`/community/profile/${data.author.id}`}>
								<a className="hover:underline">
									{data.author.name || "???"}
								</a>
							</Link>
							<br /> On {format(data.date, "MMMM dd, yyyy")}
						</div>
					</div>
					<div className="text-sm">
						{truncate(data.description, 80)}
					</div>
				</div>
				<Button
					variant="dark"
					onClick={() => router.push(`/community/blogs/${data._id}`)}
				>
					Continue Reading
				</Button>
			</div>
		</div>
	);
}
