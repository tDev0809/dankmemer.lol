(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{272:function(e,t,n){"use strict";function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.a=(e,t,n)=>{"desktop"===n?t.mediaQuery="(min-width: 1025px)":"mobile"===n&&(t.mediaQuery="(min-width: 768px) and (max-width: 1024px), (min-width: 320px) and (max-width: 767px)"),window.nitroAds&&window.nitroAds.createAd(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({refreshLimit:10,refreshTime:30,renderVisibleOnly:!1,refreshVisibleOnly:!0,report:{enabled:!0,wording:"Report Ad",position:"top-right"}},t))}},274:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(0),a=n.n(r),i=n(1);function o(){return a.a.createElement("div",{id:"bottom-cta"},a.a.createElement("h1",{id:"bottom-cta-title"},"What are you waiting for?"),a.a.createElement("p",{id:"bottom-cta-subtitle"},"Join the growing Dank Memer family today!"),a.a.createElement("a",{id:"bottom-cta-button",href:"https://invite.dankmemer.lol",rel:"noreferrer noopener"},"Invite Now"),a.a.createElement("p",{id:"bottom-cta-text"},"Not convinced? Check out all the ",a.a.createElement(i.b,{to:"/commands",className:"text-highlight"},"commands")," available!"))}},331:function(e,t,n){},378:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return c}));var r=n(0),a=n.n(r),i=n(274),o=(n(331),n(272));function c(e){const[t,n]=Object(r.useState)(""),[c,l]=Object(r.useState)(""),[d,m]=Object(r.useState)(0),[b,s]=Object(r.useState)(null),[u,p]=Object(r.useState)("");Object(r.useEffect)(()=>{window.scrollTo(0,0);(async()=>(await fetch("/api/blogs/"+window.location.pathname.split("/")[2])).json())().then(e=>{n(e.name),l(e.author),m(e.date),p(e.content),s(e.image?e.image:null)}),Object(o.a)("nitropay-blog-bottom",{sizes:[[728,90],[970,90],[970,250]],renderVisibleOnly:!0},"desktop"),Object(o.a)("nitropay-blog-bottom",{sizes:[[320,50],[300,50],[300,250]],renderVisibleOnly:!0},"mobile")},[]);return a.a.createElement("div",{id:"blog"},a.a.createElement("div",{id:"blog-header"},a.a.createElement("h1",{id:"blog-header-title"},t),a.a.createElement("div",{id:"blog-header-information"},a.a.createElement("p",{id:"blog-header-information-author"},"Written by ",c),a.a.createElement("p",{id:"blog-header-information-date"},"Published on ",(e=>{var t;return`${(e=new Date(e)).toLocaleString("default",{month:"long"})} ${(t=e.getDate())+(t>0?["th","st","nd","rd"][t>3&&t<21||t%10>3?0:t%10]:"")}, ${e.getFullYear()}`})(d)))),b?a.a.createElement("div",{id:"blog-image"},a.a.createElement("img",{src:b,alt:t+"'s image."})):"",a.a.createElement("div",{id:"blog-content",dangerouslySetInnerHTML:{__html:u}}),a.a.createElement(i.a,null),a.a.createElement("div",{id:"nitropay-blog-bottom",className:"nitropay"}))}}}]);