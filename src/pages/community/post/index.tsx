import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
import Container from "../../../components/ui/Container";
import Input from "../../../components/ui/Input";
import {
	POST_CATEGORIES,
	POST_CATEGORIES_DESCRIPTIONS,
} from "../../../constants";
import { PageProps } from "../../../types";
import { sanitizeCategory } from "../../../util/feedback";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";

export default function NewPostPage({ user }: PageProps) {
	const [category, setCategory] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const router = useRouter();

	const submit = async () => {
		const res = await fetch("/api/community/post/new", {
			credentials: "same-origin",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				category,
				title,
				content,
			}),
		});

		if (res.status !== 200) {
			toast.dark((await res.json()).error);
			return;
		}

		router.push(`/community/post/${(await res.json()).id}`);
	};

	return (
		<Container title="New Post" user={user}>
			<div className="my-8 p-4 bg-dark-100 rounded-md flex flex-col space-y-4">
				<div className="text-2xl font-bold font-montserrat">
					New Post
				</div>
				<div>
					{POST_CATEGORIES.map((fcategory) => (
						<label
							key={fcategory}
							htmlFor={"category-" + category}
							onClick={() => setCategory(fcategory)}
							className="flex items-center space-x-6"
						>
							<span
								className={clsx(
									"absolute rounded-full h-4 w-4",
									category === fcategory
										? "bg-dank-300"
										: "bg-gray-400 dark:bg-dank-400"
								)}
							/>
							<span>
								{sanitizeCategory(fcategory)}{" "}
								<span className="text-sm text-light-600">
									- {POST_CATEGORIES_DESCRIPTIONS[fcategory]}
								</span>
							</span>
						</label>
					))}
				</div>
				<div>
					<div className="font-montserrat">Post Title</div>
					<Input
						variant="short"
						block
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						placeholder={"Give me infinite money"}
					/>
				</div>
				<div>
					<div className="font-montserrat">Post Content</div>
					<Input
						variant="medium"
						block
						onChange={(e) => setContent(e.target.value)}
						value={content}
						placeholder={
							"This would benefit me and nobody else. It would allow a sole user to control the economy!"
						}
					/>
				</div>
				<div className="flex justify-end">
					<Button
						variant="primary"
						disabled={
							!(
								title.length >= 3 &&
								title.length <= 100 &&
								content.length >= 20 &&
								content.length <= 2000 &&
								category.length > 0
							)
						}
						onClick={() => submit()}
					>
						Submit
					</Button>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
