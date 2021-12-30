import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { PageProps } from "../../types";
import { unauthenticatedRoute, developerRoute } from "../../util/redirects";
import { withSession } from "../../util/session";
import { sanitizeCategory } from "../../util/community";

const postsData = [
	{
		category: "currency_items",
		posts: 368,
		accepted: 7,
	},
	{
		category: "currency_commands",
		posts: 388,
		accepted: 18,
	},
	{
		category: "currency_balances",
		posts: 108,
		accepted: 5,
	},
	{
		category: "new_features",
		posts: 298,
		accepted: 4,
	},
	{
		category: "qol_changes",
		posts: 93,
		accepted: 9,
	},
	{
		category: "patreon_and_lootboxes",
		posts: 31,
		accepted: 2,
	},
	{
		category: "website",
		posts: 7,
		accepted: 1,
	},
	{
		category: "pipe_dream",
		posts: 105,
		accepted: 1,
	},
	{
		category: "other",
		posts: 389,
		accepted: 7,
	},
];

export default function Recap({ user }: PageProps) {
	return (
		<div className="h-screen relative">
			<style
				dangerouslySetInnerHTML={{
					__html: `
					html {
						overflow: scroll;
						overflow-x: hidden;
					}
					::-webkit-scrollbar {
						width: 0;  /* Remove scrollbar space */
						background: transparent;  /* Optional: just make scrollbar invisible */
					}
					/* Optional: show position indicator in red */
					::-webkit-scrollbar-thumb {
						background: #FF0000;
					}
			`,
				}}
			/>

			<NextSeo title={`Dank Memer | 2021`} />
			<div className="absolute h-screen z-[-10]">
				<img
					className="absolute right-0 -top-16"
					src="/img/recap/2021/shapes/HEAD-TR-squares.png"
				/>
				<img src="/img/recap/2021/blurs/one.png" />
				<img src="/img/recap/2021/blurs/two.png" />
				<img src="/img/recap/2021/blurs/three.png" />
				<img src="/img/recap/2021/blurs/four.png" />
			</div>

			<div className="flex flex-col items-center">
				<div className="flex space-x-12 mt-52">
					{Array.from({ length: 5 }, (_, i: number) => 2017 + i).map(
						(year) => (
							<div className="relative">
								<div className="font-semibold font-montserrat text-light-600 text-3xl">
									{year}
								</div>
								<img
									className="absolute top-4 scale-125"
									src={`/img/recap/2021/misc/${year}-line.png`}
								/>
							</div>
						)
					)}
					<div className="relative">
						<div className="font-semibold font-montserrat text-white text-3xl">
							2022
						</div>
						<img
							className="absolute top-1 scale-150"
							src={`/img/recap/2021/misc/2022-circle.png`}
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-4 mt-14 relative">
					<div className="flex flex-col items-center">
						<div className="text-6xl text-white font-bold font-montserrat">
							DANK MEMER
						</div>
						<div className="text-4xl font-bold font-montserrat text-neutral-400">
							Community Recap
						</div>
					</div>
					<div className="text-neutral-300 leading-5 text-center">
						2021 was both an insane and intense year for Dank Memer.
						<br />
						Join us as we look back over what we achieved this year!
					</div>
					<img
						className="absolute scale-[0.6] -left-80 -rotate-45"
						src="/img/recap/2021/emojis/pepeDS.gif"
					/>
					<img
						className="absolute scale-[0.4] -right-80 top-10 rotate-[30deg]"
						src="/img/recap/2021/emojis/peepoClap.gif"
					/>
					<img
						className="absolute scale-[0.6] -right-80 -top-52 -rotate-[30deg]"
						src="/img/recap/2021/emojis/pepoCheer.gif"
					/>
				</div>

				<div className="mt-96 text-neutral-400 text-sm font-montserrat font-bold">
					SCROLL FOR THE RECAP
				</div>

				<div className="mt-36 w-8/12 flex flex-col space-y-4">
					<div className="flex justify-between font-bold text-3xl font-montserrat">
						{"EXPANSION".split("").map((letter) => (
							<div>{letter}</div>
						))}
					</div>

					<div className="text-center text-lg leading-6 text-neutral-300">
						<div>
							For the second year in a row, we experienced some
							insane growth for Dank Memer.
						</div>
						<div>
							Gaining an additional{" "}
							<span className="text-dank-300">3.6 million</span>{" "}
							servers in 2021, slingshotting us past the{" "}
							<span className="text-dank-300">8 million</span>
						</div>
						<div>mark by the end of the year!</div>
					</div>
				</div>

				<div className="mt-36 flex flex-col text-center relative items-center space-y-8">
					<div>
						<div className="font-bold text-3xl font-montserrat">
							IT IS ALL ABOUT YOU
						</div>
						<div className="text-neutral-300 text-lg leading-6">
							<div>
								2021 was the year we introduced a massive
								community feature on our website.
							</div>
							<div>
								Providing the team an outlet to hear your voice
								and understand what the community
							</div>
							<div>
								really wants. With this, we found out you wanted
								to tell us <span>a lot</span>.
							</div>
						</div>
					</div>
					<div className="flex space-x-12">
						{[
							[1000, "COMMENTS POSTED"],
							[1700, "POSTS CREATED"],
							[10000, "UPVOTES MADE"],
						].map(([amount, name]) => (
							<div className="bg-dark-100 px-12 py-8 rounded-md w-72">
								<div className="flex flex-col">
									<div className="text-dank-100 font-bold font-montserrat text-2xl">
										{amount.toLocaleString()}+
									</div>
									<div className="font-bold font-montserrat">
										{name}
									</div>
								</div>
							</div>
						))}
					</div>
					<img
						className="absolute scale-[0.6] -right-80 -top-40 -rotate-[60deg]"
						src="/img/recap/2021/shapes/blue-square.png"
					/>
					<img
						className="absolute right-5 -top-10 -rotate-[120deg]"
						src="/img/recap/2021/shapes/blue-triangle.png"
					/>
					<img
						className="absolute -right-40 top-10"
						src="/img/recap/2021/shapes/purple-circle.png"
					/>
					<img
						className="absolute left-40 -top-20"
						src="/img/recap/2021/shapes/green-circle.png"
					/>
					<img
						className="absolute left-32 top-10 rotate-[60deg] scale-50"
						src="/img/recap/2021/shapes/yellow-pentagon.png"
					/>
					<img
						className="absolute -left-40 top-10"
						src="/img/recap/2021/shapes/pink-circle.png"
					/>
					<img
						className="absolute -left-96 -top-20 rotate-[50deg] scale-110"
						src="/img/recap/2021/shapes/red-triangle.png"
					/>
				</div>

				<div className="mt-96 flex flex-col space-y-4 w-full">
					<img
						className="absolute w-full"
						src="/img/recap/2021/misc/wavy-lines.png"
					/>
					<div className="text-center">
						<div className="text-3xl font-bold font-montserrat">
							SEEMS LIKE YOU HAVE SOME FAVOURITES
						</div>
						<div className="text-neutral-300">
							It is quite obvious that you all like to talk about
							specific aspects of the bot much
						</div>
						<div className="text-neutral-300">
							more than others. No hard feelings
						</div>
					</div>
					<div className="flex justify-center">
						<div className="flex flex-col space-y-4 w-6/12">
							{postsData
								.sort((a, z) => z.posts - a.posts)
								.map((data) => (
									<div className="flex space-x-4 items-center w-full">
										<div
											style={{
												width: `${Math.max(
													(data.posts / 400) * 100,
													9
												)}%`,
											}}
											className="h-8 rounded-full bg-dank-200 relative"
										>
											<div className="absolute top-1 right-3">
												{data.posts.toLocaleString()}{" "}
												posts
											</div>
										</div>
										<div className="w-60">
											{sanitizeCategory(data.category)}{" "}
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
				<div className="mt-96 flex flex-col space-y-4 w-full">
					<div className="text-center">
						<div className="text-3xl font-bold font-montserrat">
							NOT JUST A DISCUSSION
						</div>
						<div className="text-neutral-300">
							Though it may not seem like it, the feedback
							provided by our community is very valuable
						</div>
						<div className="text-neutral-300">
							to the entire team behind Dank Memer.
						</div>
					</div>
					{/* <div>...</div> */}
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(developerRoute);