(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{304:function(e,t,a){"use strict";function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}t.a=(e,t,a)=>{"desktop"===a?t.mediaQuery="(min-width: 1025px)":"mobile"===a&&(t.mediaQuery="(min-width: 768px) and (max-width: 1024px), (min-width: 320px) and (max-width: 767px)"),window.nitroAds&&window.nitroAds.createAd(e,function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({refreshLimit:10,refreshTime:30,renderVisibleOnly:!1,refreshVisibleOnly:!0,report:{enabled:!0,wording:"Report Ad",position:"top-right"}},t))}},365:function(e,t,a){},383:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(8),i=a(15),r=a(5),c=a(304),d=(a(365),a(25)),s=a.n(d);function m(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}t.default=Object(o.b)(e=>e.login)((function(e){const[t,a]=Object(n.useState)(null),[o,d]=Object(n.useState)(""),[b,u]=Object(n.useState)(""),[h,g]=Object(n.useState)([]),[v,f]=Object(n.useState)(0),[E,w]=Object(n.useState)(!1),[y,x]=Object(n.useState)(!1),k=window.location.pathname.split("/")[3],O=window.location.pathname.split("/")[3],A=async n=>{if(!e.loggedIn)return r.b.dark(l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"You need to be logged in!")),{position:"top-right",autoClose:1e4,hideProgressBar:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"upvoteState"});i.patch("/api/feedback/post/upvote/"+n).then(({data:e})=>{t.upvotes+=e.upvote,t.upvoted=1==e.upvote,a(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?m(Object(a),!0).forEach((function(t){p(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},t))})};return Object(n.useEffect)(()=>{if(0!==b){switch(b){case 200:r.b.update("commentState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(50, 211, 139)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"Your comment has been submitted."))}),location.reload();break;case 401:r.b.update("commentState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"You are not logged in."))});break;case 403:r.b.update("commentState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"You are banned from posting comments."))});break;case 406:r.b.update("commentState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"Your account is too new to post a comment."))});break;case 429:r.b.update("commentState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(245, 170, 10)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})),l.a.createElement("span",null,"You're doing that too often!"))});break;default:r.b.update("commentState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(245, 170, 10)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"An unknown error has occurred."))})}u(0)}},[b]),Object(n.useEffect)(()=>{(async()=>{i("/api/feedback/post/"+O).then(({data:e})=>{a(e.post)})})(),Object(c.a)("nitropay-feedback-post-top",{sizes:[[728,90]]},"desktop"),Object(c.a)("nitropay-feedback-post-top",{sizes:[[320,50],[300,50],[300,250]]},"mobile"),Object(c.a)("nitropay-feedback-post-bottom",{sizes:[[728,90],[970,90],[970,250]],renderVisibleOnly:!0},"desktop"),Object(c.a)("nitropay-feedback-post-bottom",{sizes:[[320,50],[300,50],[300,250]],renderVisibleOnly:!0},"mobile")},[]),Object(n.useEffect)(()=>{(async()=>{i(`/api/feedback/comments/${k}?from=${v}&amount=10`).then(({data:e})=>{g([...h,...e.comments]),w(e.all)})})()},[v]),l.a.createElement("div",{id:"feedback-post"},!t&&l.a.createElement("div",{style:{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}},l.a.createElement("img",{src:s.a,width:80,style:{marginBottom:"1vh"}}),l.a.createElement("i",null,"Woah, so empty.")),t&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{id:"feedback-post-head"},l.a.createElement("div",{id:"feedback-post-head-details"},l.a.createElement("h1",{id:"feedback-post-head-details-title"},t&&t.title),l.a.createElement("p",{id:"feedback-post-head-details-author"},"Suggested by ",t.author.username,"#",t.author.discriminator," at ",new Date(t.createdAt).toLocaleString().split(",")[1].split(":").slice(0,2).join(":"),new Date(t.createdAt).toLocaleString().split(",")[1].split(" ").pop()," ",new Date(t.createdAt).toLocaleString().split(",")[0])),l.a.createElement("div",{id:"feedback-post-head-controls"},e.loggedIn&&(e.isAdmin||e.isModerator)&&l.a.createElement("div",{id:"feedback-post-head-controls-dropdown"},l.a.createElement("div",{id:"feedback-post-head-controls-dropdown-container",onClick:()=>x(!y)},l.a.createElement("span",{className:"icon material-icons-outlined"},"label"),l.a.createElement("p",{id:"feedback-post-head-controls-dropdown-container-selected"},"Post label"),l.a.createElement("span",{className:"right material-icons"},"expand_more")),y?l.a.createElement("div",{id:"feedback-post-head-controls-dropdown-options"},l.a.createElement("p",null,"Accepted"),l.a.createElement("p",null,"Implemented"),l.a.createElement("p",null,"Duplicate"),l.a.createElement("p",null,"Denied")):""),e.loggedIn&&(e.id===t.author.id||e.isAdmin||e.isModerator)&&l.a.createElement("div",{className:"delete",onClick:()=>(async e=>{confirm("Are you sure you want to delete this post? You will not be able to get anything back once it is gone.")&&(i.delete("/api/feedback/post/"+e),window.location.replace("/feedback/"+t.category))})(t._id)},l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",fill:"currentColor"},l.a.createElement("path",{d:"M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"}),l.a.createElement("path",{d:"M9 10h2v8H9zm4 0h2v8h-2z"})),l.a.createElement("p",null,"Delete post")),l.a.createElement("div",{className:t.upvoted?"feedback-button upvote upvoted":"feedback-button upvote",onClick:()=>A(t._id)},t.upvoted?l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor"},l.a.createElement("path",{d:"M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"})):l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor"},l.a.createElement("path",{d:"M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"})),l.a.createElement("p",null,t.upvotes)))),l.a.createElement("div",{id:"nitropay-feedback-post-top",className:"nitropay"}),l.a.createElement("div",{id:"feedback-post-content"},l.a.createElement("p",null,t.description)),l.a.createElement("div",{id:"nitropay-feedback-post-bottom",className:"nitropay"}),l.a.createElement("div",{id:"feedback-post-comments"},l.a.createElement("h2",null,"Comments (",t.comments,")"),l.a.createElement("p",{id:"feedback-post-comments-notice"},e.loggedIn?`You're signed in as, ${e.username}#${e.discriminator}. Ensure this is the account you want to appear as the comment author.`:"You are not signed in. Do it to post a comment."),l.a.createElement("div",{id:"feedback-post-comments-form"},l.a.createElement("textarea",{id:"feedback-post-comments-ta",maxLength:1024,onChange:e=>d(e.target.value),placeholder:"Comment"}),o.length>=5&&o.length<=1024?l.a.createElement("button",{className:"feedback-post-comments-submit enabled",onClick:async()=>{if(!e.loggedIn)return r.b.dark(l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"You need to be logged in!")),{position:"top-right",autoClose:1e4,hideProgressBar:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"commentState"});if(o.length<5||o.length>2e3)return;r.b.dark(l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"5 5 40 40",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(65, 146, 255)"}},l.a.createElement("path",{d:"M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"},l.a.createElement("animateTransform",{attributeType:"xml",attributeName:"transform",type:"rotate",from:"0 25 25",to:"360 25 25",dur:"0.5s",repeatCount:"indefinite"}))),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"Submitting your comment.")),{position:"top-right",autoClose:1e4,hideProgressBar:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"commentState"});const t=await fetch("/api/feedback/comment",{credentials:"same-origin",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({comment:o,id:O})});u(t.status)}},"Submit"):l.a.createElement("button",{className:"feedback-post-comments-submit disabled"},"Submit")),l.a.createElement("div",{id:"feedback-comments"},h.map(t=>l.a.createElement("div",{key:t._id,className:"comment"},l.a.createElement("div",{className:"comment-content"},l.a.createElement("p",{className:t.author.developer?"comment-content-author developer":"comment-content-author"},t.author.username,"#",t.author.discriminator," ",l.a.createElement("span",{className:"comment-post-time"},"at ",new Date(t.createdAt).toLocaleString().split(",")[1].split(":").slice(0,2).join(":"),new Date(t.createdAt).toLocaleString().split(",")[1].split(" ").pop()," ",new Date(t.createdAt).toLocaleString().split(",")[0])),l.a.createElement("p",{className:"comment-content-text"},t.comment)),l.a.createElement("div",{className:"comment-actions"},e.loggedIn&&(e.id===t.author.id||e.isAdmin||e.isModerator)&&l.a.createElement("div",{className:"comment-actions-delete",onClick:()=>(async e=>{confirm("Are you sure you want to remove this comment? This will delete it from the post, like it did ever exist \ud83d\ude2d")&&(i.delete("/api/feedback/comment/"+e),location.reload())})(t._id)},l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",fill:"currentColor"},l.a.createElement("path",{d:"M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"}),l.a.createElement("path",{d:"M9 10h2v8H9zm4 0h2v8h-2z"})),l.a.createElement("p",null,"Delete comment"))),l.a.createElement("br",null))),!E&&l.a.createElement("div",{onClick:async()=>{f(v+10)}},"Load More Comments"))),l.a.createElement(r.a,null)))}))}}]);