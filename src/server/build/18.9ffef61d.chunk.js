(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{242:function(e,t,r){},318:function(e,t,r){"use strict";r.r(t);var a=r(0),l=r.n(a),o=r(12),n=r(142);r(107);var i={server:["Server has userbots","Server is trading invites/nitro for currency","Entire server is knowingly breaking bot rules","Server has alts","Other/NA"],user:["No userbots, spamming, auto-typers, or macros","No sharing exploits, or abusing them","No coin storage accounts/farming accounts (alts)","Do not use the bot for racism, homophobia, any other type of targeted hate","Using the bot for advertising","Coins are not to be used in scams or invite servers.","Selling meme coins or trading for real life currency in any way","Other/NA"]};r(242);t.default=Object(o.b)(e=>e.login)((function(e){const[t,r]=Object(a.useState)("user"),[o,s]=Object(a.useState)(""),[c,p]=Object(a.useState)([]),[d,m]=Object(a.useState)(""),[u,b]=Object(a.useState)(0);return Object(a.useEffect)(()=>{window.scroll(0,0)},[]),Object(a.useEffect)(()=>{if(0!==u){switch(u){case 200:n.b.update("reportState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(50, 211, 139)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"Your report has been submitted."))});break;case 403:n.b.update("reportState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"You have been banned from reporting users."))});break;case 429:n.b.update("reportState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(245, 170, 10)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})),l.a.createElement("span",null,"Woah there! Way too spicy"))});break;default:n.b.update("reportState",{render:l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(245, 170, 10)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"An unknown error has occurred."))})}b(0)}},[u]),l.a.createElement("div",{id:"reports"},l.a.createElement("div",{id:"reports-header"},l.a.createElement("h1",{id:"reports-header-title"},"Report a ",t),l.a.createElement("p",{className:"reports-header-message"},"Please provide as much detail as possible when submitting your report.",l.a.createElement("br",null),"\u2022"),l.a.createElement("p",{className:"reports-header-message"},"We are unable to provide details on the punishment from this report.")),l.a.createElement("div",{id:"reports-body"},l.a.createElement("div",{className:"reports-body-group"},l.a.createElement("h3",{className:"reports-body-group-title"},"What type of report is this?"),l.a.createElement("div",{className:"reports-body-group-radio"},l.a.createElement("label",{className:"fake-checkbox"},l.a.createElement("span",{className:"user"===t?"reports-body-group-radio-button active":"reports-body-group-radio-button"}),l.a.createElement("input",{name:"user-report",type:"radio",checked:"user"===t,onClick:()=>r("user")})),l.a.createElement("label",null,"User report")),l.a.createElement("div",{className:"reports-body-group-radio"},l.a.createElement("label",{className:"fake-checkbox"},l.a.createElement("span",{className:"server"===t?"reports-body-group-radio-button active":"reports-body-group-radio-button"}),l.a.createElement("input",{name:"server-report",type:"radio",checked:"server"===t,onClick:()=>r("server")})),l.a.createElement("label",null,"Server report")),l.a.createElement("div",{className:"reports-body-group-text"},l.a.createElement("input",{name:"reporting",type:"text",onChange:e=>s(e.target.value)}),l.a.createElement("label",{htmlFor:"reporting"},"ID of ",t," you are reporting."))),l.a.createElement("div",{className:"reports-body-group"},l.a.createElement("h3",{className:"reports-body-group-title"},"Which rules did they break?"),i[t].map((e,t)=>l.a.createElement("div",{className:"reports-body-group-checkbox",key:t},l.a.createElement("input",{name:"rule-"+t,type:"checkbox",onInput:e=>{return r=t,a=e.target.checked,void(c.includes(r)&&!a?p(c.filter(e=>e!=r)):!c.includes(r)&&a&&p(e=>[...e,r]));var r,a}}),l.a.createElement("div",{className:"reports-body-group-checkbox-num"},t+1),l.a.createElement("label",{htmlFor:"rule-"+t},e)))),l.a.createElement("div",{className:"reports-body-group"},l.a.createElement("h3",{className:"reports-body-group-title"},"Please write your report below."),l.a.createElement("textarea",{className:"reports-body-group-textarea",maxLength:1024,onChange:e=>m(e.target.value)})),o.length>16&&o.length<22&&c.length>=1&&d.length>=20?l.a.createElement("div",{id:"reports-body-actions"},l.a.createElement("span",{id:"reports-body-actions-submit",onClick:async()=>{if(!e.loggedIn)return n.b.dark(l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"0 0 16 16",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(233, 76, 88)"}},l.a.createElement("path",{fillRule:"evenodd",d:"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"})),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"You need to be logged in!")),{position:"top-right",autoClose:1e4,hideProgressBar:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"reportState"});if(c.length<1)return;if(d.length<20)return;let r=[];i[t].forEach((e,t)=>{c.sort((e,t)=>e-t).includes(t)&&r.push(e)}),n.b.dark(l.a.createElement("p",null,l.a.createElement("svg",{viewBox:"5 5 40 40",fill:"currentColor",style:{display:"inline-block",verticalAlign:"middle",width:"20px",height:"20px",boxSizing:"border-box",margin:"10px",color:"rgb(65, 146, 255)"}},l.a.createElement("path",{d:"M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"},l.a.createElement("animateTransform",{attributeType:"xml",attributeName:"transform",type:"rotate",from:"0 25 25",to:"360 25 25",dur:"0.5s",repeatCount:"indefinite"}))),l.a.createElement("span",{style:{display:"inline-block",verticalAlign:"middle"}},"Submitting your report.")),{position:"top-right",autoClose:1e4,hideProgressBar:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"reportState"});const a=await fetch("/api/report",{credentials:"same-origin",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reportType:t,reporting:o,content:d,rules:r})});b(a.status)}},"Report ",t)):""),l.a.createElement(n.a,null))}))}}]);