import { GetServerSideProps } from "next";
import { ReactNode } from "react";
import Container from "../components/ui/Container";
import { PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

interface BlockProps {
	title: string;
	children: ReactNode;
}

function Block({ title, children }: BlockProps) {
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

export default function AboutPage({ user }: PageProps) {
	return (
		<Container title="About" user={user}>
			<div className="relative max-w-4xl my-16">
				<div className="flex flex-col space-y-2">
					<div className="text-dark-400 dark:text-white text-6xl font-bold font-montserrat">
						About Dank Memer
					</div>
				</div>
				<div className="mt-8 flex flex-col space-y-4">
					<Block title="What is Dank Memer?">
						Dank Memer is a multipurpose yet unique bot, made
						specifically with "memes" in mind. We do everything that
						your average multipurpose bot does, but much better and
						with 100% more sass and memes. Dank Memer is a top notch
						Meme bot, currency bot, image manipulation bot, and so
						much more! We have over 250 commands, and that keeps
						growing. Anything you want or need in your server, we
						probably handle it!
					</Block>
					<Block title="Why Dank Memer?">
						Heyo, Melmsie here. Dank Memer was my very first
						programming project, used for me to learn JavaScript in
						late 2016. I realized that there weren't any decent bots
						doing "memey" things yet. So I made 3 commands
						!meme,!trigger, and cleverbot. I wanted the bot to be
						sassy and funny from the start, and from that the idea
						of Dank Memer was born. I renamed the bot from Markos to
						Dank Memer, and created it's current account and listed
						it publically in January of 2017. The rest is history!
					</Block>
					<Block title="Why are there paid perks?">
						For the first year of Dank Memer, there was little to no
						paid features. We really did (and still do) push
						ourselves to make the most accessible bot we could, and
						we know not everyone can afford to pay for things.
						Eventually, our server costs grew, and our work hours
						with it. We had to make the decision to add premium
						content. For a while we broke even with server costs,
						and our development time was falling due to IRL issues.
						Once Melmsie decided to work on the bot full time as a
						job, things started picking back up again. Soon after,
						he was able to raise the bot's income and hire 3 more
						devs. From there, the bot grew into a fully functional
						business, and Melmsie now employs 5 people to help with
						it all! Now while we will always have premium perks, the
						base features and a vast majority of our commands will
						always be free. And to those who financially supported
						us, thank you. Dank Memer wouldn't be alive without you.
					</Block>
					<Block title="Adding Dank Memer">
						<span>
							<a
								href="https://invite.dankmemer.lol/"
								target="_blank"
								className="text-dank-300"
							>
								Dank Memer
							</a>{" "}
							is able to be added to any server by someone with
							Manage Server permissions on said server. For most
							commands, all you need for bot permissions are Send
							Messages, Read Messages, and Embed Links.
						</span>
					</Block>
					<Block title="Bot Prefix">
						<div>
							By default, Dank Memer's prefix is pls. Commands are
							run like pls meme, there must be a space!
						</div>
						<div>
							You are able to change the prefix with pls prefix
							(prefix of your choice). Right now you have to keep
							the space, but this may change in the future.
						</div>
						<div>
							Prefixes are customizable per server, and if you
							forget the server's custom prefix you can run @Dank
							Memer hello and the bot will return the current
							prefix to you.
						</div>
					</Block>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
