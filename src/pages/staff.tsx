import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import LoadingPepe from "../components/LoadingPepe";
import { StaffCard } from "../components/StaffCard";
import Container from "../components/ui/Container";
import { PageProps, Staff } from "../types";
import createAd from "../util/createAd";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

export default function FeedbackPage({ user }: PageProps) {
	const [staff, setStaff] = useState<Record<string, Staff[]>>({});

	useEffect(() => {
		axios("/api/staff/list").then((data) => {
			setStaff(data.data);
		});

		createAd(
			"nitropay-staff-bottom",
			{
				sizes: [
					[728, 90],
					[970, 90],
					[970, 250],
				],
				renderVisibleOnly: true,
			},
			"desktop"
		);
		createAd(
			"nitropay-staff-bottom",
			{
				sizes: [
					[320, 50],
					[300, 50],
					[300, 250],
				],
				renderVisibleOnly: true,
			},
			"mobile"
		);
	}, []);

	return (
		<Container title="Staff" user={user}>
			<div>
				{staff && (
					<div className="flex flex-col space-y-16 my-16">
						{Object.entries(staff).map(([category, members]) => (
							<div className="flex flex-col space-y-4">
								<div className="font-bold font-montserrat text-3xl text-dank-300 dark:text-light-100">
									{category}
								</div>
								<div
									className={clsx(
										"grid gap-8",
										category === "Team"
											? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
											: "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
									)}
								>
									{members.map((member) => (
										<StaffCard member={member} />
									))}
								</div>
							</div>
						))}
					</div>
				)}
				{Object.keys(staff).length === 0 && <LoadingPepe />}
				<div id="nitropay-staff-bottom" className="nitropay" />
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
