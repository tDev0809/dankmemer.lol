(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{315:function(e){e.exports=JSON.parse('{"a":{"sandbox":"ARcRKInPqiVatw0xA38SBVPcTxqbesRh-7XKQE4b_eMJ4HTXkOPtwUVzpN6pomL2Ymjwh-uzXgmRu3sS","production":"ASxq51TP92spfbizUkcxNEl7x84Ct717OJ0xgI3A2O_FeIH1F1jEdTBAKWZq5Ml2G3U0p3g57OQlZJOB"}}')},327:function(e,t,a){var n={"./FeelsRareMan.gif":328,"./FeelsWowMan.png":329,"./PeepoJuice.gif":330,"./PepegaCredit.gif":331,"./YEP.png":332,"./bigWOW.png":333,"./iLoveYou.gif":334,"./peepoClap.gif":335,"./peepoGiggles.gif":336,"./peepoHappy.png":337,"./peepoPat.gif":338,"./peepolove.png":339,"./pepeDS.gif":340,"./pepoCheer.gif":341,"./pogSlide.gif":342,"./poggies.png":343,"./widepeepohappy.png":344};function r(e){var t=o(e);return a(t)}function o(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=o,e.exports=r,r.id=327},328:function(e,t,a){e.exports=a.p+"961ec7b44ccb71ff88ed93b636a28df9.gif"},329:function(e,t,a){e.exports=a.p+"a33959dbbbedc4a9bc316a9bcb9698ba.png"},330:function(e,t,a){e.exports=a.p+"51de581eb5728c96dcb585ae0ca0a207.gif"},331:function(e,t,a){e.exports=a.p+"25f52cef69ed1765654520a879c1df81.gif"},332:function(e,t,a){e.exports=a.p+"46002adcf47eaeb98bdebed8c496b08b.png"},333:function(e,t,a){e.exports=a.p+"0f487e5ae647aaf5a1ba96494e052014.png"},334:function(e,t,a){e.exports=a.p+"6a071e7d4aaf27034442cd3e0ad94727.gif"},335:function(e,t,a){e.exports=a.p+"3258c056932c7cda786e10fb9b08cc8e.gif"},336:function(e,t,a){e.exports=a.p+"4c5b0c178f2434e74a60679f0d4f3b05.gif"},337:function(e,t,a){e.exports=a.p+"e3794f97489ffbaad2b683b51636409f.png"},338:function(e,t,a){e.exports=a.p+"5c278a4172c09d5529798409b8776060.gif"},339:function(e,t,a){e.exports=a.p+"6003bb42ae35e28ecb42faf1d65fd2ad.png"},340:function(e,t,a){e.exports=a.p+"13ad96cc15e4c045a583b21ad6069ea0.gif"},341:function(e,t,a){e.exports=a.p+"a1fddc4d7474647a689c612ee1f2cde4.gif"},342:function(e,t,a){e.exports=a.p+"e716899549b832b9ea86a43f64a2ad0c.gif"},343:function(e,t,a){e.exports=a.p+"066e11f3dcdbdc4f2591834c296a556e.png"},344:function(e,t,a){e.exports=a.p+"077ad9648bea9eb57cdd61c45e0fc453.png"},345:function(e,t,a){},382:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(1),c=a(14),i=a(8),s=a(69),l=a(315),u=({total:e,subtotal:t,discount:a,token:n,activeBox:r,boxCount:o,giftUserID:c,salesTax:i})=>({intent:"CAPTURE",purchase_units:[{amount:{value:(Number(e)+Number(i)).toFixed(2),currency_code:"USD",breakdown:{item_total:{currency_code:"USD",value:(Number(t)+Number(i)).toFixed(2)},shipping_discount:{currency_code:"USD",value:a.toFixed(2)}}},description:"Dank Memer Lootbox Purchase",custom_id:`${n}${c?`:${c}`:""}`,soft_descriptor:"Dank Memer's Box Shop",items:[{name:r.name,unit_amount:{currency_code:"USD",value:r.price.toFixed(2)},quantity:o.toString(),category:"DIGITAL_GOODS"},{name:"Sales tax",unit_amount:{currency_code:"USD",value:i},quantity:"1",category:"DIGITAL_GOODS"}]}],application_context:{brand_name:"Dank Memer's Box Shop",shipping_preference:"NO_SHIPPING",user_action:"PAY_NOW"}}),m=a(316);function d(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function p(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function h(e){const t=t=>{const a=e.boxCount*e.activeBox.price;return t?a:a.toFixed(2)},a=a=>{const n=t(!0),{discountPercent:r}=(()=>{const{Constants:a,discount:n}=e,r={},o=t(!0);let c=e.discount;n&&(r.discount=!0);const i=o*((100-(c+a.FLAT_DISCOUNT_PERCENTAGE))/100);return i>=a.MINIMUM_DISCOUNT_VALUE?(c+=a.FLAT_DISCOUNT_PERCENTAGE,r.flat=!0):r.neededUntilFlat=a.MINIMUM_DISCOUNT_VALUE-i,r.discountPercent=c,r})(),o=0!==e.activeBox.id?n*(r/100):0;return a?o:o.toFixed(2)},n=e=>{const n=t(!0)-Number(a());return e?n:n.toFixed(2)};return r.a.createElement(m.PayPalButton,{options:{"client-id":l.a.production},style:{height:50,fontFamily:"'Inter', sans-serif",layout:"horizontal"},createOrder:(r,o)=>{const c=u(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?d(a,!0).forEach(function(t){p(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):d(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({total:n(!0),subtotal:t(!0),discount:a(!0),token:e.login.token,activeBox:e.activeBox,boxCount:e.boxCount,salesTax:(.0675*n(!0)).toFixed(2)},null===e.giftState?{}:{giftUserID:e.giftState}));return o.order.create(c)},onApprove:(t,a)=>(t=>t.order.capture().then(t=>{e.setFinishState({finish:{success:!0,data:t}})}).catch(t=>{e.setFinishState({finish:{success:!1,data:t}})}))(a)})}function f(){return r.a.createElement("div",{id:"store-prompt"},r.a.createElement("div",{id:"store-prompt-content"},r.a.createElement("h1",{id:"store-prompt-content-title"},"Not so fast!"),r.a.createElement("div",{id:"store-prompt-content-body"},r.a.createElement("p",{className:"store-prompt-content-message"},"Your account has been banned from purchasing any of our lootboxes! If you think this is a mistake, please join ",r.a.createElement("a",{href:"https://discord.gg/meme",target:"_blank",rel:"noopener noreferrer"},"our support server")," for assistance. If this is correct, you may attempt to ",r.a.createElement(o.b,{to:"/appeals"},"appeal your ban"),".")),r.a.createElement(o.b,{to:"/",id:"store-prompt-content-button"},"Go home")))}function g(e){return r.a.createElement("div",{id:"store-prompt"},r.a.createElement("div",{id:"store-prompt-content"},r.a.createElement("h1",{id:"store-prompt-content-title"},e.success?"Success!":"Uh oh.."),e.success?r.a.createElement("div",{id:"store-prompt-content-body"},r.a.createElement("p",{className:"store-prompt-content-message",style:{marginBottom:"15px"}},"Your payment has successfully been made. Your boxes should be deposited directly into your inventory within 5 minutes of completing the purchase."),r.a.createElement("p",{className:"store-prompt-content-message"},"If they do not show up after 24 hours, join ",r.a.createElement("a",{href:"https://discord.gg/meme",target:"_blank",rel:"noopener noreferrer"},"the support server")," and mention a mod or a developer for assistance."),r.a.createElement("p",{className:"store-prompt-content-message"},"Additionally, can find your Payment ID below.",r.a.createElement("br",null),"You should store this ID somewhere and make sure you don't lose it - it is necessary if you are experiencing any problems.",r.a.createElement("br",null),"Payment ID: ",r.a.createElement("span",{className:"text-highlight"},e.data&&e.data.id))):r.a.createElement("div",{id:"store-prompt-content-body"},r.a.createElement("p",{className:"store-prompt-content-message",style:{marginBottom:"15px"}},"uwu we make a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquaters are working VEWY HAWD to fix this!"),r.a.createElement("p",{className:"store-prompt-content-message"},"Something went wrong while trying to ",e.data&&e.data?"process":"create"," your payment. You can try again or join ",r.a.createElement("a",{href:"https://discord.gg/meme",target:"_blank",rel:"noopener noreferrer"},"the support server")," for help",e.data?" and contact an administrator with your Payment ID:":".")),r.a.createElement(o.b,{to:"/loot",id:"store-prompt-content-button"},"Go to store")))}function E({country:e}){return r.a.createElement("div",{id:"store-prompt"},r.a.createElement("div",{id:"store-prompt-content"},r.a.createElement("h1",{id:"store-prompt-content-title"},"Sorry."),r.a.createElement("div",{id:"store-prompt-content-body"},r.a.createElement("p",{className:"store-prompt-content-message"},"Loot boxes are declared illegal in your country. As a result, you are unable to purchase any boxes."),r.a.createElement("p",{className:"store-prompt-content-message"},"Alternatively, click ",r.a.createElement("a",{href:"https://www.google.com/search?q=flights+to+usa"},"here")," to find flights to the Land of Freedom."),r.a.createElement("div",{style:{fontSize:"4px"}},r.a.createElement("p",null,"also ",e," gay lmao"))),r.a.createElement(o.b,{to:"/",id:"store-prompt-content-button"},"Go home")))}var b=a(7),y=a(317),v=a.n(y);a(326);function x(e){const[t,a]=Object(n.useState)(new Date),c=Object(b.f)();return r.a.createElement("div",{id:"store-prompt"},r.a.createElement("div",{id:"store-prompt-content"},r.a.createElement("h1",{id:"store-prompt-content-title"},"Hold on."),r.a.createElement("div",{id:"store-prompt-content-body"},r.a.createElement("p",{className:"store-prompt-content-message"},"Before you go any further, we need to verify you are of legal age to access the following page."),r.a.createElement(v.a,{onDayChange:e=>a(e)})),r.a.createElement("span",{to:"/",id:"store-prompt-content-button",onClick:()=>{if((Math.round(((new Date).getTime()-new Date(t).getTime())/1e3/86400)/365.25).toFixed()>=21)return e.checkAge(!1);c.push("/")}},"Verify age"),r.a.createElement(o.b,{to:"/",id:"store-prompt-content-button-small"},"Go home")))}var O=e=>new Promise(t=>setTimeout(t,e));const S=document.createElement("div");S.id="ree-overlay",document.body.appendChild(S);let w=0;var I=async({duration:e=1500,heavyness:t=10,playAudio:a=!0,rage:n=!0}={})=>{w++;const r=()=>(-t/2+Math.random()*t).toFixed(2),o=setInterval(()=>document.body.style.transform=`translate(${r()}px, ${r()}px)`);if(S.style.transition=`opacity ${(e/1e3).toFixed(1)}s`,setTimeout(()=>{clearInterval(o),0==--w&&(document.body.style.transform="",S.className="")},e),n&&(S.className="reeing"),a){const t=new Audio("static/audio/reeee.mp3");t.volume=.5,await t.play();const a=e/(t.volume/.001);for(;t.volume>.001;)await O(a),t.volume-=.001;t.volume=0}return o};const N=[],M=a(327);M.keys().map(e=>{N.push(M(e))});var k=N,P=a(68);a(345);function _(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function U(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?_(a,!0).forEach(function(t){j(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):_(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function j(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}const A={id:0,name:"Lootbox",description:"Lootbox description",items:[],price:0,randomItem:{chance:0,keyword:"N/A"},yield:"0 - 0"};t.default=Object(i.b)(e=>e,null)(function(e){const t=Object(n.useRef)(),[a,i]=Object(n.useState)([A]),[l,u]=Object(n.useState)(A),[m,d]=Object(n.useState)(""),[p,b]=Object(n.useState)(!1),[y,v]=Object(n.useState)(!1),[O,S]=Object(n.useState)(!1),[w,N]=Object(n.useState)(null),[M,_]=Object(n.useState)(1),[j,D]=Object(n.useState)(null),[C,F]=Object(n.useState)(0),[L,T]=Object(n.useState)(!1),[$,B]=Object(n.useState)(!1),[R,V]=Object(n.useState)(!1),[G,H]=Object(n.useState)(0),[W,Y]=Object(n.useState)(!1),[q,z]=Object(n.useState)(""),[J,K]=Object(n.useState)({MINIMUM_PURCHASE_VALUE:3,MINIMUM_DISCOUNT_VALUE:20,FLAT_DISCOUNT_PERCENTAGE:10});Object(n.useEffect)(()=>{window.scroll(0,0),c.all([c("/api/boxes"),c("/api/country"),c("/api/isBanned")]).then(c.spread(async({data:{boxes:e,Constants:t}},{data:{country:a}},n)=>{i(e),u(e[1]),d(a),b(403===n.status)})).catch(e=>{console.error(e)})},[]),Object(n.useEffect)(()=>{["ES","BE","NL"].includes(m)&&!localStorage.getItem("verified_age")&&"verified"!==localStorage.getItem("verified_age")&&(T(!0),localStorage.setItem("verified_age","unverified"))},[m]),Object(n.useEffect)(()=>j&&C.toString().length>16&&C.toString().length<21?B(!0):B(!1),[C]),Object(n.useEffect)(()=>{_(1)},[l]),Object(n.useEffect)(()=>{t.current&&(t.current.value=M)},[M]),Object(n.useEffect)(()=>{R&&(I({duration:1500,intensity:35}),setTimeout(()=>{V(!1)},2e3))},[R]),Object(n.useEffect)(()=>{if(!e.discount)return;let t=e.discount.expiry-Date.now(),a=Object(P.a)(e.discount.expiry-Date.now());z(`${1===a.hours.toString().length?"0"+a.hours:a.hours}:${1===a.minutes.toString().length?"0"+a.minutes:a.minutes}:${1===a.seconds.toString().length?"0"+a.seconds:a.seconds}`),setInterval(()=>{t-=1e3,a=Object(P.a)(t),z(`${1===a.hours.toString().length?"0"+a.hours:a.hours}:${1===a.minutes.toString().length?"0"+a.minutes:a.minutes}:${1===a.seconds.toString().length?"0"+a.seconds:a.seconds}`)},1e3)},[e.discount]);const X=Array(13).fill(0).map((e,t)=>new Audio(`/static/audio/peepo${t}.mp3`)),Q=()=>{const e=Math.floor(360*Math.random());return{"--direction":`${e}deg`,"--delta-x":`${200*Math.sin(e)}px`,"--delta-y":`${150*Math.cos(e)}px`,"--offset-x":e%180?0:`${130-260*Math.random()}px`,"--offset-y":e%180?`${40-80*Math.random()}px`:0}},Z=({finish:e})=>{S(e.success),N(e.data)},ee=e=>{const t=M*l.price;return e?t:t.toFixed(2)},te=()=>{const t={},a=ee(!0);let n=e.discount&&100*e.discount.percent;const r=a*((100-(n+J.FLAT_DISCOUNT_PERCENTAGE))/100);return r>=J.MINIMUM_DISCOUNT_VALUE?(n+=J.FLAT_DISCOUNT_PERCENTAGE,t.flat=!0):t.neededUntilFlat=J.MINIMUM_DISCOUNT_VALUE-r,t.discountPercent=n,t},ae=e=>{const t=ee(!0),a=te(),n=0!==l.id?t*(a.discountPercent/100):0;return e?n:n.toFixed(2)},ne=e=>{const t=ee(!0)-Number(ae());return e?t:t.toFixed(2)},re=e=>{e&&parseInt(M)<100?_(parseInt(M)+1):!e&&parseInt(M)>1&&_(parseInt(M)-1)};return r.a.createElement("div",{id:"store"},p?r.a.createElement(f,null):"BE"===m?r.a.createElement(E,null):L?r.a.createElement(x,{checkAge:()=>{localStorage.setItem("verified_age","verified"),T(!1)}}):O?r.a.createElement(g,{success:O,data:w}):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"store-header"},r.a.createElement("h1",{id:"store-header-title"},"Dank Memer Store"),r.a.createElement("p",{id:"store-header-message"},"Welcome to the lootbox shop! Here you can find a variety of different purchasable items that grant you a chance of winning something special!")),e.discount?r.a.createElement("div",{id:"store-discount"},r.a.createElement("div",{id:"store-discount-content"},r.a.createElement("h1",{id:"store-discount-content-title"},"Flash Sale!"),r.a.createElement("h3",null,"Sale ends in: ",q),r.a.createElement("p",{id:"store-discount-content-message"},"Pick up your boxes with a ",r.a.createElement("b",null,100*e.discount.percent,"% discount")," during this limited time event!")),r.a.createElement("svg",{id:"store-discount-svg",height:"100%",width:"100%"},r.a.createElement("circle",{cx:"523",cy:"39",r:"100.5"}),r.a.createElement("circle",{cx:"931.5",cy:"38.5",r:"50.5"}),r.a.createElement("circle",{cx:"381.5",cy:"-0.5",r:"26.5"}),r.a.createElement("circle",{cx:"662.7",cy:"116.8",r:"39.3"}),r.a.createElement("circle",{cx:"1014",cy:"11",r:"16"}),r.a.createElement("circle",{cx:"720.5",cy:"0.5",r:"26.5"}),r.a.createElement("circle",{cx:"1221",cy:"85",r:"46"}),r.a.createElement("circle",{cx:"247",cy:"98",r:"13"}),r.a.createElement("circle",{cx:"147",cy:"8",r:"50"}))):"",r.a.createElement("div",{id:"store-boxes"},a.map((e,n)=>r.a.createElement("div",{key:n,className:l.id===n?"store-box active":"store-box",onClick:()=>{l.id!==n&&(G<1?H(0):G>=12&&H(0),X[G].play(),H(G+1),Y(!0)),u(a[n])}},r.a.createElement("h2",{className:"store-box-name"},e.name),r.a.createElement("p",{className:"store-box-price"},"$",e.price),W&&l.id===n?r.a.createElement("div",{id:"peepos"},r.a.createElement("div",{className:"peepo",style:U({},Q(),{backgroundImage:`url(${k[Math.floor(Math.random()*k.length)]})`})}),r.a.createElement("div",{className:"peepo",style:U({},Q(),{backgroundImage:`url(${k[Math.floor(Math.random()*k.length)]})`})}),r.a.createElement("div",{className:"peepo",style:U({},Q(),{backgroundImage:`url(${k[Math.floor(Math.random()*k.length)]})`})}),r.a.createElement("div",{className:"peepo",style:U({},Q(),{backgroundImage:`url(${k[Math.floor(Math.random()*k.length)]})`})}),r.a.createElement("div",{className:"peepo",style:U({},Q(),{backgroundImage:`url(${k[Math.floor(Math.random()*k.length)]})`})})):"",l.id===n?r.a.createElement("div",{id:"store-box-counter"},r.a.createElement("div",{id:"store-box-counter-sub",onClick:()=>re(!1)},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 20",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},r.a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),r.a.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"}))),r.a.createElement("input",{id:"store-box-counter-num",type:"number",ref:t,defaultValue:1,onInput:()=>void(t.current&&(t.current.value<1?(t.current.value=1,_(1),V(!0)):t.current.value>100?(t.current.value=100,_(100),V(!0)):_(t.current.value))),placeholder:"Boxes"}),r.a.createElement("div",{id:"store-box-counter-add",onClick:()=>re(!0)},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 20",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},r.a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),r.a.createElement("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),r.a.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"})))):""))),r.a.createElement("div",{id:"store-details"},r.a.createElement("div",{id:"store-items"},r.a.createElement("h2",{id:"store-items-title"},"Possible items"),r.a.createElement("p",{id:"store-items-message"},"Below includes a list of all the goodies and the maximum amount of items you could receive from the purchase of a ",r.a.createElement("span",{className:"text-highlight"},l.name),"! Along with these items, you have the chance of getting anywhere in the range of ",r.a.createElement("span",{className:"text-highlight"},"\u23e3 ",l.yield),"."),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Item name"),r.a.createElement("th",null,"Max. Amount"))),r.a.createElement("tbody",null,l.items.map(({name:e,amount:t},a)=>r.a.createElement("tr",{key:a},r.a.createElement("td",null,e),r.a.createElement("td",null,t)))))),r.a.createElement("div",{id:"store-summary"},r.a.createElement("h2",{id:"store-summary-title"},"Order summary"),r.a.createElement("p",{id:"store-summary-message"},"All orders are processed via PayPal and will operate using the United States Dollar. Each order has a minimum charge amount of $",J.MINIMUM_PURCHASE_VALUE," where you will need to fulfill this amount to continue. Orders over $",J.MINIMUM_DISCOUNT_VALUE," will receive a ",J.FLAT_DISCOUNT_PERCENTAGE,"% discount."),r.a.createElement("table",{id:"store-summary-items"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,M,"x ",l.name),r.a.createElement("td",null,"$",Math.round(100*(M*l.price+Number.EPSILON))/100)),r.a.createElement("tr",null,r.a.createElement("td",null,"Added sales tax"),r.a.createElement("td",null,"$",J?(.0675*ne(!0)).toFixed(2):"")),r.a.createElement("tr",null,r.a.createElement("td",null,"Discount"),r.a.createElement("td",null,te().discountPercent||0,"% ($",ae(),")")),r.a.createElement("tr",null,r.a.createElement("td",null),r.a.createElement("td",null)),r.a.createElement("tr",null,r.a.createElement("td",null),r.a.createElement("td",{id:"store-summary-total"},"Total: $",Math.round(100*(M*l.price+Number.EPSILON))/100<20?Math.round(100*(parseFloat(J?(.0675*ne(!0)).toFixed(2):0)+parseFloat(M*l.price)+Number.EPSILON))/100:(Math.round(100*(parseFloat(J?(.0675*ne(!0)).toFixed(2):0)+parseFloat(M*l.price)+Number.EPSILON))/100-(M*l.price*(te().discountPercent/100)).toFixed(2)).toFixed(2))))),r.a.createElement("div",{id:"store-summary-inputs"},r.a.createElement("div",{className:"store-summary-input"},r.a.createElement("input",{name:"tos-privacy",type:"checkbox",onChange:e=>v(e.target.checked)}),r.a.createElement("div",{className:"store-summary-input-tick"},r.a.createElement("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"#ffffff",strokeWidth:"1.75",strokeLinecap:"round",strokeLinejoin:"round"},r.a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),r.a.createElement("path",{d:"M5 12l5 5l10 -10"}))),r.a.createElement("label",{htmlFor:"tos-privacy"},"I agree to Dank Memer\u2019s ",r.a.createElement(o.b,{to:"/terms"},"Terms of Service")," and ",r.a.createElement(o.b,{to:"refunds"},"Refund Policy"),"."),r.a.createElement("br",null)),r.a.createElement("div",{className:"store-summary-input"},r.a.createElement("input",{name:"gift-purchase",type:"checkbox",onChange:e=>D(e.target.checked)}),r.a.createElement("div",{className:"store-summary-input-tick"},r.a.createElement("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"#ffffff",strokeWidth:"1.75",strokeLinecap:"round",strokeLinejoin:"round"},r.a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),r.a.createElement("path",{d:"M5 12l5 5l10 -10"}))),r.a.createElement("label",{htmlFor:"gift-purchase"},"Th",1===M?"is box is":"ese boxes are"," being purchased as a gift.")),j?r.a.createElement("div",{className:"store-summary-input"},r.a.createElement("input",{name:"user-gift",type:"number",onChange:e=>F(e.target.value)}),r.a.createElement("label",{htmlFor:"user-gift"},"Gift recipient's user ID.")):"",Math.round(100*(M*l.price+Number.EPSILON))/100<J.MINIMUM_PURCHASE_VALUE?r.a.createElement("div",{id:"checkout-error"},r.a.createElement("p",{id:"checkout-error-notice"},"Insufficient purchase amount."),r.a.createElement("p",{id:"checkout-error-help"},"Your order does not meet the minimum required value of $",J.MINIMUM_PURCHASE_VALUE,".")):"",Math.round(100*(M*l.price+Number.EPSILON))/100>=J.MINIMUM_PURCHASE_VALUE&&j&&!$?r.a.createElement("div",{id:"checkout-error"},r.a.createElement("p",{id:"checkout-error-notice"},"The ID provided is invalid."),r.a.createElement("p",{id:"checkout-error-help"},"If you are unsure, you can find how to get an user ID ",r.a.createElement("a",{href:"https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID",rel:"noreferrer noopener",target:"_blank"},"here"),".")):""),j?$&&y&&e.login.loggedIn&&0!==l.price&&Math.round(100*(M*l.price+Number.EPSILON))/100>=J.MINIMUM_PURCHASE_VALUE?r.a.createElement("div",{id:"store-summary-actions"},r.a.createElement(h,{activeBox:l,boxCount:M,giftState:C,login:e.login,Constants:J,discount:e.discount&&100*e.discount.percent||0,setFinishState:Z}),r.a.createElement("p",{id:"store-summary-actions-message"},"You are still able to use your credit/debit card without signing in through PayPal. Scroll down in the popup window.")):e.login.loggedIn?"":r.a.createElement("div",{id:"store-summary-actions"},r.a.createElement(s.a,null),r.a.createElement("p",{id:"store-summary-actions-message"},"Before you purchase your ",r.a.createElement("span",{className:"text-highlight"},"shiny")," new boxes you need to login to Discord.")):"",!j&&y&&e.login.loggedIn&&0!==l.price&&Math.round(100*(M*l.price+Number.EPSILON))/100>=J.MINIMUM_PURCHASE_VALUE?r.a.createElement("div",{id:"store-summary-actions"},r.a.createElement(h,{activeBox:l,boxCount:M,giftState:null,login:e.login,Constants:J,discount:e.discount&&100*e.discount.percent||0,setFinishState:Z}),r.a.createElement("p",{id:"store-summary-actions-message"},"You are still able to use your credit/debit card without signing in through PayPal. Scroll down in the popup window.")):j||e.login.loggedIn?"":r.a.createElement("div",{id:"store-summary-actions"},r.a.createElement(s.a,null),r.a.createElement("p",{id:"store-summary-actions-message"},"Before you purchase your ",r.a.createElement("span",{className:"text-highlight"},"shiny")," new boxes you need to login to Discord."))))))})}}]);