(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./src/app/assets/styles/pages/singular/landing.scss":
/*!***********************************************************!*\
  !*** ./src/app/assets/styles/pages/singular/landing.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/pages/singular/landing.scss?");

/***/ }),

/***/ "./src/app/pages/singular/landing.jsx":
/*!********************************************!*\
  !*** ./src/app/pages/singular/landing.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Landing; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var assets_styles_pages_singular_landing_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/styles/pages/singular/landing.scss */ \"./src/app/assets/styles/pages/singular/landing.scss\");\n/* harmony import */ var assets_styles_pages_singular_landing_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(assets_styles_pages_singular_landing_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _util_createAd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/createAd */ \"./src/app/util/createAd.js\");\nconst cardData=[{name:'Commands',description:'See all of the commands Dank Memer has to offer your server!',link:'/commands'},{name:'FAQ',description:'Have some questions? See if we\\'ve already answered it on this page!',link:'/faq'},{name:'Support',description:'FAQ page not enough to help? Head over to our support server!',link:'https://discord.gg/meme'},{name:'Premium',description:'Click here to head to Patreon to see our premium perk selections!',link:'https://www.patreon.com/join/dankmemerbot?'},{name:'Lootboxes',description:'Dank Memer? More like EA: Memer edtion, come check out our \"surprise mechanics\"!',link:'/loot'},{name:'Twitter',description:'Follow us on Twitter! We love interacting with you all and shitposting!!',link:'https://twitter.com/dankmemerbot'},{name:'Reddit',description:'Check out, and take part in, our official subreddit!',link:'https://www.reddit.com/r/dankmemer/'},{name:'YouTube',description:'We post tutorial videos on our YouTube channel, subscribe to see new ones sooner!',link:'https://www.youtube.com/c/DankMemerDiscordBot'}];function Landing(props){const history=Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"useHistory\"])();Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{window.scroll(0,0);Object(_util_createAd__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('nitropay-landing-top',{sizes:[[728,90]]},'desktop');Object(_util_createAd__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('nitropay-landing-top',{sizes:[[320,50],[300,50],[300,250]]},'mobile');Object(_util_createAd__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('nitropay-landing-bottom',{sizes:[[728,90],[970,90]],renderVisibleOnly:true},'desktop');Object(_util_createAd__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('nitropay-landing-bottom',{sizes:[[320,50],[300,50],[300,250]],renderVisibleOnly:true},'mobile');});return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"landing\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"landing-title\"},\"Thanks for adding\",/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\",null),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"text-highlight\"},\"Dank Memer\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"nitropay-landing-top\",className:\"nitropay\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"landing-cards\"},cardData.map((card,i)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"landing-card\",key:i,onClick:()=>{if(card.link.startsWith(\"/\"))history.push(card.link);else window.location.href=card.link;}},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\",{className:\"landing-card-name\"},card.name),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"landing-card-text\"},card.description)))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"nitropay-landing-bottom\",className:\"nitropay\"}));}\n\n//# sourceURL=webpack:///./src/app/pages/singular/landing.jsx?");

/***/ }),

/***/ "./src/app/util/createAd.js":
/*!**********************************!*\
  !*** ./src/app/util/createAd.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}/* harmony default export */ __webpack_exports__[\"default\"] = ((id,opts,device)=>{if(device==='desktop')opts.mediaQuery='(min-width: 1025px)';else if(device==='mobile')opts.mediaQuery='(min-width: 768px) and (max-width: 1024px), (min-width: 320px) and (max-width: 767px)';window.nitroAds&&window.nitroAds.createAd(id,_objectSpread({\"refreshLimit\":10,\"refreshTime\":30,\"renderVisibleOnly\":false,\"refreshVisibleOnly\":true,\"report\":{\"enabled\":true,\"wording\":\"Report Ad\",\"position\":\"top-right\"}},opts));});\n\n//# sourceURL=webpack:///./src/app/util/createAd.js?");

/***/ })

}]);