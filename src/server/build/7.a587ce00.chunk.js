(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{110:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(12);a(40);var l={"Server Report":["Server has userbots","Server is trading invites/nitro for currency","Entire server is knowingly breaking bot rules","Server has alts","Other/NA"],"User Report":["No userbots, spamming, auto-typers, or macros","No sharing exploits, or abusing them","No coin storage accounts/farming accounts (alts)","Do not use the bot for racism, homophobia, any other type of targeted hate","Using the bot for advertising","Coins are not to be used in scams or invite servers. Example: giving people meme coins to invite as many people as possible","Selling meme coins or trading for real life currency in any way","Other/NA"]};a(76);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class i extends r.Component{constructor(...e){super(...e),o(this,"textAreaRef",n.a.createRef()),o(this,"state",{reportType:"User Report",brokenRules:[]})}async send(){if(!this.state.reportType)return alert("You have to select the kind of report you'd like to file.");if(this.textAreaRef.current.value.split(" ").length<20)return alert("Your report must be at least 20 words.");if(0===this.state.brokenRules.length)return alert("You must tick at least one broken rule.");switch((await fetch("/api/report",{credentials:"same-origin",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reportType:this.state.reportType,body:this.textAreaRef.current.value,rules:this.state.brokenRules})})).status){case 429:return this.setState({finished:n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"header"},"You've already recently reported someone."),"You have to wait before you do it again.")});case 200:return this.setState({finished:n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"header"},"Your report has been sent."),"Make sure you keep your direct messages with the bot open.",n.a.createElement("br",null),"If we have any information to ask for, the bot will send you a direct message.",n.a.createElement("br",null),"We will not notify you if a ban has happened or not, for privacy reasons.")});case 403:return this.setState({finished:n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"header"},"You have been banned from reporting people."),"Report bans are un-appealable. Good job. I'm proud of you.")})}}handleRadio(e){this.setState({reportType:e.target.value})}handleCheckbox(e){this.setState(t=>({brokenRules:t.brokenRules.includes(e)?t.brokenRules.filter(t=>t!==e):t.brokenRules.concat(e)}))}render(){return this.state.finished?n.a.createElement("div",{className:"content appeal"},this.state.finished):n.a.createElement("div",{className:"content appeal"},n.a.createElement("div",{className:"appeal-header-container"},n.a.createElement("h1",null,"Report a ","User Report"===this.state.reportType?"user":"server"),n.a.createElement("h5",null,"Please give as much detail as possible when writing your report.",n.a.createElement("br",null),"We won't tell you if the ","User Report"===this.state.reportType?"user":"server"," you are reporting has been punished.")),n.a.createElement("section",{className:"ban-type-section"},n.a.createElement("h2",null,"What type of report is this?"),n.a.createElement("div",{className:"options"},n.a.createElement("div",{className:"ban-type"},n.a.createElement("label",{className:"appeal-check-container appeal-label"},n.a.createElement("input",{type:"radio",value:"User Report",checked:"User Report"===this.state.reportType,onChange:this.handleRadio.bind(this)}),n.a.createElement("span",{class:"radio"})),n.a.createElement("label",{className:"appeal-label"},"User Report")),n.a.createElement("div",{className:"ban-type"},n.a.createElement("label",{className:"appeal-check-container appeal-label"},n.a.createElement("input",{className:"radio",type:"radio",value:"Server Report",checked:"Server Report"===this.state.reportType,onChange:this.handleRadio.bind(this)}),n.a.createElement("span",{class:"radio"})),n.a.createElement("label",{className:"appeal-label"},"Server Report")))),n.a.createElement("section",null,n.a.createElement("h2",null,"Which rules did they break?"),n.a.createElement("div",{className:"options"},l[this.state.reportType].map((e,t)=>n.a.createElement("div",{className:"appeal-rule-container"},n.a.createElement("label",{className:"appeal-check-container appeal-label",key:e},n.a.createElement("input",{type:"checkbox",value:e,checked:this.state.brokenRules.includes(e),onChange:this.handleCheckbox.bind(this,e)}),n.a.createElement("span",{class:"checkmark"})),n.a.createElement("div",{className:"appeal-number"},""+(t+1)),n.a.createElement("label",{className:"appeal-label"},e))))),n.a.createElement("section",null,n.a.createElement("label",{className:"appeal-textarea-label"},"Write the body of your report below.",n.a.createElement("br",null),n.a.createElement("b",null,"If you don't include an ID, the report is useless."),n.a.createElement("br",null),n.a.createElement("a",{target:"_blank",href:"https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-",className:"how-to-get-id"},"HOW TO GET ","User Report"===this.state.reportType?"USER":"SERVER"," ID????"),n.a.createElement("textarea",{className:"textarea",ref:this.textAreaRef,rows:"12"}))),n.a.createElement("section",null,n.a.createElement("button",{className:"send-btn",onClick:this.send.bind(this)},"Send")))}}t.default=Object(s.b)(e=>e.login)(i)},40:function(e,t,a){"use strict";var r=a(0),n=a.n(r);a(41);t.a=n.a.memo(({link:e,children:t,onClick:a})=>{const r=n.a.createElement("button",{onClick:a,className:"button"},t);return e?n.a.createElement("a",{href:e},r):r})},41:function(e,t,a){},76:function(e,t,a){}}]);