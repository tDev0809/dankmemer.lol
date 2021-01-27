(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{241:function(e,t,a){},321:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(2);function i(e){return r.a.createElement(o.b,{to:"/blogs/"+e.id},r.a.createElement("div",{className:"blog-recent"},r.a.createElement("h1",{className:"blog-recent-title"},e.title),r.a.createElement("div",{className:"blog-recent-information"},r.a.createElement("p",{className:"blog-recent-information-author"},"Written by ",e.author),r.a.createElement("p",{className:"blog-recent-information-date"},"On ",(a=e.date,`${(a=new Date(a)).toLocaleString("default",{month:"long"})} ${t=a.getDate(),t+(t>0?["th","st","nd","rd"][t>3&&t<21||t%10>3?0:t%10]:"")}, ${a.getFullYear()}`))),r.a.createElement("p",{className:"blog-recent-description"},e.description)));var t,a}function l(e){return r.a.createElement(o.b,{to:"/blogs/"+e.id},r.a.createElement("div",{className:"blog-older"},r.a.createElement("h1",{className:"blog-older-title"},e.title),r.a.createElement("div",{className:"blog-older-information"},r.a.createElement("p",{className:"blog-older-information-author"},"Written by ",e.author),r.a.createElement("p",{className:"blog-older-information-date"},"On ",(a=e.date,`${(a=new Date(a)).toLocaleString("default",{month:"long"})} ${t=a.getDate(),t+(t>0?["th","st","nd","rd"][t>3&&t<21||t%10>3?0:t%10]:"")}, ${a.getFullYear()}`))),r.a.createElement("p",{className:"blog-older-description"},e.description)));var t,a}a(241);var c=a(71),s=a(41);function d(){const[e,t]=Object(n.useState)([]);return Object(n.useEffect)(()=>{window.scroll(0,0);(async()=>{return(await fetch("/api/blogs")).json()})().then(e=>t(e)),Object(s.a)("nitropay-blogs-middle",{sizes:[[728,90],[970,90],[970,250]],renderVisibleOnly:!0},"desktop"),Object(s.a)("nitropay-blogs-middle",{sizes:[[320,50],[300,50],[300,250]],renderVisibleOnly:!0},"mobile"),Object(s.a)("nitropay-blogs-bottom",{sizes:[[728,90],[970,90],[970,250]],renderVisibleOnly:!0},"desktop"),Object(s.a)("nitropay-blogs-bottom",{sizes:[[320,50],[300,50],[300,250]],renderVisibleOnly:!0},"mobile")},[]),r.a.createElement("div",{id:"blogs"},r.a.createElement("div",{id:"blogs-header"},r.a.createElement("h1",{id:"blogs-header-title"},"Blog Posts"),r.a.createElement("p",{id:"blogs-header-message"},"Blogs are written by the developers and are community focused, news and updates regarding Dank Memer and related topics.")),r.a.createElement("section",{className:"blogs-section"},r.a.createElement("h3",{className:"blogs-section-heading"},"Most recent posts"),r.a.createElement("div",{id:"blogs-section-recent"},e.slice(0,3).map((e,t)=>r.a.createElement(i,{key:t,id:e.id,title:e.name,author:e.author,description:e.desc,date:e.date})))),r.a.createElement("div",{id:"nitropay-blogs-middle",class:"nitropay"}),r.a.createElement("section",{className:"blogs-section"},r.a.createElement("h3",{className:"blogs-section-heading"},"Older posts"),r.a.createElement("div",{id:"blogs-section-older"},e.slice(3,e.length-1).map((e,t)=>r.a.createElement(l,{key:t,id:e.id,title:e.name,author:e.author,description:e.desc,date:e.date})))),r.a.createElement(c.a,null),r.a.createElement("div",{id:"nitropay-blogs-bottom",class:"nitropay"}))}a.d(t,"default",function(){return d})},41:function(e,t,a){"use strict";function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}t.a=(e,t,a)=>{"desktop"===a?t.mediaQuery="(min-width: 1025px)":"mobile"===a&&(t.mediaQuery="(min-width: 768px) and (max-width: 1024px), (min-width: 320px) and (max-width: 767px)"),window.nitroAds&&window.nitroAds.createAd(e,function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(a,!0).forEach(function(t){r(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({refreshLimit:10,refreshTime:30,renderVisibleOnly:!1,refreshVisibleOnly:!0,report:{enabled:!0,wording:"Report Ad",position:"top-right"}},t))}},71:function(e,t,a){"use strict";a.d(t,"a",function(){return i});var n=a(0),r=a.n(n),o=a(2);function i(){return r.a.createElement("div",{id:"bottom-cta"},r.a.createElement("h1",{id:"bottom-cta-title"},"What are you waiting for?"),r.a.createElement("p",{id:"bottom-cta-subtitle"},"Join the growing Dank Memer family today!"),r.a.createElement("a",{id:"bottom-cta-button",href:"https://invite.dankmemer.lol",rel:"noreferrer noopener"},"Invite Now"),r.a.createElement("p",{id:"bottom-cta-text"},"Not convinced? Check out all the ",r.a.createElement(o.b,{to:"/commands",className:"text-highlight"},"commands")," available!"))}}}]);