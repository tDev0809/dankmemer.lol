import { NextApiResponse } from "next";
import { stringify } from "querystring";
import { NextIronRequest, withSession } from "../../../util/session";
import axios from "axios";
import { dbConnect } from "../../../util/mongodb";
import { encrypt } from "../../../util/crypt";
import { redisConnect } from "../../../util/redis";

const OAuthScope = ["identify", "email"].join(" ");

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const redis = await redisConnect();

	if (!req.query.code) {
		res.status(404).redirect("/404");
		return;
	}

	try {
		const { data } = await axios.post(
			"https://discordapp.com/api/v7/oauth2/token",
			stringify({
				client_id: process.env.CLIENT_ID,
				client_secret: process.env.CLIENT_SECRET,
				grant_type: "authorization_code",
				code: req.query.code,
				redirect_uri: `${process.env.DOMAIN}/api/auth/callback`,
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		const receivedScopes = data.scope.split(" ");
		if (
			!receivedScopes.includes("identify") &&
			!receivedScopes.includes("email")
		) {
			return res
				.status(403)
				.send(
					`Expected scope "${OAuthScope}" but received scope "${data.scope}"`
				);
		}

		const { data: user } = await axios.get(
			"https://discordapp.com/api/v7/users/@me",
			{
				headers: {
					Authorization: `Bearer ${data.access_token}`,
				},
			}
		);

		if (user.email === null) {
			return res
				.status(400)
				.send(
					"Please verify your Discord's account E-mail before logging in."
				);
		}

		let userData = await db.collection("users").findOne({ _id: user.id });

		if (userData) {
			db.collection("users").updateOne(
				{ _id: user.id },
				{
					$set: {
						email: user.email,
						name: user.username,
						discriminator: user.discriminator,
						avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
					},
					$addToSet: {
						ip: req.headers["cf-connecting-ip"],
					},
				}
			);
			await redis.del(`user:${user.id}`);
			if (userData.vanity) {
				await redis.del(`user:${userData.vanity}`);
			}
		} else {
			userData = {
				_id: user.id,
				email: user.email,
				name: user.username,
				discriminator: user.discriminator,
				avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
				ip: [req.headers["cf-connecting-ip"]],
			};
			db.collection("users").insertOne(userData);
		}

		await req.session.set("user", {
			...user,
			developer: !!userData.developer,
			moderator: !!userData.moderator,
			botModerator: !!userData.botModerator,
			modManager: !!userData.modManager,
			honorable: !!userData.honorable,
			token: encrypt(user.id),
			avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
			perks: !!userData.perks,
		});
	} catch (e) {
		res.redirect("/?r=true");
		return;
	}

	await req.session.save();
	res.redirect("/?r=true");
};

export default withSession(handler);
