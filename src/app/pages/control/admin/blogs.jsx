import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';
import 'assets/styles/pages/control/admin/blogs.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';

import * as html2md from 'html-to-md';
import { toast } from 'react-toastify';

function AdminBlogs(props) {

    const history = useHistory();

    const [blogContent, setBlogContent] = useState("");
    const [currentBlog, setCurrentBlog] = useState(null);
    const [blogTitle, setBlogTitle] = useState("");
    const [blogDate, setBlogDate] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogAuthor, setBlogAuthor] = useState(props.username);
    const [blogs, setBlogs] = useState([]);
    const [htmlBlog, setHTMLBlog] = useState("");
    const [editingExisting, setEditingExisting] = useState(false);
    const [submittable, setSubmittable] = useState(false);

    const publish = () => {
        if(!confirm("You are about to publish this blog post. Once you publish it you will be redirected to the blog page.\n\n Do you wish to continue?")) return;
        axios({
            url: '/api/admin/blogs',
            method: 'POST',
            data: {
                id: blogTitle.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9 -]/, ''),
                name: blogTitle,
                date: blogDate,
                desc: blogDescription,
                author: blogAuthor,
                content: htmlBlog
            }
        }).then(() => {
            return history.push(`/blogs/${blogTitle.toLowerCase().replace(/ /g, '-')}`);
        }).catch((e) => {
            console.group("Blog publishing error");
            console.error(e.message);
            console.groupEnd();
            toast.error("There was an issue publish this blog post. If this persists, check the console for errors.", {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: true,
                draggable: true,
                toastId: 'bannedUser'
            });
        })
    }

    const deleteBlog = () => {
        if(!confirm("You are about to delete this blog post forever. This action cannot be reversed.\n\nDo you wish to continue?")) return;
        axios({
            url: `/api/admin/blogs?id=${blogs[currentBlog]._id}`,
            method: 'DELETE',
        }).then(() => {
            return window.location.reload();
        }).catch((e) => {
            console.group("Blog publishing error");
            console.error(e.message);
            console.groupEnd();
            toast.error("There was an issue publish this blog post. If this persists, check the console for errors.", {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: true,
                draggable: true,
                toastId: 'bannedUser'
            });
        })
    }

    useEffect(() => {
        axios('/api/blogs').then(({data: blogs}) => {
            setBlogs(blogs);
        });
    }, []);

    useEffect(() => {
        if(blogTitle.length >= 5 && blogDescription.length >= 20 && blogContent.length >= 200) return setSubmittable(true);
        else setSubmittable(false);
    }, [blogTitle, blogDescription, blogContent])

    useEffect(() => {
        if(currentBlog === null || !blogs) return;
        setBlogTitle(blogs[currentBlog].name);
        setBlogDate(blogs[currentBlog].date);
        setBlogAuthor(blogs[currentBlog].author);
        setBlogDescription(blogs[currentBlog].desc);
        axios(`/api/blogs/${blogs[currentBlog]._id || blogs[currentBlog].id}`).then(({data: blog}) =>  {
            setBlogContent(html2md(blog.content));
            setHTMLBlog(blog.content);
        });
    }, [currentBlog]);


    const mdParser = new MarkdownIt();
    function handleEditorChange({html, text}) {    
        setHTMLBlog(html);
        setBlogContent(text);
    }

    const selectBlog = (i) => {
        if(!confirm("All unsaved changes will be lost. Do you wish to continue?\n\nIf you wish to save the changes, you will need to do so yourself, either online or on your personal computer.")) return;
        setCurrentBlog(i);
        setEditingExisting(true);
    }

    const clearEditor = () => {
        if(!confirm("All unsaved changes will be lost. Do you wish to continue?\n\nIf you wish to save the changes, you will need to do so yourself, either online or on your personal computer.")) return;
        setCurrentBlog(null);
        setBlogTitle("");
        setBlogDescription("")
        setBlogAuthor(props.username);
        setBlogContent("");
        setEditingExisting(false);
    }

	return (
		<div id="admin-blogs">
            <div id="admin-blogs-nav">
                <h2>Blog posts</h2>
                <p className="control-subtitle">Here you are able to create new and edit existing blog posts!</p>
                <div id="control-blogs">
                    <div id="control-blogs-new" onClick={() => clearEditor()}>
                        <p>Write a blog post</p>
                        <span className="material-icons">post_add</span>
                    </div>
                    <SimpleBar style={{ maxHeight: "78vh" }}>
                        {blogs.map((blog, i) => (
                            <div className={currentBlog === i ? "control-blog selected" : "control-blog"} key={i} onClick={() => selectBlog(i)}>
                                <h3 className="control-blog-title">{blog.name}</h3>
                                <p className="control-blog-description">{blog.desc.substr(0,50)}...</p>
                            </div>
                        ))}
                    </SimpleBar>
                </div>
            </div>
            <div id="admin-blogs-editor-container">
                <div id="blog-editor-details">
                    <input id="blog-editor-details-title" placeholder="Blog title" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} disabled={editingExisting}/>
                    <input id="blog-editor-details-desc" placeholder="Write a short description for your blog" value={blogDescription} onChange={(e)  => setBlogDescription(e.target.value)} disabled={editingExisting}/>
                    <div id="blog-details-buttons">
                        <p className={!submittable ? "blog-button disabled" : "blog-button publish"} onClick={() => submittable ? publish() : ''} style={{ display: "flex", alignItems: "center" }}><span className="material-icons">publish</span> Publish this blog post</p>
                        {currentBlog !== null ? <p className="blog-button delete" onClick={() => deleteBlog()} style={{ display: "flex", alignItems: "center" }}><span className="material-icons">delete</span> Delete blog post</p> : ''}
                    </div>
                </div>
                <MdEditor
                    id="blog-editor"
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    canView={{
                        fullScreen: false
                    }}
                    value={blogContent}
                />
            </div>
		</div>
	)
}

export default connect(store => store.login, null)(AdminBlogs);
