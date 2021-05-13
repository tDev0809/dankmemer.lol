(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./src/app/assets/styles/pages/singular/credits.scss":
/*!***********************************************************!*\
  !*** ./src/app/assets/styles/pages/singular/credits.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/pages/singular/credits.scss?");

/***/ }),

/***/ "./src/app/pages/singular/credits.jsx":
/*!********************************************!*\
  !*** ./src/app/pages/singular/credits.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Staff; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_styles_pages_singular_credits_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/styles/pages/singular/credits.scss */ \"./src/app/assets/styles/pages/singular/credits.scss\");\n/* harmony import */ var _assets_styles_pages_singular_credits_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_pages_singular_credits_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_staff__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/staff */ \"./src/app/components/staff.jsx\");\n/* harmony import */ var _util_images_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/images.js */ \"./src/app/pages/singular/util/images.js\");\n/* harmony import */ var _util_createAd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/createAd */ \"./src/app/util/createAd.js\");\nfunction _extends(){_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};return _extends.apply(this,arguments);}// import users from './data/users.json';\n// const categories = Object.entries(users);\nfunction Staff(){const[users,setUsers]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);const[categories,setCategories]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);window.scroll(0,0);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{Object(_util_createAd__WEBPACK_IMPORTED_MODULE_5__[\"default\"])('nitropay-staff-bottom',{sizes:[[728,90],[970,90],[970,250]],renderVisibleOnly:true},'desktop');Object(_util_createAd__WEBPACK_IMPORTED_MODULE_5__[\"default\"])('nitropay-staff-bottom',{sizes:[[320,50],[300,50],[300,250]],renderVisibleOnly:true},'mobile');axios__WEBPACK_IMPORTED_MODULE_2__('/api/staff').then(({data:staff})=>{setUsers(staff);}).catch(()=>{toast.dark(\"Our staff list was unable to be shown.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'noStaff'});});},[]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{setCategories(Object.entries(users));},[users]);const getSocialIndex=({social})=>Object.keys(social).length===0?-1:1;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"staff\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"staff-categories\"},categories.map(([category,users],i)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"staff-categories-\"+category.toLowerCase().replace(/ /g,'-'),key:i},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{className:\"staff-category-title\"},category),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"staff-category-cards\"},users.sort(()=>Math.random()*0.5).sort((a,b)=>getSocialIndex(a)-getSocialIndex(b)).map((user,i)=>user.name!==''?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_staff__WEBPACK_IMPORTED_MODULE_3__[\"default\"],_extends({},user,{key:i})):''))))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"nitropay-staff-bottom\",className:\"nitropay\"}));}\n\n//# sourceURL=webpack:///./src/app/pages/singular/credits.jsx?");

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