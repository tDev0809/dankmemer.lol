(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./src/app/Components/Modal/Backdrop.jsx":
/*!***********************************************!*\
  !*** ./src/app/Components/Modal/Backdrop.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (({children})=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"backdrop\"},children));\n\n//# sourceURL=webpack:///./src/app/Components/Modal/Backdrop.jsx?");

/***/ }),

/***/ "./src/app/Components/Modal/Modal.jsx":
/*!********************************************!*\
  !*** ./src/app/Components/Modal/Modal.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Modal; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Backdrop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Backdrop */ \"./src/app/Components/Modal/Backdrop.jsx\");\nclass Modal extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component{render(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Backdrop__WEBPACK_IMPORTED_MODULE_1__[\"default\"],null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"modal\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"modal-child\"},this.props.component)));}}\n\n//# sourceURL=webpack:///./src/app/Components/Modal/Modal.jsx?");

/***/ }),

/***/ "./src/app/Components/Modal/Modal.scss":
/*!*********************************************!*\
  !*** ./src/app/Components/Modal/Modal.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Components/Modal/Modal.scss?");

/***/ }),

/***/ "./src/app/Components/Modal/index.jsx":
/*!********************************************!*\
  !*** ./src/app/Components/Modal/index.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createModal; });\n/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal */ \"./src/app/Components/Modal/Modal.jsx\");\n/* harmony import */ var _Modal_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.scss */ \"./src/app/Components/Modal/Modal.scss\");\n/* harmony import */ var _Modal_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Modal_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);\nconst modals=document.querySelector('#modals');function createModal(component){return react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.render(react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"],{component:component}),modals);;}document.addEventListener('keydown',key=>{if(key.code==='Escape'&&document.querySelector('.backdrop')){react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.unmountComponentAtNode(modals);}});document.addEventListener('mousedown',ev=>{if(ev.path[0].className==='modal'){react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.unmountComponentAtNode(modals);}});\n\n//# sourceURL=webpack:///./src/app/Components/Modal/index.jsx?");

/***/ }),

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GenericPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GenericPanel */ \"./src/app/Pages/Admin/panels/GenericPanel.jsx\");\nfunction ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(source,true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}class GenericBanPanel extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent{render(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenericPanel__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{title:this.props.title,dropdownHeader:\"Ban Type\",textAreaHeader:\"User ID\",defaultDropdown:\"appeal\",options:this.props.options.concat('appeal','lootbox'),action:this.action.bind(this),buttonText:this.props.buttonText});}async action(state){if(!state.textVal){return alert('enter a user id dumb cunt');}const res=await fetch(`/api/admin${this.props.getEndpoint(state)}`,_objectSpread({},this.props.getFetchParams(state),{credentials:'same-origin',headers:{'Content-Type':'application/json'}}));if(res.status!==200){alert(`Unknown HTTP response code: ${res.status}`);}else{this.props.finish(state,res);}}}_defineProperty(GenericBanPanel,\"defaultProps\",{getFetchParams:state=>({method:'POST',body:JSON.stringify({type:state.dropdownVal,id:state.textVal})}),options:[]});/* harmony default export */ __webpack_exports__[\"default\"] = (GenericBanPanel);\n\n//# sourceURL=webpack:///./src/app/Pages/Admin/panels/GenericBanPanel.jsx?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GetPayment; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GenericPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GenericPanel */ \"./src/app/Pages/Admin/panels/GenericPanel.jsx\");\n/* harmony import */ var _Components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Components/Modal */ \"./src/app/Components/Modal/index.jsx\");\n/* harmony import */ var react_json_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-json-view */ \"./node_modules/react-json-view/dist/main.js\");\n/* harmony import */ var react_json_view__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_json_view__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _reactJSONProps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reactJSONProps */ \"./src/app/Pages/Admin/panels/reactJSONProps.js\");\nfunction _extends(){_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};return _extends.apply(this,arguments);}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(source,true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}class GetPayment extends react__WEBPACK_IMPORTED_MODULE_0__[\"PureComponent\"]{async action(state){const res=await fetch(`/api/admin/findTransaction?${state.dropdownVal}=${state.textVal}`,{credentials:'same-origin',headers:{'Content-Type':'application/json'}}).then(res=>res.json()).then(res=>res.map(payment=>({date:new Date(payment.times.create),orderID:payment.orderID,captureID:payment.captureID,purchase:{type:payment.item.name,quantity:+payment.item.quantity,total:payment.amount.total},payer:['name','paypalEmail','discordEmail','paypalID','userID'].reduce((data,key)=>_objectSpread({},data,{[key]:payment.payer[key]}),{})})));Object(_Components_Modal__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_json_view__WEBPACK_IMPORTED_MODULE_3___default.a,_extends({src:res},_reactJSONProps__WEBPACK_IMPORTED_MODULE_4__[\"default\"])));}render(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenericPanel__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{title:\"Find Transaction\",dropdownHeader:\"Parameter\",textAreaHeader:\"Value\",defaultDropdown:\"Discord ID\",options:['Discord ID','PayPal E-Mail','Full Name','Payment ID'],action:this.action.bind(this),buttonText:\"Find\"});}}\n\n//# sourceURL=webpack:///./src/app/Pages/Admin/panels/GetPayment.jsx?");

/***/ }),

/***/ "./src/app/Pages/Admin/panels/banPanels.jsx":
/*!**************************************************!*\
  !*** ./src/app/Pages/Admin/panels/banPanels.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GenericBanPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GenericBanPanel */ \"./src/app/Pages/Admin/panels/GenericBanPanel.jsx\");\n/* harmony default export */ __webpack_exports__[\"default\"] = ([react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenericBanPanel__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{title:\"Ban User\",buttonText:\"Hammer\",getEndpoint:()=>'/ban',finish:({dropdownVal,textVal})=>alert(`Successfully ${dropdownVal} banned ${textVal}`)})),react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenericBanPanel__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{title:\"Unban User\",buttonText:\"Unhammer\",getEndpoint:()=>'/unban',finish:({dropdownVal,textVal})=>alert(`Successfully ${dropdownVal} unbanned ${textVal}`)})),react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenericBanPanel__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{title:\"Check User Ban\",buttonText:\"Check\",options:['any'],getFetchParams:()=>({method:'GET'}),getEndpoint:({dropdownVal,textVal})=>`/checkBan?type=${dropdownVal}&id=${textVal}`,finish:async({textVal},res)=>{const bans=await res.json();if(!bans[0]){return alert(`${textVal} is a good boye and has no bans`);}else{alert(`${textVal} has the following bans:\\n\\n${bans.join('\\n')}`);}}}))]);\n\n//# sourceURL=webpack:///./src/app/Pages/Admin/panels/banPanels.jsx?");

/***/ }),

/***/ "./src/app/Pages/Admin/panels/reactJSONProps.js":
/*!******************************************************!*\
  !*** ./src/app/Pages/Admin/panels/reactJSONProps.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({iconStyle:'triangle',indentWidth:2,displayDataTypes:false,theme:{base00:'#23272a',base01:'#41323f',base02:'#4f424c',base03:'#776e71',base04:'#8d8687',base05:'#a39e9b',base06:'#b9b6b0',base07:'#e7e9db',base08:'#ef6155',base09:'#f99b15',base0A:'#fec418',base0B:'#48b685',base0C:'#5bc4bf',base0D:'#06b6ef',base0E:'#815ba4',base0F:'#e96ba8'}});\n\n//# sourceURL=webpack:///./src/app/Pages/Admin/panels/reactJSONProps.js?");

/***/ })

}]);