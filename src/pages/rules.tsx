import { GetServerSideProps } from "next";
import { ReactNode } from "react";
import Container from "../components/ui/Container";
import { PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

interface RuleProps {
	title: string;
	description: string;
	children: ReactNode;
}

function Rule({ title, description, children }: RuleProps) {
	return (
		<div className="flex flex-col space-y-1 p-6 bg-gray-200 dark:bg-dark-200">
			<div className="text-2xl font-bold font-montserrat text-dark-400 dark:text-white">
				{title}
			</div>
			<div className="text-md font-montserrat text-dark-400 dark:text-white">
				{description}
			</div>
			<div className="flex flex-col space-y-2 text-gray-500 dark:text-gray-400 leading-5">
				{children}
			</div>
		</div>
	);
}

export default function Rules({ user }: PageProps) {
	return (
		<Container title="Rules" user={user}>
			<div className="max-w-4xl xl:max-w-4xl mx-8 lg:mx-auto relative my-16">
				<div className="flex flex-col space-y-2">
					<div className="text-dark-400 dark:text-white text-6xl font-bold font-montserrat">
						Dank Memer Rules
					</div>
					<div className="font-montserrat text-gray-400">
						By using Dank Memer, you agree to the following rules.
						If you break any rules we reserve the right to remove
						your access to any and all Dank Memer services.
					</div>
				</div>
				<div className="mt-8 flex flex-col space-y-4">
					<Rule
						title="Rule One"
						description="User-bots, Spamming and Macros"
					>
						Usage of user-bots, macros, scripts, auto-typers or
						anything else enabling automation of commands is
						strictly forbidden. In addition to this, massive amounts
						of spam is not allowed and will be punished with equal
						severity.
					</Rule>
					<Rule title="Rule Two" description="Sharing Exploits">
						<div>
							Sharing exploits or exploitative bugs with other
							users is forbidden. Please report all exploits and
							bugs to staff on the{" "}
							<a
								href="https://discord.gg/meme"
								target="_blank"
								className="text-dank-300"
							>
								Dank Memer Support Server
							</a>{" "}
							so that we can fix it as soon as possible.
						</div>
					</Rule>
					<Rule
						title="Rule Three"
						description="Giveaway Requirements or Bot Usage Requirements in Your Server"
					>
						You should not lock the bot, or giveaways for the bot,
						behind paywalls. This means stuff like patreon roles,
						donor roles (with irl money), etc, is forbidden for
						giveaway requirements or role locks. The only exception
						to this is boosters, we will allow you to lock things
						behind being a booster for your server. Things like
						level locks using external bots is perfectly fine.
					</Rule>
					<Rule
						title="Rule Four"
						description="Racism, Homophobia, Sexism or Slurs"
					>
						None of the above will be tolerated through usage of
						Dank Memer. We will not punish you for what you say
						outside of the usage of our commands. Evidence found of
						this done through our commands will result in
						punishment.
					</Rule>
					<Rule title="Rule Five" description="Advertisement">
						Usage of Dank Memer to advertise or promote anything
						will result in a punishment. This includes other Discord
						servers. Giving our currency in exchange for invites to
						your server is also forbidden.
					</Rule>
					<Rule title="Rule Six" description="Real Money Trading">
						Dank Memer's currency is not to be traded for real
						money, discord nitro, or to other bot currency. Buying
						anything with real money outside of our patreon and
						website, will get you a ban.
					</Rule>
					<Rule title="Rule Seven" description="Etiquette">
						Starting harmful rumors about the bot, causing
						unnecessary drama within our servers about the bot, or
						witch hunting staff members are all ban worthy
						behaviors.
					</Rule>
					<Rule
						title="Rule Eight"
						description="Discord Terms of Service and Usage Guidelines"
					>
						<div>
							Through usage of Dank Memer, you accept{" "}
							<a
								href="/terms"
								target="_blank"
								className="text-dank-300"
							>
								Dank Memer's Terms of Service
							</a>{" "}
							and{" "}
							<a
								href="/privacy"
								target="_blank"
								className="text-dank-300"
							>
								Privacy Policy
							</a>{" "}
							. Additionally, you accept Discord's{" "}
							<a
								href="https://discord.com/terms"
								target="_blank"
								className="text-dank-300"
							>
								Terms of Service
							</a>{" "}
							and{" "}
							<a
								href="https://discord.com/guidelines"
								target="_blank"
								className="text-dank-300"
							>
								Community Guidelines
							</a>{" "}
							, these of which are enforceable through Dank Memer.
						</div>
					</Rule>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
