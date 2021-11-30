import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import { Blog, PageProps } from "../../types";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";

export default function Community({ user, update }: any) {
	const router = useRouter();
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		axios("/api/blog/list").then((data) => {
			setBlogs(data.data);
		});
	}, []);

	return (
		<Container title="Community" user={user}>
			<svg
				className="imageBlur"
				style={{
					height: "1px",
					width: "1px",
					margin: "-1px",
					position: "absolute",
					zIndex: -1,
				}}
			>
				<filter id="sharpBlur">
					<feGaussianBlur stdDeviation="3"></feGaussianBlur>
					<feColorMatrix
						type="matrix"
						values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"
					></feColorMatrix>
					<feComposite
						in2="SourceGraphic"
						operator="in"
					></feComposite>
				</filter>
			</svg>
			<div className="flex flex-col my-16 space-y-6 mx-8 xl:mx-0">
				{/* Below is the top section (incl, page title, update banner and top contributors) */}
				<section className="flex justify-between items-center">
					<div className="flex justify-between flex-col space-y-4 md:space-y-0">
						<h1 className="font-bold font-montserrat text-3xl mb-3 text-dank-300 dark:text-light-100">
							Community
						</h1>
						<div className="relative flex flex-col justify-center w-[97%] h-60 rounded-lg px-24 bg-opacity-50">
							<div
								className="absolute left-0 top-0 z-[-1] w-full min-h-full rounded-lg bg-blend-multiply bg-cover bg-center bg-no-repeat"
								style={{
									backgroundImage: `url("${update.image}"), linear-gradient(to bottom, rgba(50, 138, 65, 0.2) 64.72%, #00000080 94.9%)`,
									filter: "url(#sharpBlur)",
								}}
							></div>
							<h1 className="font-bold font-montserrat text-3xl text-light-100">
								{update.title}
							</h1>
							<p className="text-light-300 mb-3 drop-shadow">
								{update.description}
							</p>
							<Button
								className="text-white bg-dank-300 hover:bg-dank-200 transition-colors max-w-max"
								onClick={() =>
									router.push(
										`/community/updates/${update.version}`
									)
								}
							>
								<div className="flex items-center space-x-2">
									<p>View the Changelog</p>
								</div>
							</Button>
						</div>
					</div>
					<div className="h-72 w-52 rounded-lg px-4 py-2 bg-dark-100">
						<h4 className="font-inter text-center">
							Top Contributors
						</h4>
						<div className=""></div>
					</div>
				</section>
				<section>
					<h1 className="font-bold font-montserrat text-2xl mb-3 text-dank-300 dark:text-light-100">
						Our blog
					</h1>
				</section>
				<section>
					<h1 className="font-bold font-montserrat text-2xl mb-3 text-dank-300 dark:text-light-100">
						Feedback
					</h1>
				</section>
			</div>
		</Container>
	);
}

export async function getServerSideProps(
	ctx: GetServerSidePropsContext<ParsedUrlQuery>
) {
	return {
		props: {
			update: {
				title: "xQc Simulator Update",
				description:
					"Become your favourite streamer and take money from people who think you are their friend in this exciting new update!",
				image: "https://i.ytimg.com/vi/1TZf8DsYv7I/maxresdefault.jpg",
				version: 96.0,
			},
		},
	};
}
