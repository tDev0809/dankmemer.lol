import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../components/community/blog/BlogPost";
import { ViewMore } from "../../components/community/blog/ViewMore";
import Section from "../../components/community/Section";
import UpdateBanner from "../../components/community/UpdateBanner";
import { ViewingAs } from "../../components/community/ViewingAs";
import { Title } from "../../components/Title";
import Container from "../../components/ui/Container";
import { Blog, PageProps } from "../../types";
import { unauthenticatedRoute } from "../../util/redirects";
import { withSession } from "../../util/session";

export default function Community({ user }: PageProps) {
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		axios("/api/community/blogs/all").then(({ data }) => {
			setBlogs(data);
		});
	}, []);

	return (
		<Container title="Community" user={user}>
			<div className="flex flex-col my-16 space-y-4 mx-8 xl:mx-0">
				<div className="flex justify-between items-center">
					<Title size="big">Community</Title>
					<ViewingAs user={user} />
				</div>
				<UpdateBanner
					title="Update 9.6.0 is OUT!"
					description="Woah this update is so big! We added streaming and stuff"
					image="https://imgur.com/kspUVKW.png"
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
