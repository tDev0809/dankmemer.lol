import { GetServerSideProps } from "next";
import { ReactNode } from "react";
import Container from "../components/ui/Container";
import { PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

const LAST_UPDATE = "July 12th, 2019";

interface SectionProps {
	title?: string;
	children: ReactNode;
}

function Section({ title, children }: SectionProps) {
	return (
		<div className="flex flex-col space-y-2">
			<div className="text-2xl font-bold font-montserrat text-dark-400 dark:text-white">
				{title}
			</div>
			<div className="flex flex-col space-y-2 text-gray-500 dark:text-gray-400 leading-5">
				{children}
			</div>
		</div>
	);
}

export default function Refunds({ user }: PageProps) {
	return (
		<Container title="Refunds" user={user}>
			<div className="max-w-6xl relative my-16">
				<div className="flex flex-col space-y-2">
					<div className="text-dank-300 text-6xl font-bold font-montserrat">
						Refund Policy
					</div>
					<div className="font-montserrat font-bold text-dark-400 dark:text-white">
						Last updated: {LAST_UPDATE}
					</div>

					<Section title="PayPal Refunds">
						<div>
							We will issue refunds in certain cases. We will
							never accept "bully refund requests" aka PayPal
							chargebacks or emails demanding we refund "or else".
							Honestly, the nicer you are, the more likely we are
							to give you a full refund. If you choose to
							chargeback without first consulting us about a
							refund, we reserve the right to ban you and anyone
							associated with you from the bot.
						</div>
						<div className="text-lg text-dark-400 dark:text-white font-bold">
							Reasons for potential refunds:
						</div>
						<ul className="list-disc ml-4 space-y-2">
							<li>
								Fraud/Unauthorized Payments (requires proof, as
								this is the most common "bs" chargeback)
							</li>
							<li>
								Issues with getting lootboxes or donor perks To
								request a refund for a PayPal order please email
								us at help@dankmemer.gg
							</li>
						</ul>
					</Section>

					<Section title="Patreon Refunds">
						<div>
							We will issue refunds in very rare cases. The nicer
							you are, the more likely we are to give you a refund
							for up to a month worth of donor perks.
						</div>
						<div className="text-lg text-dark-400 dark:text-white font-bold">
							Reasons for potential refunds:
						</div>
						<ul className="list-disc ml-4 space-y-2">
							<li>Issues with getting donor perks</li>
							<li>
								Patreon API removes your perks before the end of
								the month (although we're more likely to just
								give you perks to finish out the month) To
								request a refund for a Patreon pledge, please
								use the message system on patreon, or email us
								at help@dankmemer.gg
							</li>
						</ul>
					</Section>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
