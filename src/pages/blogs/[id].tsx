import axios from "axios";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BottomCTA from "../../components/BottomCTA";
import LoadingPepe from "../../components/LoadingPepe";
import Container from "../../components/ui/Container";
import { PageProps } from "../../types";
import { tailwindHtml } from "../../util/blog";
import createAd from "../../util/createAd";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function PostPage({ user }: PageProps) {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [date, setDate] = useState(0);
	const [image, setImage] = useState(null);
	const [content, setContent] = useState("");

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		axios(`/api/blog/get/${id}`)
			.then(({ data }) => {
				setTitle(data.name);
				setAuthor(data.author);
				setDate(data.date);
				setContent(data.content);
				setImage(data.image ? data.image : null);
			})
			.catch((e) => {
				router.push("/blogs");
			});
		createAd(
			"nitropay-blog-bottom",
			{
				sizes: [
					[728, 90],
					[970, 90],
					[970, 250],
				],
				renderVisibleOnly: true,
			},
			"desktop"
		);
		createAd(
			"nitropay-blog-bottom",
			{
				sizes: [
					[320, 50],
					[300, 50],
					[300, 250],
				],
				renderVisibleOnly: true,
			},
			"mobile"
		);
	}, []);

	return (
		<Container title="Blog" user={user}>
			<div className="max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-8 lg:mx-auto relative flex justify-center">
				<div className="max-w-5xl flex flex-col items-center space-y-8 my-16">
					{date ? (
						<>
							<div className="flex flex-col items-center space-y-1">
								<div className="text-5xl font-montserrat font-bold text-dark-400 dark:text-white">
									{title}
								</div>
								<div className="flex flex-col items-center -space-y-1">
									<div className="text-gray-400">
										Written by {author}
									</div>
									<div className="text-gray-400">
										Published on{" "}
										{format(date, "MMMM dd, yyyy")}
									</div>
								</div>
							</div>
							{image ? (
								<div>
									<img
										src={image}
										alt={title + "'s image."}
									/>
								</div>
							) : (
								""
							)}
							<div
								className="text-dark-400 dark:text-white"
								dangerouslySetInnerHTML={{
									__html: tailwindHtml(content),
								}}
							/>
							<div
								id="nitropay-blog-bottom"
								className="nitropay"
							/>
							<BottomCTA />
						</>
					) : (
						<LoadingPepe />
					)}
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
