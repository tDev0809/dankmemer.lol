(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{52:function(e,a,t){},62:function(e,a,t){"use strict";t.r(a),t.d(a,"default",function(){return c});var s=t(0),n=t.n(s),l=t(14);t(52);class c extends s.PureComponent{constructor(){super(),this.state={blogs:[]}}async componentDidMount(){l.a.pageview("/blogs"),this.setState({blogs:await fetch("/api/blogs").then(e=>e.json())})}render(){return n.a.createElement("div",{className:"content"},n.a.createElement("header",{className:"header"},"Blogs"),n.a.createElement("div",{className:"blogs"},this.state.blogs.map(e=>n.a.createElement("a",{className:"blog",key:e.id,href:`/blogs/${e.id}`},e.thumbnail&&n.a.createElement("div",{className:"blog-img"},n.a.createElement("img",{src:e.thumbnail})),n.a.createElement("div",{className:"blog-info"},n.a.createElement("div",{className:"blog-name"},e.name),n.a.createElement("div",{className:"blog-date"},new Date(e.date).toLocaleString().split(",")[0]))))))}}}}]);