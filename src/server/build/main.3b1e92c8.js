!function(e){function t(t){for(var n,r,c=t[0],s=t[1],i=t[2],m=0,d=[];m<c.length;m++)r=c[m],l[r]&&d.push(l[r][0]),l[r]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);for(u&&u(t);d.length;)d.shift()();return o.push.apply(o,i||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],n=!0,r=1;r<a.length;r++){var s=a[r];0!==l[s]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},r={0:0},l={0:0},o=[];function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(e){var t=[];r[e]?t.push(r[e]):0!==r[e]&&{2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,10:1,11:1,12:1,13:1,14:1,15:1}[e]&&t.push(r[e]=new Promise(function(t,a){for(var n=({}[e]||e)+"."+{2:"272171f9",3:"3ad29b3c",4:"68a1d342",5:"922406d4",6:"46f43775",7:"4bf14e1a",8:"725f7bc9",9:"9e6b014d",10:"ced3363c",11:"be1d6c57",12:"3c3d7fbf",13:"3c3d7fbf",14:"7fd0d330",15:"a1ff9606",16:"31d6cfe0",17:"31d6cfe0"}[e]+".chunk.css",l=c.p+n,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var i=(u=o[s]).getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(i===n||i===l))return t()}var m=document.getElementsByTagName("style");for(s=0;s<m.length;s++){var u;if((i=(u=m[s]).getAttribute("data-href"))===n||i===l)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var n=t&&t.target&&t.target.src||l,o=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");o.request=n,delete r[e],d.parentNode.removeChild(d),a(o)},d.href=l,document.getElementsByTagName("head")[0].appendChild(d)}).then(function(){r[e]=0}));var a=l[e];if(0!==a)if(a)t.push(a[2]);else{var n=new Promise(function(t,n){a=l[e]=[t,n]});t.push(a[2]=n);var o,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=function(e){return c.p+""+({}[e]||e)+"."+{2:"91f611d2",3:"6924cbc2",4:"f4001db9",5:"11928c94",6:"caa148c9",7:"5aa4dd56",8:"9b0e443a",9:"9f0f8c0c",10:"d7ff709b",11:"dc5974db",12:"90226a13",13:"11ffa2e0",14:"aaa85d41",15:"4269d938",16:"ba260fac",17:"29e49913"}[e]+".chunk.js"}(e);var i=new Error;o=function(t){s.onerror=s.onload=null,clearTimeout(m);var a=l[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;i.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",i.name="ChunkLoadError",i.type=n,i.request=r,a[1](i)}l[e]=void 0}};var m=setTimeout(function(){o({type:"timeout",target:s})},12e4);s.onerror=s.onload=o,document.head.appendChild(s)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var s=window.webpackJsonp=window.webpackJsonp||[],i=s.push.bind(s);s.push=t,s=s.slice();for(var m=0;m<s.length;m++)t(s[m]);var u=i;o.push([25,1]),a()}({18:function(e,t,a){"use strict";t.a=e=>new Promise(t=>{const a=document.createElement("script");a.setAttribute("async",""),a.setAttribute("src",e),a.onload=t,document.head.appendChild(a)})},19:function(e,t,a){"use strict";t.a=e=>(e/=1e3,{hours:Math.floor(e/3600),minutes:Math.floor(e%3600/60),seconds:Math.floor(e%3600%60),get human(){return`${this.hours} hours, ${this.minutes} minutes and ${this.seconds} seconds`}})},25:function(e,t,a){e.exports=a(38)},34:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(41),o=a(15),c=a.n(o),s=a(6),i=a(21),m=a(5);function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(a,!0).forEach(function(t){p(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function p(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var f=(e={loggedIn:!1},t)=>{switch(t.type){case"LOGIN":return d({loggedIn:!0},t.user);case"LOGOUT":return d({loggedIn:!1},t.user);default:return e}};var b=(e={},t)=>{switch(t.type){case"DISCOUNT":return t.discountData;default:return null}};var h=Object(m.c)({login:f,discount:b});var E=a(18),v=a(43),g=a(22),y=a(40),O=a(42),N=(a(34),a(19));let j=!1;var k=Object(O.a)(Object(s.b)(e=>e)(({discount:e,login:{loggedIn:t,username:a,discriminator:n,isAdmin:l}})=>r.a.createElement("nav",{className:"navbar"},r.a.createElement("span",{className:"DM-nav"},"DANK MEMER"),r.a.createElement("input",{class:"navbar-btn",onChange:e=>{console.log("a",e),(j=!j)?e.target.parentElement.classList.add("navbar-expanded"):e.target.parentElement.classList.remove("navbar-expanded")},type:"checkbox",id:"navbar-btn"}),r.a.createElement("label",{class:"navbar-icon",for:"navbar-btn"},r.a.createElement("span",{class:"navicon"})),r.a.createElement("ul",{className:"nav-links"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(y.a,{exact:!0,className:"nav-link",activeClassName:"active",to:"/"},"HOME")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(y.a,{className:"nav-link",activeClassName:"active",to:"/commands"},"COMMANDS")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(y.a,{className:"nav-link",activeClassName:"active",to:"/about"},"ABOUT")),navigator.onLine&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(y.a,{className:"nav-link",activeClassName:"active",to:"/blogs"},"BLOGS")),navigator.onLine&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(y.a,{className:"nav-link premium",activeClassName:"active",to:"/loot","data-discount":e?`FLASH SALE (${Object(N.a)(e.expiry-Date.now()).hours}H LEFT)`:""},"LOOTBOXES")),navigator.onLine&&r.a.createElement("span",{className:"login"},t?r.a.createElement("div",{className:"user"},r.a.createElement("span",{className:"nav-link"},`${a.toUpperCase()}#${n}`),r.a.createElement("a",{className:"nav-link login-button",href:"/oauth/logout"},"LOG OUT")):r.a.createElement("a",{href:"/oauth/login"},r.a.createElement("button",{className:"obutton login-button"},"LOG IN"))))))),w=(a(36),r.a.memo(()=>r.a.createElement("footer",{className:"footer"},r.a.createElement("div",{className:"footer-table"},r.a.createElement("div",{className:"footer-group footer-copyright"},r.a.createElement("span",{className:"copyright"},"Copyright \xa9 ",(new Date).getFullYear()," Melms Media LLC")),r.a.createElement("div",{className:"footer-group footer-links"},r.a.createElement("a",{className:"footer-link",href:"https://www.patreon.com/join/dankmemerbot?"},"Premium"),r.a.createElement(y.a,{className:"footer-link",to:"/staff"},"Staff"),r.a.createElement("a",{className:"footer-link",href:"https://dankmemer.services/documentation"},"API"),r.a.createElement(y.a,{className:"footer-link",to:"/rules"},"Rules"),r.a.createElement(y.a,{className:"footer-link",to:"/terms"},"Terms"),r.a.createElement(y.a,{className:"footer-link",to:"/privacy"},"Privacy"),r.a.createElement(y.a,{className:"footer-link",to:"/appeals"},"Appeals"),r.a.createElement(y.a,{className:"footer-link",to:"/reports"},"Reports"))))));a(37);const P=Object(n.lazy)(()=>a.e(4).then(a.bind(null,139))),L=Object(n.lazy)(()=>a.e(7).then(a.bind(null,147))),S=Object(n.lazy)(()=>a.e(14).then(a.bind(null,140))),C=Object(n.lazy)(()=>Promise.all([a.e(17),a.e(8)]).then(a.bind(null,146))),T=Object(n.lazy)(()=>a.e(9).then(a.bind(null,149))),D=Object(n.lazy)(()=>a.e(10).then(a.bind(null,141))),M=Object(n.lazy)(()=>a.e(2).then(a.bind(null,148))),x=Object(n.lazy)(()=>a.e(15).then(a.bind(null,142))),z=Object(n.lazy)(()=>a.e(11).then(a.bind(null,143))),A=Object(n.lazy)(()=>a.e(5).then(a.bind(null,150))),_=Object(n.lazy)(()=>a.e(6).then(a.bind(null,151))),I=Object(n.lazy)(()=>a.e(13).then(a.bind(null,144))),B=Object(n.lazy)(()=>a.e(12).then(a.bind(null,145))),U=Object(n.lazy)(()=>a.e(3).then(a.bind(null,152)));const G=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||m.d,$=Object(m.e)(h,G(Object(m.a)(i.a)));window.mainStore=$,c.a.render(r.a.createElement(s.a,{store:$},r.a.createElement(l.a,null,r.a.createElement(()=>(ga("send","pageview",{hitType:"pageview",page:location.pathname}),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"psuedoBody"},r.a.createElement(k,null),r.a.createElement(v.a,null,r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null)},r.a.createElement(g.a,{exact:!0,strict:!0,component:()=>r.a.createElement(P,null),path:"/"}),r.a.createElement(g.a,{component:()=>r.a.createElement(U,null),path:"/commands"}),r.a.createElement(g.a,{component:()=>r.a.createElement(M,null),path:"/staff"}),r.a.createElement(g.a,{component:()=>r.a.createElement(L,null),path:"/loot"}),r.a.createElement(g.a,{component:()=>r.a.createElement(S,null),path:"/rules"}),r.a.createElement(g.a,{component:()=>r.a.createElement(D,null),path:"/about"}),r.a.createElement(g.a,{component:e=>r.a.createElement(T,e),path:"/blogs"}),r.a.createElement(g.a,{component:()=>r.a.createElement(A,null),path:"/appeals/"}),r.a.createElement(g.a,{component:()=>r.a.createElement(_,null),path:"/reports/"}),r.a.createElement(g.a,{component:()=>r.a.createElement(C,null),path:"/admin"}),r.a.createElement(g.a,{component:()=>r.a.createElement(x,null),path:"/terms"}),r.a.createElement(g.a,{component:()=>r.a.createElement(z,null),path:"/landing"}),r.a.createElement(g.a,{component:()=>r.a.createElement(I,null),path:"/refunds"}),r.a.createElement(g.a,{component:()=>r.a.createElement(B,null),path:"/privacy"}))),r.a.createElement(w,null)),r.a.createElement("div",{id:"modals"}))),null))),document.getElementById("root")),document.addEventListener("drop",e=>(e.preventDefault(),e.stopPropagation(),!1)),document.addEventListener("dragover",e=>{e.preventDefault(),e.stopPropagation()}),fetch("/oauth/state",{credentials:"same-origin"}).then(e=>e.json()).then(e=>{e&&$.dispatch((e=>({type:"LOGIN",user:e}))(e))}),fetch("/api/discount").then(e=>e.json()).then(e=>$.dispatch((e=>({type:"DISCOUNT",discountData:e}))(e))),Object(E.a)("//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js").then(()=>window.cookieconsent.initialise({palette:{popup:{background:"#252e39"},button:{background:"#14a7d0"}},position:"bottom-left",content:{href:"/privacy"}})),"serviceWorker"in navigator&&a.e(16).then(a.t.bind(null,138,7))}});