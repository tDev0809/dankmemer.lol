(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./src/app/assets/styles/components/blog.scss":
/*!****************************************************!*\
  !*** ./src/app/assets/styles/components/blog.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/components/blog.scss?");

/***/ }),

/***/ "./src/app/components/blog.jsx":
/*!*************************************!*\
  !*** ./src/app/components/blog.jsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Blog; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _bottomCTA__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bottomCTA */ \"./src/app/components/bottomCTA.jsx\");\n/* harmony import */ var assets_styles_components_blog_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/styles/components/blog.scss */ \"./src/app/assets/styles/components/blog.scss\");\n/* harmony import */ var assets_styles_components_blog_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(assets_styles_components_blog_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _util_createAd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/createAd */ \"./src/app/util/createAd.js\");\nfunction Blog(props){const[title,setTitle]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');const[author,setAuthor]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');const[date,setDate]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(0);const[image,setImage]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null);const[content,setContent]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{window.scrollTo(0,0);const getBlog=async()=>{const res=await fetch(`/api/blogs/${window.location.pathname.split(\"/\")[2]}`);return res.json();};getBlog().then(blogData=>{setTitle(blogData.name);setAuthor(blogData.author);setDate(blogData.date);setContent(blogData.content);setImage(blogData.image?blogData.image:null);});Object(_util_createAd__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('nitropay-blog-bottom',{sizes:[[728,90],[970,90],[970,250]],renderVisibleOnly:true},'desktop');Object(_util_createAd__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('nitropay-blog-bottom',{sizes:[[320,50],[300,50],[300,250]],renderVisibleOnly:true},'mobile');},[]);const getDate=date=>{date=new Date(date);const month=date.toLocaleString('default',{month:'long'});const day=getOrdinalNum(date.getDate());const year=date.getFullYear();return`${month} ${day}, ${year}`;};function getOrdinalNum(n){return n+(n>0?['th','st','nd','rd'][n>3&&n<21||n%10>3?0:n%10]:'');}return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"blog\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"blog-header\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"blog-header-title\"},title),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"blog-header-information\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{id:\"blog-header-information-author\"},\"Written by \",author),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{id:\"blog-header-information-date\"},\"Published on \",getDate(date)))),image?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"blog-image\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{src:image,alt:title+\"'s image.\"})):'',/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"blog-content\",dangerouslySetInnerHTML:{__html:content}}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_bottomCTA__WEBPACK_IMPORTED_MODULE_1__[\"default\"],null),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"nitropay-blog-bottom\",class:\"nitropay\"}));}\n\n//# sourceURL=webpack:///./src/app/components/blog.jsx?");

/***/ }),

/***/ "./src/app/components/bottomCTA.jsx":
/*!******************************************!*\
  !*** ./src/app/components/bottomCTA.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BottomCTA; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\nfunction BottomCTA(){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"bottom-cta\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"bottom-cta-title\"},\"What are you waiting for?\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{id:\"bottom-cta-subtitle\"},\"Join the growing Dank Memer family today!\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{id:\"bottom-cta-button\",href:\"https://invite.dankmemer.lol\",rel:\"noreferrer noopener\"},\"Invite Now\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{id:\"bottom-cta-text\"},\"Not convinced? Check out all the \",/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{to:\"/commands\",className:\"text-highlight\"},\"commands\"),\" available!\"));}\n\n//# sourceURL=webpack:///./src/app/components/bottomCTA.jsx?");

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