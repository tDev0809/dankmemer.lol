!function(e){function t(t){for(var n,l,c=t[0],s=t[1],i=t[2],m=0,d=[];m<c.length;m++)l=c[m],r[l]&&d.push(r[l][0]),r[l]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);for(u&&u(t);d.length;)d.shift()();return o.push.apply(o,i||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],n=!0,l=1;l<a.length;l++){var s=a[l];0!==r[s]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},l={0:0},r={0:0},o=[];function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(e){var t=[];l[e]?t.push(l[e]):0!==l[e]&&{2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,10:1,11:1,12:1}[e]&&t.push(l[e]=new Promise(function(t,a){for(var n="build/"+({}[e]||e)+"."+{2:"9e48274e",3:"d4fea763",4:"8ea9a711",5:"964c278d",6:"0b6b89ad",7:"7e7a4062",8:"41ae9702",9:"4c0feaae",10:"d852b4b4",11:"fa31124f",12:"475d75dc",13:"31d6cfe0",14:"31d6cfe0"}[e]+".chunk.css",r=c.p+n,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var i=(u=o[s]).getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(i===n||i===r))return t()}var m=document.getElementsByTagName("style");for(s=0;s<m.length;s++){var u;if((i=(u=m[s]).getAttribute("data-href"))===n||i===r)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var n=t&&t.target&&t.target.src||r,o=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");o.request=n,delete l[e],d.parentNode.removeChild(d),a(o)},d.href=r,document.getElementsByTagName("head")[0].appendChild(d)}).then(function(){l[e]=0}));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var n=new Promise(function(t,n){a=r[e]=[t,n]});t.push(a[2]=n);var o,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=function(e){return c.p+"build/"+({}[e]||e)+"."+{2:"1f901864",3:"02ce8bcf",4:"a521ebc0",5:"e6eb821a",6:"6575ced0",7:"22ff3a63",8:"1f980344",9:"24ff403a",10:"31074a8d",11:"dd407169",12:"44874f56",13:"b49aebea",14:"5fc0a6bf"}[e]+".chunk.js"}(e),o=function(t){s.onerror=s.onload=null,clearTimeout(i);var a=r[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),l=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+n+": "+l+")");o.type=n,o.request=l,a[1](o)}r[e]=void 0}};var i=setTimeout(function(){o({type:"timeout",target:s})},12e4);s.onerror=s.onload=o,document.head.appendChild(s)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var s=window.webpackJsonp=window.webpackJsonp||[],i=s.push.bind(s);s.push=t,s=s.slice();for(var m=0;m<s.length;m++)t(s[m]);var u=i;o.push([25,1]),a()}({18:function(e,t,a){"use strict";t.a=(e=>new Promise(t=>{const a=document.createElement("script");a.setAttribute("async",""),a.setAttribute("src",e),a.onload=t,document.head.appendChild(a)}))},19:function(e,t,a){"use strict";t.a=(e=>(e/=1e3,{hours:Math.floor(e/3600),minutes:Math.floor(e%3600/60),seconds:Math.floor(e%3600%60),get human(){return`${this.hours} hours, ${this.minutes} minutes and ${this.seconds} seconds`}}))},25:function(e,t,a){e.exports=a(38)},34:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(40),o=a(15),c=a.n(o),s=a(6),i=a(21),m=a(5);var u=(e={loggedIn:!1},t)=>{switch(t.type){case"LOGIN":return{loggedIn:!0,...t.user};case"LOGOUT":return{loggedIn:!1,...t.user};default:return e}};var d=(e={},t)=>{switch(t.type){case"DISCOUNT":return t.discountData;default:return null}};var p=Object(m.c)({login:u,discount:d});var f=a(18),h=a(43),E=a(22),b=a(41),v=a(42),g=(a(34),a(19));var y=Object(v.a)(Object(s.b)(e=>e)(({discount:e,login:{loggedIn:t,username:a,discriminator:n,isAdmin:r}})=>l.a.createElement("nav",{className:"navbar"},l.a.createElement("span",{className:"DM-nav"},"DANK MEMER"),l.a.createElement("ul",{className:"nav-links"},l.a.createElement("li",{className:"nav-item"},l.a.createElement(b.a,{exact:!0,className:"nav-link",activeClassName:"active",to:"/"},"HOME")),l.a.createElement("li",{className:"nav-item"},l.a.createElement(b.a,{className:"nav-link",activeClassName:"active",to:"/commands"},"COMMANDS")),l.a.createElement("li",{className:"nav-item"},l.a.createElement(b.a,{className:"nav-link",activeClassName:"active",to:"/about"},"ABOUT")),l.a.createElement("li",{className:"nav-item"},l.a.createElement(b.a,{className:"nav-link",activeClassName:"active",to:"/blogs"},"BLOGS")),l.a.createElement("li",{className:"nav-item"},l.a.createElement(b.a,{className:"nav-link premium",activeClassName:"active",to:"/loot","data-discount":e?`FLASH SALE (${Object(g.a)(e.expiry-Date.now()).hours}H LEFT)`:""},"LOOTBOXES")),l.a.createElement("li",{className:"nav-item"},t?l.a.createElement("div",{className:"user"},l.a.createElement("span",{className:"nav-link"},`${a.toUpperCase()}#${n}`),l.a.createElement("a",{className:"nav-link",href:"/oauth/logout"},"LOG OUT")):l.a.createElement("a",{className:"nav-link",href:"/oauth/login"},"LOG IN")))))),O=(a(36),l.a.memo(()=>l.a.createElement("footer",{className:"footer"},l.a.createElement("div",{className:"footer-table"},l.a.createElement("div",{className:"footer-group footer-copyright"},l.a.createElement("span",{className:"copyright"},"Copyright \xa9 ",(new Date).getFullYear()," Dank Memer Team")),l.a.createElement("div",{className:"footer-group footer-links"},l.a.createElement("a",{className:"footer-link",href:"https://www.patreon.com/join/dankmemerbot?"},"Premium"),l.a.createElement(b.a,{className:"footer-link",to:"/staff"},"Staff"),l.a.createElement("a",{className:"footer-link",href:"https://dankmemer.services/documentation"},"API"),l.a.createElement(b.a,{className:"footer-link",to:"/rules"},"Rules"),l.a.createElement(b.a,{className:"footer-link",to:"/terms"},"Terms"),l.a.createElement(b.a,{className:"footer-link",to:"/privacy"},"Privacy"),l.a.createElement(b.a,{className:"footer-link",to:"/appeals"},"Appeals"))))));a(37);const N=Object(n.lazy)(()=>a.e(3).then(a.bind(null,59))),j=Object(n.lazy)(()=>a.e(5).then(a.bind(null,67))),k=Object(n.lazy)(()=>a.e(8).then(a.bind(null,60))),w=Object(n.lazy)(()=>a.e(11).then(a.bind(null,61))),S=Object(n.lazy)(()=>a.e(7).then(a.bind(null,68))),T=Object(n.lazy)(()=>a.e(9).then(a.bind(null,62))),C=Object(n.lazy)(()=>a.e(6).then(a.bind(null,63))),P=Object(n.lazy)(()=>a.e(12).then(a.bind(null,69))),A=Object(n.lazy)(()=>a.e(14).then(a.bind(null,64))),L=Object(n.lazy)(()=>a.e(2).then(a.bind(null,70))),M=Object(n.lazy)(()=>a.e(13).then(a.bind(null,65))),z=Object(n.lazy)(()=>a.e(10).then(a.bind(null,66))),D=Object(n.lazy)(()=>a.e(4).then(a.bind(null,71)));a(14).a.initialize("UA-89062206-3");const _=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||m.d,I=Object(m.e)(p,_(Object(m.a)(i.a)));window.mainStore=I,c.a.render(l.a.createElement(s.a,{store:I},l.a.createElement(r.a,null,l.a.createElement(()=>l.a.createElement("div",{className:"psuedoBody"},l.a.createElement(y,null),l.a.createElement(h.a,null,l.a.createElement(n.Suspense,{fallback:l.a.createElement("div",null)},l.a.createElement(E.a,{exact:!0,strict:!0,component:()=>l.a.createElement(N,null),path:"/"}),l.a.createElement(E.a,{component:()=>l.a.createElement(D,null),path:"/commands"}),l.a.createElement(E.a,{component:()=>l.a.createElement(P,null),path:"/staff"}),l.a.createElement(E.a,{component:()=>l.a.createElement(j,null),path:"/loot"}),l.a.createElement(E.a,{component:()=>l.a.createElement(w,null),path:"/rules"}),l.a.createElement(E.a,{component:()=>l.a.createElement(C,null),path:"/about"}),l.a.createElement(E.a,{component:()=>l.a.createElement(T,null),path:"/blogs/"}),l.a.createElement(E.a,{component:()=>l.a.createElement(k,null),path:"/blogs/:blog"}),l.a.createElement(E.a,{component:()=>l.a.createElement(L,null),path:"/appeals/"}),l.a.createElement(E.a,{component:()=>l.a.createElement(S,null),path:"/admin"}),l.a.createElement(E.a,{component:()=>l.a.createElement(A,null),path:"/terms"}),l.a.createElement(E.a,{component:()=>l.a.createElement(M,null),path:"/refunds"}),l.a.createElement(E.a,{component:()=>l.a.createElement(z,null),path:"/privacy"}))),l.a.createElement(O,null)),null))),document.getElementById("root")),document.addEventListener("drop",e=>(e.preventDefault(),e.stopPropagation(),!1)),document.addEventListener("dragover",e=>{e.preventDefault(),e.stopPropagation()}),fetch("/oauth/state",{credentials:"same-origin"}).then(e=>e.json()).then(e=>{e&&I.dispatch((e=>({type:"LOGIN",user:e}))(e))}),fetch("/api/discount").then(e=>e.json()).then(e=>I.dispatch((e=>({type:"DISCOUNT",discountData:e}))(e))),Object(f.a)("//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js").then(()=>window.cookieconsent.initialise({palette:{popup:{background:"#252e39"},button:{background:"#14a7d0"}},position:"bottom-left",content:{href:"/privacy"}}))}});