/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"main": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + {"0":"5333e65f","1":"cb91dfa3","2":"75007585","3":"b49b4763","4":"77d10981","5":"40118575","6":"f37011d5","7":"794d01bd","8":"d37f5627","9":"cfe95577","10":"b6d84b65","11":"e9257400","12":"684941e4","13":"bcf5769d","14":"36d8cf0a","15":"d4a3793b","16":"b69c4374"}[chunkId] + ".chunk.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1,"10":1,"11":1,"12":1,"13":1,"14":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "" + ({}[chunkId]||chunkId) + "." + {"0":"4c91ab05","1":"0ce8d634","2":"bfd6a230","3":"a620a461","4":"74e89f5e","5":"4c718211","6":"598ba696","7":"f0a52fe5","8":"87f64915","9":"b934159a","10":"d65e0ac1","11":"ea5b2d1b","12":"35d86ef5","13":"7f694a55","14":"9348cec3","15":"31d6cfe0","16":"31d6cfe0"}[chunkId] + ".chunk.css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/App.css":
/*!*************************!*\
  !*** ./src/app/App.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/App.css?");

/***/ }),

/***/ "./src/app/App.jsx":
/*!*************************!*\
  !*** ./src/app/App.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _Components_NavBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/NavBar */ \"./src/app/Components/NavBar/index.jsx\");\n/* harmony import */ var _Components_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/Footer */ \"./src/app/Components/Footer/index.jsx\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App.css */ \"./src/app/App.css\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_4__);\nconst Home=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! ./Pages/Home */ \"./src/app/Pages/Home/index.jsx\")));const Loot=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 5).then(__webpack_require__.bind(null, /*! ./Pages/Loot */ \"./src/app/Pages/Loot/index.jsx\")));const Rules=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 13).then(__webpack_require__.bind(null, /*! ./Pages/Rules */ \"./src/app/Pages/Rules/index.jsx\")));const Admin=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>Promise.all(/*! import() */[__webpack_require__.e(16), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! ./Pages/Admin */ \"./src/app/Pages/Admin/index.jsx\")));const Blogs=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 2).then(__webpack_require__.bind(null, /*! ./Pages/Blogs */ \"./src/app/Pages/Blogs/index.jsx\")));const About=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 9).then(__webpack_require__.bind(null, /*! ./Pages/About */ \"./src/app/Pages/About/index.jsx\")));const Staff=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./Pages/Staff */ \"./src/app/Pages/Staff/index.jsx\")));const Terms=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 14).then(__webpack_require__.bind(null, /*! ./Pages/Terms */ \"./src/app/Pages/Terms/index.jsx\")));const Landing=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 10).then(__webpack_require__.bind(null, /*! ./Pages/Landing */ \"./src/app/Pages/Landing/index.jsx\")));const Appeals=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 6).then(__webpack_require__.bind(null, /*! ./Pages/Appeals */ \"./src/app/Pages/Appeals/index.jsx\")));const Reports=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 7).then(__webpack_require__.bind(null, /*! ./Pages/Reports */ \"./src/app/Pages/Reports/index.jsx\")));const Refunds=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 12).then(__webpack_require__.bind(null, /*! ./Pages/Refunds */ \"./src/app/Pages/Refunds/index.jsx\")));const Privacy=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 11).then(__webpack_require__.bind(null, /*! ./Pages/Privacy */ \"./src/app/Pages/Privacy/index.jsx\")));const Commands=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./Pages/Commands */ \"./src/app/Pages/Commands/index.jsx\")));const Faq=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 8).then(__webpack_require__.bind(null, /*! ./Pages/Faq */ \"./src/app/Pages/Faq/index.jsx\")));/* harmony default export */ __webpack_exports__[\"default\"] = (()=>{ga('send','pageview',{hitType:'pageview',page:location.pathname});return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"psuedoBody\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_NavBar__WEBPACK_IMPORTED_MODULE_2__[\"default\"],null),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Switch\"],null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Suspense\"],{fallback:react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",null)},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{exact:true,strict:true,component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Home,null),path:\"/\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Commands,null),path:\"/commands\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Faq,null),path:\"/faq\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Staff,null),path:\"/staff\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Loot,null),path:\"/loot\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Rules,null),path:\"/rules\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(About,null),path:\"/about\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:props=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Blogs,props),path:\"/blogs\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Appeals,null),path:\"/appeals/\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Reports,null),path:\"/reports/\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Admin,null),path:\"/admin\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Terms,null),path:\"/terms\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Landing,null),path:\"/landing\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Refunds,null),path:\"/refunds\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{component:()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Privacy,null),path:\"/privacy\"}))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Footer__WEBPACK_IMPORTED_MODULE_3__[\"default\"],null)),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"modals\"}));});\n\n//# sourceURL=webpack:///./src/app/App.jsx?");

/***/ }),

/***/ "./src/app/Components/Footer/Footer.scss":
/*!***********************************************!*\
  !*** ./src/app/Components/Footer/Footer.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Components/Footer/Footer.scss?");

/***/ }),

