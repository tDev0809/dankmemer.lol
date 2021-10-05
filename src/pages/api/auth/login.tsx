import { NextApiResponse } from "next";
import { encode } from "querystring";
import { NextIronRequest, withSession } from "../../../util/session";

const OAuthScope = ["identify", "email"].join(" ");
const OAuthData = encode({
	response_type: "code",
	client_id: process.env.CLIENT_ID,
	redirect_uri: `${process.env.DOMAIN}/api/auth/callback`,
	scope: OAuthScope,
});

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`);
};

export default withSession(handler);
