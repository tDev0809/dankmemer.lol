import axios from "axios";
import clsx from "clsx";
import { formatDistance } from "date-fns";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Avatar } from "../../../components/Avatar";
import { Badge } from "../../../components/Badge";
import { BlogPost } from "../../../components/community/blog/BlogPost";
import { ViewMore } from "../../../components/community/blog/ViewMore";
import { PostCard } from "../../../components/community/PostCard";
import Button from "../../../components/ui/Button";
import Container from "../../../components/ui/Container";
import Dropdown from "../../../components/ui/Dropdown";
import Input from "../../../components/ui/Input";
import { Activity, PageProps, Profile, User } from "../../../types";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";

function Actions({ user, profile }: { user: User; profile: Profile }) {
	const swap = (role: string) => {
		axios
			.patch(`/api/user/role/?role=${role}&id=${profile.user.id}`)
			.then(({}) => {
				location.reload();
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	const ban = () => {
		axios
			.patch(`/api/user/ban/?type=Community&id=${profile.user.id}`)
			.then(({}) => {
				location.reload();
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	return (
		<div>
			<Dropdown
				content={
					<Button variant="dark" className="w-48">
						Perform Action
					</Button>
				}
				options={[
					user?.modManager
						? {
								label: `${
									profile.user.moderator ? "Remove" : "Add"
								} Moderator`,
								onClick: () => {
									swap("moderator");
								},
						  }
						: null,
					user?.developer
						? {
								label: `${
									profile.user.modManager ? "Remove" : "Add"
								}  Mod Manager`,
								onClick: () => {
									swap("modManager");
								},
						  }
						: null,
					user?.developer
						? {
								label: `${
									profile.user.botModerator ? "Remove" : "Add"
								} Bot Moderator`,
								onClick: () => {
									swap("botModerator");
								},
						  }
						: null,
					user?.developer
						? {
								label: `${
									profile.user.honorable ? "Remove" : "Add"
								} Honorable`,
								onClick: () => {
									swap("honorable");
								},
						  }
						: null,
					{
						label: "Ban",
						onClick: () => {
							ban();
						},
						variant: "danger",
					},
				]}
			/>
		</div>
	);
}

function ActivityCard({ activity }: { activity: Activity }) {
	let text = "???";
	let icon = "???";
	let link = "???";

	switch (activity.type) {
		case 0:
			text = `Created a post titled '${activity.data.title}'`;
			icon = "post_add";
			link = `/community/post/${activity.data.id}`;
			break;
		case 1:
			text = `Commented on a post titled '${activity.data.postTitle}'`;
			icon = "chat_bubble_outline";
			link = `/community/post/${activity.data.postId}`;
			break;
		case 2:
			text = `Replied to a comment on a post titled '${activity.data.postTitle}'`;
			icon = "reply";
			link = `/community/post/${activity.data.postId}`;
			break;
	}

	return (
		<Link href={link}>
			<a className="bg-light-500 dark:bg-dark-100 rounded-md text-sm p-4">
				<div className="flex space-x-4 items-center">
					<div className="h-10 w-10 bg-light-400 dark:bg-dank-400 rounded-full flex items-center justify-center text-black dark:text-white">
						<div
							className="material-icons"
							style={{ fontSize: "20px" }}
						>
							{icon}
						</div>
					</div>
					<div className="text-sm flex-1">
						<div className="text-black dark:text-white break-all">
							{text}
						</div>
						<div className="text-light-600">
							{formatDistance(
								new Date(activity.createdAt),
								new Date(),
								{
									addSuffix: true,
								}
							)}
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
}

export default function ProfilePage({ user }: PageProps) {
	const [profile, setProfile] = useState<Profile>();
	const [rank, setRank] = useState(0);
	const [editing, setEditing] = useState(false);

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		axios(`/api/community/profile/get/${id}`)
			.then(({ data }) => {
				setProfile(data);
				if (data.user.vanity) {
					router.replace(`/community/profile/${data.user.vanity}`);
				}

				axios(`/api/community/contributors/place/${data.user.id}`).then(
					({ data }) => {
						setRank(data.place);
					}
				);
			})
			.catch(() => {
				router.push("/community/");
			});
	}, []);

	const updateProfile = () => {
		axios
			.patch(`/api/user/update/`, {
				data: profile!.user,
			})
			.then(({}) => {
				router.replace(
					`/community/profile/${
						profile!.user.vanity || profile!.user.id
					}`
				);
				toast.dark("Saved!");
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	const switchPerks = () => {
		axios
			.patch(`/api/user/perks?id=${profile?.user.id}`)
			.then(({}) => {
				const copy = { ...profile } as Profile;
				copy.user.perks = !!!profile!.user.perks;
				setProfile(copy);
				toast.dark("Saved!");
			})
			.catch((e) => {
				toast.dark(e.response.data.error);
			});
	};

	return (
		<Container title="Profile" user={user}>
			<div className="flex flex-col my-8 space-y-4">
				{profile && (
					<div className="flex flex-col space-y-2">
						<div className="relative flex flex-col justify-end h-auto">
							<div
								className={clsx(
									"z-[-1] w-full rounded-lg bg-blend-multiply bg-cover bg-center bg-no-repeat",
									profile.user.banner ? "h-56" : "h-32"
								)}
								style={{
									backgroundImage: `url("${
										profile.user.banner || "/img/banner.png"
									}")`,
								}}
							></div>
						</div>

						<div className="flex flex-col space-y-8 px-8">
							<div className="flex justify-between">
								<div className="flex space-x-2 items-center relative">
									<div className="w-[120px]">
										<div className="absolute -top-16 hidden md:inline-block">
											<Avatar
												id={profile.user.id}
												link={
													profile.user.avatar +
													"?size=512"
												}
												size="120px"
												className="border-4 border-light-500 dark:border-dark-300 rounded-full"
											/>
										</div>
										<div className="inline-block md:hidden">
											<Avatar
												id={profile.user.id}
												link={
													profile.user.avatar +
													"?size=512"
												}
												size="96px"
												className="border-4 border-light-500 dark:border-dark-300 rounded-full"
											/>
										</div>
									</div>
									<div className="flex flex-col">
										<div className="flex items-baseline">
											<div className="text-2xl font-bold text-black dark:text-white">
												{profile.user.name}
											</div>
											<div className="text-sm text-light-600 font-bold">
												#{profile.user.discriminator}
											</div>
										</div>
										<div className="flex flex-col md:flex-row space-x-1 md:items-center space-y-1">
											{rank != -1 && (
												<div className="flex md:inline-block">
													<div className="text-xs bg-light-500 dark:bg-dank-500 text-dank-200 dark:text-dank-100 px-2 py-0.5 rounded-md">
														Rank #
														{rank.toLocaleString()}
													</div>
												</div>
											)}
											<div>
												{profile.user.developer && (
													<Badge role="developer" />
												)}
												{profile.user.moderator && (
													<Badge role="moderator" />
												)}
												{profile.user.botModerator && (
													<Badge role="botModerator" />
												)}
												{profile.user.modManager && (
													<Badge role="modManager" />
												)}
												{profile.user.honorable && (
													<Badge role="honorable" />
												)}
											</div>
										</div>
									</div>
								</div>
								<div className="space-x-4 items-center hidden md:flex">
									{(user?.moderator ||
										user?.honorable ||
										user?.perks) &&
										(user.id == profile.user.id ||
											user.developer) && (
											<Button
												variant="dark"
												onClick={() =>
													setEditing(!editing)
												}
											>
												Edit Profile
											</Button>
										)}

									{user?.moderator && (
										<Actions
											user={user!}
											profile={profile}
										/>
									)}

									{user?.moderator && (
										<Button
											variant="dark"
											onClick={() => switchPerks()}
										>
											{profile.user.perks
												? "Remove"
												: "Grant"}{" "}
											Perks
										</Button>
									)}
								</div>
							</div>

							{editing && (
								<div className="bg-light-500 dark:bg-dark-100 rounded-md flex flex-col space-y-2 p-4">
									<Input
										onChange={(e) => {
											const copy = { ...profile };
											copy.user.vanity = e.target.value;
											setProfile(copy);
										}}
										variant="short"
										placeholder="dankmemer"
										label="Vanity"
										value={profile.user.vanity || ""}
									/>
									<Input
										onChange={(e) => {
											const copy = { ...profile };
											copy.user.banner = e.target.value;
											setProfile(copy);
										}}
										variant="short"
										label="Banner URL"
										placeholder="https://imgur.com/nVqkxS0.png"
										value={profile.user.banner || ""}
									/>
									{(user?.moderator || user?.honorable) && (
										<>
											<Input
												onChange={(e) => {
													const copy = { ...profile };
													copy.user.about =
														e.target.value;
													setProfile(copy);
												}}
												variant="short"
												label="About"
												placeholder="I love dank memer"
												value={profile.user.about || ""}
											/>

											<div className="text-sm text-black dark:text-white">
												Socials
											</div>
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
												<div className="flex items-center space-x-2">
													<div>
														<img
															src={`/img/socials/${social}.svg`}
															className="w-8"
														/>
													</div>
													<Input
														onChange={(e) => {
															const copy = {
																...profile,
															};
															if (
																!copy.user
																	.socials
															) {
																copy.user.socials =
																	{};
															}
															copy.user.socials[
																social
															] = e.target.value;
															setProfile(copy);
														}}
														variant="short"
														block
														placeholder="https://dankmemer.lol/"
														value={
															profile.user
																.socials?.[
																social
															] || ""
														}
													/>
												</div>
											))}
										</>
									)}
									<Button
										variant="primary"
										onClick={() => updateProfile()}
									>
										Save
									</Button>
								</div>
							)}

							<div className="bg-light-500 dark:bg-dark-100 rounded-md flex flex-col md:flex-row justify-between py-4 px-8 space-y-2 md:space-y-0">
								{[
									[profile.posts.length, `Post?s made`],
									[profile.comments, "Comment?s made"],
									[profile.upvotes, "Upvote?s given"],
									[
										profile.posts.reduce(
											(acc, cur) => acc + cur.upvotes,
											0
										),
										"Upvote?s received",
									],
									[0, "Award?s received"],
								].map(([count, title]) => (
									<div className="flex flex-col items-center -space-y-1">
										<div className="text-lg font-bold text-black dark:text-white">
											{count}
										</div>
										<div className="text-sm text-light-600 text-center">
											{(title as string).replace(
												/\?s/g,
												count == 1 ? "" : "s"
											)}
										</div>
									</div>
								))}
							</div>

							{profile.blogs.length > 0 && (
								<div className="relative flex flex-col space-y-2">
									<div>Recent Blogs</div>
									<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
										{profile.blogs.map((blog) => (
											<BlogPost data={blog} user={user} />
										))}
										<ViewMore />
									</div>
								</div>
							)}

							<div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-4 space-y-4 md:space-y-0">
								<div className="relative flex flex-col space-y-2 flex-1 md:w-3/5 break-all">
									{profile.posts.length > 0 && (
										<>
											<div>Recent Posts</div>
											<div className="flex flex-col space-y-2">
												{profile.posts.map((post) => (
													<PostCard data={post} />
												))}
											</div>
										</>
									)}
								</div>
								<div className="flex flex-col space-y-2 w-full md:w-4/12">
									{profile.activities.length > 0 && (
										<>
											<div>Recent Activity</div>
											<div className="flex flex-col space-y-2">
												{profile.activities.map(
													(activity) => (
														<ActivityCard
															activity={activity}
														/>
													)
												)}
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
