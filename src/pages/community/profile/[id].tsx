import axios from "axios";
import { formatDistance } from "date-fns";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Avatar } from "../../../components/Avatar";
import { Badge } from "../../../components/Badge";
import { PostCard } from "../../../components/community/PostCard";
import Container from "../../../components/ui/Container";
import { Activity, PageProps, Profile } from "../../../types";
import { unauthenticatedRoute } from "../../../util/redirects";
import { withSession } from "../../../util/session";

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
			<a className="bg-dark-100 rounded-md text-sm p-4">
				<div className="flex space-x-4 items-center">
					<div className="h-10 w-10  bg-dank-400 rounded-full flex items-center justify-center">
						<div
							className="material-icons"
							style={{ fontSize: "20px" }}
						>
							{icon}
						</div>
					</div>
					<div className="text-sm flex-1">
						<div className="">{text}</div>
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

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		axios(`/api/community/profile/get/${id}`)
			.then(({ data }) => {
				setProfile(data);
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

	return (
		<Container title="Profile" user={user}>
			<div className="flex flex-col my-8 space-y-4">
				{profile && (
					<div className="flex flex-col space-y-2">
						<div className="relative flex flex-col justify-end h-auto">
							<div
								className="z-[-1] w-full h-32 rounded-lg bg-blend-multiply bg-cover bg-center bg-no-repeat"
								style={{
									backgroundImage: `url("${
										profile.user.banner || "/img/banner.png"
									}")`,
									filter: "url(#sharpBlur)",
								}}
							></div>
						</div>

						<div className="flex flex-col space-y-8 px-8">
							<div className="flex space-x-2 items-center relative">
								<div className="w-[120px]">
									<div className="absolute -top-16">
										<Avatar
											id={profile.user.id}
											link={
												profile.user.avatar +
												"?size=512"
											}
											size="120px"
											className="border-4 border-dark-300 rounded-full"
										/>
									</div>
								</div>
								<div className="flex flex-col">
									<div className="flex items-baseline">
										<div className="text-2xl font-bold">
											{profile.user.name}
										</div>
										<div className="text-sm text-light-600 font-bold">
											#{profile.user.discriminator}
										</div>
									</div>
									<div className="flex space-x-1 items-center">
										<div className=" text-xs bg-dank-500 text-dank-100 px-2 py-0.5 rounded-md">
											Rank #
											{rank == -1
												? "???"
												: rank.toLocaleString()}
										</div>
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
										</div>
									</div>
								</div>
							</div>
							<div className="bg-dark-100 rounded-md flex justify-between py-4 px-8">
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
										<div className="text-lg font-bold">
											{count}
										</div>
										<div className="text-sm text-light-600">
											{(title as string).replaceAll(
												"?s",
												count == 1 ? "" : "s"
											)}
										</div>
									</div>
								))}
							</div>
							<div className="flex justify-between space-x-4">
								<div className="flex flex-col space-y-2 flex-1">
									<div>Recent Posts</div>
									<div className="flex flex-col space-y-2">
										{profile.posts.map((post) => (
											<PostCard data={post} />
										))}
									</div>
								</div>
								<div className="flex flex-col space-y-2 w-4/12">
									<div className="">Recent Activity</div>
									<div className="flex flex-col space-y-2">
										{profile.activities.map((activity) => (
											<ActivityCard activity={activity} />
										))}
									</div>
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
