import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Title } from "src/components/Title";
import Button from "src/components/ui/Button";
import Dropdown from "src/components/ui/Dropdown";
import Input from "src/components/ui/Input";
import Tooltip from "src/components/ui/Tooltip";
import { JOBS_TEAMS } from "src/constants/jobs";
import Container from "../../components/ui/Container";
import GoBack from "../../components/ui/GoBack";
import { PageProps } from "../../types";
import { developerRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

interface Job {
	_id: string;
	title: string;
	description: string;
	body: string;
	team: string;
	location: string;
	createdAt: number;
	active: boolean;
	applicants?: string[];
	alreadyApplied?: boolean;
	requiresResume?: boolean;
	webhook?: string;
}

export default function ControlJobsPage({ user }: PageProps) {
	const router = useRouter();

	const [isEditing, setIsEditing] = useState(false);
	const [jobToEdit, setJobToEdit] = useState<Job | null>(null);

	const [currentJobs, setCurrentJobs] = useState([]);

	const [jobTitle, setJobTitle] = useState("");
	const [selectedTeam, setSelectedTeam] = useState("");
	const [jobLocation, setJobLocation] = useState("");
	const [jobRequiresResume, setJobRequiresResume] = useState<boolean | null>(
		null
	);
	const [jobCustomWH, setJobCustomWH] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [jobBody, setJobBody] = useState("");
	const { edit } = router.query;

	useEffect(() => {
		axios(`/api/jobs/list?active=any`)
			.then(({ data }) => {
				setCurrentJobs(data);
				if (edit) {
					const job = data.filter((j: Job) => j._id === edit);
					if (job) {
						editJob(job[0]);
						window.history.pushState(
							null,
							"",
							window.location.href.split("?")[0]
						);
					}
				}
			})
			.catch((e) => {
				console.error(e);
			});
	}, []);

	const submitJob = async () => {
		try {
			const { data: job } = await axios({
				method: "POST",
				url: isEditing
					? `/api/jobs/update?id=${jobToEdit?._id}`
					: "/api/jobs/create",
				data: {
					title: jobTitle,
					team: selectedTeam,
					location: jobLocation,
					webhook: jobCustomWH,
					requiresResume: jobRequiresResume,
					description: jobDescription,
					body: jobBody,
				},
			});
			toast.success(
				isEditing
					? "Job offer has been updated"
					: "Job offer has been posted",
				{
					theme: "colored",
					position: "top-center",
					onClick: () => {
						router.push(`/jobs/${job._id || jobToEdit?._id}`);
					},
				}
			);
		} catch (e) {
			console.error(e);
			toast.error(
				"Error while posting job, check console for more information."
			);
		}
	};

	const toggleJob = (job: Job) => {
		axios({
			method: "POST",
			url: `/api/jobs/update?id=${job._id}`,
			data: { active: !job.active },
		})
			.then(() => {
				toast.success(`${job.title} has been updated`, {
					position: "top-center",
					theme: "colored",
				});
				axios(`/api/jobs/list?active=any`)
					.then(({ data }) => {
						setCurrentJobs(data);
					})
					.catch((e) => {
						console.error(e);
					});
			})
			.catch((e) => {
				console.error(e);
				toast.error(
					"Something went wrong while toggling the job status.",
					{
						theme: "colored",
						position: "top-center",
					}
				);
			});
	};

	const editJob = (job: Job) => {
		setIsEditing(true);
		setJobToEdit(job);

		// Update inputs
		setJobTitle(job.title);
		setSelectedTeam(job.team);
		setJobLocation(job.location);
		setJobRequiresResume(job.requiresResume || false);
		setJobCustomWH(job.webhook || "");
		setJobDescription(job.description);
		setJobBody(job.body);
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
					<div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 space-x-0 2xl:space-x-4">
						<div className="w-full 2xl:w-3/4 min-h-[400px] bg-light-500 dark:bg-dark-400 rounded-lg p-8 flex flex-col">
							<h1 className="font-bold font-montserrat text-xl text-dark-400 dark:text-white">
								{isEditing
									? `Editing '${jobToEdit?.title}'`
									: "Create a Job Offering"}
							</h1>
							<div className="flex flex-wrap gap-3 min-h-[2.5rem] mt-2">
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
								<div className="">
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
															selectedTeam?.length >
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
								<div className="">
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
								<div className="">
									<p className="text-sm text-black dark:text-white mb-1">
										Require a Resume
									</p>
									<Dropdown
										content={
											<div className="flex items-center justify-between w-full p-2">
												<div className="flex items-center space-x-2">
													<div
														className={clsx(
															"text-dark-400 dark:text-gray-500 min-w-[100px] text-sm",
															jobRequiresResume !==
																null
																? "dark:!text-neutral-300"
																: ""
														)}
													>
														{jobRequiresResume !==
														null
															? jobRequiresResume
																? "Yes"
																: "No"
															: "Yes/No"}
													</div>
												</div>

												<div className="material-icons text-dark-100 dark:text-gray-500">
													expand_more
												</div>
											</div>
										}
										options={[
											{
												onClick: () => {
													setJobRequiresResume(true);
												},
												label: "Yes",
											},
											{
												onClick: () => {
													setJobRequiresResume(false);
												},
												label: "No",
											},
										]}
									/>
								</div>
							</div>
							<div className="flex flex-col w-full mt-4">
								<Input
									label="Custom Webhook destination"
									placeholder=""
									variant="short"
									value={jobCustomWH}
									onChange={(e) =>
										setJobCustomWH(e.target.value)
									}
								/>
							</div>
							<div className="mt-4">
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
							<div className="mt-4 mb-4">
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
								{isEditing ? "Save changes" : "Submit"}
							</Button>
						</div>
						<div className="w-full 2xl:w-1/4 bg-light-500 dark:bg-dark-400 rounded-lg p-8 mt-10 2xl:mt-0">
							<Title size="small">Current offers</Title>
							<div className="flex flex-col">
								{currentJobs.map((jobListing: Job, i) => (
									<div
										key={i}
										className="flex justify-between items-center my-2"
									>
										<div className="">
											<p className="text-neutral-800 dark:text-neutral-200">
												{jobListing.title}
											</p>
											<p className="text-sm text-neutral-700 dark:text-neutral-500">
												Applicants:{" "}
												{jobListing.applicants?.length}
											</p>
										</div>
										<div className="grid place-items-center select-none">
											<div className="space-x-2">
												{" "}
												{jobListing.active ? (
													<Tooltip content="Hide job offer from the public">
														<span
															className="material-icons cursor-pointer hover:text-dank-300 transition-colors"
															style={{
																fontSize: 18,
															}}
															onClick={() =>
																toggleJob(
																	jobListing
																)
															}
														>
															visibility_off
														</span>
													</Tooltip>
												) : (
													<Tooltip content="Make job offer public">
														<span
															className="material-icons cursor-pointer hover:text-dank-300 transition-colors"
															style={{
																fontSize: 18,
															}}
															onClick={() =>
																toggleJob(
																	jobListing
																)
															}
														>
															visibility
														</span>
													</Tooltip>
												)}
												<span
													className="material-icons cursor-pointer hover:text-dank-300 transition-colors"
													style={{
														fontSize: 18,
													}}
													onClick={() =>
														editJob(jobListing)
													}
												>
													edit
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(developerRoute);
