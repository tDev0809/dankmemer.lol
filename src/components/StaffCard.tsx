import clsx from "clsx";
import { sanitize } from "dompurify";
import { useRouter } from "next/router";
import Marquee from "react-fast-marquee";
import { UserData } from "../types";
import { randomAvatar } from "../util/random";

interface SocialProps {
	member: UserData;
}

function Socials({ member }: SocialProps) {
	return (
		<div className={clsx(member.developer && "w-48 lg:w-28 2xl:w-32")}>
			{member.developer ||
			Object.entries(member.socials || []).length <= 3 ? (
				<div className="grid grid-cols-4 gap-1 items-center">
					{Object.entries(member?.socials || []).map(
						([socialName, link]) => (
							<a key={socialName} href={link} target="_blank">
								<img
									className="w-6"
									alt={`${member.name}'s ${socialName} link`}
									src={`/img/socials/${socialName}.svg`}
								/>
							</a>
						)
					)}
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
						{Object.entries(member.socials || []).map(
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
	member: UserData;
}

export function StaffCard({ member }: StaffCardProps) {
	const router = useRouter();

	return (
		<div
			className={clsx(
				member.developer ? "h-80" : "h-52",
				"rounded-lg p-6 cursor-pointer border",
				"bg-light-500 dark:bg-dark-200 border-light-500 dark:border-dark-200 hover:border-dank-300 dark:hover:border-dank-300"
			)}
			onClick={() => router.push(`/@${member.vanity || member._id}`)}
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
						src={member.avatar || randomAvatar(member._id)}
						width="100px"
						className="bg-light-600 rounded-md"
						onError={(e) => {
							(e.target as any).onerror = null;
							(e.target as any).src = randomAvatar(member._id);
						}}
					/>
					<div className={clsx("flex flex-col")}>
						<div>
							<div className="font-bold text-2xl font-montserrat">
								{member.name || "???"}
							</div>
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
							member.developer ? "h-[150px]" : "h-[50px]"
						)}
						dangerouslySetInnerHTML={{
							__html: sanitize(member?.about || "", {
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
