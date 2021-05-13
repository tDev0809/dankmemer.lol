(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/app/assets/styles/components/expandable.scss":
/*!**********************************************************!*\
  !*** ./src/app/assets/styles/components/expandable.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/components/expandable.scss?");

/***/ }),

/***/ "./src/app/assets/styles/pages/info/commands.scss":
/*!********************************************************!*\
  !*** ./src/app/assets/styles/pages/info/commands.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/pages/info/commands.scss?");

/***/ }),

/***/ "./src/app/components/expandable.jsx":
/*!*******************************************!*\
  !*** ./src/app/components/expandable.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Expandable; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var assets_styles_components_expandable_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/styles/components/expandable.scss */ \"./src/app/assets/styles/components/expandable.scss\");\n/* harmony import */ var assets_styles_components_expandable_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_styles_components_expandable_scss__WEBPACK_IMPORTED_MODULE_1__);\nfunction Expandable(props){const[description,setDescription]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(props.description);const[permissions,setPermissions]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(props.permissions||null);const[wasExpanded,setWasExpanded]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{setDescription(props.description.replace(/(?:__|[*#])|\\[(.*?)\\]\\(.*?\\)/,match=>{let text=match.replace(/\\[|\\)/g,'').replace('](',' ').split(\" \")[0];let link=match.replace(/\\[|\\)/g,'').replace('](',' ').split(\" \")[1];return`<a href=\"${link}\" rel=\"noopener noreferrer\">${text}</a>`;}));setDescription(props.description.replace(/`(.*?)`/g,(match,token)=>{return`<b>${token}</b>`;}));if(!props.permissions)return;props.permissions.map(permission=>{const transformed=permission.replace(/[A-Z]/g,match=>{return` ${match}`;});const lowercaseWord=transformed.split(\" \")[0];setPermissions([]);setPermissions(oldPermissions=>[...oldPermissions,`${lowercaseWord.charAt(0).toUpperCase()+lowercaseWord.substr(1)} ${transformed.split(\" \")[1]}`]);});},[props.description,props.permissions]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{if(props.expanded)setWasExpanded(true);if(!props.expanded){setTimeout(()=>{setWasExpanded(false);},1000);}},[props.expanded]);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:props.expanded?\"expandable expanded\":wasExpanded?\"expandable closing\":\"expandable\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"expandable-text\",onClick:()=>props.setExpanded(props.index)},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"expandable-text-title\"},props.name,props.star?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"expandable-text-title-star\",title:\"This is a premium feature.\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\",{xmlns:\"http://www.w3.org/2000/svg\",width:\"16\",height:\"16\",viewBox:\"0 0 24 20\",fill:\"none\",stroke:\"#ffbf00\",strokeWidth:\"1.5\",strokeLinecap:\"round\",strokeLinejoin:\"round\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\",{stroke:\"none\",d:\"M0 0h24v24H0z\",fill:\"none\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\",{fill:\"#ffbf00\",d:\"M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z\"}))):''),props.type==='command'?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"expandable-text-message\",dangerouslySetInnerHTML:{__html:description}}):''),props.type==='command'?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"expandable-body\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\",{className:\"expandable-body-section\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h5\",{className:\"expandable-body-section-title\"},\"Usage\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"expandable-body-section-content\"},props.usage)),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\",{className:\"expandable-body-section\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h5\",{className:\"expandable-body-section-title\"},\"Required permissions\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"expandable-body-section-content\"},permissions.join(\", \")))):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"expandable-body\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\",{className:\"expandable-body-section\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h5\",{className:\"expandable-body-section-title\"},\"Response\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"expandable-body-section-content\"},description))));}\n\n//# sourceURL=webpack:///./src/app/components/expandable.jsx?");

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