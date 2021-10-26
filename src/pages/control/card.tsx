import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StaffCard } from "../../components/StaffCard";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import { PageProps, Staff } from "../../types";
import { staffRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function ControlAnalyticsPage({ user }: PageProps) {
	const router = useRouter();

	const [staff, setStaff] = useState<Staff | null>(null);
	const [about, setAbout] = useState("");

	const save = () => {
		axios({
			url: `/api/staff/update`,
			method: "PUT",
			data: {
				about: staff!.about,
				social: staff!.social,
			},
		})
			.then(() => {
				toast.dark("Done.");
			})
			.catch((e) => {
				toast(e);
			});
	};

	useEffect(() => {
		axios(`/api/staff/get?id=${user!.id}`).then((data) => {
			setAbout(data.data.staff.about);
			setStaff(data.data.staff);
		});
	}, []);

	useEffect(() => {
		if (staff) {
			const copy = { ...staff };
			copy.about = about;
			setStaff(copy as Staff);
		}
	}, [about]);

	return (
		<Container title="Control" user={user}>
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
							Personalize your staff card.
						</div>
						{staff !== null && (
							<div className="flex space-x-4">
								<div className="flex flex-col space-y-2">
									<StaffCard member={staff} />
									<Button
										size="medium"
										className="text-white bg-gray-300 dark:bg-dank-300 dark:hover:bg-opacity-75 hover:bg-opacity-75"
										onClick={() => save()}
									>
										Save
									</Button>
								</div>
								<div className="flex flex-col flex-1 space-y-2">
									<textarea
										className="w-fullbg-light-500 dark:bg-dark-200 drop-shadow-xl dark:drop-shadow-none p-3 outline-none text-black dark:text-light-300 text-sm resize-none h-24 rounded-md placeholder-gray-500"
										maxLength={1024}
										onChange={(e) =>
											setAbout(e.target.value)
										}
										value={about}
										placeholder={"..."}
									/>
									{[
										"Discord",
										"GitHub",
										"GitLab",
										"Instagram",
										"Reddit",
										"Spotify",
										"Twitch",
										"Twitter",
										"Website",
										"YouTube",
									].map((social) => (
										<div className="flex space-x-4 items-center">
											<div>
												<img
													src={`/img/socials/${social}.svg`}
													className="w-8"
												/>
											</div>
											<div>
												{" "}
												<textarea
													className="w-96 bg-light-500 dark:bg-dark-200 drop-shadow-xl dark:drop-shadow-none p-3 outline-none overflow-hidden text-black dark:text-light-300 text-sm resize-none h-9 rounded-md placeholder-gray-500"
													maxLength={1024}
													onChange={(e) => {
														const copy = {
															...staff,
														};
														copy.social[social] =
															e.target.value;
														setStaff(copy);
													}}
													value={
														staff.social[social] ||
														""
													}
													placeholder={"..."}
												/>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = withSession(staffRoute);
