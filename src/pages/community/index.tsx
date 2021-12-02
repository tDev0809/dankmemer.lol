import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UpdateBanner from "../../components/community/UpdateBanner";
import Container from "../../components/ui/Container";
import { Blog, PageProps } from "../../types";

export default function Community({ user }: PageProps) {
	const router = useRouter();
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		axios("/api/blog/list").then(({ data }) => {
			setBlogs(data);
		});
	}, []);

	return (
		<Container title="Community" user={user}>
			<div className="flex flex-col my-16 space-y-4 mx-8 xl:mx-0">
				<h1 className="font-bold font-montserrat text-3xl text-dank-300 dark:text-light-100">
					Community
				</h1>
				<UpdateBanner
					title="xQc Simulator Update"
					description="Become your favourite streamer and take money from people who think you are their friend in this exciting new update!"
					image="https://i.ytimg.com/vi/1TZf8DsYv7I/maxresdefault.jpg"
					id="xqc"
				/>
				<section>
					<h1 className="font-bold font-montserrat text-2xl mb-3 text-dank-300 dark:text-light-100">
						Top Contributors
					</h1>
					<div className="bg-dark-100 h-20 rounded-md"></div>
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
