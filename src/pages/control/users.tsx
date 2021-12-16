import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "react-toastify";
import { ControlCard } from "../../components/ControlCard";
import Container from "../../components/ui/Container";
import GoBack from "../../components/ui/GoBack";
import { PageProps } from "../../types";
import { developerRoute } from "../../util/redirects";
import { withSession } from "../../util/session";
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

export default function ControlUserPage({ user }: PageProps) {
	const [modalContent, setModalContent] = useState({});

	return (
		<Container title="Control" user={user}>
			<div className="mx-8 xl:mx-0">
				<div className="flex flex-col my-20 space-y-8">
					<div className="flex flex-col space-y-4 mb-24">
						<GoBack />
						<div className="font-bold font-montserrat text-3xl text-dank-300 dark:text-light-100">
							Control bot users
						</div>
						<div className="flex justify-between flex-col xl:flex-row space-y-4 xl:space-y-0">
							<ControlCard
								endpoint="/api/user/ban?id={{input}}&type={{dropdown}}"
								label="Restrict a user's access"
								icon="remove"
								type="destructive"
								input={{
									icon: "badge",
									placeholder: "Account ID",
								}}
								dropdown={{
									icon: "desktop_access_disabled",
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
								finish={() => {
									toast.dark(
										"The requested user has been banned!"
									);
								}}
							/>
							<ControlCard
								endpoint="/api/user/unban?id={{input}}&type={{dropdown}}"
								label="Reinstate a user's access"
								icon="done"
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
								finish={() => {
									toast.dark(
										"The requested user has been unbanned!"
									);
								}}
							/>
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
							<ControlCard
								endpoint="/api/transaction/get?{{dropdown}}={{input}}"
								label="Find a store purchases"
								icon="payments"
								type="normal"
								input={{
									icon: "person",
									placeholder: "User details",
								}}
								dropdown={{
									icon: "find_in_page",
									initial: "Find by",
									options: [
										{
											text: "Account ID",
											value: "Discord ID",
										},
										{
											text: "Payment ID",
											value: "Payment ID",
										},
										{
											text: "PayPal E-Mail",
											value: "PayPal E-Mail",
										},
										{
											text: "Full name",
											value: "Full Name",
										},
									],
								}}
								finish={(data) => {
									switch (data.status) {
										case 200:
											setModalContent(data.data);
											break;
										case 204:
											toast.dark(
												"No purchase with that information was found."
											);
											break;
										default:
											toast.dark(
												"Something went wrong while trying to find that purchase. Please try again."
											);
									}
								}}
							/>
						</div>

						<DynamicReactJson
							src={modalContent}
							collapsed={true}
							theme="codeschool"
							style={{
								padding: "8px",
								borderRadius: "10px",
							}}
						/>
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(developerRoute);