/***/ "./src/app/Components/Footer/index.jsx":
/*!*********************************************!*\
  !*** ./src/app/Components/Footer/index.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _assets_memer_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/memer.png */ \"./src/app/assets/memer.png\");\n/* harmony import */ var _assets_memer_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_memer_png__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Footer_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Footer.scss */ \"./src/app/Components/Footer/Footer.scss\");\n/* harmony import */ var _Footer_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Footer_scss__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"footer\",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"footer-content\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"footer-left\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{to:\"/\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{id:\"footer-logo\",src:_assets_memer_png__WEBPACK_IMPORTED_MODULE_2___default.a,alt:\"Dank Memer logo\"})),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"footer-left-text\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\",{id:\"footer-title\"},\"DANK MEMER\"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{id:\"footer-copyright\"},\"Copyright \\xA9 \",new Date().getFullYear(),\" Dank Memer\"))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"footer-links\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"footer-links-col\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{id:\"footer-link\",href:\"https://www.patreon.com/join/dankmemerbot\"},\"Premium\"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/commands\"},\"Commands\"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/blogs\"},\"Our blog\")),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"footer-links-col\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/staff\"},\"Staff\"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/terms\"},\"Terms\"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/privacy\"},\"Privacy\")),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"footer-links-col\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/rules\"},\"Rules\"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/reports\"},\"Reports\"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/appeals\"},\"Appeals\")))))));\n\n//# sourceURL=webpack:///./src/app/Components/Footer/index.jsx?");

/***/ }),

/***/ "./src/app/Components/NavBar/NavBar.css":
/*!**********************************************!*\
  !*** ./src/app/Components/NavBar/NavBar.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Components/NavBar/NavBar.css?");

/***/ }),

/***/ "./src/app/Components/NavBar/index.jsx":
/*!*********************************************!*\
  !*** ./src/app/Components/NavBar/index.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _NavBar_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavBar.css */ \"./src/app/Components/NavBar/NavBar.css\");\n/* harmony import */ var _NavBar_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_NavBar_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _util_parseTime_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/parseTime.js */ \"./src/app/util/parseTime.js\");\nconst NavBar=({discount,login:{loggedIn,username,discriminator}})=>{const[navExpanded,setNavExpanded]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[userExpanded,setUserExpanded]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const onClick=target=>{let expanded=!userExpanded;setUserExpanded(expanded);if(expanded){target.children[0].classList.add('nav-user-expanded-container');target.children[1].classList.add('nav-user-expanded');}else{target.children[0].classList.remove('nav-user-expanded-container');target.children[1].classList.remove('nav-user-expanded');}};return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\",{className:\"navbar\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"DM-nav\"},\"DANK MEMER\"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{className:\"navbar-btn\",onChange:e=>{let expanded=!navExpanded;setNavExpanded(expanded);if(expanded){e.target.parentElement.classList.add('navbar-expanded');}else{e.target.parentElement.classList.remove('navbar-expanded');}},type:\"checkbox\",id:\"navbar-btn\"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\",{className:\"navbar-icon\",htmlFor:\"navbar-btn\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"navicon\"})),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\",{className:\"nav-links\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"nav-item\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{exact:true,className:\"nav-link\",activeClassName:\"active\",to:\"/\"},\"HOME\")),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"nav-item\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{className:\"nav-link\",activeClassName:\"active\",to:\"/commands\"},\"COMMANDS\")),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"nav-item\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{className:\"nav-link\",activeClassName:\"active\",to:\"/blogs\"},\"BLOG\")),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"nav-item\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{className:\"nav-link\",activeClassName:\"active\",to:\"/faq\"},\"FAQ\")),navigator.onLine&&react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"nav-item\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{className:\"nav-link premium\",activeClassName:\"active\",to:\"/loot\",\"data-discount\":discount?`FLASH SALE (${Object(_util_parseTime_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(discount.expiry-Date.now()).hours}H LEFT)`:''},\"LOOTBOXES\")),navigator.onLine&&react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"login\"},loggedIn?react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"user nav-item\",onClick:e=>onClick(e.target.parentElement)},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"nav-link\"},`${username.toUpperCase()}#${discriminator}`),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"nav-user\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{className:\"nav-link login-button\",href:\"/oauth/logout\"},\"Log Out\"))):react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{href:\"/oauth/login\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\",{className:\"obutton login-button\"},\"LOG IN\")))));};/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"withRouter\"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"connect\"])(store=>store)(NavBar)));\n\n//# sourceURL=webpack:///./src/app/Components/NavBar/index.jsx?");

/***/ }),

/***/ "./src/app/actions/index.js":
/*!**********************************!*\
  !*** ./src/app/actions/index.js ***!
  \**********************************/
/*! exports provided: login, logout, discount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"login\", function() { return login; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logout\", function() { return logout; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"discount\", function() { return discount; });\nconst login=user=>({type:'LOGIN',user});const logout=()=>({type:'LOGOUT'});const discount=discountData=>({type:'DISCOUNT',discountData});\n\n//# sourceURL=webpack:///./src/app/actions/index.js?");

/***/ }),

/***/ "./src/app/assets/memer.png":
/*!**********************************!*\
  !*** ./src/app/assets/memer.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"40326fed0d1bc75a2688535e70dd31be.png\";\n\n//# sourceURL=webpack:///./src/app/assets/memer.png?");

/***/ }),

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reducers/index.js */ \"./src/app/reducers/index.js\");\n/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./actions/index.js */ \"./src/app/actions/index.js\");\n/* harmony import */ var _util_loadScript_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/loadScript.js */ \"./src/app/util/loadScript.js\");\n/* harmony import */ var _App_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./App.jsx */ \"./src/app/App.jsx\");\nconst composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||redux__WEBPACK_IMPORTED_MODULE_5__[\"compose\"];const store=Object(redux__WEBPACK_IMPORTED_MODULE_5__[\"createStore\"])(_reducers_index_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"],composeEnhancer(Object(redux__WEBPACK_IMPORTED_MODULE_5__[\"applyMiddleware\"])(redux_thunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"])));window.mainStore=store;react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"Provider\"],{store:store},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"BrowserRouter\"],null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App_jsx__WEBPACK_IMPORTED_MODULE_9__[\"default\"],null))),document.getElementById('root'));document.addEventListener('drop',e=>{e.preventDefault();e.stopPropagation();return false;});document.addEventListener('dragover',e=>{e.preventDefault();e.stopPropagation();});// Set up login state\nfetch('/oauth/state',{credentials:'same-origin'}).then(r=>r.json()).then(res=>{if(res){store.dispatch(_actions_index_js__WEBPACK_IMPORTED_MODULE_7__[\"login\"](res));}});fetch('/api/discount').then(r=>r.json()).then(res=>store.dispatch(_actions_index_js__WEBPACK_IMPORTED_MODULE_7__[\"discount\"](res)));// Set up cookie consent\nObject(_util_loadScript_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])('//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js').then(()=>window.cookieconsent.initialise({palette:{popup:{background:'#252e39'},button:{background:'#14a7d0'}},position:'bottom-left',content:{href:'/privacy'}}));if('serviceWorker'in navigator){__webpack_require__.e(/*! import() */ 15).then(__webpack_require__.t.bind(null, /*! ./fix-caching.js */ \"./src/app/fix-caching.js\", 7));// navigator.serviceWorker.register('/service-worker.js').then(registration => {\n//   console.log('SW registered: ', registration);\n// }).catch(registrationError => {\n//   console.log('SW registration failed: ', registrationError);\n// });\n}\n\n//# sourceURL=webpack:///./src/app/index.js?");

