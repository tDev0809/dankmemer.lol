import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "src/components/ui/Button";
import Dropdown from "src/components/ui/Dropdown";
import Input from "src/components/ui/Input";
import { JOBS_TEAMS } from "src/constants/jobs";
import Container from "../../components/ui/Container";
import GoBack from "../../components/ui/GoBack";
import { PageProps } from "../../types";
import { developerRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function ControlJobsPage({ user }: PageProps) {
	const router = useRouter();

	const [jobTitle, setJobTitle] = useState("");
	const [selectedTeam, setSelectedTeam] = useState("");
	const [jobLocation, setJobLocation] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [jobBody, setJobBody] = useState("");

	const submitJob = async () => {
		try {
			const { data: job } = await axios({
				method: "POST",
				url: "/api/jobs/create",
				data: {
					title: jobTitle,
					team: selectedTeam,
					location: jobLocation,
					description: jobDescription,
					body: jobBody,
				},
			});
			toast.success("Job offer has been posted", {
				theme: "colored",
				position: "top-center",
				onClick: () => {
					router.push(`/jobs/${job._id}`);
				},
			});
		} catch (e) {
			console.error(e);
			toast.error(
				"Error while posting job, check console for more information."
			);
		}
	};

	return (
		<Container title="Control" user={user}>
			<div className="mx-8 xl:mx-0">
				<div className="flex flex-col my-20 space-y-8">
					<div className="flex flex-col space-y-4">
						<GoBack />
					</div>
					<div className="font-bold font-montserrat text-3xl text-dank-300 dark:text-light-100">
						Manage Job Offerings
					</div>
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 space-x-0 lg:space-x-4">
						<div className="w-2/3 min-h-[400px] bg-light-500 dark:bg-dark-400 rounded-lg p-8 flex flex-col">
							<h1 className="font-bold font-montserrat text-xl text-dark-400 dark:text-white">
								Create a Job Offering
							</h1>
							<div className="flex h-10 mt-2">
								<div className="">
									<Input
										label="Job title"
										placeholder="Job title"
										variant="short"
										value={jobTitle}
										onChange={(e) =>
											setJobTitle(e.target.value)
										}
									/>
								</div>
								<div className="ml-3">
									<p className="text-sm text-black dark:text-white mb-1">
										Job's respective team
									</p>
									<Dropdown
										content={
											<div className="flex items-center justify-between w-full p-2">
												<div className="flex items-center space-x-2">
													<div
														className={clsx(
															"text-dark-400 dark:text-gray-500 min-w-[180px] text-sm",
															selectedTeam.length >
																1
																? "dark:!text-neutral-300"
																: ""
														)}
													>
														{selectedTeam ||
															"Respective team for job"}
													</div>
												</div>

												<div className="material-icons text-dark-100 dark:text-gray-500">
													expand_more
												</div>
											</div>
										}
										options={JOBS_TEAMS.map((option) => ({
											onClick: (e) => {
												setSelectedTeam(option);
											},
											label: option,
										}))}
									/>
								</div>
								<div className="ml-3">
									<Input
										label="Job location(s)"
										placeholder="Global, remote"
										variant="short"
										value={jobLocation}
										onChange={(e) =>
											setJobLocation(e.target.value)
										}
									/>
								</div>
							</div>
							<div className="mt-8 mb-4">
								<Input
									label="Description"
									value={jobDescription}
									onChange={(e) =>
										setJobDescription(e.target.value)
									}
									variant="medium"
									placeholder="A short description for the job, this is only shown on the jobs page not the job page itself."
									resizable
									block
								/>
							</div>
							<div className="mt-8 mb-4">
								<Input
									label="Job Body"
									value={jobBody}
									onChange={(e) => setJobBody(e.target.value)}
									variant="medium"
									placeholder="This is the job body. Describe who the role is for, their desired past experience and any required skills they should have. Markdown can be used here (and should be used for titles and lists on the job page)"
									resizable
									block
								/>
							</div>
							<Button
								size="medium"
								className="max-w-max"
								onClick={submitJob}
							>
								Submit
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(developerRoute);
