import React, { useEffect, useState } from 'react';
import BottomCTA from './bottomCTA';
import 'assets/styles/components/blog.scss';
import createAd from '../util/createAd';

export default function Blog(props) {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('')
	const [date, setDate] = useState(0);
	const [image, setImage] = useState(null);
	const [content, setContent] = useState('');

	useEffect(() => {
		window.scrollTo(0,0);
		const getBlog = async() => {
			const res = await fetch(`/api/blogs/${window.location.pathname.split("/")[2]}`);
			return res.json();
		}
		getBlog().then((blogData) => {
			setTitle(blogData.name);
			setAuthor(blogData.author);
			setDate(blogData.date);
			setContent(blogData.content);
			setImage(blogData.image ? blogData.image : null);
		});
		createAd('nitropay-blog-bottom', {
			sizes: [
				[728, 90],
				[970, 90],
				[970, 250]
			],
			renderVisibleOnly: true
		}, 'desktop');
		createAd('nitropay-blog-bottom', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');
	}, []);

	const getDate = (date) => {
        date = new Date(date);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = getOrdinalNum(date.getDate());
        const year = date.getFullYear()
        return `${month} ${day}, ${year}`;
    }
    
    function getOrdinalNum(n) {
        return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    }

	return (
		<div id="blog">
			<div id="blog-header">
				<h1 id="blog-header-title">{title}</h1>
				<div id="blog-header-information">
					<p id="blog-header-information-author">Written by {author}</p>
					<p id="blog-header-information-date">Published on {getDate(date)}</p>
				</div>
			</div>
			{image ?
			<div id="blog-image">
				<img src={image} alt={title + "'s image."} />
			</div> : ''}
			<div id="blog-content" dangerouslySetInnerHTML={{ __html: content }}/>
			<BottomCTA/>
			<div id="nitropay-blog-bottom" className="nitropay" />
		</div>
	);
}