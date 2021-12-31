import axios from "axios";
import { NextApiResponse } from "next";
import { UserData } from "../../../types";
import { dbConnect } from "../../../util/mongodb";
import { redisConnect } from "../../../util/redis";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.moderator && !user.honorable && !user.perks) {
		return res.status(401).json({ error: "You can't do this." });
	}

	const profile = req.body.data;

	if (!profile.id || (user.id !== profile.id && !user.developer)) {
		return res.status(401).json({ error: "You can't do this." });
	}

	const userData = (await db
		.collection("users")
		.findOne({ _id: profile.id })) as UserData;

	if (profile.vanity != userData.vanity) {
		if (profile.vanity.length == 0) {
			try {
				await db
					.collection("users")
					.updateOne(
						{ _id: profile.id as string },
						{ $unset: { vanity: 1 } }
					);
			} catch (e) {
				return res.status(500).json({ error: e });
			}
		} else {
			if (profile.vanity.length < 3) {
				return res.status(400).json({ error: "Vanity URL too short." });
			}

			if (profile.vanity.length > 20) {
				return res.status(400).json({ error: "Vanity URL too long." });
			}

			if (
				profile.vanity.includes(" ") ||
				profile.vanity.includes("?") ||
				profile.vanity.includes("&") ||
				profile.vanity.includes("/")
			) {
				return res.status(400).json({ error: "Invalid Vanity URL." });
			}

			if (
				await db.collection("users").findOne({ vanity: profile.vanity })
			) {
				return res
					.status(401)
					.json({ error: "Vanity URL already taken." });
			}

			try {
				await db
					.collection("users")
					.updateOne(
						{ _id: profile.id as string },
						{ $set: { vanity: profile.vanity } }
					);

				await axios.post(
					process.env.PROFILE_WEBHOOK!,
					{
						embeds: [
							{
								title: `Vanity Update`,
								color: 0xb3890c,
								timestamp: new Date(),
								fields: [
									{
										name: "User",
										value: `<@${profile.id}> | ${profile.id}`,
										inline: true,
									},
									{
										name: "Old",
										value: userData.vanity || "-",
										inline: true,
									},
									{
										name: "New",
										value: profile.vanity,
										inline: true,
									},
									{
										name: "Link",
										value: `${process.env.DOMAIN}/@${profile.id}`,
										inline: false,
									},
								],
							},
						],
					},
					{
						headers: { "Content-Type": "application/json" },
					}
				);
			} catch (e) {
				return res.status(500).json({ error: e });
			}
		}
	}

	if (profile.banner != userData.banner) {
		if (profile.banner.length == 0) {
			try {
				await db
					.collection("users")
					.updateOne(
						{ _id: profile.id as string },
						{ $unset: { banner: 1 } }
					);
			} catch (e) {
				return res.status(500).json({ error: e });
			}
		} else {
			if (profile.banner.length < 3) {
				return res.status(400).json({ error: "Banner URL too short." });
			}

			if (profile.banner.length > 250) {
				return res.status(400).json({ error: "Banner URL too long." });
			}

			try {
				await db
					.collection("users")
					.updateOne(
						{ _id: profile.id as string },
						{ $set: { banner: profile.banner } }
					);

				await axios.post(
					process.env.PROFILE_WEBHOOK!,
					{
						embeds: [
							{
								title: `Banner Update`,
								color: 0xb0d1b0,
								timestamp: new Date(),
								image: { url: profile.banner },
								fields: [
									{
										name: "User",
										value: `<@${profile.id}> | ${profile.id}`,
										inline: false,
									},
									{
										name: "Link",
										value: `${process.env.DOMAIN}/@${profile.id}`,
										inline: false,
									},
								],
							},
						],
					},
					{
						headers: { "Content-Type": "application/json" },
					}
				);
			} catch (e) {
				return res.status(500).json({ error: e });
			}
		}
	}

	if (profile.about != userData.about && (user.honorable || user.moderator)) {
		if (profile.about.length == 0) {
			try {
				await db
					.collection("users")
					.updateOne(
						{ _id: profile.id as string },
						{ $unset: { about: 1 } }
					);
			} catch (e) {
				return res.status(500).json({ error: e });
			}
		} else {
			if (profile.about.length > 250) {
				return res.status(400).json({ error: "About too long." });
			}

			try {
				await db
					.collection("users")
					.updateOne(
						{ _id: profile.id as string },
						{ $set: { about: profile.about } }
					);
			} catch (e) {
				return res.status(500).json({ error: e });
			}
		}
	}

	if (profile.position != userData.position && user.developer) {
		if (profile.position.length == 0) {
			try {
				await db
					.collection("users")
					.updateOne(
						{ _id: profile.id as string },
						{ $unset: { position: 1 } }
					);
			} catch (e) {
				return res.status(500).json({ error: e });
			}
		} else {
			if (profile.position.length > 30) {
				return res.status(400).json({ error: "Position too long." });
			}

			try {
				await db
					.collection("users")
					.updateOne(
						{ _id: profile.id as string },
						{ $set: { position: profile.position } }
					);
			} catch (e) {
				return res.status(500).json({ error: e });
			}
		}
	}

	const socials = profile.socials || {};

	if (user.honorable || user.moderator) {
		try {
			await db
				.collection("users")
				.updateOne(
					{ _id: profile.id as string },
					{ $set: { socials: socials } }
				);
		} catch (e) {
			return res.status(500).json({ error: e });
		}
	}

	await redis.del(`user:${profile.id}`);
	if (userData?.vanity) {
		await redis.del(`user:${userData.vanity}`);
	}
	await redis.del("staff");

	return res.status(200).json({});
};

export default withSession(handler);
