import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import 'assets/styles/pages/control/admin/blogs.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';

import * as html2md from 'html-to-md';

function AdminBlogs(props) {

    const [blogContent, setBlogContent] = useState("");
    const [currentBlog, setCurrentBlog] = useState(null);
    const [blogTitle, setBlogTitle] = useState("");
    const [blogAuthor, setBlogAuthor] = useState(props.username);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios('/api/blogs').then(({data: blogs}) => {
            setBlogs(blogs);
        });
    }, []);

    useEffect(() => {
        if(!currentBlog || !blogs) return;
        setBlogTitle(blogs[currentBlog].name);
        setBlogAuthor(blogs[currentBlog].author);
        axios(`/api/blogs/${blogs[currentBlog].id}`).then(({data: blog}) =>  {
            setBlogContent(html2md(blog.content));
        });
    }, [currentBlog]);

    const mdParser = new MarkdownIt();
    function handleEditorChange({html}) {    
        // console.log(html);
    }

	return (
		<div id="admin-blogs">
            <div id="admin-blogs-nav">
                <h2>Blog posts</h2>
                <p className="control-subtitle">Here you are able to create new and edit existing blog posts!</p>
                <div id="control-blogs">
                    <SimpleBar style={{ maxHeight: "88vh" }}>
                        {blogs.map((blog, i) => (
                            <div className={currentBlog === i ? "control-blog selected" : "control-blog"} key={i} onClick={() => setCurrentBlog(i)}>
                                <h3 className="control-blog-title">{blog.name}</h3>
                                <p className="control-blog-description">{blog.desc.substr(0,50)}...</p>
                            </div>
                        ))}
                    </SimpleBar>
                </div>
            </div>
            <div id="admin-blogs-editor-container">
                <div id="blog-editor-details">
                    <input placeholder="Blog title" value={blogTitle} />
                    <p>Written by: {blogAuthor}</p>
                </div>
                <MdEditor
                    id="blog-editor"
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={blogContent}
                />
            </div>
		</div>
	)
}

export default connect(store => store.login, null)(AdminBlogs);
