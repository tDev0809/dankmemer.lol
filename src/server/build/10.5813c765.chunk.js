(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{138:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(18),r=a.n(o),c=a(12),i=a(60),l=s.a.memo(({success:e,data:t})=>s.a.createElement("main",{className:"content loot"},s.a.createElement("div",{className:"fancy-header absolute-unit"+(e?"":" red")},e?"Success!":"Fucky wucky."),s.a.createElement("div",{style:{fontSize:"22px"}},e?s.a.createElement(s.a.Fragment,null,"Your payment has successfully been made. Your boxes should be deposited directly into your inventory within 5 minutes of completing the purchase.",s.a.createElement("br",null),"If they do not show up after 24 hours, join ",s.a.createElement("a",{href:"https://discord.gg/FnP8m6q"},"the support server")," and mention a mod or a developer for assistance.",s.a.createElement("div",{className:"divider"}),"Additionally, can find your Payment ID below.",s.a.createElement("br",null),"You should store this ID somewhere and make sure you don't lose it - it is necessary if you are experiencing any problems.",s.a.createElement("br",null),s.a.createElement("code",{style:{fontSize:"32px"}},t.id)):s.a.createElement(s.a.Fragment,null,"Something went wrong while trying to ",t?"process":"create"," your payment.",s.a.createElement("br",null),"Please join ",s.a.createElement("a",{href:"https://discord.gg/FnP8m6q"},"the support server")," for help",t?" and contact an administrator with your Payment ID:":".",s.a.createElement("br",null),t&&s.a.createElement("code",{style:{fontSize:"32px"}},t.id))))),u=a(61),m=a.n(u);function d(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?d(Object(a),!0).forEach((function(t){h(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function h(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}const b=[0,90,180,270],f=Array(13).fill(0).map((e,t)=>new Audio(`/static/peepo${t}.mp3`));let y=-1;class g extends n.Component{shouldComponentUpdate(e,t){return e.isActive!==this.props.isActive}render(){const{box:e,isActive:t,setActiveBox:a,index:n}=this.props,o=()=>{const e=b[Math.floor(4*Math.random())],t=e%180?200:0,a=e%180?0:90;return{"--direction":e+"deg","--delta-x":(e>=180?-t:t)+"px","--delta-y":(e>=180?a:-a)+"px","--offset-x":e%180?0:130-260*Math.random()+"px","--offset-y":e%180?40-80*Math.random()+"px":0}};return s.a.createElement("div",{className:"box",onClick:()=>{a(n),(f[++y]||f[y=0]).play()}},this.props.isActive&&Array(3).fill(0).map((e,t)=>s.a.createElement("div",{key:t,className:"peepo",style:p(p({},o()),{},{backgroundImage:`url(${m.a})`})})),s.a.createElement("div",{className:"box-content"+(t?" active":"")},s.a.createElement("div",{className:"box-header"},e.name),s.a.createElement("div",{className:"box-description"},e.description),s.a.createElement("div",{className:"box-yield"},"Amount of coins:",s.a.createElement("span",{className:"box-piss"}," ",e.yield),s.a.createElement("br",null),"A ",s.a.createElement("u",null,100*e.randomItem.chance,"%")," chance at some ",s.a.createElement("a",{target:"_blank",href:"https://gist.github.com/melmsie/022a1b76c6242a59829ea1c4d3af5fec"},"cool items"),"."),s.a.createElement("div",{className:"box-price"},"$",e.price.toFixed(2))))}}var E=s.a.memo(({country:e})=>s.a.createElement("main",{className:"content loot"},s.a.createElement("div",{className:"fancy-header absolute-unit red"},"Sorry."),s.a.createElement("div",{style:{fontSize:"22px"}},"Loot boxes are declared illegal in your country. As a result, you are unable to purchase any boxes.",s.a.createElement("br",null),"Alternatively, click ",s.a.createElement("a",{href:"https://www.google.com/search?q=flights+to+usa"},"here")," to find flights to the Land of Freedom."),s.a.createElement("div",{style:{fontSize:"4px"}},"also ",e," gay lmao"))),v=a(42);const x=document.createElement("div");x.id="ree-overlay",document.body.appendChild(x);let N=0;var S=a(22),O=a(21);a(62);function w(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function D(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}const I=["Go on, honey. Go pick yourself a boxy box.","TREAT YO SELF... to a box of loot.","Cmon, you know you want a box.","Look at all these chickens (boxes).","A box a day keeps the loot goblins away..."];class A extends n.Component{constructor(...e){super(...e),D(this,"inputRef",Object(n.createRef)()),D(this,"paypalButton",null),D(this,"state",{boxes:null,activeBox:null,Constants:null,bannedCountry:!1,bannedUser:!1,hasAgreed:!1,succeededPayment:null,boxCount:1,welcomeMessage:I[Math.floor(Math.random()*I.length)],giftState:null})}async componentDidMount(){const{boxes:e,Constants:t}=await fetch("/api/boxes").then(e=>e.json());this.setState({boxes:e,Constants:t,activeBox:e[1]});const a=await fetch("/api/country").then(e=>e.json());if(a.isBlocked)return this.setState({blockedCountry:a});if(403===(await fetch("/api/isBanned",{credentials:"same-origin"})).status)return this.setState({bannedUser:!0});await Object(O.a)("https://www.paypal.com/sdk/js?client-id="+i.a.production);const n=window.paypal.Buttons.driver("react",{React:s.a,ReactDOM:r.a});this.paypalButton=s.a.createElement(n,{env:"production",style:{height:45,shape:"rect",color:"blue",tagline:!1},createOrder:(e,t)=>this.createOrder(t),onApprove:(e,t)=>this.onApprove(t)}),this.forceUpdate()}getSubtotal(e){const t=this.state.boxCount*this.state.activeBox.price;return e?t:t.toFixed(2)}getDiscountPercent(){const{Constants:e}=this.state,{discount:t}=this.props,a={},n=this.getSubtotal(!0);let s=0;t&&(s+=t.percent,a.discount=!0);const o=n*((100-(s+e.FLAT_DISCOUNT_PERCENTAGE))/100);return o>=e.MINIMUM_DISCOUNT_VALUE?(s+=e.FLAT_DISCOUNT_PERCENTAGE,a.flat=!0):a.neededUntilFlat=e.MINIMUM_DISCOUNT_VALUE-o,a.discountPercent=s,a}getDiscount(e){const t=this.getSubtotal(!0),a=this.getDiscountPercent(),n=0!==this.state.activeBox.id?t*(a.discountPercent/100):0;return e?n:n.toFixed(2)}getDiscountedSubtotal(e){const t=this.getSubtotal(!0)-Number(this.getDiscount());return e?t:t.toFixed(2)}createOrder(e){const t=(({total:e,subtotal:t,discount:a,token:n,activeBox:s,boxCount:o,giftUserID:r,salesTax:c})=>({intent:"CAPTURE",purchase_units:[{amount:{value:(Number(e)+Number(c)).toFixed(2),currency_code:"USD",breakdown:{item_total:{currency_code:"USD",value:(Number(t)+Number(c)).toFixed(2)},shipping_discount:{currency_code:"USD",value:a.toFixed(2)}}},description:"Dank Memer Lootbox Purchase",custom_id:`${n}${r?":"+r:""}`,soft_descriptor:"Dank Memer's Box Shop",items:[{name:s.name,unit_amount:{currency_code:"USD",value:s.price.toFixed(2)},quantity:o.toString(),category:"DIGITAL_GOODS"},{name:"Sales tax",unit_amount:{currency_code:"USD",value:c},quantity:"1",category:"DIGITAL_GOODS"}]}],application_context:{brand_name:"Dank Memer's Box Shop",shipping_preference:"NO_SHIPPING",user_action:"PAY_NOW"}}))(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?w(Object(a),!0).forEach((function(t){D(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):w(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({total:this.getDiscountedSubtotal(!0),subtotal:this.getSubtotal(!0),discount:this.getDiscount(!0),token:this.props.login.token,activeBox:this.state.activeBox,boxCount:this.state.boxCount,salesTax:(.0675*this.getDiscountedSubtotal(!0)).toFixed(2)},null===this.state.giftState?{}:{giftUserID:this.state.giftState}));return e.order.create(t).catch(e=>{console.error(e),this.setState({finish:{success:!1}})})}onApprove(e){return e.order.capture().then(e=>{console.log(e),this.setState({finish:{success:!0,data:e}})}).catch(e=>{console.error(e),this.setState({finish:{success:!1,err:e}})})}onInput({target:e,value:t}){let a=void 0!==t?t:Math.round(e.value);(a<=0||a>=101)&&""!==e.value&&(a=a<=0?1:100,(async({duration:e=1500,heavyness:t=10,playAudio:a=!0,rage:n=!0}={})=>{N++;const s=()=>(-t/2+Math.random()*t).toFixed(2),o=setInterval(()=>document.body.style.transform=`translate(${s()}px, ${s()}px)`);if(x.style.transition=`opacity ${(e/1e3).toFixed(1)}s`,setTimeout(()=>{clearInterval(o),0==--N&&(document.body.style.transform="",x.className="")},e),n&&(x.className="reeing"),a){const t=new Audio("/static/reeee.mp3");t.volume=.5,await t.play();const a=e/(t.volume/.001);for(;t.volume>.001;)await Object(v.a)(a),t.volume-=.001;t.volume=0}})({duration:1500,intensity:35})),e.value=a,this.setState({boxCount:a})}onCheck({target:e}){this.setState({hasAgreed:e.checked})}onGift({target:e}){this.setState({giftState:"on"===e.value?"":e.value})}async setActiveBox(e){this.setState({activeBox:this.state.boxes[e]})}onInputClick(e){return()=>{let t=this.inputRef.current.value;e?t++:t--,this.onInput({target:this.inputRef.current,value:t})}}render(){const{boxes:e,Constants:t,finish:a,blockedCountry:n,activeBox:o,bannedUser:r,giftState:c}=this.state;if(a)return s.a.createElement(l,a);if(n)return s.a.createElement(E,n);if(r)return s.a.createElement("main",{className:"content loot"},s.a.createElement("div",{className:"fancy-header absolute-unit red"},"Sorry, not sorry."),s.a.createElement("div",{style:{fontSize:"22px"}},"Your account has been banned from purchasing any lootboxes. NICE!"));if(!e)return s.a.createElement("div",null);const i=this.getDiscountedSubtotal(!0)>t.MINIMUM_PURCHASE_VALUE,u=this.props.login.loggedIn,m=this.state.hasAgreed;let d,p=!0;m?i?null!==c&&(c.length<16||c.length>21||isNaN(c))?(p=!1,d=s.a.createElement("div",null,"The user ID you have entered for the gift user is invalid.",s.a.createElement("br",null),"Please see ",s.a.createElement("a",{href:"https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-"},"this")," link for more information on getting user IDs.")):u||(d=s.a.createElement("div",null,"You aren't logged in with your Discord account. ",s.a.createElement("a",{href:"/oauth/login?redirect=/loot"},"Click this")," to log in.")):d=`You haven't met the minimum purchase value of $${t.MINIMUM_PURCHASE_VALUE.toFixed(2)}.`:d="You haven't agreed to the Terms of Service and Refund Policy.";const h=s.a.createElement("div",{className:"header red"},d);return s.a.createElement("main",{className:"content loot"},s.a.createElement("div",{className:"fancy-header absolute-unit"},this.state.welcomeMessage),s.a.createElement("div",{className:"boxes"},e.map((e,t)=>!e.disabled&&s.a.createElement(g,{key:e.name,index:t,box:e,isActive:o.id===t,setActiveBox:e=>this.setActiveBox(e)}))),s.a.createElement("span",{className:"discount-notification"},"Purchases above ",s.a.createElement("span",{className:"green"},"$",t.MINIMUM_DISCOUNT_VALUE)," receive a ",s.a.createElement("u",null,t.FLAT_DISCOUNT_PERCENTAGE,"%")," discount! ",(()=>{const e=this.getDiscountedSubtotal(!0),a=this.getDiscountPercent();if(0!==this.state.activeBox.id&&e>t.MINIMUM_DISCOUNT_VALUE&&!a.flat)return s.a.createElement(s.a.Fragment,null,s.a.createElement("br",null),"You have to spend ",s.a.createElement("span",{className:"green"},"$",a.neededUntilFlat.toFixed(2))," more for your purchase total to be above ",s.a.createElement("span",{className:"green"},"$",t.MINIMUM_DISCOUNT_VALUE)," after the discount.")})()),s.a.createElement("br",null),this.props.discount&&s.a.createElement("span",{className:"flash-discount-notification"},this.props.discount.name," FLASH SALE: ALL purchases receive a BONUS ",s.a.createElement("u",null,this.props.discount.percent,"%")," discount!",s.a.createElement("br",null),Object(S.a)(this.props.discount.expiry-Date.now()).human," left."),s.a.createElement("div",{className:"divider"}),s.a.createElement("div",{className:"header"},"Amount of ",s.a.createElement("span",{className:"selected-box-name"},o.name,"es"),":"),s.a.createElement("span",{className:"input-btn",onClick:this.onInputClick(!1)},"\u2013"),s.a.createElement("input",{className:"box-input",type:"number",onInput:e=>this.onInput(e),defaultValue:"1",ref:this.inputRef}),s.a.createElement("span",{className:"input-btn",onClick:this.onInputClick(!0)},"+"),s.a.createElement("div",{className:"divider"}),s.a.createElement("div",{className:"header"},"Subtotal:"),s.a.createElement("div",{className:"dolla-dolla-bills"},0===this.getDiscount(!0)?s.a.createElement("span",null,"$",this.getSubtotal()):s.a.createElement("span",null,s.a.createElement("s",null,s.a.createElement("i",null,"$",this.getSubtotal()))," $",this.getDiscountedSubtotal(),s.a.createElement("div",{className:"discount-info"},"(",(this.getDiscount(!0)/this.getSubtotal(!0)*100).toFixed(),"% total discount)"))),s.a.createElement("div",{className:"divider"}),s.a.createElement("label",{className:"tos-container"},s.a.createElement("input",{type:"checkbox",className:"tos-checkbox",onChange:this.onCheck.bind(this)}),s.a.createElement("span",{className:"tos-checkmark"}),s.a.createElement("span",{className:"header"},"I agree to Dank Memer's ",s.a.createElement("a",{href:"/terms"},"Terms of Service")," and ",s.a.createElement("a",{href:"/refunds"},"Refund Policy"),s.a.createElement("span",{className:"red"},"*")),"."),s.a.createElement("div",{className:"divider"}),s.a.createElement("label",{className:"gift-container"},null===this.state.giftState?s.a.createElement(s.a.Fragment,null,s.a.createElement("input",{type:"checkbox",className:"gift-checkbox",onChange:this.onGift.bind(this)}),s.a.createElement("span",{className:"gift-checkmark"}),s.a.createElement("span",{className:"header"},"This purchase is a gift.")):s.a.createElement(s.a.Fragment,null,s.a.createElement("span",{className:"header"},"Gift User ID:"),s.a.createElement("br",null),s.a.createElement("input",{type:"text",className:"gift-textbox",onChange:this.onGift.bind(this),value:this.state.giftState}))),s.a.createElement("div",{className:"divider"}),h,s.a.createElement("div",{style:{display:i&&u&&m&&p?"inline-block":"none",width:"300px"}},this.paypalButton))}}t.default=Object(c.b)(e=>e,null)(A)},42:function(e,t,a){"use strict";t.a=e=>new Promise(t=>setTimeout(t,e))},60:function(e){e.exports=JSON.parse('{"a":{"sandbox":"ARcRKInPqiVatw0xA38SBVPcTxqbesRh-7XKQE4b_eMJ4HTXkOPtwUVzpN6pomL2Ymjwh-uzXgmRu3sS","production":"ASxq51TP92spfbizUkcxNEl7x84Ct717OJ0xgI3A2O_FeIH1F1jEdTBAKWZq5Ml2G3U0p3g57OQlZJOB"}}')},61:function(e,t,a){e.exports=a.p+"214b5921370ab4c1a2257f8c4649a33a.png"},62:function(e,t,a){}}]);