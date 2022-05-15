import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import LoadingPepe from "../components/LoadingPepe";
import { StaffCard } from "../components/StaffCard";
import { Title } from "../components/Title";
import Container from "../components/ui/Container";
import { PageProps, UserData } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

const names: Record<string, string> = {
	team: "Team",
	moderators: "Moderators",
	honorable: "Honorable Mention",
};

export default function StaffPage({ user }: PageProps) {
	const [staff, setStaff] = useState<Record<string, UserData[]>>({});

	useEffect(() => {
		axios("/api/staff").then((data) => {
			setStaff(data.data);
		});
	}, []);

	return (
		<Container title="Staff" user={user}>
			<div>
				{staff && (
					<div className="flex flex-col space-y-16 my-16">
						{Object.entries(staff).map(([category, members]) => (
							<div className="flex flex-col space-y-4">
								<Title size="big">{names[category]}</Title>
								<div
									className={clsx(
										"grid gap-8",
										category === "team"
											? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
