import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Container from "../../components/ui/Container";
import { PageProps } from "../../types";
import { moderatorRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function ControlAnalyticsPage({ user }: PageProps) {
	const router = useRouter();

	return (
		<Container title="Control" user={user}>
			<div className="mx-8 xl:mx-0">
				<div className="flex flex-col my-20 space-y-8">
					<div className="flex flex-col space-y-4">
						<div
							className="flex space-x-2 cursor-pointer text-sm items-center text-dark-300 dark:text-light-100"
							onClick={() => router.back()}
						>
							<span className="material-icons">arrow_back</span>
							<div>Go Back</div>
						</div>
						<div className="font-bold font-montserrat text-3xl text-dank-300 dark:text-light-100">
							Support channel analytics
						</div>
						<iframe
							style={{ border: "none" }}
							src="https://p.datadoghq.com/sb/a5f739cb1-ecdcf8cfecaf46c432ed77dd64cf7edc?from_ts=1614075099009&live=true&theme=dark&to_ts=1614679899009&tv_mode=true"
							width="1280"
							height="720"
						/>
					</div>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(moderatorRoute);
