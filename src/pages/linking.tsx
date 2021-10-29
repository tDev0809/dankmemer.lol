import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Container from "../components/ui/Container";
import { PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

export default function LinkingPage({ user }: PageProps) {
	const router = useRouter();

	const success = router.query.success == "true";
	const message = router.query.message;

	return (
		<Container title="Linking Results" user={user}>
			<div className="relative my-32">
				<div className="mb-40 flex flex-col items-center text-center text-dark-400 dark:text-white">
					<div className="bg-light-500 dark:bg-dark-400 rounded-md p-20 flex flex-col space-y-2">
						<div className="text-2xl font-bold text-dank-300">
							{success ? "Success!" : "Uh Oh..."}
						</div>

						<div className="flex flex-col space-y-4">
							<div>{message}</div>

							{success ? (
								<a className="text-dank-300" href="/">
									Go Home
								</a>
							) : (
								<a
									className="text-dank-300"
									href="https://link.dankmemer.lol"
								>
									Try again
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
