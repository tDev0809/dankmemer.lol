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

interface Job {
	_id: string;
	title: string;
	description: string;
	body: string;
	team: string;
	location: string;
	createdAt: number;
	active: boolean;
}

interface Props extends PageProps {
	job: Job;
}

export default function JobPage({ user, job }: Props) {
	const router = useRouter();

	const [firstName, setFirstName] = useState("");
	const [middleNames, setMiddleNames] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState(user?.email!);

	const [whyApplicant, setWhyApplicant] = useState("");

	const [canSubmit, setCanSubmit] = useState(false);

	useEffect(() => {
		if (
			firstName.length >= 1 &&
			lastName.length >= 1 &&
			email.length >= 5 &&
			whyApplicant.length >= 300 &&
			whyApplicant.length <= 1024
		) {
			setCanSubmit(true);
		} else {
			setCanSubmit(false);
		}
	}, [firstName, lastName, email, whyApplicant]);

	const submitApplication = async () => {
		try {
			if (!canSubmit) return;
			await axios({
				url: "/api/jobs/apply",
				method: "POST",
				data: {
					job,
					userId: user?.id,
					name: `${firstName} ${middleNames} ${lastName}`,
					email,
					whyApplicant,
				},
			});
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

	return (
		<Container title={`Job | ${job?.title}`} user={user}>
			<div className="my-10">
				<GoBack />
				<h1 className="mt-4 text-3xl font-bold font-montserrat text-black dark:text-white break-all mr-2">
					Apply for the "{job?.title}" position
				</h1>
				<p className="w-3/4 text-neutral-600 dark:text-neutral-400">
					We will need to gather some contact information from you
					within your application. A reminder that abuse of this
					system will result in a permanent suspension from all
					current and future potential positions.
				</p>
				<div className="flex justify-start items-start mt-5">
					<div className="flex flex-row space-x-4">
						<div className="w-1/4">
							<Input
								variant="short"
								placeholder="John"
								label="First name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
						</div>
						<div className="w-1/3">
							<Input
								variant="short"
								placeholder="(optional)"
								label="Middle name(s)"
								value={middleNames}
								onChange={(e) => setMiddleNames(e.target.value)}
							/>
						</div>
						<div className="w-1/4">
							<Input
								variant="short"
								placeholder="Doe"
								label="Last name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-row justify-between mt-5 w-1/3">
					<Input
						variant="short"
						placeholder="john@example.com"
						label="Preferred email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						block
					/>
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

		const job = await db.collection("jobs").findOne({ _id: jobId });
		if (!job) {
			return {
				redirect: {
					destination: `/jobs`,
					permanent: false,
				},
			};
		} else {
			return {
				props: { job, user },
			};
		}
	}
);
