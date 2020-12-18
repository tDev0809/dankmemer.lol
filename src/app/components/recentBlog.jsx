import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RecentBlog(props) {

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
        <Link to={'/blogs/' + props.id}>
            <div className="blog-recent">
                <h1 className="blog-recent-title">{props.title}</h1>
                <div className="blog-recent-information">
                    <p className="blog-recent-information-author">Written by {props.author}</p>
                    <p className="blog-recent-information-date">On {getDate(props.date)}</p>
                </div>
                <p className="blog-recent-description">{props.description}</p>
            </div>
        </Link>
    )
}