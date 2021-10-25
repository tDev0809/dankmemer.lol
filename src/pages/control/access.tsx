import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ControlCard } from "../../components/ControlCard";
import Container from "../../components/ui/Container";
import { PageProps, Staff } from "../../types";
import { randomAvatar } from "../../util/random";
import { adminRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function PostPage({ user }: PageProps) {
	const router = useRouter();
	const [staff, setStaff] = useState<Record<string, Staff[]>>({});

	useEffect(() => {
		axios("/api/staff/list").then((data) => {
			setStaff(data.data);
		});
	}, []);

	return (
		<Container title="Feedback" user={user}>
			<div className="mx-8 xl:mx-0">
				<div className="flex flex-col my-20 space-y-8">
					<div className="flex flex-col space-y-4">
						<div
							className="flex space-x-2 cursor-pointer text-sm items-center text-dark-300 dark:text-light-100"
							onClick={() => router.back()}
						>
							<span className="material-icons">arrow_back</span>
							<div>Go Back</div>
						</div>
						<div className="font-bold font-montserrat text-3xl text-dank-300 dark:text-light-100">
							Manage Staff Members
						</div>
						<div className="flex justify-between">
							<ControlCard
								endpoint="/api/staff/add?id={{input}}&category={{dropdown}}"
								label="Add a new staff member"
								icon="person_add_alt"
								type="normal"
								input={{
									icon: "badge",
									placeholder: "Account ID",
								}}
								dropdown={{
									icon: "badge",
									initial: "Staff type",
									options: [
										{
											text: "Support Moderator",
											value: "Support Moderators",
										},
										{
											text: "Honorable Mention",
											value: "Honorable Mentions",
										},
										{
											text: "Bot Moderator",
											value: "Bot Moderators",
										},
										{
											text: "Team Member",
											value: "Team",
										},
									],
								}}
								finish={() => {
									toast.dark("Added!");
								}}
							/>
							<ControlCard
								endpoint="/api/staff/get?id={{input}}"
								label="Search for staff members"
								icon="person_add_alt"
								type="normal"
								input={{
									icon: "badge",
									placeholder: "Account ID",
								}}
								finish={(data) => {
									toast.dark(
										data.data.staff
											? "Exists."
											: "Doesn't exist."
									);
								}}
							/>
							<ControlCard
								endpoint="/api/staff/remove?id={{input}}"
								label="Remove a staff member"
								icon="person_remove"
								type="destructive"
								input={{
									icon: "badge",
									placeholder: "Account ID",
								}}
								finish={() => {
									toast.dark("Staff member removed");
								}}
							/>
						</div>
						{staff && (
							<div className="flex flex-col space-y-4">
								{Object.entries(staff).map(
									([category, members]) =>
										members.map((member) => (
											<div className="grid grid-cols-4 p-4 items-center rounded-md bg-dark-400 ">
												<div>
													{" "}
													<img
														src={member.avatar}
														className="bg-light-600 rounded-full w-10"
														onError={(e) => {
															(
																e.target as any
															).onerror = null;
															(
																e.target as any
															).src = randomAvatar(
																member._id
															);
														}}
													/>
												</div>
												<div>{member.name}</div>
												<div>{member.category}</div>
												<div className="whitespace-pre-wrap leading-5 overflow-y-auto no-scrollbar h-8">
													{member.about}
												</div>
											</div>
										))
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = withSession(adminRoute);
