import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Container from "../components/ui/Container";
import { PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

interface BlockProps {
	title?: string;
	children: ReactNode;
	icon?: string;
	customIcon?: ReactNode;
	onClick?: () => void;
}

function Block({ title, children, icon, customIcon, onClick }: BlockProps) {
	return (
		<div
			className={clsx(
				"flex justify-between space-x-4 items-center bg-light-500 dark:bg-dark-400 rounded-md p-8",
				onClick && "cursor-pointer"
			)}
			onClick={onClick}
		>
			<div className="bg-gray-300 dark:bg-dank-500 rounded-full flex items-center justify-center p-4 text-dank-300">
				{customIcon || <span className="material-icons">{icon}</span>}
			</div>
			<div className="flex flex-col ">
				<div className="text-2xl font-bold font-montserrat text-dark-400 dark:text-white">
					{title}
				</div>
				<div className="flex flex-col space-y-2 text-gray-500 dark:text-gray-400 leading-5">
					{children}
				</div>
			</div>
		</div>
	);
}

export default function LandingPage({ user }: PageProps) {
	const router = useRouter();

	return (
		<Container title="Landing" user={user}>
			<div className="relative my-16">
				<div className="flex flex-col items-center space-y-8">
					<div className="text-dark-400 dark:text-white font-montserrat flex flex-col items-center -space-y-4">
						<div className="text-4xl font-bold">
							THANKS FOR ADDING
						</div>
						<div className="text-[80px] font-bold">DANK MEMER</div>
						<div className="text-lg text-center max-w-3xl">
							To help you get started using our bot you can take a
							look around this website where most aspects of the
							bot are documented.
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
						<Block title="Commands" icon="article">
							See all of the commands Dank Memer has to offer your
							server!
						</Block>
						<Block
							title="FAQ"
							icon="help_outline"
							onClick={() => router.push("/faq")}
						>
							Have some questions? See if we've already answered
							it on this page!
						</Block>
						<Block
							title="Support"
							icon="support_agent"
							onClick={() =>
								router.push("https://discord.gg/dankmemerbot")
							}
						>
							FAQ page not enough to help? Head over to our
							support server!
						</Block>
						<Block
							title="Items"
							icon="category"
							onClick={() => router.push("/items")}
						>
							See all of the commands Dank Memer has to offer your
							server!
						</Block>
						<Block
							title="Premium"
							customIcon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke="currentColor"
									fill="none"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<path d="M3 3h3v18h-3z" />
									<circle cx="15" cy="9.5" r="6.5" />
								</svg>
							}
							onClick={() =>
								router.push(
									"https://www.patreon.com/join/dankmemerbot"
								)
							}
						>
							Click here to head to Patreon to see our premium
							perk selections!
						</Block>
						<Block
							title="Loot boxes"
							icon="inventory_2"
							onClick={() => router.push("/loot")}
						>
							Dank Memer? More like EA: Memer edtion, come check
							out our "surprise mechanics"!
						</Block>
						<Block
							title="Twitter"
							customIcon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke="currentColor"
									fill="none"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
								</svg>
							}
							onClick={() =>
								router.push("https://twitter.com/dankmemerbot")
							}
						>
							Follow us on Twitter! We love interacting with you
							all and shitposting :^&#41;
						</Block>
						<Block
							title="Reddit"
							customIcon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke="currentColor"
									fill="none"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<path d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14z" />
									<path d="M12 8l1 -5l6 1" />
									<circle cx="19" cy="4" r="1" />
									<circle
										cx="9"
										cy="13"
										r=".5"
										fill="currentColor"
									/>
									<circle
										cx="15"
										cy="13"
										r=".5"
										fill="currentColor"
									/>
									<path d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5" />
								</svg>
							}
							onClick={() =>
								router.push(
									"https://www.reddit.com/r/dankmemer/"
								)
							}
						>
							Check out, and take part in, our official subreddit!
						</Block>
						<Block
							title="Community"
							icon={"people"}
							onClick={() =>
								router.push("https://discord.gg/memers")
							}
						>
							<p className="group">
								Join and meet other users in our public server.{" "}
								<span className="opacity-0 group-hover:opacity-100 transition">
									<b>Just please don't ping the devs</b>!
								</span>
							</p>
						</Block>
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
