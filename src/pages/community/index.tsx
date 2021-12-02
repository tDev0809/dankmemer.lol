import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UpdateBanner from "../../components/community/UpdateBanner";
import Container from "../../components/ui/Container";
import { Blog } from "../../types";

export default function Community({ user, update }: any) {
	const router = useRouter();
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		axios("/api/blog/list").then(({ data }) => {
			setBlogs(data);
		});
	}, []);

	return (
		<Container title="Community" user={user}>
			<div className="flex flex-col my-16 space-y-6 mx-8 xl:mx-0">
				<section className="flex justify-between space-x-4">
					<div className="flex justify-between flex-col">
						<h1 className="font-bold font-montserrat text-3xl mb-3 text-dank-300 dark:text-light-100">
							Community
						</h1>
						<UpdateBanner
							title="xQc Simulator Update"
							description="Become your favourite streamer and take money from people who think you are their friend in this exciting new update!"
							image="https://i.ytimg.com/vi/1TZf8DsYv7I/maxresdefault.jpg"
							id="xqc"
						/>
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
