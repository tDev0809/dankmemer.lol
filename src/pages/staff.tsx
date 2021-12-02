import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Ad } from "../components/Ad";
import LoadingPepe from "../components/LoadingPepe";
import { StaffCard } from "../components/StaffCard";
import { Title } from "../components/Title";
import Container from "../components/ui/Container";
import { PageProps, Staff } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

export default function FeedbackPage({ user }: PageProps) {
	const [staff, setStaff] = useState<Record<string, Staff[]>>({});

	useEffect(() => {
		axios("/api/staff/list").then((data) => {
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
								<Title size="big">{category}</Title>
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
				<div className="mb-20">
					<Ad
						id="bottom"
						platform="mobile"
						sizes={[
							[320, 50],
							[300, 50],
							[300, 250],
						]}
					/>
					<Ad
						id="bottom"
						platform="desktop"
						sizes={[
							[728, 90],
							[970, 90],
							[970, 250],
						]}
					/>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
