(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./src/app/Pages/Admin/Admin.scss":
/*!****************************************!*\
  !*** ./src/app/Pages/Admin/Admin.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Pages/Admin/Admin.scss?");

/***/ }),

/***/ "./src/app/Pages/Admin/index.jsx":
/*!***************************************!*\
  !*** ./src/app/Pages/Admin/index.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Admin_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Admin.scss */ \"./src/app/Pages/Admin/Admin.scss\");\n/* harmony import */ var _Admin_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Admin_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _panels_banPanels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./panels/banPanels */ \"./src/app/Pages/Admin/panels/banPanels.jsx\");\n/* harmony import */ var _panels_GetPayment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./panels/GetPayment */ \"./src/app/Pages/Admin/panels/GetPayment.jsx\");\nclass Admin extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent{render(){if(!this.props.loggedIn){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"content admin\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"header\",{className:\"header\"},\"You aren't logged in with your Discord account. \",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{href:\"/oauth/login?redirect=/admin\"},\"Click this\"),\" to log in.\"));}if(this.props.isAdmin===false){return location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');}return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"content admin\"},_panels_banPanels__WEBPACK_IMPORTED_MODULE_3__[\"default\"].map((Panel,key)=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Panel,{key:key})),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_panels_GetPayment__WEBPACK_IMPORTED_MODULE_4__[\"default\"],null));}}/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"connect\"])(store=>store.login,null)(Admin));\n\n//# sourceURL=webpack:///./src/app/Pages/Admin/index.jsx?");

/***/ }),

/***/ "./src/app/Pages/Admin/panels/GenericBanPanel.jsx":
/*!********************************************************!*\
  !*** ./src/app/Pages/Admin/panels/GenericBanPanel.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GenericPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GenericPanel */ \"./src/app/Pages/Admin/panels/GenericPanel.jsx\");\nfunction _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==='function'){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable;}));}ownKeys.forEach(function(key){_defineProperty(target,key,source[key]);});}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}class GenericBanPanel extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent{render(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenericPanel__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{title:this.props.title,dropdownHeader:\"Ban Type\",textAreaHeader:\"User ID\",defaultDropdown:\"appeal\",options:this.props.options.concat('appeal','lootbox'),action:this.action.bind(this),buttonText:this.props.buttonText});}async action(state){if(!state.textVal){return alert('enter a user id dumb cunt');}const res=await fetch(`/api/admin${this.props.getEndpoint(state)}`,_objectSpread({},this.props.getFetchParams(state),{credentials:'same-origin',headers:{'Content-Type':'application/json'}}));if(res.status!==200){alert(`Unknown HTTP response code: ${res.status}`);}else{this.props.finish(state,res);}}}_defineProperty(GenericBanPanel,\"defaultProps\",{getFetchParams:state=>({method:'POST',body:JSON.stringify({type:state.dropdownVal,id:state.textVal})}),options:[]});/* harmony default export */ __webpack_exports__[\"default\"] = (GenericBanPanel);\n\n//# sourceURL=webpack:///./src/app/Pages/Admin/panels/GenericBanPanel.jsx?");

/***/ }),

/***/ "./src/app/Pages/Admin/panels/GenericPanel.jsx":
/*!*****************************************************!*\
  !*** ./src/app/Pages/Admin/panels/GenericPanel.jsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nclass GenericBanPanel extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent{constructor(props){super(props);this.state={dropdownVal:props.defaultDropdown,textVal:''};}render(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"section-header\"},this.props.title),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\",null,this.props.dropdownHeader||this.state.dropdownVal,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\",null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\",{value:this.state.dropdownVal,onChange:e=>this.setState({dropdownVal:e.target.value})},this.props.options.map(option=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\",{value:option,key:option},option)))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\",null,this.props.textAreaHeader,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\",null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{type:\"text\",value:this.state.textVal,onChange:e=>this.setState({textVal:e.target.value})})),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\",{onClick:()=>this.props.action(this.state)},this.props.buttonText)));}}/* harmony default export */ __webpack_exports__[\"default\"] = (GenericBanPanel);\n\n//# sourceURL=webpack:///./src/app/Pages/Admin/panels/GenericPanel.jsx?");

/***/ }),

/***/ "./src/app/Pages/Admin/panels/GetPayment.jsx":
/*!***************************************************!*\
  !*** ./src/app/Pages/Admin/panels/GetPayment.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GetPayment; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GenericPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GenericPanel */ \"./src/app/Pages/Admin/panels/GenericPanel.jsx\");\nclass GetPayment extends react__WEBPACK_IMPORTED_MODULE_0__[\"PureComponent\"]{action(state){console.log(state);}render(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenericPanel__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{title:\"Find Transaction\",dropdownHeader:\"Parameter\",textAreaHeader:\"Value\",defaultDropdown:\"appeal\",options:['Discord ID','PayPal ID','PayPal E-Mail','Payment ID'],action:this.action.bind(this),buttonText:\"Find\"});}}\n\n//# sourceURL=webpack:///./src/app/Pages/Admin/panels/GetPayment.jsx?");

/***/ }),

/***/ "./src/app/Pages/Admin/panels/banPanels.jsx":
/*!**************************************************!*\
  !*** ./src/app/Pages/Admin/panels/banPanels.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GenericBanPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GenericBanPanel */ \"./src/app/Pages/Admin/panels/GenericBanPanel.jsx\");\n/* harmony default export */ __webpack_exports__[\"default\"] = ([react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenericBanPanel__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{title:\"Ban User\",buttonText:\"Hammer\",getEndpoint:()=>'/ban',finish:({dropdownVal,textVal})=>alert(`Successfully ${dropdownVal} banned ${textVal}`)})),react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenericBanPanel__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{title:\"Unban User\",buttonText:\"Unhammer\",getEndpoint:()=>'/unban',finish:({dropdownVal,textVal})=>alert(`Successfully ${dropdownVal} unbanned ${textVal}`)})),react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenericBanPanel__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{title:\"Check User Ban\",buttonText:\"Check\",options:['any'],getFetchParams:()=>({method:'GET'}),getEndpoint:({dropdownVal,textVal})=>`/checkBan?type=${dropdownVal}&id=${textVal}`,finish:async({textVal},res)=>{const bans=await res.json();if(!bans[0]){return alert(`${textVal} is a good boye and has no bans`);}else{alert(`${textVal} has the following bans:\\n\\n${bans.join('\\n')}`);}}}))]);\n\n//# sourceURL=webpack:///./src/app/Pages/Admin/panels/banPanels.jsx?");

/***/ })

}]);