(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{200:function(e,t,n){},201:function(e,t,n){},313:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),i=n(69);n(200);function c(e){const[t,n]=Object(a.useState)("Admin Panel"),[o,i]=Object(a.useState)(""),[c,l]=Object(a.useState)(e.defaultDropdown),[s,d]=Object(a.useState)(""),[p,u]=Object(a.useState)("Placeholder"),[m,b]=Object(a.useState)("Submit");return Object(a.useEffect)(()=>{n(e.title),i(e.dropdownHeader),l(e.defaultDropdown),u(e.textAreaHeader),b(e.buttonText)},[e]),r.a.createElement("div",{className:"admin-panel"},r.a.createElement("h3",null,t),r.a.createElement("label",null,o),r.a.createElement("select",{value:c,onChange:e=>l(e.target.value)},e.options&&e.options.map(e=>r.a.createElement("option",{value:e,key:e},e))),r.a.createElement("input",{type:"text",placeholder:p,onChange:e=>d(e.target.value)}),r.a.createElement("p",{className:"admin-panel-button",onClick:()=>e.action({dropdownVal:c,textVal:s})},m))}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class d extends r.a.PureComponent{render(){return r.a.createElement(c,{title:this.props.title,dropdownHeader:"Ban Type",textAreaHeader:"User ID",defaultDropdown:"appeal",options:this.props.options.concat("appeal","lootbox"),action:this.action.bind(this),buttonText:this.props.buttonText})}async action(e){if(!e.textVal)return alert("enter a user id dumb cunt");const t=await fetch(`/api/admin${this.props.getEndpoint(e)}`,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(n,!0).forEach(function(t){s(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},this.props.getFetchParams(e),{credentials:"same-origin",headers:{"Content-Type":"application/json"}}));200!==t.status?alert(`Unknown HTTP response code: ${t.status}`):this.props.finish(e,t)}}s(d,"defaultProps",{getFetchParams:e=>({method:"POST",body:JSON.stringify({type:e.dropdownVal,id:e.textVal})}),options:[]});var p=d,u=[r.a.memo(()=>r.a.createElement(p,{title:"Ban User",buttonText:"Hammer",getEndpoint:()=>"/ban",finish:({dropdownVal:e,textVal:t})=>alert(`Successfully ${e} banned ${t}`)})),r.a.memo(()=>r.a.createElement(p,{title:"Unban User",buttonText:"Unhammer",getEndpoint:()=>"/unban",finish:({dropdownVal:e,textVal:t})=>alert(`Successfully ${e} unbanned ${t}`)})),r.a.memo(()=>r.a.createElement(p,{title:"Check User Ban",buttonText:"Check",options:["any"],getFetchParams:()=>({method:"GET"}),getEndpoint:({dropdownVal:e,textVal:t})=>`/checkBan?type=${e}&id=${t}`,finish:async({textVal:e},t)=>{const n=await t.json();if(!n[0])return alert(`${e} is a good boye and has no bans`);alert(`${e} has the following bans:\n\n${n.join("\n")}`)}}))],m=({children:e})=>r.a.createElement("div",{className:"backdrop"},e);class b extends r.a.Component{render(){return r.a.createElement(m,null,r.a.createElement("div",{className:"modal"},r.a.createElement("div",{className:"modal-child"},this.props.component)))}}n(201);var f=n(20),h=n.n(f);const y=document.querySelector("#modals");document.addEventListener("keydown",e=>{"Escape"===e.code&&document.querySelector(".backdrop")&&h.a.unmountComponentAtNode(y)}),document.addEventListener("mousedown",e=>{"modal"===e.path[0].className&&h.a.unmountComponentAtNode(y)});var w=n(202),g=n.n(w),E={iconStyle:"triangle",indentWidth:2,displayDataTypes:!1,theme:{base00:"#23272a",base01:"#41323f",base02:"#4f424c",base03:"#776e71",base04:"#8d8687",base05:"#a39e9b",base06:"#b9b6b0",base07:"#e7e9db",base08:"#ef6155",base09:"#f99b15",base0A:"#fec418",base0B:"#48b685",base0C:"#5bc4bf",base0D:"#06b6ef",base0E:"#815ba4",base0F:"#e96ba8"}};function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class P extends a.PureComponent{async action(e){const t=await fetch(`/api/admin/findTransaction?${e.dropdownVal}=${e.textVal}`,{credentials:"same-origin",headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>e.map(e=>({date:new Date(e.times.create),orderID:e.orderID,captureID:e.captureID,purchase:{type:e.item.name,quantity:+e.item.quantity,total:e.amount.total},payer:["name","paypalEmail","discordEmail","paypalID","userID"].reduce((t,n)=>(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(n,!0).forEach(function(t){j(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e})({},t,{[n]:e.payer[n]}),{})})));var n;n=r.a.createElement(g.a,O({src:t},E)),h.a.render(r.a.createElement(b,{component:n}),y)}render(){return r.a.createElement(c,{title:"Find Transaction",dropdownHeader:"Parameter",textAreaHeader:"Value",defaultDropdown:"Discord ID",options:["Discord ID","PayPal E-Mail","Full Name","Payment ID"],action:this.action.bind(this),buttonText:"Find"})}}t.default=Object(o.b)(e=>e.login,null)(function(e){return Object(a.useEffect)(()=>{if(e.loggedIn&&!e.isAdmin)return window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ")},[e]),r.a.createElement("div",{id:"admin"},e.loggedIn?r.a.createElement("div",{id:"admin-content"},r.a.createElement("h1",{id:"admin-content-title"},"Admin Control Panel"),r.a.createElement("div",{id:"admin-content-panels"},u.map((e,t)=>r.a.createElement(e,{key:t})),r.a.createElement(P,null))):r.a.createElement("div",{id:"admin-login"},r.a.createElement("div",{id:"admin-login-content"},r.a.createElement("h1",{id:"admin-login-content-title"},"Restricted"),r.a.createElement("p",{id:"admin-login-content-body"},"The page you are trying to access is restricted. Please login to continue"),r.a.createElement(i.a,null))))})},69:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var a=n(0),r=n.n(a);function o(){return r.a.createElement("a",{id:"discord--login",href:"/oauth/login?redirect="+window.location.pathname,rel:"noopener noreferrer"},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",viewBox:"0 0 245 240"},r.a.createElement("path",{fill:"#ffffff",d:"M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"}),r.a.createElement("path",{fill:"#ffffff",d:"M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"})),"Login with Discord")}}}]);