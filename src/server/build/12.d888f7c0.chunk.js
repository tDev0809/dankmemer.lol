(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{301:function(e,t,a){"use strict";function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}t.a=(e,t,a)=>{"desktop"===a?t.mediaQuery="(min-width: 1025px)":"mobile"===a&&(t.mediaQuery="(min-width: 768px) and (max-width: 1024px), (min-width: 320px) and (max-width: 767px)"),window.nitroAds&&window.nitroAds.createAd(e,function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(a,!0).forEach(function(t){l(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({refreshLimit:10,refreshTime:30,renderVisibleOnly:!1,refreshVisibleOnly:!0,report:{enabled:!0,wording:"Report Ad",position:"top-right"}},t))}},361:function(e,t,a){},379:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(8),r=a(14),o=a(301),c=a(5);a(361);t.default=Object(i.b)(e=>e.login)(function(e){const[t,a]=Object(n.useState)(null);Object(n.useEffect)(()=>{r("/api/feedback/categories").then(e=>{a(e.data)}),Object(o.a)("nitropay-feedback-new-top",{sizes:[[728,90]]},"desktop"),Object(o.a)("nitropay-feedback-new-top",{sizes:[[320,50],[300,50],[300,250]]},"mobile"),Object(o.a)("nitropay-feedback-new-bottom",{sizes:[[728,90],[970,90],[970,250]],renderVisibleOnly:!0},"desktop"),Object(o.a)("nitropay-feedback-new-bottom",{sizes:[[320,50],[300,50],[300,250]],renderVisibleOnly:!0},"mobile")},[]);let[i,d]=Object(n.useState)(""),[s,b]=Object(n.useState)(""),[p,m]=Object(n.useState)("items"),[u,g]=Object(n.useState)(0),[h,f]=Object(n.useState)(null);return Object(n.useEffect)(()=>{if(0!==u){switch(u){case 200:window.location.replace(`/feedback/p/${h}`);break;case 401:c.b.update("feedbackState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"You are not logged in."))});break;case 403:c.b.update("feedbackState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"You are banned from posting feedback."))});break;case 406:c.b.update("feedbackState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"Your account is too new to post feedback."))});break;case 429:c.b.update("feedbackState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(245, 170, 10)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})),l.a.createElement("span",null,"You're doing that too often!"))});break;default:c.b.update("feedbackState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(245, 170, 10)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"An unknown error has occurred."))})}g(0)}},[u]),l.a.createElement("div",{id:"feedback-new"},l.a.createElement("div",{id:"nitropay-feedback-new-top",className:"nitropay"}),l.a.createElement("div",{id:"feedback-new-header"},l.a.createElement("h1",{id:"feedback-new-header-title"},"Give us Feedback"),l.a.createElement("p",{id:"feedback-new-header-info"},"Do you have an opinion or suggestion about the bot? Fill out this form and we will look over them. Make sure that there isn't a feedback post on your topic by searching through the category feeds.")),l.a.createElement("div",{id:"feedback-new-category"},l.a.createElement("h3",{id:"feedback-new-category-title"},"Select the category that best fits your feedback"),l.a.createElement("div",{id:"feedback-new-category-inputs"},t&&t.map(e=>l.a.createElement("div",{key:e,className:"feedback-category-input"},l.a.createElement("label",{htmlFor:"category-"+e,onClick:()=>m(e)},l.a.createElement("span",{className:e===p?"radioInput checked":"radioInput"}),e.replace(e[0],e[0].toUpperCase()).replaceAll("_"," ")))))),l.a.createElement("div",{className:"feedback-new-section"},l.a.createElement("h3",{className:"feedback-new-section-title"},"Post title"),l.a.createElement("input",{className:"feedback-new-section-input",maxLength:256,onChange:e=>b(e.target.value),placeholder:"Give me infinite money"})),l.a.createElement("div",{className:"feedback-new-section"},l.a.createElement("h3",{className:"feedback-new-section-title"},"Post content"),l.a.createElement("textarea",{className:"feedback-new-section-input ta",maxLength:1024,onChange:e=>d(e.target.value),placeholder:"This would benefit me and nobody else. It would allow a sole user to control the economy!"})),s.length>=3&&s.length<=100&&i.length>=20&&i.length<=2e3?l.a.createElement("button",{className:"feedback-new-submit enabled",onClick:async()=>{if(!e.loggedIn)return c.b.dark(l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"You need to be logged in!")),{position:"top-right",autoClose:1e4,hideProgressBar:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"feedbackState"});if(i.length<20||i.length>2e3)return;if(s.length<3||s.length>50)return;c.b.dark(l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"5 5 40 40",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(65, 146, 255)"}},l.a.createElement("path",{d:"M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"},l.a.createElement("animateTransform",{attributeType:"xml",attributeName:"transform",type:"rotate",from:"0 25 25",to:"360 25 25",dur:"0.5s",repeatCount:"indefinite"}))),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"Submitting your feedback.")),{position:"top-right",autoClose:1e4,hideProgressBar:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"feedbackState"});const t=await fetch("/api/feedback/post",{credentials:"same-origin",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({description:i,title:s,category:p})});f((await t.json()).id),g(t.status)}},"Submit"):l.a.createElement("button",{className:"feedback-new-submit disabled"},"Submit"),l.a.createElement("div",{id:"nitropay-feedback-new-bottom",className:"nitropay"}),l.a.createElement(c.a,null))})}}]);