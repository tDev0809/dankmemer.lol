(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{302:function(e,t,n){"use strict";function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.a=(e,t,n)=>{"desktop"===n?t.mediaQuery="(min-width: 1025px)":"mobile"===n&&(t.mediaQuery="(min-width: 768px) and (max-width: 1024px), (min-width: 320px) and (max-width: 767px)"),window.nitroAds&&window.nitroAds.createAd(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(n,!0).forEach(function(t){i(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({refreshLimit:10,refreshTime:30,renderVisibleOnly:!1,refreshVisibleOnly:!0,report:{enabled:!0,wording:"Report Ad",position:"top-right"}},t))}},306:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var r=n(0),i=n.n(r);function o(){return i.a.createElement("div",{id:"bottom-cta"},i.a.createElement("h1",{id:"bottom-cta-title"},"Join the family!"),i.a.createElement("p",{id:"bottom-cta-subtitle"},"Add Dank Memer to your Discord server."),i.a.createElement("div",{id:"bottom-cta-button"},i.a.createElement("a",{id:"bottom-cta-button-invite",href:"https://invite.dankmemer.lol",rel:"noreferrer noopener"},"Invite now"),i.a.createElement("span",{id:"bottom-cta-button-bg"})))}},353:function(e,t,n){},375:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return c});var r=n(0),i=n.n(r),o=n(306),a=(n(353),n(302));function c(e){const[t,n]=Object(r.useState)(""),[c,l]=Object(r.useState)(""),[d,b]=Object(r.useState)(0),[s,u]=Object(r.useState)(null),[m,p]=Object(r.useState)("");Object(r.useEffect)(()=>{window.scrollTo(0,0);(async()=>{return(await fetch(`/api/blogs/${window.location.pathname.split("/")[2]}`)).json()})().then(e=>{n(e.name),l(e.author),b(e.date),p(e.content),u(e.image?e.image:null)}),Object(a.a)("nitropay-blog-bottom",{sizes:[[728,90],[970,90],[970,250]],renderVisibleOnly:!0},"desktop"),Object(a.a)("nitropay-blog-bottom",{sizes:[[320,50],[300,50],[300,250]],renderVisibleOnly:!0},"mobile")},[]);return i.a.createElement("div",{id:"blog"},i.a.createElement("div",{id:"blog-header"},i.a.createElement("h1",{id:"blog-header-title"},t),i.a.createElement("div",{id:"blog-header-information"},i.a.createElement("p",{id:"blog-header-information-author"},"Written by ",c),i.a.createElement("p",{id:"blog-header-information-date"},"Published on ",(e=>{return`${(e=new Date(e)).toLocaleString("default",{month:"long"})} ${function(e){return e+(e>0?["th","st","nd","rd"][e>3&&e<21||e%10>3?0:e%10]:"")}(e.getDate())}, ${e.getFullYear()}`})(d)))),s?i.a.createElement("div",{id:"blog-image"},i.a.createElement("img",{src:s,alt:t+"'s image."})):"",i.a.createElement("div",{id:"blog-content",dangerouslySetInnerHTML:{__html:m}}),i.a.createElement(o.a,null),i.a.createElement("div",{id:"nitropay-blog-bottom",className:"nitropay"}))}}}]);