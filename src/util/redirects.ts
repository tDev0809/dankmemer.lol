import axios from "axios";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Session } from "next-iron-session";

export async function unauthenticatedRoute(
	ctx: GetServerSidePropsContext & { req: { session: Session } }
) {
	const user = ctx.req.session.get("user");

	return {
		props: user ? { user } : {},
	};
}

export async function authenticatedRoute(
	ctx: GetServerSidePropsContext & { req: { session: Session } },
	redirect = "/api/auth/login"
): Promise<GetServerSidePropsResult<{}>> {
	const user = await ctx.req.session.get("user");

	if (!user) {
		return {
			redirect: {
				destination: `${redirect}?redirect=${encodeURIComponent(
					ctx.resolvedUrl
				)}`,
				permanent: false,
			},
		};
	}

	return {
		props: { user },
	};
}
