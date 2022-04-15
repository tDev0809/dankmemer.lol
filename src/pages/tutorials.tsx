import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { Ad } from "../components/Ad";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { PageProps, Tutorial } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

export default function Tutorials({ user }: PageProps) {
	const [tutorials, setTutorials] = useState<Tutorial[]>([]);
	const router = useRouter();

	useEffect(() => {
		axios("/api/tutorials/all").then(({ data }) => {
			setTutorials(data);
		});
	}, []);

	return (
		<Container title="Tutorials" user={user}>
			<div className="my-16 mx-8 flex flex-col space-y-4 xl:mx-0">
				<div className="flex items-center justify-between">
					<Title size="big">Tutorials</Title>
					{user?.developer && (
						<Button
							size="small"
							variant="primary"
							onClick={() => router.push(`/tutorial/new/edit`)}
						>
							<div className="flex items-center space-x-2">
								<div className="material-icons">
									description
								</div>
								<div>New Tutorial</div>
							</div>
						</Button>
					)}
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
					{tutorials.length > 0 &&
						tutorials.map((tutorial) => (
							<div className="m-2 flex h-full flex-col justify-between space-y-4 rounded-md bg-dank-500 p-4">
								<div>{tutorial._id}</div>
								<div className="flex flex-col space-y-2">
									{user?.developer && (
										<Button
											block
											variant="dark"
											href={`/tutorial/${tutorial._id}/edit`}
										>
											Edit
										</Button>
									)}
									<Button
										variant="dark"
										href={`/tutorial/${tutorial._id}`}
										block
									>
										Read
									</Button>
								</div>
							</div>
						))}
				</div>
				<Ad
					id="tutorials-bottom-mobile"
					platform="mobile"
					sizes={[
						[320, 50],
						[160, 600],
						[300, 50],
						[300, 250],
					]}
				/>
				<Ad
					id="tutorials-bottom-desktop"
					platform="desktop"
					sizes={[
						[728, 90],
						[970, 90],
						[970, 250],
						[300, 250],
					]}
				/>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
