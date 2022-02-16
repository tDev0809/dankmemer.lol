import MarkdownIt from "markdown-it";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "src/components/ui/Button";
import Container from "src/components/ui/Container";
import GoBack from "src/components/ui/GoBack";
import { PageProps } from "src/types";
import { tailwindHtml } from "src/util/blog";
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
	applicants: string[];
	alreadyApplied?: boolean;
}

interface Props extends PageProps {
	job: Job;
}

export default function JobPage({ user, job }: Props) {
	const router = useRouter();
	const mdParser = new MarkdownIt();

	return (
		<Container title={`Job | ${job?.title}`} user={user}>
			<div className="my-10">
				<GoBack />
				<div className="grid place-items-center w-full h-14 bg-red-500 rounded-md my-3 shadow-[0px_0px_12px] shadow-red-500">
					<p className="w-8/12 text-center">
						You have already applied for this position, any
						applications made are final and cannot be changed. You
						are not able to submit another application at this time.
					</p>
				</div>
				<h1 className="mt-4 text-3xl font-bold font-montserrat text-black dark:text-white break-all mr-2">
					{job?.title}
				</h1>
				<div className="flex justify-start items-start mt-5">
					<div className="">
						<div className="w-60 h-56 rounded-md dark:bg-dark-100 py-4 px-5 flex flex-col justify-between fixed">
							<div>
								<div>
									<h4 className="font-inter font-bold dark:text-neutral-400 leading-none">
										Team
									</h4>
									<p>{job.team}</p>
								</div>
								<div className="mt-5">
									<h4 className="font-inter font-bold dark:text-neutral-400 leading-none">
										Location
									</h4>
									<p>{job.location}</p>
								</div>
							</div>
							<Button
								size="medium"
								onClick={() =>
									router.push(`/jobs/${job._id}/apply`)
								}
							>
								Apply now!
							</Button>
						</div>
					</div>
					<div
						className="ml-64 w-full"
						dangerouslySetInnerHTML={{
							__html: tailwindHtml(mdParser.render(job.body)),
						}}
					/>
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
			if (job.applicants.includes(user.id)) {
				job.alreadyApplied = true;
			} else {
				job.alreadyApplied = false;
			}
			return {
				props: { job, user },
			};
		}
	}
);
