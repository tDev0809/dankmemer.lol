import React, { useEffect, useState } from 'react';
import BottomCTA from './bottomCTA';
import 'assets/styles/components/blog.scss';

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
		</div>
	);
}

// import React from 'react';
// import 'assets/styles/components/blog.scss';
// import Button from './button.jsx';

// export default class Blog extends React.Component {
//   state = {
//     name: '',
//     date: new Date('04/20').getTime(),
//     content: ''
//   };

//   async componentDidMount () {
//     (window.adsbygoogle = window.adsbygoogle || []).push({});
//     this.setState(
//       await fetch(`/api/blogs/${this.props.match.params.blog}`)
//         .then(r => r.json())
//     );
//   }

//   render () {
//     return (
//       <>
//         <div className="blog-header-container">
//           <header className="blog-header blurple">
//             {this.state.name}
//           </header>
//           <div className="blog-timestamp">
//             Posted {gibbeDatePls(this.state.date)} by {this.state.author}
//           </div>
//           {this.state.image && 
//           <div className="blog-header-img">
//             <img src={this.state.image} />
//           </div>}
//         </div>
//         <div
//           className="blog-content"
//           dangerouslySetInnerHTML={{
//             __html: this.state.content
//           }}
//         />
//         <div className="call-to-action">
//       <span className="action-text">Join the growing Dank Memer family, today.</span>
//       <div className="links">
//         <Button link="https://invite.dankmemer.lol">
//           Add Bot
//         </Button>
//         <Button link="/commands">
//           Commands
//         </Button>
//       </div>
//     </div>
//     <div align="center">
//           <ins className="adsbygoogle ad"
//             data-ad-client="ca-pub-7326182486296195"
//             data-ad-slot="5725651587">
//           </ins>
//         </div>
//       </>
//     );
//   }
// }

// function gibbeDatePls(date) {
//   date = new Date(date);
//   const month = date.toLocaleString('default', { month: 'long' });
//   const day = getOrdinalNum(date.getDate());
//   const year = date.getFullYear()
//   return `${month} ${day}, ${year}`;
// }

// // This function courtesy of SO bc I'm lazy https://stackoverflow.com/a/44418732/7187153
// function getOrdinalNum(n) {
//   return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
// }