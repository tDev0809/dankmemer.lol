import axios from "axios";
import MarkdownIt from "markdown-it";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingPepe from "../../../components/LoadingPepe";
import { Ad } from "../../../components/Ad";
import Container from "../../../components/ui/Container";
import { PageProps, Tutorial } from "../../../types";
import { tailwindHtml } from "../../../util/blog";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";

export default function TutorialPage({ user }: PageProps) {
	const [tutorial, setTutorial] = useState<Tutorial>();

	const router = useRouter();
	const mdParser = new MarkdownIt();
	const { id } = router.query;

	useEffect(() => {
		axios(`/api/tutorials/get/${id}`)
			.then(({ data }) => {
				setTutorial(data);
			})
			.catch(() => {
				router.push("/tutorials");
			});
	}, []);

	return (
		<Container title="Tutorial" user={user}>
			<div className="relative flex justify-center">
				<div className="my-16 flex max-w-5xl flex-col items-center space-y-8">
					{tutorial ? (
						<>
							<div className="flex flex-col items-center space-y-1">
								<div className="text-center font-montserrat text-5xl font-bold text-dark-400 dark:text-white">
									{tutorial.title}
								</div>
							</div>
							<div
								className="max-w-[80vw] text-justify text-dark-400 dark:text-white"
								dangerouslySetInnerHTML={{
									__html: tailwindHtml(
										mdParser.render(tutorial.content)
									),
								}}
							/>
						</>
					) : (
						<LoadingPepe />
					)}
					<Ad
					id="tutorialpost-bottom-mobile"
					platform="mobile"
					sizes={[
						[320, 50],
						[160, 600],
						[300, 50],
						[300, 250],
					]}
				/>
				<Ad
					id="tutorialpost-bottom-desktop"
					platform="desktop"
					sizes={[
						[728, 90],
						[970, 90],
						[970, 250],
						[300, 250],
					]}
				/>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
