import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DeveloperBadge, ModeratorBadge } from "../../components/Badge";
import FeedbackPostCard from "../../components/feedback/FeedbackPostCard";
import LoadingPepe from "../../components/LoadingPepe";
import Container from "../../components/ui/Container";
import Tooltip from "../../components/ui/Tooltip";
import { PageProps, Profile } from "../../types";
import { randomAvatar } from "../../util/random";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function ProfilePage({ user }: PageProps) {
	const [profile, setProfile] = useState<Profile>();

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		axios(`/api/profile/${id}`)
			.then(({ data }) => {
				setProfile(data);
			})
			.catch((e) => {
				router.push("/");
			});
	}, []);

	return (
		<Container title="Profile" user={user}>
			<div className="mx-8 xl:mx-0">
				<div className="flex flex-col my-20 space-y-4">
					<div className="flex">
						<Tooltip content="This page is currently in beta, we will add more things soon.">
							<div className="bg-yellow-400 px-2 text-dark-400 rounded-lg font-bold text-sm cursor-pointer">
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
										<span className="text-3xl font-bold">
											{profile.name}
										</span>
										<span className="text-gray-500">
											#{profile.discriminator}
										</span>
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
											{profile.comments} Comments Given
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
