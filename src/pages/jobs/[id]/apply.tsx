import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "src/components/ui/Button";
import Container from "src/components/ui/Container";
import GoBack from "src/components/ui/GoBack";
import Input from "src/components/ui/Input";
import { PageProps } from "src/types";
import { dbConnect } from "src/util/mongodb";
import { withSession } from "src/util/session";
import { useDropzone } from "react-dropzone";
import Dropdown from "src/components/ui/Dropdown";
import { COUNTRIES } from "src/constants/jobs";

interface Job {
	_id: string;
	title: string;
	description: string;
	body: string;
	team: string;
	location: string;
	createdAt: number;
	active: boolean;
	requiresResume: boolean;
	applicants?: string[];
	alreadyApplied?: boolean;
}

interface Props extends PageProps {
	job: Job;
}

export default function JobPage({ user, job }: Props) {
	const router = useRouter();
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		maxFiles: 1,
		maxSize: 1e8,
		accept: ".pdf,.doc,.docx",
	});

	const [firstName, setFirstName] = useState("");
	const [middleNames, setMiddleNames] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState(user?.email!);
	const [links, setLinks] = useState<string[]>([""]);

	const [applicantDOB, setApplicantDOB] = useState("");
	const [applicantCountry, setApplicantCountry] = useState("");

	const [whyApplicant, setWhyApplicant] = useState("");

	const [canSubmit, setCanSubmit] = useState(false);

	useEffect(() => {
		if (
			firstName.length >= 1 &&
			lastName.length >= 1 &&
			email.length >= 5 &&
			whyApplicant.length >= 300 &&
			whyApplicant.length <=
				4096 - "**Why are they fit for this position?**\n".length &&
			(job.requiresResume ? acceptedFiles.length === 1 : true) &&
			applicantCountry !== "" &&
			applicantDOB !== "" &&
			(applicantDOB.match(/-/g) || []).length === 2
		) {
			setCanSubmit(true);
		} else {
			setCanSubmit(false);
		}
	}, [
		firstName,
		lastName,
		email,
		whyApplicant,
		acceptedFiles,
		applicantCountry,
		applicantDOB,
	]);

	const submitApplication = async () => {
		try {
			if (!canSubmit) return;
			const form = new FormData();
			const embed = {
				title: `Job Application for ${job.title}`,
				url: `${window.location.href}`,
				color: 0x199532,
				timestamp: new Date(),
				description: `**Why are they fit for this position?**\n${whyApplicant}`,
				fields: [
					{
						name: "Applicant",
						value: `${`${firstName} ${middleNames} ${lastName}`.replace(
							/\s+/g,
							" "
						)} (<@!${user?.id!}>)`,
						inline: true,
					},
					{
						name: "Date of birth",
						value: `(YYYY-MM-DD)\n${applicantDOB}`,
						inline: true,
					},
					{
						name: "Primary country of Residence",
						value: applicantCountry,
						inline: true,
					},
					{
						name: "Preferred Contact Email",
						value: email,
						inline: true,
					},
				],
			};
			if (links.length >= 1 && links[0].length > 1) {
				embed.fields.push({
					name: "External links",
					value: `• ${links.join("\n• ")}`,
					inline: true,
				});
			}

			form.append("job", JSON.stringify({ job, userId: user!.id }));
			form.append(
				"payload_json",
				JSON.stringify({
					embeds: [embed],
				})
			);

			if (job.requiresResume) {
				form.append(
					"resume",
					acceptedFiles[0],
					`${`${firstName} ${middleNames} ${lastName}`.replace(
						/\s+/g,
						" "
					)}'s Resume.${
						acceptedFiles[0].name.split(".")[
							acceptedFiles[0].name.split(".").length - 1
						]
					}`
				);
			}

			await axios({
				method: "POST",
				url: "/api/jobs/apply",
				data: form,
				headers: { "Content-Type": "json/application" },
			});
			toast.success("Your application has been submitted, good luck!", {
				theme: "colored",
				position: "top-center",
				onClick: () => {
					router.push(`/jobs/${job._id}`);
				},
			});
			setTimeout(async () => {
				await router.push("/");
			}, 5000);
		} catch (e) {
			toast.error(
				"Something went wrong while trying to submit your application. Try again later."
			);
		}
	};

	// Ensure that there is always at least 1 social media input
	useEffect(() => {
		if (links.length === 0) {
			setLinks([""]);
		}
	}, [links]);

	const updateSocial = (index: number, value: string) => {
		const _links = [...links];
		_links[index] = value;
		setLinks(_links);
	};

	const deleteSocial = (index: number) => {
		const _links = [...links];
		if (index === 0 && links.length === 1) {
			return updateSocial(0, "");
		} else {
			_links.splice(index, 1);
			setLinks(_links);
		}
	};

	return (
		<Container title={`Job | ${job?.title}`} user={user}>
			<div className="my-10">
				<GoBack />
				{job.alreadyApplied && (
					<div className="grid place-items-center w-full min-h-[3.5rem] bg-red-500 rounded-md my-3 shadow-[0px_0px_12px] shadow-red-500">
						<p className="w-11/12 md:w-8/12 text-center">
							You have already applied for this position, any
							applications made are final and cannot be changed.
							You are not able to submit another application at
							this time.
						</p>
					</div>
				)}
				<h1 className="mt-4 mb-2 text-3xl font-bold font-montserrat text-black dark:text-white break-word mr-2">
					Apply for the "{job?.title}" position
				</h1>
				<p className="lg:w-3/4 text-neutral-600 dark:text-neutral-400">
					We will need to gather some contact information from you
					within your application. A reminder that abuse of this
					system will result in a permanent suspension from all
					current and future potential positions.
				</p>
				<div className="flex justify-between flex-col-reverse xl:flex-row items-start relative">
					<div className="w-full xl:max-w-[755px]">
						<div className="flex justify-start items-start mt-5">
							<div className="flex flex-col md:flex-row md:space-x-3 w-full">
								<div className="w-full mb-3 md:mb-0 xl:w-1/4">
									<Input
										variant="short"
										placeholder="John"
										label="First name"
										value={firstName}
										onChange={(e) =>
											setFirstName(e.target.value)
										}
										required
									/>
								</div>
								<div className="w-full mb-3 md:mb-0 md:w-1/4 xl:w-1/3">
									<Input
										variant="short"
										placeholder="(optional)"
										label="Middle name(s)"
										value={middleNames}
										onChange={(e) =>
											setMiddleNames(e.target.value)
										}
									/>
								</div>
								<div className="w-full xl:w-1/4">
									<Input
										variant="short"
										placeholder="Doe"
										label="Last name"
										value={lastName}
										onChange={(e) =>
											setLastName(e.target.value)
										}
										required
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row sm:space-x-4 mt-5">
							<div className="w-full md:w-4/12 mb-3 sm:mb-0">
								<p className="text-sm text-black dark:text-white mb-1">
									Primary country of residence
									<sup className="text-red-500">*</sup>
								</p>
								<Dropdown
									content={
										<div className="flex items-center justify-between w-full p-2">
											<div className="flex items-center space-x-2">
												<div
													className={clsx(
														"text-dark-400 dark:text-gray-500 min-w-[180px] text-sm",
														applicantCountry.length >
															1
															? "dark:!text-neutral-300"
															: ""
													)}
												>
													{applicantCountry ||
														"Name of country"}
												</div>
											</div>

											<div className="material-icons text-dark-100 dark:text-gray-500">
												expand_more
											</div>
										</div>
									}
									options={COUNTRIES.map((option) => ({
										onClick: (e) => {
											setApplicantCountry(option);
										},
										label: option,
									}))}
									requireScroll
									isInput
								/>
							</div>
							<div className="w-full sm:w-1/3 md:w-1/4">
								<Input
									variant="short"
									placeholder="2000-01-01"
									label="Date of birth"
									value={applicantDOB}
									onChange={(e) =>
										setApplicantDOB(e.target.value)
									}
									type="date"
									// @ts-expect-error
									max={`${new Date().getFullYear() - 18}-${(
										new Date().getMonth() + 1
									).toLocaleString("en-US", {
										minimumIntegerDigits: 2,
										useGrouping: false,
									})}-${new Date()
										.getDate()
										.toLocaleString("en-US", {
											minimumIntegerDigits: 2,
											useGrouping: false,
										})}`}
									required
								/>
							</div>
						</div>
					</div>
					{job.requiresResume && (
						<div className="mt-5 w-full">
							<p className="text-sm text-black dark:text-white mb-1">
								Upload your resume
								<sup className="text-red-500">*</sup>
							</p>
							<div
								{...getRootProps({
									className:
										"group grid place-items-center text-center text-neutral-700 dark:text-neutral-400 bg-neutral-200 dark:bg-dark-100 w-full h-[125px] border-[3px] border-black/20 dark:border-white/20 hover:!border-dank-300 border-dashed rounded-md transition-colors w-full",
								})}
							>
								<input {...getInputProps()} />
								<div className="group-hover:text-dank-300 transition-colors grid place-items-center py-3 w-11/12 sm:w-full">
									{acceptedFiles.length !== 1 ? (
										<>
											<p>Upload your resume</p>
											<p>
												(Only *.pdf, *.doc and *.docx
												files will be accepted)
											</p>
										</>
									) : (
										<>
											{acceptedFiles[0].type.includes(
												"openxmlformats-officedocument"
											) ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													aria-hidden="true"
													role="img"
													width="32"
													height="32"
													preserveAspectRatio="xMidYMid meet"
													viewBox="0 0 32 32"
												>
													<path
														fill="currentColor"
														d="m28.3 20l-.909 8.611L26 20h-2l-1.391 8.611L21.7 20H20l1.36 10h2.28L25 21.626L26.36 30h2.28L30 20h-1.7z"
													/>
													<path
														fill="currentColor"
														d="m25.707 9.293l-7-7A1 1 0 0 0 18 2H8a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2h8v-2H8V4h8v6a2.002 2.002 0 0 0 2 2h6v4h2v-6a1 1 0 0 0-.293-.707ZM18 4.414L23.586 10H18Z"
													/>
												</svg>
											) : acceptedFiles[0].type.includes(
													"pdf"
											  ) ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													aria-hidden="true"
													role="img"
													width="32"
													height="32"
													preserveAspectRatio="xMidYMid meet"
													viewBox="0 0 32 32"
												>
													<path
														fill="currentColor"
														d="M30 18v-2h-6v10h2v-4h3v-2h-3v-2h4zm-11 8h-4V16h4a3.003 3.003 0 0 1 3 3v4a3.003 3.003 0 0 1-3 3zm-2-2h2a1.001 1.001 0 0 0 1-1v-4a1.001 1.001 0 0 0-1-1h-2zm-6-8H6v10h2v-3h3a2.003 2.003 0 0 0 2-2v-3a2.002 2.002 0 0 0-2-2zm-3 5v-3h3l.001 3z"
													/>
													<path
														fill="currentColor"
														d="M22 14v-4a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 14 2H4a2.006 2.006 0 0 0-2 2v24a2 2 0 0 0 2 2h16v-2H4V4h8v6a2.006 2.006 0 0 0 2 2h6v2Zm-8-4V4.4l5.6 5.6Z"
													/>
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													aria-hidden="true"
													role="img"
													width="32"
													height="32"
													preserveAspectRatio="xMidYMid meet"
													viewBox="0 0 32 32"
												>
													<path
														fill="currentColor"
														d="m25.7 9.3l-7-7c-.2-.2-.4-.3-.7-.3H8c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-.3-.1-.5-.3-.7zM18 4.4l5.6 5.6H18V4.4zM24 28H8V4h8v6c0 1.1.9 2 2 2h6v16z"
													/>
													<path
														fill="currentColor"
														d="M10 22h12v2H10zm0-6h12v2H10z"
													/>
												</svg>
											)}
											<p className="w-8/12 overflow-auto text-sm">
												{acceptedFiles[0].name}
											</p>
										</>
									)}
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="flex justify-start mt-5 w-full md:space-x-4 flex-col md:flex-row">
					<div className="w-full md:w-1/2 xl:w-1/5">
						<Input
							variant="short"
							placeholder="john@example.com"
							label="Preferred contact email address"
							value={email}
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							required
							block
						/>
					</div>
					<div className="flex flex-col mt-4 md:mt-0 md:w-10/12 w-full">
						<p className="text-sm text-black dark:text-white mb-1">
							External links (Social media/Portfolio/Past work)
						</p>
						<div className="w-full lg:1/2 flex flex-col lg:flex-row lg:space-x-2">
							{links.map((link, i) => (
								<div className="flex flex-row space-x-2 mb-2 lg:mb-0 w-full">
									<div className="relative group w-full">
										<Input
											variant="short"
											placeholder="https://twitter.com/dankmemerbot"
											value={link}
											onChange={(e) =>
												updateSocial(i, e.target.value)
											}
											block
										/>
										<div
											className="opacity-0 absolute right-0 top-0 group-hover:opacity-100 bg-light-200 dark:bg-dank-600 h-10 w-10 rounded-md grid place-items-center cursor-pointer"
											onClick={() => deleteSocial(i)}
										>
											<span className="material-icons text-neutral-700 dark:text-neutral-400 hover:!text-red-400 transition-colors">
												delete
											</span>
										</div>
									</div>
									{links.length - 1 === i &&
										links.length < 4 && (
											<div
												className="bg-light-200 dark:bg-dank-600 h-10 min-w-[40px] rounded-md grid place-items-center cursor-pointer"
												onClick={() =>
													updateSocial(
														links.length,
														""
													)
												}
											>
												<span className="material-icons text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors">
													add
												</span>
											</div>
										)}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-row justify-between mt-5 w-full">
					<Input
						variant="medium"
						placeholder="Try to be as detailed as possible in this section. This could be the make it or break it for a follow up from the team!"
						label="Why would you fit this role?"
						value={whyApplicant}
						onChange={(e) => setWhyApplicant(e.target.value)}
						required
						resizable
						block
					/>
				</div>
				<div className="mt-5">
					<Button
						size="medium"
						disabled={!canSubmit}
						className={clsx(
							canSubmit ? "" : "bg-dank-500 hover:!bg-dank-500"
						)}
						onClick={submitApplication}
					>
						Submit Application
					</Button>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = withSession(
	async (ctx: GetServerSidePropsContext & { req: { session: Session } }) => {
		const user = await ctx.req.session.get("user");

		if (!user) {
			return {
				redirect: {
					destination: `/api/auth/login?redirect=${encodeURIComponent(
						ctx.resolvedUrl
					)}`,
					permanent: false,
				},
			};
		}

		const { id: jobId } = ctx.query;
		if (!jobId) {
			return {
				redirect: {
					destination: `/jobs`,
					permanent: false,
				},
			};
		}

		const db = await dbConnect();

		const job = (await db
			.collection("jobs")
			.findOne({ _id: jobId, active: true })) as Job;
		if (!job) {
			return {
				redirect: {
					destination: `/jobs`,
					permanent: false,
				},
			};
		} else {
			if (job.applicants?.includes(user.id)) {
				job.alreadyApplied = true;
			} else {
				job.alreadyApplied = false;
			}
			delete job.applicants;
			return {
				props: { job, user },
			};
		}
	}
);
