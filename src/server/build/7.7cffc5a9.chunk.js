(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{40:function(e,t,a){"use strict";var n=a(0),s=a.n(n);a(41);t.a=s.a.memo(({link:e,children:t,onClick:a})=>{const n=s.a.createElement("button",{onClick:a,className:"button"},t);return e?s.a.createElement("a",{href:e},n):n})},41:function(e,t,a){},68:function(e,t,a){},99:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return o}));var n=a(0),s=a.n(n),l=(a(68),a(40));class o extends s.a.Component{constructor(...e){var t,a,n;super(...e),t=this,a="state",n={name:"",date:new Date("04/20").getTime(),content:""},a in t?Object.defineProperty(t,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[a]=n}async componentDidMount(){(window.adsbygoogle=window.adsbygoogle||[]).push({}),this.setState(await fetch("/api/blogs/"+this.props.match.params.blog).then(e=>e.json()))}render(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"blog-header-container"},s.a.createElement("header",{className:"blog-header blurple"},this.state.name),s.a.createElement("div",{className:"blog-timestamp"},"Posted ",function(e){const t=(e=new Date(e)).toLocaleString("default",{month:"long"}),a=(s=e.getDate(),s+(s>0?["th","st","nd","rd"][s>3&&s<21||s%10>3?0:s%10]:"")),n=e.getFullYear();var s;return`${t} ${a}, ${n}`}(this.state.date)," by ",this.state.author),this.state.image&&s.a.createElement("div",{className:"blog-header-img"},s.a.createElement("img",{src:this.state.image}))),s.a.createElement("div",{className:"blog-content",dangerouslySetInnerHTML:{__html:this.state.content}}),s.a.createElement("div",{className:"call-to-action"},s.a.createElement("span",{className:"action-text"},"Join the growing Dank Memer family, today."),s.a.createElement("div",{className:"links"},s.a.createElement(l.a,{link:"https://invite.dankmemer.lol"},"Add Bot"),s.a.createElement(l.a,{link:"/commands"},"Commands"))),s.a.createElement("div",{align:"center"},s.a.createElement("ins",{className:"adsbygoogle ad","data-ad-client":"ca-pub-7326182486296195","data-ad-slot":"5725651587"})))}}}}]);