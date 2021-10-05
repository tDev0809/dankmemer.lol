import { NextApiResponse } from "next";
import { encode, stringify } from "querystring";
import { NextIronRequest, withSession } from "../../../util/session";
import axios from "axios";
import { dbConnect } from "../../../util/mongodb";
import { encrypt } from "../../../util/crypt";

const OAuthScope = ["identify", "email"].join(" ");

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	if (!req.query.code) {
		res.status(404).redirect("/404");
		return;
	}

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

	if (data.scope !== OAuthScope) {
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

	const exists = await db
		.collection("users")
		.countDocuments({ _id: user.id });

	if (exists) {
		db.collection("users").updateOne(
			{ _id: user.id },
			{
				$set: {
					email: user.email,
				},
				$addToSet: {
					ip: req.headers["cf-connecting-ip"],
				},
			}
		);
	} else {
		db.collection("users").insertOne({
			_id: user.id,
			email: user.email,
			ip: [req.headers["cf-connecting-ip"]],
		});
	}

	const staffUser = await db.collection("staff").findOne({ _id: user.id });
	if (staffUser) {
		db.collection("staff").updateOne(
			{ _id: user.id },
			{
				$set: {
					avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
					name: user.username,
				},
			}
		);
	}

	await req.session.set("user", {
		...user,
		isModerator: [
			"Support Moderators",
			"Bot Moderators",
			"Team",
			"Honorable Mentions",
		].includes(staffUser?.category),
		isAdmin: staffUser?.category === "Team",
		token: encrypt(user.id),
	});

	await req.session.save();
	res.redirect("/?r=true");
};

export default withSession(handler);