/***/ }),

/***/ "./src/app/reducers/discount.js":
/*!**************************************!*\
  !*** ./src/app/reducers/discount.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst discount=(state={},action)=>{switch(action.type){case'DISCOUNT':return action.discountData;default:return null;}};/* harmony default export */ __webpack_exports__[\"default\"] = (discount);\n\n//# sourceURL=webpack:///./src/app/reducers/discount.js?");

/***/ }),

/***/ "./src/app/reducers/index.js":
/*!***********************************!*\
  !*** ./src/app/reducers/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login */ \"./src/app/reducers/login.js\");\n/* harmony import */ var _discount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./discount */ \"./src/app/reducers/discount.js\");\nconst combinedReducer=Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({login: _login__WEBPACK_IMPORTED_MODULE_1__[\"default\"],discount: _discount__WEBPACK_IMPORTED_MODULE_2__[\"default\"]});/* harmony default export */ __webpack_exports__[\"default\"] = (combinedReducer);\n\n//# sourceURL=webpack:///./src/app/reducers/index.js?");

/***/ }),

/***/ "./src/app/reducers/login.js":
/*!***********************************!*\
  !*** ./src/app/reducers/login.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(source,true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}const login=(state={loggedIn:false},action)=>{switch(action.type){case'LOGIN':return _objectSpread({loggedIn:true},action.user);case'LOGOUT':return _objectSpread({loggedIn:false},action.user);default:return state;}};/* harmony default export */ __webpack_exports__[\"default\"] = (login);\n\n//# sourceURL=webpack:///./src/app/reducers/login.js?");

/***/ }),

/***/ "./src/app/util/loadScript.js":
/*!************************************!*\
  !*** ./src/app/util/loadScript.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (url=>new Promise(resolve=>{const script=document.createElement('script');script.setAttribute('async','');script.setAttribute('src',url);script.onload=resolve;document.head.appendChild(script);}));\n\n//# sourceURL=webpack:///./src/app/util/loadScript.js?");

/***/ }),

/***/ "./src/app/util/parseTime.js":
/*!***********************************!*\
  !*** ./src/app/util/parseTime.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (time=>{time=time/1000;return{hours:Math.floor(time/3600),minutes:Math.floor(time%3600/60),seconds:Math.floor(time%3600%60),get human(){return`${this.hours} hours, ${this.minutes} minutes and ${this.seconds} seconds`;}};});\n\n//# sourceURL=webpack:///./src/app/util/parseTime.js?");

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./src/app/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! E:\\Coding\\Languages\\Javascript\\Websites\\dankmemer.lol\\src\\app\\index.js */\"./src/app/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/app/index.js?");

/***/ })

/******/ });