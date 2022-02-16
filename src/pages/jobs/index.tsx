import { useRouter } from "next/router";
import { Title } from "src/components/Title";
import Container from "src/components/ui/Container";
import { PageProps } from "src/types";
import Button from "src/components/ui/Button";
import { sanitizeCategory } from "src/util/community";
import Dropdown from "src/components/ui/Dropdown";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { JOBS_TEAMS } from "src/constants/jobs";
import axios from "axios";
import { Label } from "src/components/community/PostLabel";

interface Job {
	_id: string;
	title: string;
	description: string;
	team: string;
	location: string;
	createdAt: number;
	active: boolean;
}

export default function Jobs({ user }: PageProps) {
	const router = useRouter();
	const [selectedTeam, setSelectedTeam] = useState<
		typeof JOBS_TEAMS[number] | "all teams"
	>("all teams");
	const [jobs, setJobs] = useState<Job[]>([]);

	useEffect(() => {
		axios(`/api/jobs/list?team=${selectedTeam}`)
			.then(({ data }) => {
				setJobs(data);
			})
			.catch(() => {});
	}, [selectedTeam]);

	return (
		<Container title="Jobs" user={user}>
			<div className="flex flex-col my-16 space-y-12">
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
						<Title size="big">Work with us!</Title>
					</div>
					<div className="flex space-x-0 md:space-x-4">
						<div className="hidden md:flex flex-col space-y-3 ">
							<div className="text-lg text-black dark:text-white">
								Teams
							</div>
							<div className="flex flex-col space-y-2 w-52">
								{["all teams"]
									.concat(JOBS_TEAMS)
									.map((team) => (
										<div
											className={clsx(
												"py-2 px-4 bg-light-500 dark:bg-dark-100 rounded-md cursor-pointer select-none",
												team == selectedTeam
													? "text-dank-300"
													: "text-black dark:text-white"
											)}
											onClick={() =>
												setSelectedTeam(team)
											}
										>
											{sanitizeCategory(team)}
										</div>
									))}
							</div>
						</div>
						<div className="flex flex-col space-y-2 w-full">
							<div className="flex flex-col md:flex-row items-start justify-between">
								<div className="text-lg text-black dark:text-white">
									Open positions
								</div>
								<div className="flex justify-between space-x-4 w-full md:w-auto">
									<div className="inline-block md:hidden w-full">
										<Dropdown
											content={
												<Button variant="dark" block>
													{sanitizeCategory(
														selectedTeam
													)}
												</Button>
											}
											options={["all teams"]
												.concat(JOBS_TEAMS)
												.map((team) => ({
													label: sanitizeCategory(
														team
													),
													onClick: () =>
														setSelectedTeam(team),
												}))}
										/>
									</div>
								</div>
							</div>
							<div className="flex flex-col">
								{jobs.length < 1 ? (
									<div className="grid place-items-center min-h-[280px]">
										<h1 className="font-black text-2xl dark:text-white/20 text-black/20">
											No jobs found!
										</h1>
									</div>
								) : (
									jobs.map((job) => (
										<div className="bg-light-500 dark:bg-dark-100 w-full min-h-[6rem] py-3 px-4 rounded-lg mb-3">
											<h3 className="text-lg font-bold text-black dark:text-white flex justify-start items-center">
												{job.title}
												<span className="font-semibold text-sm ml-3 text-neutral-500 dark:text-neutral-300 bg-neutral-300 dark:bg-dark-300 px-2 py-1 rounded-md">
													{job.team}
												</span>
											</h3>
											<p className="text-neutral-600 dark:text-neutral-400 mb-3">
												{job.description}
											</p>
											<Button
												size="small"
												onClick={() =>
													router.push(
														`/jobs/${job._id}`
													)
												}
											>
												Learn more
											</Button>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
