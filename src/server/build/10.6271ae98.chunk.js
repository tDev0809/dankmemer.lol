(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{135:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=(a(63),a(12));class s extends r.a.PureComponent{constructor(e){super(e),this.state={dropdownVal:e.defaultDropdown,textVal:""}}render(){return r.a.createElement("section",null,r.a.createElement("div",{className:"section-header"},this.props.title),r.a.createElement("label",null,this.props.dropdownHeader||this.state.dropdownVal,r.a.createElement("br",null),r.a.createElement("select",{value:this.state.dropdownVal,onChange:e=>this.setState({dropdownVal:e.target.value})},this.props.options.map(e=>r.a.createElement("option",{value:e,key:e},e)))),r.a.createElement("label",null,this.props.textAreaHeader,r.a.createElement("br",null),r.a.createElement("input",{type:"text",value:this.state.textVal,onChange:e=>this.setState({textVal:e.target.value})})),r.a.createElement("label",null,r.a.createElement("button",{onClick:()=>this.props.action(this.state)},this.props.buttonText)))}}var c=s;function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){p(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class d extends r.a.PureComponent{render(){return r.a.createElement(c,{title:this.props.title,dropdownHeader:"Ban Type",textAreaHeader:"User ID",defaultDropdown:"appeal",options:this.props.options.concat("appeal","lootbox"),action:this.action.bind(this),buttonText:this.props.buttonText})}async action(e){if(!e.textVal)return alert("enter a user id dumb cunt");const t=await fetch("/api/admin"+this.props.getEndpoint(e),l(l({},this.props.getFetchParams(e)),{},{credentials:"same-origin",headers:{"Content-Type":"application/json"}}));200!==t.status?alert("Unknown HTTP response code: "+t.status):this.props.finish(e,t)}}p(d,"defaultProps",{getFetchParams:e=>({method:"POST",body:JSON.stringify({type:e.dropdownVal,id:e.textVal})}),options:[]});var u=d,m=[r.a.memo(()=>r.a.createElement(u,{title:"Ban User",buttonText:"Hammer",getEndpoint:()=>"/ban",finish:({dropdownVal:e,textVal:t})=>alert(`Successfully ${e} banned ${t}`)})),r.a.memo(()=>r.a.createElement(u,{title:"Unban User",buttonText:"Unhammer",getEndpoint:()=>"/unban",finish:({dropdownVal:e,textVal:t})=>alert(`Successfully ${e} unbanned ${t}`)})),r.a.memo(()=>r.a.createElement(u,{title:"Check User Ban",buttonText:"Check",options:["any"],getFetchParams:()=>({method:"GET"}),getEndpoint:({dropdownVal:e,textVal:t})=>`/checkBan?type=${e}&id=${t}`,finish:async({textVal:e},t)=>{const a=await t.json();if(!a[0])return alert(e+" is a good boye and has no bans");alert(`${e} has the following bans:\n\n${a.join("\n")}`)}}))],b=({children:e})=>r.a.createElement("div",{className:"backdrop"},e);class h extends r.a.Component{render(){return r.a.createElement(b,null,r.a.createElement("div",{className:"modal"},r.a.createElement("div",{className:"modal-child"},this.props.component)))}}a(64);var y=a(14),f=a.n(y);const w=document.querySelector("#modals");document.addEventListener("keydown",e=>{"Escape"===e.code&&document.querySelector(".backdrop")&&f.a.unmountComponentAtNode(w)}),document.addEventListener("mousedown",e=>{"modal"===e.path[0].className&&f.a.unmountComponentAtNode(w)});var g=a(65),E=a.n(g),O={iconStyle:"triangle",indentWidth:2,displayDataTypes:!1,theme:{base00:"#23272a",base01:"#41323f",base02:"#4f424c",base03:"#776e71",base04:"#8d8687",base05:"#a39e9b",base06:"#b9b6b0",base07:"#e7e9db",base08:"#ef6155",base09:"#f99b15",base0A:"#fec418",base0B:"#48b685",base0C:"#5bc4bf",base0D:"#06b6ef",base0E:"#815ba4",base0F:"#e96ba8"}};function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function P(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function j(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?P(Object(a),!0).forEach((function(t){D(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):P(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function D(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class x extends n.PureComponent{async action(e){const t=await fetch(`/api/admin/findTransaction?${e.dropdownVal}=${e.textVal}`,{credentials:"same-origin",headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>e.map(e=>({date:new Date(e.times.create),orderID:e.orderID,captureID:e.captureID,purchase:{type:e.item.name,quantity:+e.item.quantity,total:e.amount.total},payer:["name","paypalEmail","discordEmail","paypalID","userID"].reduce((t,a)=>j(j({},t),{},{[a]:e.payer[a]}),{})})));var a;a=r.a.createElement(E.a,v({src:t},O)),f.a.render(r.a.createElement(h,{component:a}),w)}render(){return r.a.createElement(c,{title:"Find Transaction",dropdownHeader:"Parameter",textAreaHeader:"Value",defaultDropdown:"Discord ID",options:["Discord ID","PayPal E-Mail","Full Name","Payment ID"],action:this.action.bind(this),buttonText:"Find"})}}class V extends r.a.PureComponent{async componentDidMount(){(window.adsbygoogle=window.adsbygoogle||[]).push({})}render(){return this.props.loggedIn?!1===this.props.isAdmin?location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ"):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"content admin"},m.map((e,t)=>r.a.createElement(e,{key:t})),r.a.createElement(x,null)),r.a.createElement("div",{align:"center"},r.a.createElement("ins",{className:"adsbygoogle ad","data-ad-client":"ca-pub-7326182486296195","data-ad-slot":"4551035249"}))):r.a.createElement("div",{className:"content admin"},r.a.createElement("header",{className:"header"},"You aren't logged in with your Discord account. ",r.a.createElement("a",{href:"/oauth/login?redirect=/admin"},"Click this")," to log in."))}}t.default=Object(o.b)(e=>e.login,null)(V)},63:function(e,t,a){},64:function(e,t,a){}}]);