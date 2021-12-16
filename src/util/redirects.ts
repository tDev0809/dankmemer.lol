import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Session } from "next-iron-session";
import { User } from "../types";

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

export async function moderatorRoute(
	ctx: GetServerSidePropsContext & { req: { session: Session } }
) {
	const user: User | undefined = ctx.req.session.get("user");

	if (!user) {
		return {
			redirect: {
				destination: `/api/auth/login?redirect=${encodeURIComponent(
					ctx.resolvedUrl
				)}`,
				permanent: false,
			},
		};
	}

	if (!user.moderator) {
		return {
			redirect: {
				destination: `/`,
				permanent: true,
			},
		};
	}

	return {
		props: user ? { user } : {},
	};
}

export async function developerRoute(
	ctx: GetServerSidePropsContext & { req: { session: Session } }
) {
	const user: User | undefined = ctx.req.session.get("user");

	if (!user) {
		return {
			redirect: {
				destination: `/api/auth/login?redirect=${encodeURIComponent(
					ctx.resolvedUrl
				)}`,
				permanent: false,
			},
		};
	}

	if (!user.developer) {
		return {
			redirect: {
				destination: `/`,
				permanent: true,
			},
		};
	}

	return {
		props: user ? { user } : {},
	};
}
