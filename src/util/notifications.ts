import { dbConnect } from "./mongodb";

interface Props {
	user: string;
	content: string;
	icon: string;
	link: string;
}

export async function sendNotification({ user, content, icon, link }: Props) {
	const db = await dbConnect();

	await db.collection("community-notifications").insertOne({
		uID: user,
		content,
		icon,
		link,
		createdAt: Date.now(),
	});
}
