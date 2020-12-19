import React, { useEffect, useState } from 'react';
import RecentBlog from '../../components/recentBlog';
import OlderBlog from '../../components/olderBlog';
import 'assets/styles/pages/singular/blogs.scss';
import BottomCTA from '../../components/bottomCTA';

const adPlacements = [
	'nitropay-blogs-middle'
]

export default function Blogs() {

	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		window.scroll(0,0)
		const getBlogs = async () => {
			const res = await fetch('/api/blogs');
			return res.json();
		}
		getBlogs().then((blogsData) => setBlogs(blogsData));
		adPlacements.forEach((placement) => {
			window.nitroAds && window.nitroAds.createAd(placement, {
				"refreshLimit": 10,
				"refreshTime": 90,
				"renderVisibleOnly": false,
				"refreshVisibleOnly": true,
				"sizes": [
				  [
					"728",
					"90"
				  ],
				  [
					"320",
					"50"
				  ]
				],
				"report": {
				  "enabled": true,
				  "wording": "Report Ad",
				  "position": "top-right"
				}
			});
		});
	}, [])

	return (
		<div id="blogs" className={!window.nitroAds ? 'nitro-margin' : ''}>
			<div id="blogs-header">
				<h1 id="blogs-header-title">Blog Posts</h1>
				<p id="blogs-header-message">Blogs are written by the developers and are community focused, news and updates regarding Dank Memer and related topics.</p>
			</div>
			<section className="blogs-section">
				<h3 className="blogs-section-heading">Most recent posts</h3>
				<div id="blogs-section-recent">
					{blogs.slice(0, 3).map((blog, i) => (
						<RecentBlog key={i} id={blog.id} title={blog.name} author={blog.author} description={blog.desc} date={blog.date} />
					))}
				</div>
			</section>
			<div id="nitropay-blogs-middle" className={window.nitroAds ? "nitropay ad-h" : 'nitropay ad-h blocked'}/>
			<section className="blogs-section">
				<h3 className="blogs-section-heading">Older posts</h3>
				<div id="blogs-section-older">
					{blogs.slice(3, blogs.length - 1).map((blog, i) => (
						<OlderBlog key={i} id={blog.id} title={blog.name} author={blog.author} description={blog.desc} date={blog.date} />
					))}
				</div>
			</section>
			<BottomCTA/>
		</div>
	);
}