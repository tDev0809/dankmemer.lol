import clsx from "clsx";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Container from "../../components/ui/Container";
import { PageProps } from "../../types";
import { moderatorRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

interface PanelProps {
	link: string;
	label: string;
}

function Panel({ link, label }: PanelProps) {
	return (
		<Link href={link} passHref>
			<a
				className={clsx(
					"flex flex-col items-center justify-center",
					"py-8 rounded-md select-none cursor-pointer",
					"bg-light-500 dark:bg-dark-100",
					"border border-light-500 dark:border-dark-100 hover:border-dank-300 dark:hover:border-dank-300"
				)}
			>
				<div className="text-xl font-bold font-montserrat text-dank-500 dark:text-white">
					{label}
				</div>
			</a>
		</Link>
	);
}

export default function ControlPage({ user }: PageProps) {
	return (
		<Container title="Control" user={user}>
			<div className="flex flex-col my-16 space-y-8 mx-8 xl:mx-0">
				<div className="flex justify-between items-center">
					<div className="font-bold font-montserrat text-3xl text-dank-300 dark:text-light-100">
						Control Panel
					</div>
				</div>
				{user?.developer && (
					<div className="flex flex-col">
						<div className="font-bold font-montserrat text-xl text-dank-300 dark:text-light-100">
							Administration
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
							<Panel link="/control/users" label="User Control" />
							<Panel link="/control/website" label="Website" />
						</div>
					</div>
				)}
				<div className="flex flex-col">
					<div className="font-bold font-montserrat text-xl text-dank-300 dark:text-light-100">
						Moderation
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
						<Panel link="/control/inspect" label="Inspect a User" />
						<Panel
							link="/control/analytics"
							label="Support Analytics"
						/>
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(moderatorRoute);
