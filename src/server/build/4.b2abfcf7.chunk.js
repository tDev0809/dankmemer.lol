(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./src/app/Components/Button/Button.scss":
/*!***********************************************!*\
  !*** ./src/app/Components/Button/Button.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Components/Button/Button.scss?");

/***/ }),

/***/ "./src/app/Components/Button/index.jsx":
/*!*********************************************!*\
  !*** ./src/app/Components/Button/index.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Button_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button.scss */ \"./src/app/Components/Button/Button.scss\");\n/* harmony import */ var _Button_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Button_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(({link,children,onClick})=>{const button=react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\",{onClick:onClick,className:\"button\"},children);return link?react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{href:link},button):button;}));\n\n//# sourceURL=webpack:///./src/app/Components/Button/index.jsx?");

/***/ }),

/***/ "./src/app/Pages/Appeals/appeals.scss":
/*!********************************************!*\
  !*** ./src/app/Pages/Appeals/appeals.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Pages/Appeals/appeals.scss?");

/***/ }),

/***/ "./src/app/Pages/Appeals/index.jsx":
/*!*****************************************!*\
  !*** ./src/app/Pages/Appeals/index.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _Components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Components/Button */ \"./src/app/Components/Button/index.jsx\");\n/* harmony import */ var _rules_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rules.js */ \"./src/app/Pages/Appeals/rules.js\");\n/* harmony import */ var _appeals_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./appeals.scss */ \"./src/app/Pages/Appeals/appeals.scss\");\n/* harmony import */ var _appeals_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_appeals_scss__WEBPACK_IMPORTED_MODULE_4__);\nfunction _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}class Appeals extends react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]{constructor(...args){super(...args);_defineProperty(this,\"textAreaRef\",react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());_defineProperty(this,\"state\",{banType:'Bot Ban',brokenRules:[]});}async send(){if(!this.state.banType){return alert('You have to select the kind of ban you\\'d like to appeal.');}if(this.textAreaRef.current.value.split(' ').length<20){return alert('Your appeal must be at least 20 words.');}if(this.state.brokenRules.length===0){return alert('You must tick at least one broken rule. If you feel like you haven\\'t broken any, select \"Not Applicable\".');}const res=await fetch('/api/appeal',{credentials:'same-origin',method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({banType:this.state.banType,body:this.textAreaRef.current.value,rules:this.state.brokenRules})});switch(res.status){case 429:return this.setState({finished:react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"header\"},\"You've already recently appealed.\"),\"You have to wait before you try again.\")});case 200:return this.setState({finished:react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"header\"},\"Your appeal has been sent.\"),\"Make sure you keep your direct messages with the bot open.\",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\",null),\"If we have any information to give you, the bot will send you a direct message.\",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\",null),\"If your appeal is approved or denied, you may not receive a response either way.\")});case 403:return this.setState({finished:react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"header\"},\"You have been banned from sending appeals.\"),\"Appeal bans are un-appealable. Good job. I'm proud of you.\")});}}handleRadio(e){this.setState({banType:e.target.value});}handleCheckbox(rule){this.setState(prev=>({brokenRules:prev.brokenRules.includes(rule)?prev.brokenRules.filter(brokenRule=>brokenRule!==rule):prev.brokenRules.concat(rule)}));}render(){/*if (!this.props.loggedIn) {\n      return (\n        <div className=\"content appeal\">\n          <header className=\"header\">\n            You aren't logged in with your Discord account. <a href=\"/oauth/login?redirect=/appeals\">Click this</a> to log in.\n          </header>\n        </div>\n      );\n    }*/if(this.state.finished){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"content appeal\"},this.state.finished);}return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"content appeal\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\",null,\"What kind of ban would you like to appeal?\",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\",null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{type:\"radio\",value:\"Bot Ban\",checked:this.state.banType==='Bot Ban',onChange:this.handleRadio.bind(this)}),\"Bot Ban\"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{type:\"radio\",value:\"Bot Blacklist\",checked:this.state.banType==='Bot Blacklist',onChange:this.handleRadio.bind(this)}),\"Bot Blacklist\"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{type:\"radio\",value:\"Server Ban\",checked:this.state.banType==='Server Ban',onChange:this.handleRadio.bind(this)}),\"Server Ban\")),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\",null,\"Which rules did you break?\",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\",null),_rules_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"][this.state.banType].map((rule,index)=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\",{key:rule},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{type:\"checkbox\",value:rule,checked:this.state.brokenRules.includes(rule),onChange:this.handleCheckbox.bind(this,rule)}),`${index+1}. ${rule}`))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\",null,\"Write the body of your appeal below. Why should we appeal your ban?\",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\",null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"textarea\",{className:\"textarea\",ref:this.textAreaRef,rows:\"12\"}))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Button__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{onClick:this.send.bind(this)},\"Send\")));}}/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(store=>store.login)(Appeals));\n\n//# sourceURL=webpack:///./src/app/Pages/Appeals/index.jsx?");

/***/ }),

/***/ "./src/app/Pages/Appeals/rules.js":
/*!****************************************!*\
  !*** ./src/app/Pages/Appeals/rules.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst serverRules=[\"Keep it Discord TOS friendly\",\"Don't be rude or toxic, there's a difference between joking and being a dick.\",\"No advertising ANYTHING, including servers ran by our mods, or things mentioned in announcements in the past. This also means no dm advertising unless specifically requested.\",\"Keep bot usage in relevant bot command channels, the bot doesn't work in general-chat\",\"Emotes/Images/Reactions that break any of these rules (or can be triggers for epilepsy) are forbidden\",\"Racism, Homophobia, or any other kind of targeted hate is not okay even as a joke, this includes telling certain groups to \\\"die\\\"\",\"Alt accounts/Ban evading is against the rules\",\"Tagging developers for anything short of an emergency is bannable if they see fit\",\"No relationship roleplaying (fake relationships). It's gross.\",\"No mass nickname trends (and bypassing this by matching all your usernames is also against the rules, smartasses)\",\"No asking other users for coins, this isn't a charity server.\",\"Voice chat needs to stay clean too. All of the rules apply there, with the addition of not ear-raping other members.\",\"Fan art only in the #dank-memer-fan-art channel\",\"New movie/game spoilers are not allowed, including even if you use spoiler tags. Allow at least 2 weeks before talking about them.\",\"The bot is in English, only speak English here\",\"Not applicable\"];const botRules=[\"No userbots, spamming, or macros\",\"No sharing exploits\",\"No coin storage accounts/farming accounts (alts)\",\"Offensive/advertising names on the leaderboard will be wiped and blacklisted\",\"Do not use the bot for racism, homophobia, or advertising\",\"Coins are not to be used in scams or invite servers. Example: giving people meme coins to invite as many people as possible\",\"Selling meme coins, especially mass advertising, is strictly forbidden\",\"Not applicable\"];/* harmony default export */ __webpack_exports__[\"default\"] = ({'Server Ban':serverRules,'Bot Ban':botRules,'Bot Blacklist':botRules});\n\n//# sourceURL=webpack:///./src/app/Pages/Appeals/rules.js?");

/***/ })

}]);