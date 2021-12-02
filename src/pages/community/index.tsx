import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../components/community/blog/BlogPost";
import { ViewMore } from "../../components/community/blog/ViewMore";
import Section from "../../components/community/Section";
import UpdateBanner from "../../components/community/UpdateBanner";
import { Title } from "../../components/Title";
import Container from "../../components/ui/Container";
import { Blog, PageProps } from "../../types";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function Community({ user }: PageProps) {
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		axios("/api/blog/list").then(({ data }) => {
			setBlogs(data.concat(data).concat(data));
		});
	}, []);

	return (
		<Container title="Community" user={user}>
			<div className="flex flex-col my-16 space-y-4 mx-8 xl:mx-0">
				<Title size="big">Community</Title>
				<UpdateBanner
					title="xQc Simulator Update"
					description="Become your favourite streamer and take money from people who think you are their friend in this exciting new update!"
					image="https://i.ytimg.com/vi/1TZf8DsYv7I/maxresdefault.jpg"
					id="xqc"
				/>
				<Section title="Our Blog">
					<div className="flex justify-between">
						{blogs.slice(0, 4).map((blog) => (
							<BlogPost data={blog} />
						))}
						<ViewMore />
					</div>
				</Section>
				<Section title="Top Contributions">
					<div className="bg-dark-100 h-20 rounded-md"></div>
				</Section>
				<Section title="Feedback"></Section>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
