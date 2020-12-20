(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./src/app/assets/styles/pages/singular/blogs.scss":
/*!*********************************************************!*\
  !*** ./src/app/assets/styles/pages/singular/blogs.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/pages/singular/blogs.scss?");

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

/***/ "./src/app/components/olderBlog.jsx":
/*!******************************************!*\
  !*** ./src/app/components/olderBlog.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return OlderBlog; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\nfunction OlderBlog(props){const getDate=date=>{date=new Date(date);const month=date.toLocaleString('default',{month:'long'});const day=getOrdinalNum(date.getDate());const year=date.getFullYear();return`${month} ${day}, ${year}`;};function getOrdinalNum(n){return n+(n>0?['th','st','nd','rd'][n>3&&n<21||n%10>3?0:n%10]:'');}return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{to:'/blogs/'+props.id},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blog-older\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{className:\"blog-older-title\"},props.title),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blog-older-information\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"blog-older-information-author\"},\"Written by \",props.author),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"blog-older-information-date\"},\"On \",getDate(props.date))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"blog-older-description\"},props.description)));}\n\n//# sourceURL=webpack:///./src/app/components/olderBlog.jsx?");

/***/ }),

/***/ "./src/app/components/recentBlog.jsx":
/*!*******************************************!*\
  !*** ./src/app/components/recentBlog.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RecentBlog; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\nfunction RecentBlog(props){const getDate=date=>{date=new Date(date);const month=date.toLocaleString('default',{month:'long'});const day=getOrdinalNum(date.getDate());const year=date.getFullYear();return`${month} ${day}, ${year}`;};function getOrdinalNum(n){return n+(n>0?['th','st','nd','rd'][n>3&&n<21||n%10>3?0:n%10]:'');}return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{to:'/blogs/'+props.id},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blog-recent\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{className:\"blog-recent-title\"},props.title),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blog-recent-information\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"blog-recent-information-author\"},\"Written by \",props.author),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"blog-recent-information-date\"},\"On \",getDate(props.date))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"blog-recent-description\"},props.description)));}\n\n//# sourceURL=webpack:///./src/app/components/recentBlog.jsx?");

/***/ }),

/***/ "./src/app/pages/singular/blogs.jsx":
/*!******************************************!*\
  !*** ./src/app/pages/singular/blogs.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Blogs; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_recentBlog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/recentBlog */ \"./src/app/components/recentBlog.jsx\");\n/* harmony import */ var _components_olderBlog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/olderBlog */ \"./src/app/components/olderBlog.jsx\");\n/* harmony import */ var assets_styles_pages_singular_blogs_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/styles/pages/singular/blogs.scss */ \"./src/app/assets/styles/pages/singular/blogs.scss\");\n/* harmony import */ var assets_styles_pages_singular_blogs_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(assets_styles_pages_singular_blogs_scss__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_bottomCTA__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/bottomCTA */ \"./src/app/components/bottomCTA.jsx\");\nconst adPlacements=['nitropay-blogs-middle'];function Blogs(){const[blogs,setBlogs]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{window.scroll(0,0);const getBlogs=async()=>{const res=await fetch('/api/blogs');return res.json();};getBlogs().then(blogsData=>setBlogs(blogsData));adPlacements.forEach(placement=>{window.nitroAds&&window.nitroAds.createAd(placement,{\"refreshLimit\":10,\"refreshTime\":30,\"renderVisibleOnly\":true,\"refreshVisibleOnly\":true,\"sizes\":[[\"728\",\"90\"],[\"320\",\"50\"]],\"report\":{\"enabled\":true,\"wording\":\"Report Ad\",\"position\":\"top-right\"}});});},[]);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"blogs\",className:!window.nitroAds?'nitro-margin':''},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"blogs-header\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"blogs-header-title\"},\"Blog Posts\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{id:\"blogs-header-message\"},\"Blogs are written by the developers and are community focused, news and updates regarding Dank Memer and related topics.\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\",{className:\"blogs-section\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\",{className:\"blogs-section-heading\"},\"Most recent posts\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"blogs-section-recent\"},blogs.slice(0,3).map((blog,i)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_recentBlog__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{key:i,id:blog.id,title:blog.name,author:blog.author,description:blog.desc,date:blog.date})))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"nitropay-blogs-middle\",className:window.nitroAds?\"nitropay ad-h\":'nitropay ad-h blocked'}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\",{className:\"blogs-section\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\",{className:\"blogs-section-heading\"},\"Older posts\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"blogs-section-older\"},blogs.slice(3,blogs.length-1).map((blog,i)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_olderBlog__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{key:i,id:blog.id,title:blog.name,author:blog.author,description:blog.desc,date:blog.date})))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_bottomCTA__WEBPACK_IMPORTED_MODULE_4__[\"default\"],null));}\n\n//# sourceURL=webpack:///./src/app/pages/singular/blogs.jsx?");

/***/ })

}]);