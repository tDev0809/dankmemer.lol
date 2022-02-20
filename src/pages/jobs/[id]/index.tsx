import axios from "axios";
import MarkdownIt from "markdown-it";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-iron-session";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Title } from "src/components/Title";
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
	applicants?: string[];
	alreadyApplied?: boolean;
}

interface Props extends PageProps {
	job: Job;
}

export default function JobPage({ user, job }: Props) {
	const router = useRouter();
	const mdParser = new MarkdownIt();

	const toggleJob = () => {
		axios({
			method: "POST",
			url: `/api/jobs/update?id=${job._id}`,
			data: { active: !job.active },
		})
			.then(() => router.reload())
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
				<div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
					<Title size="big">{job?.title}</Title>
					{user?.developer && (
						<div className="flex flex-row space-x-2">
							<Button
								size="medium"
								variant="dark"
								onClick={toggleJob}
							>
								{job.active ? "Disable" : "Enable"} listing
							</Button>
							<Button
								size="medium"
								variant="dark"
								href={`/control/jobs?edit=${job._id}`}
							>
								Edit listing
							</Button>
						</div>
					)}
				</div>
				<div className="flex justify-start items-start flex-col md:flex-row mt-5">
					<div className="w-full md:w-max">
						<div className="w-full md:w-60 h-56 rounded-md dark:bg-dark-100 py-4 px-5 flex flex-col justify-between mb-3 md:fixed">
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
						className="md:ml-64 w-full"
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
			if (user && job.applicants?.includes(user.id)) {
				job.alreadyApplied = true;
			} else {
				job.alreadyApplied = false;
			}
			delete job.applicants;
			return {
				props: { job, user: user ?? null },
			};
		}
	}
);
