import { dbConnect } from "./mongodb";
import { redisConnect } from "./redis";

interface Props {
	user: string;
	title: string;
	content: string;
	icon: string;
	link: string;
	data: Record<string, any>;
}

export async function sendNotification({
	user,
	title,
	content,
	icon,
	link,
	data,
}: Props) {
	const db = await dbConnect();
	const redis = await redisConnect();

	await db.collection("community-notifications").insertOne({
		uID: user,
		title,
		content,
		icon,
		link,
		data,
		createdAt: Date.now(),
	});

	await redis.del(`community:notifications:count:${user}`);
}
