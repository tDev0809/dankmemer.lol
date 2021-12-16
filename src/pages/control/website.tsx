import { GetServerSideProps } from "next";
import { toast } from "react-toastify";
import { ControlCard } from "../../components/ControlCard";
import Container from "../../components/ui/Container";
import GoBack from "../../components/ui/GoBack";
import { PageProps } from "../../types";
import { developerRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function ControlWebsitePage({ user }: PageProps) {
	return (
		<Container title="Control" user={user}>
			<div className="mx-8 xl:mx-0">
				<div className="flex flex-col my-20 space-y-8">
					<div className="flex flex-col space-y-4">
						<GoBack />
					</div>
					<div className="font-bold font-montserrat text-3xl text-dank-300 dark:text-light-100">
						Website management
					</div>
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 space-x-0 lg:space-x-4">
						<ControlCard
							endpoint="/api/discount/add?percent={{input}}&expiry={{dropdown}}"
							label="Start a lootbox sale"
							icon="store"
							type="normal"
							input={{
								icon: "local_offer",
								placeholder: "Sale percentage",
							}}
							dropdown={{
								icon: "date_range",
								initial: "Sale duration",
								options: [
									{
										text: "1 Day",
										value: "24",
									},
									{
										text: "3 Days",
										value: "72",
									},
									{
										text: "1 Week",
										value: "168",
									},
								],
							}}
							finish={() => {
								toast.dark("The discount has been added!");
							}}
						/>
						<ControlCard
							endpoint="/api/announcement/add?content={{input}}"
							alloweEmptyInput={true}
							label="Add a new announcement"
							icon="campaign"
							type="normal"
							input={{
								icon: "chat_bubble",
								placeholder: "Banner message",
							}}
							finish={() => {
								toast.dark(
									"The announcement banner has been updated."
								);
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
