import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import UpdateBanner from "../../../components/community/UpdateBanner";
import LoadingPepe from "../../../components/LoadingPepe";
import Button from "../../../components/ui/Button";
import Container from "../../../components/ui/Container";
import Input from "../../../components/ui/Input";
import { Banner, PageProps } from "../../../types";
import { developerRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";

export default function BannerEditPage({ user }: PageProps) {
	const [banner, setBanner] = useState<Banner>({
		description: "",
		image: "",
		url: "",
		title: "",
		buttonText: "",
	});

	const router = useRouter();

	const update = (draft = false) => {
		axios({
			url: `/api/community/update/add`,
			method: "POST",
			data: banner,
		})
			.then(() => {
				return router.push(`/community`);
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	return (
		<Container title="Blog Editor" user={user}>
			<div className="flex flex-col my-16 space-y-8">
				{banner ? (
					<div className="flex flex-col space-y-8">
						<div className="flex flex-col space-y-4 bg-light-500 dark:bg-dark-100 p-4 rounded-md">
							<div className="flex flex-col space-y-2">
								<Input
									onChange={(e) => {
										const copy = { ...banner };
										copy.title = e.target.value;
										setBanner(copy);
									}}
									variant="short"
									placeholder="Update Title"
									value={banner.title}
								/>
								<Input
									onChange={(e) => {
										const copy = { ...banner };
										copy.description = e.target.value;
										setBanner(copy);
									}}
									variant="short"
									placeholder="Update Description"
									value={banner.description}
								/>
								<Input
									onChange={(e) => {
										const copy = { ...banner };
										copy.image = e.target.value;
										setBanner(copy);
									}}
									variant="short"
									placeholder="Update Background Image"
									value={banner.image}
								/>
								<Input
									onChange={(e) => {
										const copy = { ...banner };
										copy.buttonText = e.target.value;
										setBanner(copy);
									}}
									variant="short"
									placeholder="Update Button"
									value={banner.buttonText}
								/>
								<Input
									onChange={(e) => {
										const copy = { ...banner };
										copy.url = e.target.value;
										setBanner(copy);
									}}
									variant="short"
									placeholder="Update URL"
									value={banner.url}
								/>
								<div className="flex justify-end">
									<Button
										variant="primary"
										onClick={() => update()}
									>
										Update
									</Button>
								</div>
							</div>
						</div>
						<UpdateBanner
							description={banner.description}
							image={banner.image}
							title={banner.title}
							url={banner.url}
							buttonText={banner.buttonText}
						/>
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
