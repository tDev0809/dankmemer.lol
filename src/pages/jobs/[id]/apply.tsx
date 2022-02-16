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
	const [socials, setSocials] = useState("");

	const [applicantDOB, setApplicantDOB] = useState("");
	const [applicantCountry, setApplicantCountry] = useState("");

	const [resume, setResume] = useState<string | ArrayBuffer | null>(null);

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
			acceptedFiles.length === 1 &&
			applicantCountry !== "" &&
			applicantDOB !== "" &&
			(applicantDOB.match(/-/g) || []).length === 3
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

	useEffect(() => {
		if (!acceptedFiles[0]) return;
		const reader = new FileReader();
		reader.readAsArrayBuffer(acceptedFiles[0]);

		reader.onload = () => {
			if (reader.result) setResume(reader.result);
			else console.error("uh oh");
		};
	}, [acceptedFiles]);

	const submitApplication = async () => {
		try {
			if (!canSubmit) return;
			await axios({
				url: "/api/jobs/apply",
				method: "POST",
				data: {
					job,
					userId: user?.id,
				},
			});
			await sendWebhook();
			toast.success("Your application has been submitted, good luck!", {
				theme: "colored",
				position: "top-center",
				onClick: () => {
					router.push(`/jobs/${job._id}`);
				},
			});
			await router.push("/");
		} catch (e) {
			toast.error(
				"Something went wrong while trying to submit your application. Try again later."
			);
		}
	};

	const sendWebhook = async () => {
		const form = new FormData();
		form.append(
			"payload_json",
			JSON.stringify({
				embeds: [
					{
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
								value: `${applicantDOB} (YYYY-MM-DD)`,
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
							{
								name: "Social media profiles",
								value: `• ${socials.split(", ").join("\n• ")}`,
								inline: true,
							},
						],
					},
				],
			})
		);
		form.append(
			"file",
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
		await axios({
			method: "POST",
			url: process.env.NEXT_PUBLIC_JOBS_WEBHOOK!,
			data: form,
			headers: { "Content-Type": "application/json" },
		});
	};

	return (
		<Container title={`Job | ${job?.title}`} user={user}>
			<div className="my-10">
				<GoBack />
				{job.alreadyApplied && (
					<div className="grid place-items-center w-full h-14 bg-red-500 rounded-md my-3 shadow-[0px_0px_12px] shadow-red-500">
						<p className="w-8/12 text-center">
							You have already applied for this position, any
							applications made are final and cannot be changed.
							You are not able to submit another application at
							this time.
						</p>
					</div>
				)}
				<h1 className="mt-4 text-3xl font-bold font-montserrat text-black dark:text-white break-all mr-2">
					Apply for the "{job?.title}" position
				</h1>
				<p className="w-3/4 text-neutral-600 dark:text-neutral-400">
					We will need to gather some contact information from you
					within your application. A reminder that abuse of this
					system will result in a permanent suspension from all
					current and future potential positions.
				</p>
				<div className="flex justify-between items-start relative">
					<div className="flex-1">
						<div className="flex justify-start items-start mt-5">
							<div className="flex flex-row space-x-4">
								<div className="w-1/4">
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
								<div className="w-1/3">
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
								<div className="w-1/4">
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
						<div className="flex flex-row space-x-4 mt-5">
							<div className="w-4/12">
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
							<div className="w-1/4">
								<Input
									variant="short"
									placeholder="2000-01-01"
									label="Date of birth"
									value={applicantDOB}
									onChange={(e) =>
										setApplicantDOB(e.target.value)
									}
									type="date"
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
					<div className="flex-1 mt-5">
						<p className="text-sm text-black dark:text-white mb-1">
							Upload your resume
							<sup className="text-red-500">*</sup>
						</p>
						<div
							{...getRootProps({
								className:
									"group grid place-items-center text-center text-neutral-700 dark:text-neutral-400 bg-neutral-200 dark:bg-dark-100 w-full h-[125px] border-[3px] border-black/20 dark:border-white/20 border-dashed rounded-md",
							})}
						>
							<input {...getInputProps()} />
							<div className="group-hover:text-dank-300 transition-colors grid place-items-center py-3 w-full">
								{acceptedFiles.length !== 1 ? (
									<>
										<p>Upload your resume</p>
										<p>
											(Only *.pdf, *.doc and *.docx files
											will be accepted)
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
				</div>
				<div className="flex flex-row justify-start mt-5 w-full space-x-4">
					<div className="w-1/5">
						<Input
							variant="short"
							placeholder="john@example.com"
							label="Preferred contact email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							block
						/>
					</div>
					<div className="w-11/12">
						<Input
							variant="short"
							placeholder="https://twitter.com/dankmemerbot, https://github.com/DankMemer"
							label='Social media profiles (Separate with ", ")'
							value={socials}
							onChange={(e) => setSocials(e.target.value)}
							block
						/>
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
			.findOne({ _id: jobId })) as Job;
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
