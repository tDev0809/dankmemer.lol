import React, { useEffect, useState } from 'react';
import RecentBlog from '../../components/recentBlog';
import OlderBlog from '../../components/olderBlog';
import 'assets/styles/pages/singular/blogs.scss';
import BottomCTA from '../../components/bottomCTA';
import createAd from '../../util/createAd';

export default function Blogs() {

	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		window.scroll(0,0)
		const getBlogs = async () => {
			const res = await fetch('/api/blogs');
			return res.json();
		}
		getBlogs().then((blogsData) => setBlogs(blogsData));
		
		createAd('nitropay-blogs-middle', {
			sizes: [
				[728, 90],
				[970, 90],
				[970, 250]
			],
			renderVisibleOnly: true
		}, 'desktop');
		createAd('nitropay-blogs-middle', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');
		createAd('nitropay-blogs-bottom', {
			sizes: [
				[728, 90],
				[970, 90],
				[970, 250]
			],
			renderVisibleOnly: true
		}, 'desktop');
		createAd('nitropay-blogs-bottom', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');
	}, [])

	return (
		<div id="blogs">
			<div id="blogs-header">
				<h1 id="blogs-header-title">Blog Posts</h1>
				<p id="blogs-header-message">Blogs are written by the developers and are community focused, news and updates regarding Dank Memer and related topics.</p>
			</div>
			<section className="blogs-section">
				<h3 className="blogs-section-heading">Most recent posts</h3>
				<div id="blogs-section-recent">
					{blogs.slice(0, 3).map((blog, i) => (
						<RecentBlog key={i} id={blog._id} title={blog.name} author={blog.author} description={blog.desc} date={blog.date} />
					))}
				</div>
			</section>
			<div id="nitropay-blogs-middle" className="nitropay" />
			<section className="blogs-section">
				<h3 className="blogs-section-heading">Older posts</h3>
				<div id="blogs-section-older">
					{blogs.slice(3, blogs.length - 1).map((blog, i) => (
						<OlderBlog key={i} id={blog._id} title={blog.name} author={blog.author} description={blog.desc} date={blog.date} />
					))}
				</div>
			</section>
			<BottomCTA/>
			<div id="nitropay-blogs-bottom" className="nitropay" />
		</div>
	);
}