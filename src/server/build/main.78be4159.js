!function(e){function t(t){for(var n,r,o=t[0],s=t[1],i=t[2],m=0,d=[];m<o.length;m++)r=o[m],Object.prototype.hasOwnProperty.call(l,r)&&l[r]&&d.push(l[r][0]),l[r]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);for(u&&u(t);d.length;)d.shift()();return c.push.apply(c,i||[]),a()}function a(){for(var e,t=0;t<c.length;t++){for(var a=c[t],n=!0,r=1;r<a.length;r++){var s=a[r];0!==l[s]&&(n=!1)}n&&(c.splice(t--,1),e=o(o.s=a[0]))}return e}var n={},r={0:0},l={0:0},c=[];function o(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.e=function(e){var t=[];r[e]?t.push(r[e]):0!==r[e]&&{2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,10:1,11:1,12:1,13:1,14:1,15:1,16:1,17:1}[e]&&t.push(r[e]=new Promise((function(t,a){for(var n=({}[e]||e)+"."+{2:"272171f9",3:"5d3dd76d",4:"081723db",5:"0ebcf5f8",6:"e710da39",7:"55dcd5af",8:"86de215a",9:"5d3dd76d",10:"4bf14e1a",11:"694ab3d4",12:"3c3d7fbf",13:"a1ff9606",14:"7fd0d330",15:"ced3363c",16:"be1d6c57",17:"3c3d7fbf",18:"31d6cfe0",19:"31d6cfe0"}[e]+".chunk.css",l=o.p+n,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var i=(u=c[s]).getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(i===n||i===l))return t()}var m=document.getElementsByTagName("style");for(s=0;s<m.length;s++){var u;if((i=(u=m[s]).getAttribute("data-href"))===n||i===l)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var n=t&&t.target&&t.target.src||l,c=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");c.request=n,delete r[e],d.parentNode.removeChild(d),a(c)},d.href=l,document.getElementsByTagName("head")[0].appendChild(d)})).then((function(){r[e]=0})));var a=l[e];if(0!==a)if(a)t.push(a[2]);else{var n=new Promise((function(t,n){a=l[e]=[t,n]}));t.push(a[2]=n);var c,s=document.createElement("script");s.charset="utf-8",s.timeout=120,o.nc&&s.setAttribute("nonce",o.nc),s.src=function(e){return o.p+""+({}[e]||e)+"."+{2:"7e942386",3:"bb50a294",4:"e3125f86",5:"d4656b3d",6:"3204af13",7:"9b5c079f",8:"f90208d4",9:"6d543e9b",10:"5813c765",11:"1b8b8a91",12:"d7c2d0a6",13:"430e12cc",14:"75442ab8",15:"d1b4418e",16:"e64807e1",17:"9e0d38e8",18:"21535100",19:"fd5dd542"}[e]+".chunk.js"}(e);var i=new Error;c=function(t){s.onerror=s.onload=null,clearTimeout(m);var a=l[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;i.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",i.name="ChunkLoadError",i.type=n,i.request=r,a[1](i)}l[e]=void 0}};var m=setTimeout((function(){c({type:"timeout",target:s})}),12e4);s.onerror=s.onload=c,document.head.appendChild(s)}return Promise.all(t)},o.m=e,o.c=n,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(a,n,function(t){return e[t]}.bind(null,n));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o.oe=function(e){throw console.error(e),e};var s=window.webpackJsonp=window.webpackJsonp||[],i=s.push.bind(s);s.push=t,s=s.slice();for(var m=0;m<s.length;m++)t(s[m]);var u=i;c.push([26,1]),a()}({21:function(e,t,a){"use strict";t.a=e=>new Promise(t=>{const a=document.createElement("script");a.setAttribute("async",""),a.setAttribute("src",e),a.onload=t,document.head.appendChild(a)})},22:function(e,t,a){"use strict";t.a=e=>(e/=1e3,{hours:Math.floor(e/3600),minutes:Math.floor(e%3600/60),seconds:Math.floor(e%3600%60),get human(){return`${this.hours} hours, ${this.minutes} minutes and ${this.seconds} seconds`}})},23:function(e,t,a){e.exports=a.p+"40326fed0d1bc75a2688535e70dd31be.png"},26:function(e,t,a){e.exports=a(39)},35:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(3),c=a(18),o=a.n(c),s=a(12),i=a(25),m=a(9);function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){p(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var f=(e={loggedIn:!1},t)=>{switch(t.type){case"LOGIN":return d({loggedIn:!0},t.user);case"LOGOUT":return d({loggedIn:!1},t.user);default:return e}};var b=(e={},t)=>{switch(t.type){case"DISCOUNT":return t.discountData;default:return null}};var h=Object(m.c)({login:f,discount:b});var E=a(21),v=a(2),g=(a(35),a(22));var O=Object(v.f)(Object(s.b)(e=>e)(({discount:e,login:{loggedIn:t,username:a,discriminator:c}})=>{const[o,s]=Object(n.useState)(!1),[i,m]=Object(n.useState)(!1);return r.a.createElement("nav",{className:"navbar"},r.a.createElement("span",{className:"DM-nav"},"DANK MEMER"),r.a.createElement("input",{className:"navbar-btn",onChange:e=>{let t=!o;s(t),t?e.target.parentElement.classList.add("navbar-expanded"):e.target.parentElement.classList.remove("navbar-expanded")},type:"checkbox",id:"navbar-btn"}),r.a.createElement("label",{className:"navbar-icon",htmlFor:"navbar-btn"},r.a.createElement("span",{className:"navicon"})),r.a.createElement("ul",{className:"nav-links"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(l.c,{exact:!0,className:"nav-link",activeClassName:"active",to:"/"},"HOME")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(l.c,{className:"nav-link",activeClassName:"active",to:"/commands"},"COMMANDS")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(l.c,{className:"nav-link",activeClassName:"active",to:"/blogs"},"BLOG")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(l.c,{className:"nav-link",activeClassName:"active",to:"/faq"},"FAQ")),navigator.onLine&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(l.c,{className:"nav-link premium",activeClassName:"active",to:"/loot","data-discount":e?`FLASH SALE (${Object(g.a)(e.expiry-Date.now()).hours}H LEFT)`:""},"LOOTBOXES")),navigator.onLine&&r.a.createElement("div",{className:"login"},t?r.a.createElement("li",{className:"user nav-item",onClick:e=>(e=>{let t=!i;m(t),t?(e.children[0].classList.add("nav-user-expanded-container"),e.children[1].classList.add("nav-user-expanded")):(e.children[0].classList.remove("nav-user-expanded-container"),e.children[1].classList.remove("nav-user-expanded"))})(e.target.parentElement)},r.a.createElement("span",{className:"nav-link"},`${a.toUpperCase()}#${c}`),r.a.createElement("div",{className:"nav-user"},r.a.createElement("a",{className:"nav-link login-button",href:"/oauth/logout"},"Log Out"))):r.a.createElement("a",{href:"/oauth/login"},r.a.createElement("button",{className:"obutton login-button"},"LOG IN")))))})),y=a(23),N=a.n(y),j=(a(37),r.a.memo(()=>r.a.createElement("footer",null,r.a.createElement("div",{id:"footer-content"},r.a.createElement("div",{id:"footer-left"},r.a.createElement(l.b,{to:"/"},r.a.createElement("img",{id:"footer-logo",src:N.a,alt:"Dank Memer logo"})),r.a.createElement("div",{id:"footer-left-text"},r.a.createElement("h2",{id:"footer-title"},"DANK MEMER"),r.a.createElement("span",{id:"footer-copyright"},"Copyright \xa9 ",(new Date).getFullYear()," Dank Memer"))),r.a.createElement("div",{id:"footer-links"},r.a.createElement("div",{className:"footer-links-col"},r.a.createElement("a",{className:"footer-link",href:"https://www.patreon.com/join/dankmemerbot"},"Premium"),r.a.createElement(l.b,{className:"footer-link",to:"/commands"},"Commands"),r.a.createElement(l.b,{className:"footer-link",to:"/blogs"},"Our blog")),r.a.createElement("div",{className:"footer-links-col"},r.a.createElement(l.b,{className:"footer-link",to:"/staff"},"Staff"),r.a.createElement(l.b,{className:"footer-link",to:"/terms"},"Terms"),r.a.createElement(l.b,{className:"footer-link",to:"/privacy"},"Privacy")),r.a.createElement("div",{className:"footer-links-col"},r.a.createElement(l.b,{className:"footer-link",to:"/rules"},"Rules"),r.a.createElement(l.b,{className:"footer-link",to:"/reports"},"Reports"),r.a.createElement(l.b,{className:"footer-link",to:"/appeals"},"Appeals")))))));a(38);const k=Object(n.lazy)(()=>a.e(4).then(a.bind(null,127))),w=Object(n.lazy)(()=>a.e(10).then(a.bind(null,138))),P=Object(n.lazy)(()=>a.e(14).then(a.bind(null,128))),L=Object(n.lazy)(()=>Promise.all([a.e(19),a.e(11)]).then(a.bind(null,137))),S=Object(n.lazy)(()=>a.e(5).then(a.bind(null,129))),x=Object(n.lazy)(()=>a.e(8).then(a.bind(null,130))),C=Object(n.lazy)(()=>a.e(15).then(a.bind(null,131))),D=Object(n.lazy)(()=>a.e(2).then(a.bind(null,139))),M=Object(n.lazy)(()=>a.e(13).then(a.bind(null,132))),z=Object(n.lazy)(()=>a.e(16).then(a.bind(null,133))),T=Object(n.lazy)(()=>a.e(6).then(a.bind(null,140))),A=Object(n.lazy)(()=>a.e(7).then(a.bind(null,141))),_=Object(n.lazy)(()=>a.e(17).then(a.bind(null,134))),I=Object(n.lazy)(()=>a.e(12).then(a.bind(null,135))),B=Object(n.lazy)(()=>a.e(3).then(a.bind(null,142))),F=Object(n.lazy)(()=>a.e(9).then(a.bind(null,136)));var $=()=>(ga("send","pageview",{hitType:"pageview",page:location.pathname}),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"psuedoBody"},r.a.createElement(O,null),r.a.createElement(v.c,null,r.a.createElement(n.Suspense,{fallback:r.a.createElement("div",null)},r.a.createElement(v.a,{exact:!0,strict:!0,component:()=>r.a.createElement(k,null),path:"/"}),r.a.createElement(v.a,{component:()=>r.a.createElement(B,null),path:"/commands"}),r.a.createElement(v.a,{component:()=>r.a.createElement(F,null),path:"/faq"}),r.a.createElement(v.a,{component:()=>r.a.createElement(D,null),path:"/staff"}),r.a.createElement(v.a,{component:()=>r.a.createElement(w,null),path:"/loot"}),r.a.createElement(v.a,{component:()=>r.a.createElement(P,null),path:"/rules"}),r.a.createElement(v.a,{component:()=>r.a.createElement(C,null),path:"/about"}),r.a.createElement(v.a,{exact:!0,component:()=>r.a.createElement(x,null),path:"/blogs"}),r.a.createElement(v.a,{exact:!0,component:e=>r.a.createElement(S,e),path:"/blogs/:blog"}),r.a.createElement(v.a,{component:()=>r.a.createElement(T,null),path:"/appeals/"}),r.a.createElement(v.a,{component:()=>r.a.createElement(A,null),path:"/reports/"}),r.a.createElement(v.a,{component:()=>r.a.createElement(L,null),path:"/admin"}),r.a.createElement(v.a,{component:()=>r.a.createElement(M,null),path:"/terms"}),r.a.createElement(v.a,{component:()=>r.a.createElement(z,null),path:"/landing"}),r.a.createElement(v.a,{component:()=>r.a.createElement(_,null),path:"/refunds"}),r.a.createElement(v.a,{component:()=>r.a.createElement(I,null),path:"/privacy"})))),r.a.createElement(j,null),r.a.createElement("div",{id:"modals"})));const G=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||m.d,R=Object(m.e)(h,G(Object(m.a)(i.a)));window.mainStore=R,o.a.render(r.a.createElement(s.a,{store:R},r.a.createElement(l.a,null,r.a.createElement($,null))),document.getElementById("root")),document.addEventListener("drop",e=>(e.preventDefault(),e.stopPropagation(),!1)),document.addEventListener("dragover",e=>{e.preventDefault(),e.stopPropagation()}),fetch("/oauth/state",{credentials:"same-origin"}).then(e=>e.json()).then(e=>{e&&R.dispatch({type:"LOGIN",user:e})}),fetch("/api/discount").then(e=>e.json()).then(e=>R.dispatch({type:"DISCOUNT",discountData:e})),Object(E.a)("//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js").then(()=>window.cookieconsent.initialise({palette:{popup:{background:"#252e39"},button:{background:"#14a7d0"}},position:"bottom-left",content:{href:"/privacy"}})),"serviceWorker"in navigator&&a.e(18).then(a.t.bind(null,126,7))}});