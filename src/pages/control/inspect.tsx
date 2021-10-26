import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ControlCard } from "../../components/ControlCard";
import Container from "../../components/ui/Container";
import { PageProps } from "../../types";
import { staffRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function ControlInspectPage({ user }: PageProps) {
	const router = useRouter();

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
							Inspect users
						</div>
						<div>
							<ControlCard
								endpoint="/api/user/bans?id={{input}}&type={{dropdown}}"
								label="Review a user's access"
								icon="person_search"
								type="normal"
								input={{
									icon: "badge",
									placeholder: "Account ID",
								}}
								dropdown={{
									icon: "desktop_windows",
									initial: "Ban type",
									options: [
										{
											text: "Any reason",
											value: "Any",
										},
										{
											text: "Appeal ban",
											value: "Appeal",
										},
										{
											text: "Store ban",
											value: "Lootbox",
										},
										{
											text: "Feedback ban",
											value: "Feedback",
										},
									],
								}}
								finish={({ data }) => {
									toast.dark(
										<span>
											That user currently has{" "}
											<b>
												{data.length} ban
												{data.length === 1 ? "" : "s"}
											</b>{" "}
											related to{" "}
											<b>
												{data.length === 1
													? data[0].toLowerCase() ===
													  "appeal"
														? "an " +
														  data[0].toLowerCase()
														: "a " +
														  data[0].toLowerCase()
													: "both reasons"}
											</b>
										</span>
									);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = withSession(staffRoute);
