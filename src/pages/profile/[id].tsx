import axios from "axios";
import { format, formatDistance } from "date-fns";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { DeveloperBadge, ModeratorBadge } from "../../components/Badge";
import FeedbackPostCard from "../../components/feedback/FeedbackPostCard";
import LoadingPepe from "../../components/LoadingPepe";
import Container from "../../components/ui/Container";
import Tooltip from "../../components/ui/Tooltip";
import { PageProps, Profile } from "../../types";
import { randomAvatar } from "../../util/random";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

interface Activity {
	text: ReactNode;
	icon: string;
	createdAt: number;
}

export default function ProfilePage({ user }: PageProps) {
	const [profile, setProfile] = useState<Profile>();
	const [activities, setActivities] = useState<Activity[]>([]);

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		axios(`/api/profile/${id}`)
			.then((data) => {
				const profile = data.data as Profile;

				setProfile(profile);

				setActivities(
					profile.posts
						.map((post) => {
							return {
								text: (
									<span>
										Created a post titled{" "}
										<a
											href={`/feedback/p/${post._id}`}
											className="underline"
										>
											{post.title}
										</a>
									</span>
								),
								icon: "post_add",
								createdAt: post.createdAt,
							};
						})
						.concat(
							profile.comments.map((comment) => {
								return {
									text: (
										<span>
											Commented on a {""}
											<a
												href={`/feedback/p/${comment.pID}`}
												className="underline"
											>
												post
											</a>
										</span>
									),
									icon: "comment",
									createdAt: comment.createdAt,
								};
							})
						)
						.concat(
							profile.replies.map((reply) => {
								return {
									text: (
										<span>
											Replied to a {""}
											<a
												href={`/feedback/p/${reply.pID}`}
												className="underline"
											>
												comment
											</a>
										</span>
									),
									icon: "reply",
									createdAt: reply.createdAt,
								};
							})
						)
						.sort((a, z) => z.createdAt - a.createdAt)
				);
			})
			.catch((e) => {
				router.push("/404");
			});
	}, []);

	return (
		<Container title="Profile" user={user}>
			<div className="mx-8 xl:mx-0">
				<div className="flex flex-col my-20 space-y-4">
					<div className="flex">
						<Tooltip content="This page is currently in beta, we will add more things soon.">
							<div className="bg-yellow-400 px-2 text-dark-400 rounded-lg font-bold text-sm cursor-default">
								BETA
							</div>
						</Tooltip>
					</div>
					{profile && (
						<div className="flex flex-col space-y-4">
							<div className="flex space-x-4">
								<div>
									<img
										src={profile.avatar + "?size=512"}
										width="200px"
										className="bg-light-500 dark:bg-dark-400 rounded-md"
										onError={(e) => {
											(e.target as any).onerror = null;
											(e.target as any).src =
												randomAvatar(profile._id);
										}}
									/>
								</div>
								<div className="flex flex-col justify-between py-4 text-dark-400 dark:text-white">
									<div>
										{profile.name ? (
											<span className="text-3xl font-bold">
												{profile.name}
											</span>
										) : (
											id
										)}
										{!!profile.discriminator && (
											<span className="text-gray-500">
												#{profile.discriminator}
											</span>
										)}
									</div>
									<div className="flex space-x-2">
										{profile.developer && (
											<DeveloperBadge />
										)}
										{profile.moderator && (
											<ModeratorBadge />
										)}
									</div>
									<div>
										<div>
											{profile.posts.length} Feedback
											Posts
										</div>
										<div>
											{profile.comments.length +
												profile.replies.length}{" "}
											Comments Given
										</div>
										<div>
											{profile.upvotes} Upvotes Given
										</div>
									</div>
								</div>
							</div>
							{profile.posts.length > 0 && (
								<div className="flex flex-col space-y-2">
									<div className="text-2xl font-bold font-montserrat text-dank-200 dark:text-light-100">
										Top posts:
									</div>
									<div className="flex flex-col space-y-4">
										{profile.posts.map((post) => (
											<FeedbackPostCard postData={post} />
										))}
									</div>
								</div>
							)}
							{activities.length > 0 && (
								<div className="flex flex-col space-y-2">
									<div className="text-2xl font-bold font-montserrat text-dank-200 dark:text-light-100">
										Activity:
									</div>
									<div className="flex flex-col space-y-4 text-gray-400 dark:text-gray-300">
										{activities.map((activity) => (
											<div className="flex space-x-2">
												<div className="material-icons">
													{activity.icon}
												</div>
												<div className="">
													{activity.text}
												</div>
												<div className="cursor-default text-gray-300 dark:text-gray-500">
													{formatDistance(
														new Date(
															activity.createdAt
														),
														new Date(),
														{ addSuffix: true }
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					)}
					{!profile && <LoadingPepe />}
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
