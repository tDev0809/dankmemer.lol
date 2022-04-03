import axios from "axios";
import MarkdownIt from "markdown-it";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingPepe from "../../../components/LoadingPepe";
import Button from "../../../components/ui/Button";
import Container from "../../../components/ui/Container";
import Input from "../../../components/ui/Input";
import { PageProps, Tutorial } from "../../../types";
import { tailwindHtml } from "../../../util/blog";
import { developerRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";

export default function TutorialEditPage({ user }: PageProps) {
	const [tutorial, setTutorial] = useState<Tutorial>();
	const [preview, setPreview] = useState(false);

	const router = useRouter();
	const { id } = router.query;
	const mdParser = new MarkdownIt();

	useEffect(() => {
		if (id == "new") {
			setTutorial({
				_id: "",
				title: "",
				content: "",
				date: Date.now(),
			});
		} else {
			axios(`/api/tutorials/get/${id}`)
				.then(({ data }) => {
					setTutorial(data);
				})
				.catch(() => {
					router.push("/tutorials");
				});
		}
	}, []);

	const publish = () => {
		if (
			!confirm(
				"You are about to publish this tutorial. Once you publish it you will be redirected to the tutorial page.\n\n Do you wish to continue?"
			)
		)
			return;

		axios({
			url: `/api/tutorials/publish/${id}`,
			method: "POST",
			data: tutorial,
		})
			.then(() => {
				return router.push(`/tutorial/${tutorial!._id}`);
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	const deleteTutorial = () => {
		if (
			!confirm(
				"You are about to delete this tutorial forever. This action cannot be reversed.\n\nDo you wish to continue?"
			)
		) {
			return;
		}
		axios(`/api/tutorials/delete/${id}`)
			.then(() => {
				return window.location.reload();
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	return (
		<Container title="Tutorial Editor" user={user}>
			<div className="my-16 flex flex-col space-y-8">
				{tutorial ? (
					<div className="flex flex-col space-y-4 rounded-md bg-light-500 p-4 dark:bg-dark-100">
						<div className="flex flex-col space-y-2">
							<Input
								onChange={(e) => {
									const copy = { ...tutorial };
									copy.title = e.target.value;
									setTutorial(copy);
								}}
								label={"Tutorial Tile"}
								variant="short"
								placeholder="..."
								value={tutorial.title}
							/>
							<div className="flex w-full items-end space-x-4">
								<div className="w-full">
									<Input
										onChange={(e) => {
											const copy = { ...tutorial };
											copy._id = e.target.value;
											setTutorial(copy);
										}}
										variant="short"
										label="Tutorial ID"
										placeholder="..."
										value={tutorial._id}
									/>
								</div>
								<Button
									className="h-10"
									variant="dark"
									size="medium"
									onClick={() => {
										const copy = { ...tutorial };
										copy._id = tutorial.title
											.toLowerCase()
											.replace(/ /g, "-")
											.replace(/[^a-zA-Z0-9 -]/, "");
										setTutorial(copy);
									}}
								>
									Generate
								</Button>
							</div>
						</div>

						{preview ? (
							<div
								className="rounded-md bg-dank-600 p-4 text-dark-400 dark:text-white"
								dangerouslySetInnerHTML={{
									__html: tailwindHtml(
										mdParser.render(tutorial.content)
									),
								}}
							/>
						) : (
							<Input
								label="Tutorial Content"
								onChange={(e) => {
									const copy = { ...tutorial };
									copy.content = e.target.value;
									setTutorial(copy);
								}}
								scrollable
								resizable
								variant="long"
								placeholder="..."
								value={tutorial.content}
							/>
						)}
						<div className="flex justify-between">
							<div className="w-40">
								<Button
									variant="dark"
									onClick={() => setPreview(!preview)}
									block
								>
									{preview ? "Edit " : "Preview"}
								</Button>
							</div>
							<div className="flex space-x-2">
								<Button
									variant="primary"
									onClick={() => publish()}
								>
									Publish
								</Button>
								<Button
									variant="danger"
									onClick={() => deleteTutorial()}
								>
									Delete
								</Button>
							</div>
						</div>
					</div>
				) : (
					<LoadingPepe />
				)}
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(developerRoute);
