(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./src/app/Pages/Blogs/Blog.jsx":
/*!**************************************!*\
  !*** ./src/app/Pages/Blogs/Blog.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Blog; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _blog_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blog.css */ \"./src/app/Pages/Blogs/blog.css\");\n/* harmony import */ var _blog_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blog_css__WEBPACK_IMPORTED_MODULE_1__);\nfunction _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}class Blog extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component{constructor(...args){super(...args);_defineProperty(this,\"state\",{name:'',date:new Date('04/20').getTime(),content:''});}async componentDidMount(){this.setState((await fetch(`/api/blogs/${this.props.match.params.blog}`).then(r=>r.json())));}render(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"header\",{className:\"blog-header\"},this.state.name),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blog-timestamp\"},new Date(this.state.date).toLocaleString().split(',')[0]),this.state.image&&react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blog-header-img\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{src:this.state.image})),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blog-content\",dangerouslySetInnerHTML:{__html:this.state.content}}));}}\n\n//# sourceURL=webpack:///./src/app/Pages/Blogs/Blog.jsx?");

/***/ }),

/***/ "./src/app/Pages/Blogs/Blogs.jsx":
/*!***************************************!*\
  !*** ./src/app/Pages/Blogs/Blogs.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Blogs; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _blogs_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blogs.css */ \"./src/app/Pages/Blogs/blogs.css\");\n/* harmony import */ var _blogs_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_blogs_css__WEBPACK_IMPORTED_MODULE_2__);\nfunction _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}class Blogs extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component{constructor(...args){super(...args);_defineProperty(this,\"state\",{blogs:[]});}async componentDidMount(){this.setState({blogs:await fetch('/api/blogs').then(r=>r.json())});}render(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"content\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"header\",{className:\"header\"},\"Blogs\"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blogs\"},this.state.blogs.map(blog=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"blog\",key:blog.id,to:`/blogs/${blog.id}`},blog.thumbnail&&react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blog-img\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{src:blog.thumbnail})),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blog-info\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blog-name\"},blog.name),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"blog-date\"},new Date(blog.date).toLocaleString().split(',')[0]))))));}}\n\n//# sourceURL=webpack:///./src/app/Pages/Blogs/Blogs.jsx?");

/***/ }),

/***/ "./src/app/Pages/Blogs/blog.css":
/*!**************************************!*\
  !*** ./src/app/Pages/Blogs/blog.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Pages/Blogs/blog.css?");

/***/ }),

/***/ "./src/app/Pages/Blogs/blogs.css":
/*!***************************************!*\
  !*** ./src/app/Pages/Blogs/blogs.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Pages/Blogs/blogs.css?");

/***/ }),

/***/ "./src/app/Pages/Blogs/index.jsx":
/*!***************************************!*\
  !*** ./src/app/Pages/Blogs/index.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _Blogs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Blogs */ \"./src/app/Pages/Blogs/Blogs.jsx\");\n/* harmony import */ var _Blog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Blog */ \"./src/app/Pages/Blogs/Blog.jsx\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Switch\"],null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{exact:true,path:\"/blogs\",component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Blogs__WEBPACK_IMPORTED_MODULE_2__[\"default\"],null)}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{exact:true,path:\"/blogs/:blog\",component:props=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Blog__WEBPACK_IMPORTED_MODULE_3__[\"default\"],props)})));\n\n//# sourceURL=webpack:///./src/app/Pages/Blogs/index.jsx?");

/***/ })

}]);