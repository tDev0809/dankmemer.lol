import axios from "axios";
import clsx from "clsx";
import { sanitize } from "dompurify";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import LoadingPepe from "../components/LoadingPepe";
import Container from "../components/ui/Container";
import { PageProps, Staff } from "../types";
import { randomAvatar } from "../util/random";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

interface SocialProps {
	member: Staff;
}

function Socials({ member }: SocialProps) {
	return (
		<div
			className={clsx(
				member.category === "Team" && "w-48 lg:w-28 2xl:w-32"
			)}
		>
			{member.category !== "Team" ||
			Object.entries(member.social).length <= 3 ? (
				<div className="flex space-x-1 items-center">
					{Object.entries(member.social).map(([socialName, link]) => (
						<a key={socialName} href={link} target="_blank">
							<img
								className="w-6"
								alt={`${member.name}'s ${socialName} link`}
								src={`/img/socials/${socialName}.svg`}
							/>
						</a>
					))}
				</div>
			) : (
				<Marquee
					gradient={false}
					speed={20}
					pauseOnHover={true}
					style={{
						height: "unset",
						overflowY: "hidden",
					}}
				>
					<div className="flex items-center relative">
						{Object.entries(member.social).map(
							([socialName, link]) => (
								<a
									key={socialName}
									href={link}
									target="_blank"
									className="mr-2"
								>
									<img
										className="w-6"
										alt={`${member.name}'s ${socialName} link`}
										src={`/img/socials/${socialName}.svg`}
									/>
								</a>
							)
						)}
					</div>
				</Marquee>
			)}
		</div>
	);
}

interface StaffCardProps {
	member: Staff;
}

function StaffCard({ member }: StaffCardProps) {
	return (
		<div
			className={clsx(
				member.category === "Team" ? "h-80" : "h-52",
				"rounded-lg p-6 cursor-pointer border",
				"bg-light-500 dark:bg-dark-200 border-light-500 dark:border-dark-200 hover:border-dank-300 dark:hover:border-dank-300"
			)}
		>
			<div className="flex flex-col space-y-4 text-dark-400 dark:text-white">
				<div className="flex space-x-4">
					<img
						onClick={(e) => {
							member.name === "Melmsie"
								? new Audio(`/audio/uwu.wav`).play()
								: console.log("Go click Mel's avatar");
							e.stopPropagation();
						}}
						src={member.avatar}
						width="100px"
						className="bg-light-600 rounded-md"
						onError={(e) => {
							(e.target as any).onerror = null;
							(e.target as any).src = randomAvatar(member._id);
						}}
					/>
					<div
						className={clsx(
							"flex flex-col",
							member.category == "Team" && "justify-between"
						)}
					>
						<div>
							<div className="font-bold text-2xl font-montserrat">
								{member.name}
							</div>
							<div className="font-montserrat">{member.role}</div>
						</div>
						<div>
							<Socials member={member} />
						</div>
					</div>
				</div>
				<div>
					<p
						className={clsx(
							"whitespace-pre-wrap leading-5 overflow-y-auto no-scrollbar",
							member.category === "Team"
								? "h-[150px]"
								: "h-[50px]"
						)}
						dangerouslySetInnerHTML={{
							__html: sanitize(member.about, {
								USE_PROFILES: {
									html: false,
								},
							}),
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default function FeedbackPage({ user }: PageProps) {
	const [staff, setStaff] = useState<Record<string, Staff[]>>({});

	useEffect(() => {
		axios("/api/staff/list").then((data) => {
			setStaff(data.data);
		});
	}, []);

	return (
		<Container title="Staff" user={user}>
			<div className="max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-8 lg:mx-auto relative">
				{staff && (
					<div className="flex flex-col space-y-16 my-16">
						{Object.entries(staff).map(([category, members]) => (
							<div className="flex flex-col space-y-4">
								<div className="font-bold font-montserrat text-3xl text-dank-300 dark:text-light-100">
									{category}
								</div>
								<div
									className={clsx(
										"grid gap-8",
										category === "Team"
											? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
											: "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
									)}
								>
									{members.map((member) => (
										<StaffCard member={member} />
									))}
								</div>
							</div>
						))}
					</div>
				)}
				{Object.keys(staff).length === 0 && <LoadingPepe />}
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
