(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{308:function(e,t,o){"use strict";function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,a)}return o}function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}t.a=(e,t,o)=>{"desktop"===o?t.mediaQuery="(min-width: 1025px)":"mobile"===o&&(t.mediaQuery="(min-width: 768px) and (max-width: 1024px), (min-width: 320px) and (max-width: 767px)"),window.nitroAds&&window.nitroAds.createAd(e,function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({refreshLimit:10,refreshTime:30,renderVisibleOnly:!1,refreshVisibleOnly:!0,report:{enabled:!0,wording:"Report Ad",position:"top-right"}},t))}},317:function(e,t,o){"use strict";o.d(t,"a",(function(){return i}));var a=o(0),n=o.n(a);o(318);function i(e){const[t,o]=Object(a.useState)(e.description),[i,r]=Object(a.useState)(e.permissions||null),[s,l]=Object(a.useState)(!1);return Object(a.useEffect)(()=>{o(e.description.replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/,e=>{let t=e.replace(/\[|\)/g,"").replace("]("," ").split(" ")[0];return`<a href="${e.replace(/\[|\)/g,"").replace("]("," ").split(" ")[1]}" rel="noopener noreferrer">${t}</a>`})),o(e.description.replace(/`(.*?)`/g,(e,t)=>`<b>${t}</b>`)),e.permissions&&e.permissions.map(e=>{const t=e.replace(/[A-Z]/g,e=>" "+e),o=t.split(" ")[0];r([]),r(e=>[...e,`${o.charAt(0).toUpperCase()+o.substr(1)} ${t.split(" ")[1]}`])})},[e.description,e.permissions]),Object(a.useEffect)(()=>{e.expanded&&l(!0),e.expanded||setTimeout(()=>{l(!1)},1e3)},[e.expanded]),n.a.createElement("div",{className:e.expanded?"expandable expanded":s?"expandable closing":"expandable"},n.a.createElement("div",{className:"expandable-text",onClick:()=>e.setExpanded(e.index)},n.a.createElement("p",{className:"expandable-text-title"},e.name,e.star?n.a.createElement("span",{className:"expandable-text-title-star",title:"This is a premium feature."},n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 20",fill:"none",stroke:"#ffbf00",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},n.a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),n.a.createElement("path",{fill:"#ffbf00",d:"M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"}))):""),"command"===e.type?n.a.createElement("p",{className:"expandable-text-message",dangerouslySetInnerHTML:{__html:t}}):""),"command"===e.type?n.a.createElement("div",{className:"expandable-body"},n.a.createElement("section",{className:"expandable-body-section"},n.a.createElement("h5",{className:"expandable-body-section-title"},"Usage"),n.a.createElement("p",{className:"expandable-body-section-content"},e.usage)),n.a.createElement("section",{className:"expandable-body-section"},n.a.createElement("h5",{className:"expandable-body-section-title"},"Required permissions"),n.a.createElement("p",{className:"expandable-body-section-content"},i.join(", ")))):n.a.createElement("div",{className:"expandable-body"},n.a.createElement("section",{className:"expandable-body-section"},n.a.createElement("h5",{className:"expandable-body-section-title"},"Response"),n.a.createElement("p",{className:"expandable-body-section-content"},t))))}},318:function(e,t,o){},319:function(e,t,o){},362:function(e){e.exports=JSON.parse('{"Dank Memer":[{"q":"How do I disable commands?","a":"To disable commands you need to do pls disable <command> and make sure that there\u2019s no overrides in the enable list so that this stays working. If you do pls enable list and you see an \u201cenabled guild wide\u201d (guild means server by the way) or the command is enabled for a certain channel that means it\u2019s an override, because enables override disables. You can do pls enable remove 4 for example and it will remove number 4 off of the enable list. You can also do pls enable clear and everything on the enable list will be reset. (The same goes for the disable list if you\u2019re looking to clear it or remove something off the list for that)"},{"q":"Why is the bot offline?","a":"More than likely, we are rebooting for an update or performance fixes. If the bot is ever offline more than 30 minutes, check in at our support server to see if there\'s major downtime planned."},{"q":"How do I disable a command for everyone except a certain role or user?","a":"You can do this by pls disable <command> then doing pls enable <command> <role> or pls enable <command> <@user>"},{"q":"Why won\u2019t the bot respond to me on my server?","a":"Please make sure the prefix has not changed, and the bot is showing online in your member list. If neither of these things are the case, please contact a support specialist for further help."},{"q":"How do I see multiple shop pages?","a":"To go to the next page or a certain page, do pls shop 2 for example, just add the number of the page you want to see to the end of the command. This applies to all commands or things that have multiple pages such as your inventory, notifications, the work list, etc."},{"q":"How do I enable/disable dm notifications?","a":"You can enable your dm notifications by simply doing pls settings dm notifications enabled and pls settings dm notifications nah to turn them off."},{"q":"Why did I get a notification twice?","a":"Sometimes you get a notification twice, the reason for that happening is due to a bug. If it\u2019s a level up notification and you get the rewards twice, don\u2019t worry about it, you won\u2019t get any penalty or anything. This problem will be fixed once the rewrite of the bot is completed. (This also applies to quest rewards)"},{"q":"How do I get a job that\u2019s locked?","a":"If there\u2019s certain jobs that have a red square or are locked in pls work list this means that you need to work more to unlock them. You can do pls work view (job) and it\u2019ll tell you how many hours are required for whichever job you put. Then you can check how many hours you have by pls work info and figure out how much more you need to unlock it."},{"q":"How do I increase my bank?","a":"To increase your bank you need to use currency commands or bank notes (you can get these by pls fish, pls beg, quests, loot boxes, trading for them, etc.). You can view all the different currency commands by pls cmds currency, for every few you use you\u2019ll gain an experience point or two which you can check on by doing pls profile. As you gain xp, you gain bankspace."},{"q":"Why are my coins missing?","a":"There are many ways that coins can be lost. Whenever you lose some, you should always do pls notifs to check what happened. This will let you know if you died, got robbed, got heisted, etc. Some of the ways to lose coins are dying, robbing someone and getting fined, a heist (dying or getting fined), calling the police to stop one when there isn\u2019t one going on, auto-lottery, or ending a game of blackjack."},{"q":"How did I die?","a":"Running pls notifs will show you your cause of death in the bot. You can die by your pet attacking you for not taking care of them enough, from pls search, a landmine, using a tide pod or alcohol, using pls hunt, robbing someone and their pet attacks you, or participating in a heist."},{"q":"Where did my item go?","a":"Do pls notifs and check if you died, if yes, then do pls notifs view #(notification number) to view the whole notification and see if you also lost an item. If no, then you most likely traded it to someone, gifted it, or sold it (if it was sellable) | Note: Any item can be lost when you die without using an apple or not having a lifesaver in your inventory"},{"q":"What can I do with my cookies or other collectables?","a":"As the name or type of the item suggests they are meant to be collected or to be traded to other users."},{"q":"Why would I want to prestige?","a":"When prestiging you will lose all your coins and all your items in exchange for a small multiplier for each time you prestige (continues to increase until prestige 10). You also gain bank space at an increased rate every time you prestige. You will obtain a prestige badge (see image below) that appears on your profile and changes each time you prestige up to prestige 10. Additionally, you will receive some starter items each time you prestige. What are these items? You\u2019ll have to prestige and find out for yourself."},{"q":"How do I turn on/off passive mode?","a":"You can turn on passive mode by doing pls settings passive true OR pls settings passive false to turn it off.\\n- When turning on this setting, no one will be able to rob or heist you.\\n- You cannot interact with other users (share, gift, etc.).\\n- Item buffs for stealing cannot be used, nor can you steal as well.\\n- You also lose 25% and 30% of winnings in bets and slots, respectively. (it doesn\u2019t affect blackjack)\\n- Keep in mind that your passive will be turned off automatically if you don\u2019t run commands for more than 14 days."}],"Beta Bot":[{"q":"What is Dank Memer Beta?","a":"Dank Memer Beta is the \\"beta\\" version of the main bot. It\'s considered unstable, but has more updated features than the main bot."},{"q":"Where did my beta coins go?","a":"Because of it being a BETA, we sometimes wipe the currency. Please use the main bot to avoid this."},{"q":"Why is x changed? Is this a bug?","a":"Maybe, maybe not. Some things are changed, some things are bugs, idk. It\'s a beta, stop asking questions."}],"Website":[{"q":"Why won\u2019t my appeal or report send after pressing the send button?","a":"You need to be logged in to send appeals or bot reports so that bot mods know who sent it and can read over it and then take any action if needed. Another thing that could be your issue is that you need to have at least 20 words for it to send, make sure you\u2019ve followed both of these things."},{"q":"When will I get a response for my appeal?","a":"We do not give out any time frames or ETAs on appeals, your patience on this matter is heavily appreciated. Additionally, you will not get a response if you have been denied."},{"q":"How do I put proof in my report?","a":"To put proof in your report go to imgur and upload the image there and then copy the link to paste in your report. You can also send the image somewhere on discord, then click on the image, then either copy the link or press share and then copy the link to put it in your report."}],"Premium":[{"q":"How do I receive my perks?","a":"After the payment has gone through for donating on patreon, you can claim your perks by connecting your Discord account to your Patreon account and then doing pls link in a discord server and waiting for the bot to link your perks. Once they\u2019ve been linked successfully you can do pls redeem to claim your loot boxes (currently the cooldown on this command is 3 days) and pls pserver add in a server (if you have the tier to) and that\u2019ll add premium perks to that server. Meaning it\u2019ll get things like weekly, auto-meme, auto-nsfw. The members of the server will have donor cooldowns, the ability to use nsfw commands, and the previous perks if the patreon tier is $10+."},{"q":"How do I remove a server as premium?","a":"Sometimes you leave a server that you added as premium, it gets deleted, or you just don\u2019t want it as premium anymore. You can remove the server as premium by doing pls pserver list, then copying the ID of whichever server and doing pls pserver remove ID. You can then add a different server as premium by pls pserver add in that server."},{"q":"I added premium perks to the server but it says it isn\u2019t premium?","a":"Then the premium perks added is from a 5$ tier, only from 10$ tier and above can give premium perks to the server where everyone can have donor perks and for the server to be called a Premium Server."},{"q":"How do I check if a server is premium and where do I find them?","a":"Do pls multi and if there\u2019s a multiplier \u201cPremium Server\u201d then it is a premium server. For premium servers, check our partnered servers, join our community server, or search for premium servers in Google."},{"q":"How often do I have to pay for premium?","a":"Due to how Patreon works, you will be charged up front when you first subscribe, and then again on the 1st of each month after that. Yes, that does still apply even if you start your sub on the 30th, you will be charged again on the 1st."},{"q":"I don\'t like my patreon perks, can I have a refund","a":"We do not offer any refunds for patreon perks. Please refer to our refund policy on this site."},{"q":"What do Steal Shields do?","a":"Steal shields make it so that if you are robbed you will lose less coins, the higher this is, the less you get robbed from you. For example, if you have a 20% Shield you will lose 20% less, so if you were going to get robbed of 1 million coins, you would only get 800k stolen from you instead. By the way, donor steal shields don\u2019t stack, meaning the percentage for your tier won\u2019t add on to a previous one, ex: $2 donor gets 5% and you\u2019re a $5 donor, you will only get 20% steal shield because it doesn\u2019t add."}],"Lootboxes":[{"q":"How long does it take to get my boxes?","a":"We are at the mercy of PayPal webhooks. Sometimes it\'s instant, and sometimes it can take up to two days. If it takes longer than two days, please contact our support with your transaction number."},{"q":"Can I use my mom\'s card?","a":"You may only use a payment method you are authorized to use. Using a card you aren\'t authorized for is fraud, and you will NOT get a refund + you will be banned from our bot."},{"q":"Can I have a refund for my loot boxes?","a":"Due to it being a digital item, and due to us losing money if we give a refund, we offer no refunds. Please see our refund policy on this site."}]}')},381:function(e,t,o){"use strict";o.r(t),o.d(t,"default",(function(){return l}));var a=o(0),n=o.n(a),i=o(362),r=o(317),s=o(308);o(319);function l(e){const t=Object(a.useRef)(Object.keys(i)),[o,l]=Object(a.useState)(t.current[0]),[d,c]=Object(a.useState)(Object.values(i)[Object.keys(i).indexOf(o)]),[u,p]=Object(a.useState)(!1),[m,h]=Object(a.useState)(!1),[f,y]=Object(a.useState)(null),[b,g]=Object(a.useState)(""),[w,v]=Object(a.useState)("pls ");Object(a.useEffect)(()=>(Object(s.a)("nitropay-faq-top",{sizes:[[728,90]]},"desktop"),Object(s.a)("nitropay-faq-top",{sizes:[[320,50],[300,50],[300,250]]},"mobile"),Object(s.a)("nitropay-faq-bottom",{sizes:[[728,90],[970,90],[970,250]],renderVisibleOnly:!0},"desktop"),Object(s.a)("nitropay-faq-bottom",{sizes:[[320,50],[300,50],[300,250]],renderVisibleOnly:!0},"mobile"),window.location.search&&"prefix"===window.location.search.split("?")[1].split("=")[0]?(v(window.location.search.split("?")[1].split("=")[1]+" "),window.history.pushState(null,null,"faq")):()=>{v("pls ")}),[]),Object(a.useEffect)(()=>{c([]),c(Object.values(i)[Object.keys(i).indexOf(o)])},[o]),Object(a.useEffect)(()=>(b.length>=1?(y(null),Object.values(i).flat().filter(e=>{(e.q.toLowerCase().includes(b.toLowerCase())||e.a.toLowerCase().includes(b.toLowerCase()))&&c(t=>[...t,e])})):(l(t.current[0]),c(Object.values(i)[Object.keys(i).indexOf(o)])),()=>{c([])}),[b]),Object(a.useEffect)(()=>{!u&&m?document.getElementById("faq").removeEventListener("click",()=>{h(!1)}):u&&!m&&(h(!0),document.getElementById("faq").addEventListener("click",e=>{e.target!==document.getElementById("faq-top-dropdown")&&e.target.parentNode!==document.getElementById("faq-top-dropdown-options")&&p(!1)}))},[u]);const k=e=>{g(""),document.getElementById("faq-search").value="",l(t.current[e]),y(null)},x=e=>{y(e.toString()&&e===f?null:e)};return n.a.createElement("div",{id:"faq"},n.a.createElement("div",{id:"nitropay-faq-top",className:"nitropay"}),n.a.createElement("div",{id:"faq-header"},n.a.createElement("h1",{id:"faq-header-title"},"Frequently Asked Questions"),n.a.createElement("p",{id:"faq-header-message"},"The most frequently asked questions can be found below. Split into categories depending on what they are related to."),n.a.createElement("svg",{id:"faq-header-dots",viewBox:"0 0 52 24",fill:"#16c458"},n.a.createElement("defs",null,n.a.createElement("pattern",{id:"dots",x:"0",y:"0",width:".15",height:".28"},n.a.createElement("circle",{cx:"1",cy:"1",r:"1"}))),n.a.createElement("rect",{fill:"url(#dots)",width:"42",height:"20"}))),n.a.createElement("div",{id:"faq-top"},n.a.createElement("div",{id:"faq-top-dropdown"},n.a.createElement("p",{id:"faq-top-dropdown-selected",onClick:()=>p(!u)},n.a.createElement("span",{id:"faq-top-dropdown-selected-name"},o)," ",n.a.createElement("span",null,n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 20",fill:"none",stroke:"#ffffff",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},n.a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),n.a.createElement("polyline",{points:"6 9 12 15 18 9"})))),u?n.a.createElement("div",{id:"faq-top-dropdown-options"},t.current.filter(e=>e!==o).map((e,o)=>n.a.createElement("p",{className:"faq-top-dropdown-option",onClick:()=>{k(t.current.indexOf(e)),p(!u)}},e))):""),n.a.createElement("ul",{id:"faq-top-tabs"},t.current.map((e,t)=>n.a.createElement("li",{key:t,className:o===e?b.length>=1?"faq-tab":"faq-tab selected":"faq-tab",onClick:()=>k(t)},e))),n.a.createElement("div",{id:"faq-top-search"},n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},n.a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),n.a.createElement("circle",{cx:"10",cy:"10",r:"7"}),n.a.createElement("line",{x1:"21",y1:"21",x2:"15",y2:"15"})),n.a.createElement("input",{id:"faq-search",name:"search",placeholder:"Find an answer for your question",onChange:e=>g(e.target.value)}))),n.a.createElement("div",{id:"faq-list-wrapper"},n.a.createElement("div",{id:"faq-list"},d.map((e,t)=>n.a.createElement(r.a,{key:t,index:t,prefix:w,name:e.q,description:e.a.replace(/pls /g,w),expanded:f===d.indexOf(e),setExpanded:x})))),n.a.createElement("div",{id:"nitropay-faq-bottom",className:"nitropay"}))}}}]);