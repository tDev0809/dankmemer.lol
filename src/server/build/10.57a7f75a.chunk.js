(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{313:function(e,t,a){},360:function(e,t,a){},378:function(e,t,a){"use strict";a.r(t);var o=a(0),l=a.n(o),n=a(14),s=a.n(n),c=a(7),r=a(1),d=a(8),i=a(5);a(360),a(313);t.default=Object(d.b)(e=>e.login)(function(e){const t=Object(c.f)(),[a,n]=Object(o.useState)(null),[d,p]=Object(o.useState)([]);return Object(o.useEffect)(()=>{s()("/api/feedback/categoriesCount").then(e=>{n(e.data)}),s()("/api/feedback/posts/all?from=0&amount=5").then(({data:e})=>{p([...d,...e.posts])})},[]),l.a.createElement("div",{id:"feedback-home"},l.a.createElement("div",{id:"feedback-home-head"},l.a.createElement("h1",{id:"feedback-home-head-title"},"Feedback"),l.a.createElement("div",{id:"feedback-home-head-button"},l.a.createElement(r.b,{id:"feedback-home-head-button-create",to:"/feedback/new"},"New post"),l.a.createElement("span",{id:"feedback-home-head-button-bg"}))),l.a.createElement("div",{id:"feedback-home-categories"},a&&Object.entries(a).map(([e,a],o)=>l.a.createElement("div",{tabIndex:o+1,key:e,className:"feedback-home-category",onClick:()=>t.push(`/feedback/${e}`)},l.a.createElement("h3",{className:"feedback-home-category-title"},e.charAt(0).toUpperCase()+e.substr(1).toLowerCase().replaceAll("_"," ")),l.a.createElement("p",{className:"feedback-home-category-posts"},`${a} post${1===a?"":"s"}`)))),l.a.createElement("h3",{id:"feedback-home-head-hot"},"Latest hot posts:"),d.map((a,o)=>l.a.createElement("div",{key:a._id,className:"feedback-post",onClick:()=>t.push(`/feedback/p/${a._id}`)},l.a.createElement("div",{className:"feedback-post-content"},l.a.createElement("h3",{className:"feedback-post-content-title"},l.a.createElement("p",null,a.title),a.developerResponse&&l.a.createElement("span",{className:"feedback-post-tag developer-response"},"Developer Response"),a.label&&a.label.length>=1&&l.a.createElement("span",{className:"feedback-post-tag "+a.label.split(" ").join("-")},a.label.charAt(0).toUpperCase()+a.label.substr(1).toLowerCase())),l.a.createElement("p",{className:"feedback-post-content-description"},a.description)),l.a.createElement("div",{className:"feedback-post-stats"},l.a.createElement("div",{className:"feedback-post-stats-comments"},l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",stroke:"currentColor",fill:"none",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},l.a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),l.a.createElement("path",{d:"M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"}),l.a.createElement("path",{d:"M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"})),l.a.createElement("p",{className:"feedback-post-stats-comments-count"},a.comments)),l.a.createElement("div",{className:a.upvoted?"feedback-post-stats-button upvoted":"feedback-post-stats-button",onClick:t=>(async t=>{if(!e.loggedIn)return i.b.dark(l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"You need to be logged in!")),{position:"top-right",autoClose:1e4,hideProgressBar:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"upvoteState"});s.a.patch(`/api/feedback/post/upvote/${t}`).then(({data:e})=>{const a=d.find(e=>e._id===t);a.upvotes+=e.upvote,a.upvoted=1==e.upvote,p([...d])})})(a._id)&&t.stopPropagation()},a.upvoted?l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor"},l.a.createElement("path",{d:"M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"})):l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor"},l.a.createElement("path",{d:"M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"})),l.a.createElement("p",null,a.upvotes))))),l.a.createElement(i.a,null))})}}]);