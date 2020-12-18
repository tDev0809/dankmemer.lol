import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function OlderBlog(props) {

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
            <div className="blog-older">
                <h1 className="blog-older-title">{props.title}</h1>
                <div className="blog-older-information">
                    <p className="blog-older-information-author">Written by {props.author}</p>
                    <p className="blog-older-information-date">On {getDate(props.date)}</p>
                </div>
                <p className="blog-older-description">{props.description}</p>
            </div>
        </Link>
    )
}