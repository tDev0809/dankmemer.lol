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
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
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
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + {"0":"03075c6f","1":"16293c29","2":"e7ceddda","3":"902dfba7","4":"dd738be2","5":"4c54bbc2","6":"9eb76dce","7":"74945dab","8":"59d8ad57","9":"3b3066b3","10":"c822e8ab","11":"f344e01e","12":"db25a3c1","13":"fcdbc65c","14":"d67e6ec3","15":"05e72572","16":"1f911c29","17":"76048dc1","18":"0c6c1cb3"}[chunkId] + ".chunk.js"
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
/******/ 		var cssChunks = {"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1,"10":1,"11":1,"12":1,"13":1,"14":1,"15":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "" + ({}[chunkId]||chunkId) + "." + {"0":"728fdb0e","1":"7853c4b9","2":"83f6a5a8","3":"2d017ddd","4":"72873f5a","5":"a6320e38","6":"b7bdcc3e","7":"4d10df3a","8":"bdf685df","9":"6e98b931","10":"944ecbed","11":"92e97eb2","12":"92e97eb2","13":"4a3d0a88","14":"8393175e","15":"81f17cf8","16":"31d6cfe0","17":"31d6cfe0","18":"31d6cfe0"}[chunkId] + ".chunk.css";
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

/***/ "./src/app/App.jsx":
/*!*************************!*\
  !*** ./src/app/App.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/routers/NormalRoute */ \"./src/app/util/routers/NormalRoute.jsx\");\n/* harmony import */ var _util_routers_ControlRoute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/routers/ControlRoute */ \"./src/app/util/routers/ControlRoute.jsx\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _assets_styles_misc_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/styles/misc/main.scss */ \"./src/app/assets/styles/misc/main.scss\");\n/* harmony import */ var _assets_styles_misc_main_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_misc_main_scss__WEBPACK_IMPORTED_MODULE_4__);\nconst Home=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 5).then(__webpack_require__.bind(null, /*! ./pages/singular/home */ \"./src/app/pages/singular/home.jsx\")));const Loot=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ./pages/store/lootboxes */ \"./src/app/pages/store/lootboxes.jsx\")));const Rules=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 13).then(__webpack_require__.bind(null, /*! ./pages/rules/rules */ \"./src/app/pages/rules/rules.jsx\")));const Blog=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! ./components/blog */ \"./src/app/components/blog.jsx\")));const Blogs=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 3).then(__webpack_require__.bind(null, /*! ./pages/singular/blogs */ \"./src/app/pages/singular/blogs.jsx\")));const About=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 8).then(__webpack_require__.bind(null, /*! ./pages/singular/about */ \"./src/app/pages/singular/about.jsx\")));const Staff=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 9).then(__webpack_require__.bind(null, /*! ./pages/singular/credits */ \"./src/app/pages/singular/credits.jsx\")));const Terms=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 12).then(__webpack_require__.bind(null, /*! ./pages/legal/terms */ \"./src/app/pages/legal/terms.jsx\")));const Landing=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 10).then(__webpack_require__.bind(null, /*! ./pages/singular/landing */ \"./src/app/pages/singular/landing.jsx\")));const Appeals=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 6).then(__webpack_require__.bind(null, /*! ./pages/rules/appeals */ \"./src/app/pages/rules/appeals.jsx\")));const Reports=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 7).then(__webpack_require__.bind(null, /*! ./pages/rules/reports */ \"./src/app/pages/rules/reports.jsx\")));const Refunds=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 15).then(__webpack_require__.bind(null, /*! ./pages/store/refunds */ \"./src/app/pages/store/refunds.jsx\")));const Privacy=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 11).then(__webpack_require__.bind(null, /*! ./pages/legal/privacy */ \"./src/app/pages/legal/privacy.jsx\")));const Commands=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(16)]).then(__webpack_require__.bind(null, /*! ./pages/info/commands */ \"./src/app/pages/info/commands.jsx\")));const Faq=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(17)]).then(__webpack_require__.bind(null, /*! ./pages/info/faq */ \"./src/app/pages/info/faq.jsx\")));const NotFound=/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"lazy\"])(()=>__webpack_require__.e(/*! import() */ 14).then(__webpack_require__.bind(null, /*! ./pages/singular/notfound */ \"./src/app/pages/singular/notfound.jsx\")));/* harmony default export */ __webpack_exports__[\"default\"] = (()=>{ga('send','pageview',{hitType:'pageview',page:location.pathname});return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"pseudoBody\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Switch\"],null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{exact:true,strict:true,path:\"/\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Home,null),path:\"/\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/commands\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Commands,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/faq\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Faq,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/staff\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Staff,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/loot\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Loot,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/rules\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Rules,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/about\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(About,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{exact:true,path:\"/blogs\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Blogs,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{exact:true,path:\"/blogs/:blog\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Blog,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/appeals/\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Appeals,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/reports/\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Reports,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/terms\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Terms,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/landing\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Landing,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/refunds\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Refunds,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"/privacy\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Privacy,null)}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_ControlRoute__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{exact:true,path:[\"/control\",\"/control/admin\",\"/control/mods\"],view:\"none:determine\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_ControlRoute__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{path:\"/control/admin/access\",view:\"admin:access\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_ControlRoute__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{path:\"/control/admin/users\",view:\"admin:users\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_ControlRoute__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{path:\"/control/admin/website\",view:\"admin:website\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_ControlRoute__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{path:\"/control/admin/blogs\",view:\"admin:blogs\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_ControlRoute__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{path:\"/control/mods/inspect\",view:\"mods:inspect\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_ControlRoute__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{path:\"/control/mods/analytics\",view:\"mods:analytics\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_ControlRoute__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{path:\"/control/personalize/card\",view:\"personalize:card\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_util_routers_NormalRoute__WEBPACK_IMPORTED_MODULE_1__[\"default\"],{path:\"*\",component:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NotFound,null)}))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"modals\"}));});\n\n//# sourceURL=webpack:///./src/app/App.jsx?");

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

/***/ "./src/app/assets/img/instagram.png":
/*!******************************************!*\
  !*** ./src/app/assets/img/instagram.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"6d2ab22bcdee8ba006102c0eb8ad5502.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/instagram.png?");

/***/ }),

/***/ "./src/app/assets/img/memer.png":
/*!**************************************!*\
  !*** ./src/app/assets/img/memer.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"40326fed0d1bc75a2688535e70dd31be.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/memer.png?");

/***/ }),

/***/ "./src/app/assets/img/staff sync \\.(png|jpg|gif|webp)$":
/*!**************************************************************************!*\
  !*** ./src/app/assets/img/staff sync nonrecursive \.(png|jpg|gif|webp)$ ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./2pumpchump.png\": \"./src/app/assets/img/staff/2pumpchump.png\",\n\t\"./abaddon.gif\": \"./src/app/assets/img/staff/abaddon.gif\",\n\t\"./aerielle.png\": \"./src/app/assets/img/staff/aerielle.png\",\n\t\"./aiphey.png\": \"./src/app/assets/img/staff/aiphey.png\",\n\t\"./auxim.gif\": \"./src/app/assets/img/staff/auxim.gif\",\n\t\"./blair.gif\": \"./src/app/assets/img/staff/blair.gif\",\n\t\"./cece.gif\": \"./src/app/assets/img/staff/cece.gif\",\n\t\"./dauntless.jpg\": \"./src/app/assets/img/staff/dauntless.jpg\",\n\t\"./devoxin.jpg\": \"./src/app/assets/img/staff/devoxin.jpg\",\n\t\"./duckysoren.gif\": \"./src/app/assets/img/staff/duckysoren.gif\",\n\t\"./faith.png\": \"./src/app/assets/img/staff/faith.png\",\n\t\"./fallback.gif\": \"./src/app/assets/img/staff/fallback.gif\",\n\t\"./gxbriel.jpg\": \"./src/app/assets/img/staff/gxbriel.jpg\",\n\t\"./inblue.png\": \"./src/app/assets/img/staff/inblue.png\",\n\t\"./julia.png\": \"./src/app/assets/img/staff/julia.png\",\n\t\"./kable-kompany.gif\": \"./src/app/assets/img/staff/kable-kompany.gif\",\n\t\"./melmsie.png\": \"./src/app/assets/img/staff/melmsie.png\",\n\t\"./mistress-red.jpg\": \"./src/app/assets/img/staff/mistress-red.jpg\",\n\t\"./nunca.jpg\": \"./src/app/assets/img/staff/nunca.jpg\",\n\t\"./reese.png\": \"./src/app/assets/img/staff/reese.png\",\n\t\"./samantha.gif\": \"./src/app/assets/img/staff/samantha.gif\",\n\t\"./shiiiitakë.png\": \"./src/app/assets/img/staff/shiiiitakë.png\",\n\t\"./sinister.png\": \"./src/app/assets/img/staff/sinister.png\",\n\t\"./smile.jpg\": \"./src/app/assets/img/staff/smile.jpg\",\n\t\"./spurkeh.gif\": \"./src/app/assets/img/staff/spurkeh.gif\",\n\t\"./terrarian.png\": \"./src/app/assets/img/staff/terrarian.png\",\n\t\"./theprodigyhenry.png\": \"./src/app/assets/img/staff/theprodigyhenry.png\",\n\t\"./tintin.gif\": \"./src/app/assets/img/staff/tintin.gif\",\n\t\"./toto.png\": \"./src/app/assets/img/staff/toto.png\",\n\t\"./xfastx.gif\": \"./src/app/assets/img/staff/xfastx.gif\",\n\t\"./yeng.gif\": \"./src/app/assets/img/staff/yeng.gif\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/app/assets/img/staff sync \\\\.(png|jpg|gif|webp)$\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff_sync_nonrecursive_\\.(png%7Cjpg%7Cgif%7Cwebp)$?");

/***/ }),

/***/ "./src/app/assets/img/staff/2pumpchump.png":
/*!*************************************************!*\
  !*** ./src/app/assets/img/staff/2pumpchump.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fee51643e2bb31af0780c1c8bb63aef4.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/2pumpchump.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/abaddon.gif":
/*!**********************************************!*\
  !*** ./src/app/assets/img/staff/abaddon.gif ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"3adc385d31cd711ff1925738b25e5d2e.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/abaddon.gif?");

/***/ }),

/***/ "./src/app/assets/img/staff/aerielle.png":
/*!***********************************************!*\
  !*** ./src/app/assets/img/staff/aerielle.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"712bb3d47f2427cbeabf1f596f66be36.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/aerielle.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/aiphey.png":
/*!*********************************************!*\
  !*** ./src/app/assets/img/staff/aiphey.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"4795fc64832831dc9c571728aafad65f.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/aiphey.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/auxim.gif":
/*!********************************************!*\
  !*** ./src/app/assets/img/staff/auxim.gif ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"9dedba447b4a9a15a3ad2595e9745992.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/auxim.gif?");

/***/ }),

/***/ "./src/app/assets/img/staff/blair.gif":
/*!********************************************!*\
  !*** ./src/app/assets/img/staff/blair.gif ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"6a8764fd3ab02420b6ed7c3b27a47ac4.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/blair.gif?");

/***/ }),

/***/ "./src/app/assets/img/staff/cece.gif":
/*!*******************************************!*\
  !*** ./src/app/assets/img/staff/cece.gif ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"43d06266d11f9efade5183e7723c7c9e.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/cece.gif?");

/***/ }),

/***/ "./src/app/assets/img/staff/dauntless.jpg":
/*!************************************************!*\
  !*** ./src/app/assets/img/staff/dauntless.jpg ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"ad192b782127e0679d3ffe5d2c0ee5db.jpg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/dauntless.jpg?");

/***/ }),

/***/ "./src/app/assets/img/staff/devoxin.jpg":
/*!**********************************************!*\
  !*** ./src/app/assets/img/staff/devoxin.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"891369adad61358fbde147eb4f8d7c32.jpg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/devoxin.jpg?");

/***/ }),

/***/ "./src/app/assets/img/staff/duckysoren.gif":
/*!*************************************************!*\
  !*** ./src/app/assets/img/staff/duckysoren.gif ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"75c25e5d9666b5f8b943df219de315ad.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/duckysoren.gif?");

/***/ }),

/***/ "./src/app/assets/img/staff/faith.png":
/*!********************************************!*\
  !*** ./src/app/assets/img/staff/faith.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"7ad9861f47d10ec65e9850081e8abec2.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/faith.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/fallback.gif":
/*!***********************************************!*\
  !*** ./src/app/assets/img/staff/fallback.gif ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"72ac08b39d219e97af4808b0b5369e97.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/fallback.gif?");

/***/ }),

/***/ "./src/app/assets/img/staff/gxbriel.jpg":
/*!**********************************************!*\
  !*** ./src/app/assets/img/staff/gxbriel.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"335531fb7ba07aa6c3d084942b8acede.jpg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/gxbriel.jpg?");

/***/ }),

/***/ "./src/app/assets/img/staff/inblue.png":
/*!*********************************************!*\
  !*** ./src/app/assets/img/staff/inblue.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"09e087e8508ae41582280257b3fa254a.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/inblue.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/julia.png":
/*!********************************************!*\
  !*** ./src/app/assets/img/staff/julia.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"3a9550df56521d0dc6e4528e65c9bc92.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/julia.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/kable-kompany.gif":
/*!****************************************************!*\
  !*** ./src/app/assets/img/staff/kable-kompany.gif ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"e6bcb2987332e274dd2d25c9a654d780.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/kable-kompany.gif?");

/***/ }),

/***/ "./src/app/assets/img/staff/melmsie.png":
/*!**********************************************!*\
  !*** ./src/app/assets/img/staff/melmsie.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"ac8d991f4bb8c804867147d7b613c821.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/melmsie.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/mistress-red.jpg":
/*!***************************************************!*\
  !*** ./src/app/assets/img/staff/mistress-red.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"07ae074302f502e03657bfdd82eb3441.jpg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/mistress-red.jpg?");

/***/ }),

/***/ "./src/app/assets/img/staff/nunca.jpg":
/*!********************************************!*\
  !*** ./src/app/assets/img/staff/nunca.jpg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"474e76d7e0ad7b015a1a25e451ad120e.jpg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/nunca.jpg?");

/***/ }),

/***/ "./src/app/assets/img/staff/reese.png":
/*!********************************************!*\
  !*** ./src/app/assets/img/staff/reese.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"7bb79e0dca8f7772f187a3a731b99831.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/reese.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/samantha.gif":
/*!***********************************************!*\
  !*** ./src/app/assets/img/staff/samantha.gif ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"8a1de42878b52df25e0216ab1ffa7c68.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/samantha.gif?");

/***/ }),

/***/ "./src/app/assets/img/staff/shiiiitakë.png":
/*!*************************************************!*\
  !*** ./src/app/assets/img/staff/shiiiitakë.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"b03acd8c9f7a35b82f5b45a767bcc421.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/shiiiitak%C3%AB.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/sinister.png":
/*!***********************************************!*\
  !*** ./src/app/assets/img/staff/sinister.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"ca2cace685e80c175b8fd2e4ade695b8.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/sinister.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/smile.jpg":
/*!********************************************!*\
  !*** ./src/app/assets/img/staff/smile.jpg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"38d6453ea0d54faf9225312025208d78.jpg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/smile.jpg?");

/***/ }),

/***/ "./src/app/assets/img/staff/spurkeh.gif":
/*!**********************************************!*\
  !*** ./src/app/assets/img/staff/spurkeh.gif ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"8c9a4331ffbd4aacbd8bc23b46e45383.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/spurkeh.gif?");

/***/ }),

/***/ "./src/app/assets/img/staff/terrarian.png":
/*!************************************************!*\
  !*** ./src/app/assets/img/staff/terrarian.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"5295c2391f509827dfe95d73cbf4d072.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/terrarian.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/theprodigyhenry.png":
/*!******************************************************!*\
  !*** ./src/app/assets/img/staff/theprodigyhenry.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"696461a621cfbcb8156457b741365a81.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/theprodigyhenry.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/tintin.gif":
/*!*********************************************!*\
  !*** ./src/app/assets/img/staff/tintin.gif ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"2b8fa13b72cde5940407e101fb2e252d.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/tintin.gif?");

/***/ }),

/***/ "./src/app/assets/img/staff/toto.png":
/*!*******************************************!*\
  !*** ./src/app/assets/img/staff/toto.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"b5bdba7c6cde4511a021c8c276861b0f.png\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/toto.png?");

/***/ }),

/***/ "./src/app/assets/img/staff/xfastx.gif":
/*!*********************************************!*\
  !*** ./src/app/assets/img/staff/xfastx.gif ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"0db60fcf17107d94fe2b26440bf88428.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/xfastx.gif?");

/***/ }),

/***/ "./src/app/assets/img/staff/yeng.gif":
/*!*******************************************!*\
  !*** ./src/app/assets/img/staff/yeng.gif ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"7dad32b9358fbe4630bc6031bfee4d47.gif\";\n\n//# sourceURL=webpack:///./src/app/assets/img/staff/yeng.gif?");

/***/ }),

/***/ "./src/app/assets/img/svg/Discord.svg":
/*!********************************************!*\
  !*** ./src/app/assets/img/svg/Discord.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"f8389ca1a741a115313bede9ac02e2c0.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/svg/Discord.svg?");

/***/ }),

/***/ "./src/app/assets/img/svg/GitHub.svg":
/*!*******************************************!*\
  !*** ./src/app/assets/img/svg/GitHub.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d219fc5e66cd2e90747714476d460f31.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/svg/GitHub.svg?");

/***/ }),

/***/ "./src/app/assets/img/svg/GitLab.svg":
/*!*******************************************!*\
  !*** ./src/app/assets/img/svg/GitLab.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d567e9a616e39c0944842fbb4da9f516.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/svg/GitLab.svg?");

/***/ }),

/***/ "./src/app/assets/img/svg/Reddit.svg":
/*!*******************************************!*\
  !*** ./src/app/assets/img/svg/Reddit.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"ac7b60ebdb785a784e379362b3a0e1b2.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/svg/Reddit.svg?");

/***/ }),

/***/ "./src/app/assets/img/svg/Spotify.svg":
/*!********************************************!*\
  !*** ./src/app/assets/img/svg/Spotify.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"ded344c86c35138f7e53c6225ed98816.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/svg/Spotify.svg?");

/***/ }),

/***/ "./src/app/assets/img/svg/Twitch.svg":
/*!*******************************************!*\
  !*** ./src/app/assets/img/svg/Twitch.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"68f7b9f66e8ba664e2adbe0b81c0c18f.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/svg/Twitch.svg?");

/***/ }),

/***/ "./src/app/assets/img/svg/Twitter.svg":
/*!********************************************!*\
  !*** ./src/app/assets/img/svg/Twitter.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"9be66c09991347ecc68ec5063d920ab7.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/svg/Twitter.svg?");

/***/ }),

/***/ "./src/app/assets/img/svg/Website.svg":
/*!********************************************!*\
  !*** ./src/app/assets/img/svg/Website.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d8851beea04ea75ca3febac546828318.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/svg/Website.svg?");

/***/ }),

/***/ "./src/app/assets/img/svg/YouTube.svg":
/*!********************************************!*\
  !*** ./src/app/assets/img/svg/YouTube.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"f7f02af468d2e829ae42eade5689accd.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/img/svg/YouTube.svg?");

/***/ }),

/***/ "./src/app/assets/styles/components/controlCard.scss":
/*!***********************************************************!*\
  !*** ./src/app/assets/styles/components/controlCard.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/components/controlCard.scss?");

/***/ }),

/***/ "./src/app/assets/styles/components/footer.scss":
/*!******************************************************!*\
  !*** ./src/app/assets/styles/components/footer.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/components/footer.scss?");

/***/ }),

/***/ "./src/app/assets/styles/components/modal.scss":
/*!*****************************************************!*\
  !*** ./src/app/assets/styles/components/modal.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/components/modal.scss?");

/***/ }),

/***/ "./src/app/assets/styles/components/navbar.scss":
/*!******************************************************!*\
  !*** ./src/app/assets/styles/components/navbar.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/components/navbar.scss?");

/***/ }),

/***/ "./src/app/assets/styles/components/staffCard.scss":
/*!*********************************************************!*\
  !*** ./src/app/assets/styles/components/staffCard.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/components/staffCard.scss?");

/***/ }),

/***/ "./src/app/assets/styles/misc/main.scss":
/*!**********************************************!*\
  !*** ./src/app/assets/styles/misc/main.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/misc/main.scss?");

/***/ }),

/***/ "./src/app/assets/styles/pages/control/admin/access.scss":
/*!***************************************************************!*\
  !*** ./src/app/assets/styles/pages/control/admin/access.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/pages/control/admin/access.scss?");

/***/ }),

/***/ "./src/app/assets/styles/pages/control/admin/blogs.scss":
/*!**************************************************************!*\
  !*** ./src/app/assets/styles/pages/control/admin/blogs.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/pages/control/admin/blogs.scss?");

/***/ }),

/***/ "./src/app/assets/styles/pages/control/admin/users.scss":
/*!**************************************************************!*\
  !*** ./src/app/assets/styles/pages/control/admin/users.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/pages/control/admin/users.scss?");

/***/ }),

/***/ "./src/app/assets/styles/pages/control/admin/website.scss":
/*!****************************************************************!*\
  !*** ./src/app/assets/styles/pages/control/admin/website.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/pages/control/admin/website.scss?");

/***/ }),

/***/ "./src/app/assets/styles/pages/control/control.scss":
/*!**********************************************************!*\
  !*** ./src/app/assets/styles/pages/control/control.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/pages/control/control.scss?");

/***/ }),

/***/ "./src/app/assets/styles/pages/control/mods/inspect.scss":
/*!***************************************************************!*\
  !*** ./src/app/assets/styles/pages/control/mods/inspect.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/pages/control/mods/inspect.scss?");

/***/ }),

/***/ "./src/app/assets/styles/pages/control/personalization/card.scss":
/*!***********************************************************************!*\
  !*** ./src/app/assets/styles/pages/control/personalization/card.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/assets/styles/pages/control/personalization/card.scss?");

/***/ }),

/***/ "./src/app/components/controlCard.jsx":
/*!********************************************!*\
  !*** ./src/app/components/controlCard.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ControlCard; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n/* harmony import */ var _assets_styles_components_controlCard_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/styles/components/controlCard.scss */ \"./src/app/assets/styles/components/controlCard.scss\");\n/* harmony import */ var _assets_styles_components_controlCard_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_components_controlCard_scss__WEBPACK_IMPORTED_MODULE_3__);\nfunction ControlCard({mainIcon,colour,title,options={},fillRow,resize,action={},inputOptions={},dropdownOptions,finish}){const[submittable,setSubmittable]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[pending,setPending]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[accountID,setAccountID]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"\");const[category,setCategory]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(dropdownOptions?dropdownOptions.initial:null);const[selectedCategory,setSelectedCategory]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(-1);const[dropdownOpen,setDropdownOpen]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[hasEventListener,setHasEventListener]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[bannerPreviewHTML,setBannerPreviewHTML]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"Write a message to display a preview\");Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{if(!dropdownOpen&&hasEventListener){document.documentElement.removeEventListener('click',()=>{return setHasEventListener(false);});}else if(dropdownOpen&&!hasEventListener){document.documentElement.addEventListener('click',e=>{setHasEventListener(true);if(e.target!==document.getElementById('control-card-dropdown-container')&&e.target.parentNode!==document.getElementById(\"control-card-dropdown-options\"))return setDropdownOpen(false);});}},[dropdownOpen]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{setDropdownOpen(false);},[category]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{if(options.bannerPreview){let preview=accountID;setBannerPreviewHTML(preview||\"Write a message to display a preview\");}if(!dropdownOptions&&accountID.length>=1)return setSubmittable(true);if(accountID.length>=1&&category!==dropdownOptions.initial)setSubmittable(true);},[accountID,category]);const submit=async()=>{setPending(true);const endpoint=action.endpoint.replace(\"{{input}}\",accountID).replace(\"{{dropdown}}\",category);await axios__WEBPACK_IMPORTED_MODULE_1__({url:`/api${endpoint}`,method:action.method,credentials:'same-origin',headers:{'Content-Type':'application/json'},data:options&&options.includeBody?{id:accountID,type:category}:{}}).then(()=>{if(typeof finish===\"function\")finish();setPending(false);setAccountID(\"\");setSubmittable(false);}).catch(e=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].error(\"Something went wrong while trying to perform that action.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'staffError'});setPending(false);});};return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:resize?\"control-card resize\":fillRow?\"control-card fill\":\"control-card\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"control-card-header\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"control-card-icon\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"material-icons\"},mainIcon),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:`control-card-icon-bg lg ${colour}`}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:`control-card-icon-bg sm ${colour}`})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\",{dangerouslySetInnerHTML:{__html:title}})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"control-card-input-group\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"material-icons\"},inputOptions.icon),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{className:\"control-card-input\",type:inputOptions.min?\"number\":\"text\",placeholder:inputOptions.placeholder,min:inputOptions.min,max:inputOptions.max,value:accountID,onChange:e=>{setAccountID(e.target.value);if(inputOptions.min&&e.target.value<inputOptions.min)e.target.value=inputOptions.min;else if(inputOptions.max&&e.target.value>inputOptions.max)e.target.value=inputOptions.max;},onInput:e=>{if(e.target.value<inputOptions.min)e.target.value=inputOptions.min;else if(e.target.value>inputOptions.max)e.target.value=inputOptions.max;}})),options.bannerPreview?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"announcement\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"announcement-content\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{dangerouslySetInnerHTML:{__html:bannerPreviewHTML}})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"announcement-action\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"material-icons\"},\"close\"))):'',dropdownOptions?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"control-card-dropdown\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"control-card-dropdown-container\",onClick:()=>setDropdownOpen(!dropdownOpen)},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"icon material-icons\"},dropdownOptions.icon),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:dropdownOpen?\"control-card-dropdown-selected open\":\"control-card-dropdown-selected\"},dropdownOptions.options[selectedCategory]?dropdownOptions.options[selectedCategory].text:dropdownOptions.initial),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"right material-icons\"},\"expand_more\")),dropdownOpen?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"control-card-dropdown-options\"},dropdownOptions.options.map(({text,value},i)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{key:i,onClick:()=>{setCategory(value?value:text);setSelectedCategory(i);}},text))):''):'',/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:!submittable?\"control-card-button disabled\":pending?\"control-card-button filled\":\"control-card-button\",onClick:()=>{if(!pending&&submittable)submit();}},pending?\"Pending\":\"Confirm\"));}\n\n//# sourceURL=webpack:///./src/app/components/controlCard.jsx?");

/***/ }),

/***/ "./src/app/components/discordLogin.jsx":
/*!*********************************************!*\
  !*** ./src/app/components/discordLogin.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DiscordLogin; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction DiscordLogin(){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{id:\"discord--login\",href:\"/oauth/login?redirect=\"+window.location.pathname,rel:\"noopener noreferrer\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\",{xmlns:\"http://www.w3.org/2000/svg\",width:\"30\",viewBox:\"0 0 245 240\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\",{fill:\"#ffffff\",d:\"M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\",{fill:\"#ffffff\",d:\"M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z\"})),\"Login with Discord\");}\n\n//# sourceURL=webpack:///./src/app/components/discordLogin.jsx?");

/***/ }),

/***/ "./src/app/components/editStaff.jsx":
/*!******************************************!*\
  !*** ./src/app/components/editStaff.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EditStaff; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n/* harmony import */ var _staff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./staff */ \"./src/app/components/staff.jsx\");\n/* harmony import */ var _pages_singular_util_socials_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/singular/util/socials.js */ \"./src/app/pages/singular/util/socials.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\nfunction ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _objectWithoutProperties(source,excluded){if(source==null)return{};var target=_objectWithoutPropertiesLoose(source,excluded);var key,i;if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++){key=sourceSymbolKeys[i];if(excluded.indexOf(key)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(source,key))continue;target[key]=source[key];}}return target;}function _objectWithoutPropertiesLoose(source,excluded){if(source==null)return{};var target={};var sourceKeys=Object.keys(source);var key,i;for(i=0;i<sourceKeys.length;i++){key=sourceKeys[i];if(excluded.indexOf(key)>=0)continue;target[key]=source[key];}return target;}function _toPropertyKey(arg){var key=_toPrimitive(arg,\"string\");return typeof key===\"symbol\"?key:String(key);}function _toPrimitive(input,hint){if(typeof input!==\"object\"||input===null)return input;var prim=input[Symbol.toPrimitive];if(prim!==undefined){var res=prim.call(input,hint||\"default\");if(typeof res!==\"object\")return res;throw new TypeError(\"@@toPrimitive must return a primitive value.\");}return(hint===\"string\"?String:Number)(input);}// import * as socials from '../pages/singular/util/socials.js';\nfunction EditStaff({discordAvatar,name,avatar,social,about}){const[tempPfp,setTempPfp]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(avatar);const[tempAbout,setTempAbout]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(about);const[tempSocial,setTempSocial]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(social);const socialsChange=(name,value)=>{if(value.length<1){const{[name]:v}=tempSocial,rest=_objectWithoutProperties(tempSocial,[name].map(_toPropertyKey));return setTempSocial(rest);}setTempSocial(_objectSpread(_objectSpread({},tempSocial),{},{[name]:value}));};const saveChanges=()=>{axios__WEBPACK_IMPORTED_MODULE_4__({url:`/api/${window.location.pathname.split(\"/\")[1]}/staff`,method:'PUT',data:{avatar:tempPfp,about:tempAbout,socials:tempSocial}}).then(()=>{window.location.reload();}).catch(e=>{react_toastify__WEBPACK_IMPORTED_MODULE_1__[\"toast\"].error(\"There was an issue while trying to update your staff card.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'noStaff'});});};return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"edit-staff-modal\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"edit-staff-modal-title\"},\"Inspect a staff card.\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"edit-staff-modal-content\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"edit-staff-modal-content-preview\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_staff__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{name:name,avatar:tempPfp,social:tempSocial,about:tempAbout}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{className:\"input-singular\",defaultValue:tempPfp.includes('cdn.discord')?'':tempPfp,onChange:e=>setTempPfp(e.target.value||discordAvatar),placeholder:`Custom card picture`}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{id:\"edit-staff-modal-content-preview-save\",className:\"hide-mobile\",onClick:saveChanges},\"Save changes\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"edit-staff-modal-content-info\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"textarea\",{defaultValue:about,onChange:e=>setTempAbout(e.target.value)}),Object.entries(_pages_singular_util_socials_js__WEBPACK_IMPORTED_MODULE_3__).map(([socialName,socialLink],i)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"input-group\",key:i},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"input-group-image\",style:{backgroundImage:`url(\"${socialLink}\")`}}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{defaultValue:social[socialName]?social[socialName]:'',onChange:e=>socialsChange(socialName,e.target.value),placeholder:`Your ${socialName.toLowerCase()} ${socialName.toLowerCase()!=='website'?socialName.toLowerCase()!=='discord'?'account ':'server ':''}URL`})))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{id:\"edit-staff-modal-content-preview-save\",className:\"show-mobile\",onClick:saveChanges},\"Save changes\")));}\n\n//# sourceURL=webpack:///./src/app/components/editStaff.jsx?");

/***/ }),

/***/ "./src/app/components/footer.jsx":
/*!***************************************!*\
  !*** ./src/app/components/footer.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var assets_img_memer_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/img/memer.png */ \"./src/app/assets/img/memer.png\");\n/* harmony import */ var assets_img_memer_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(assets_img_memer_png__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var assets_styles_components_footer_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/styles/components/footer.scss */ \"./src/app/assets/styles/components/footer.scss\");\n/* harmony import */ var assets_styles_components_footer_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(assets_styles_components_footer_scss__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(()=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"footer\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"footer-content\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"footer-left\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{to:\"/\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{id:\"footer-logo\",src:assets_img_memer_png__WEBPACK_IMPORTED_MODULE_2___default.a,alt:\"Dank Memer logo\"})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"footer-left-text\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\",{id:\"footer-title\"},\"DANK MEMER\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{id:\"footer-copyright\"},\"Copyright \\xA9 \",new Date().getFullYear(),\" Dank Memer\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{\"data-ccpa-link\":\"1\"}))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"footer-links\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"footer-links-col\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{className:\"footer-link\",href:\"https://www.patreon.com/join/dankmemerbot\"},\"Premium\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/commands\"},\"Commands\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/blogs\"},\"Our blog\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"footer-links-col\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/staff\"},\"Staff\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/terms\"},\"Terms\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/privacy\"},\"Privacy\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"footer-links-col\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/rules\"},\"Rules\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/reports\"},\"Reports\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{className:\"footer-link\",to:\"/appeals\"},\"Appeals\")))))));\n\n//# sourceURL=webpack:///./src/app/components/footer.jsx?");

/***/ }),

/***/ "./src/app/components/modal/backdrop.jsx":
/*!***********************************************!*\
  !*** ./src/app/components/modal/backdrop.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (({children})=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"backdrop\"},children));\n\n//# sourceURL=webpack:///./src/app/components/modal/backdrop.jsx?");

/***/ }),

/***/ "./src/app/components/modal/index.jsx":
/*!********************************************!*\
  !*** ./src/app/components/modal/index.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createModal; });\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ \"./src/app/components/modal/modal.jsx\");\n/* harmony import */ var assets_styles_components_modal_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/styles/components/modal.scss */ \"./src/app/assets/styles/components/modal.scss\");\n/* harmony import */ var assets_styles_components_modal_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_styles_components_modal_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);\nconst modals=document.querySelector('#modals');function createModal(component){return react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"],{component:component}),modals);}document.addEventListener('keydown',key=>{if(key.code==='Escape'&&document.querySelector('.backdrop'))return react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.unmountComponentAtNode(modals);});document.addEventListener('mousedown',ev=>{if(ev.target.className==='modal')return react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.unmountComponentAtNode(modals);});\n\n//# sourceURL=webpack:///./src/app/components/modal/index.jsx?");

/***/ }),

/***/ "./src/app/components/modal/modal.jsx":
/*!********************************************!*\
  !*** ./src/app/components/modal/modal.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Modal; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _backdrop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./backdrop */ \"./src/app/components/modal/backdrop.jsx\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\nclass Modal extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component{render(){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_backdrop__WEBPACK_IMPORTED_MODULE_1__[\"default\"],null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"modal\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"modal-child\"},this.props.component)),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"ToastContainer\"],null));}}\n\n//# sourceURL=webpack:///./src/app/components/modal/modal.jsx?");

/***/ }),

/***/ "./src/app/components/navbar.jsx":
/*!***************************************!*\
  !*** ./src/app/components/navbar.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var assets_styles_components_navbar_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/styles/components/navbar.scss */ \"./src/app/assets/styles/components/navbar.scss\");\n/* harmony import */ var assets_styles_components_navbar_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(assets_styles_components_navbar_scss__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var assets_img_memer_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/img/memer.png */ \"./src/app/assets/img/memer.png\");\n/* harmony import */ var assets_img_memer_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_img_memer_png__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _util_parseTime_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/parseTime.js */ \"./src/app/util/parseTime.js\");\n/* harmony import */ var react_fast_marquee__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-fast-marquee */ \"./node_modules/react-fast-marquee/dist/index.js\");\n/* harmony import */ var react_fast_marquee__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_fast_marquee__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);\nconst Navbar=({discount,login:{isAdmin,isModerator,loggedIn,username,avatar,id}})=>{const[dropdown,setDropdown]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[dropdownEventListener,setDropdownEventListener]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[announcementMarquee,setAnnouncementMarquee]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[announcementHidden,setAnnouncementHidden]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(true);const[announcementContent,setAnnouncementContent]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"This is awkward. There is no announcement content.\");const[recentAnnouncementNum,setRecentAnnouncementNum]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"0\");const[mobile,setMobile]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[discountCountdown,setDiscountCountdown]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"\");Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{if(dropdown&&mobile){document.getElementById('pseudoBody').style.overflowY='hidden';document.getElementById('pseudoBody').style.height='100vh';document.getElementsByTagName('footer')[0].style.display='none';}else if(!dropdown&&mobile){document.getElementById('pseudoBody').style.overflowY='auto';}},[dropdown,mobile]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{handleResize();(async()=>{try{let req=await axios__WEBPACK_IMPORTED_MODULE_7__('/api/announcement');if(req.data.announcement){setAnnouncementContent(req.data.announcement.content);setRecentAnnouncementNum(req.data.announcement._id);const announcementStorage=localStorage.getItem(\"announcement-hidden\");const announcementNum=localStorage.getItem(\"announcement-at\");if(!announcementStorage||announcementStorage===\"no\"||announcementNum!==req.data.announcement._id.toString())setAnnouncementHidden(false);else if(announcementStorage===\"hidden\"&&announcementNum===req.data.announcement._id.toString())setAnnouncementContent(true);handleMarquee();}}catch{}})();// Add an event listener to the window to check if the \n// device is small enough for mobile navbar.\nwindow.addEventListener(\"resize\",e=>{handleResize();});document.querySelectorAll(\"#announcement-content\")[0]&&document.querySelectorAll(\"#announcement-content > p\")[0].addEventListener(\"resize\",()=>{handleMarquee();});},[]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{if(!discount)return;let difference=discount.expiry-Date.now();let expiry=Object(_util_parseTime_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(discount.expiry-Date.now());setDiscountCountdown(`${expiry.hours.toString().length===1?'0'+expiry.hours:expiry.hours}:${expiry.minutes.toString().length===1?'0'+expiry.minutes:expiry.minutes}:${expiry.seconds.toString().length===1?'0'+expiry.seconds:expiry.seconds}`);setInterval(()=>{difference=difference-1000;expiry=Object(_util_parseTime_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(difference);setDiscountCountdown(`${expiry.hours.toString().length===1?'0'+expiry.hours:expiry.hours}:${expiry.minutes.toString().length===1?'0'+expiry.minutes:expiry.minutes}:${expiry.seconds.toString().length===1?'0'+expiry.seconds:expiry.seconds}`);},1000);},[discount]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{if(announcementHidden&&recentAnnouncementNum!==\"0\"){localStorage.setItem(\"announcement-hidden\",\"hidden\");localStorage.setItem(\"announcement-at\",recentAnnouncementNum.toString());}else if(!announcementHidden&&recentAnnouncementNum!==\"0\"){localStorage.setItem(\"announcement-hidden\",\"no\");}},[announcementHidden]);/**\r\n\t * Account dropdown handler.\r\n\t * \r\n\t * Adds an event listener to the DOM when it is open and removes it when it is closed.\r\n\t * This allows for the dropdown to be closed by clicking the parent and clicking outside the parent\r\n\t * or the dropdown.\r\n\t */Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{if(!mobile){if(!dropdown&&dropdownEventListener){document.documentElement.removeEventListener('click',()=>{return setHasEventListener(false);});}else if(dropdown&&!dropdownEventListener){document.documentElement.addEventListener('click',e=>{setDropdownEventListener(true);if(e.target!==document.getElementById('user-account')&&e.target.parentNode!==document.getElementById(\"user-account-dropdown\"))return setDropdown(false);});}}},[dropdown]);const handleResize=()=>{let width=document.documentElement.clientWidth;handleMarquee();if(width<=730){setMobile(true);setDropdown(false);}else if(width>730){setMobile(false);setDropdown(false);}};const handleMarquee=()=>{let announcementContent=document.getElementById(\"announcement-content\");if(!announcementContent)return;if(announcementContent.offsetWidth<announcementContent.scrollWidth)setAnnouncementMarquee(true);else if(announcementContent.offsetWidth>announcementContent.scrollWidth)setAnnouncementMarquee(false);};return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"navigation-container\"},announcementHidden?'':/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"announcement\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"announcement-content\"},announcementMarquee?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_fast_marquee__WEBPACK_IMPORTED_MODULE_6___default.a,{gradient:false,speed:50,pauseOnHover:true,style:{height:\"unset\"}},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{dangerouslySetInnerHTML:{__html:announcementContent},style:{marginRight:\"60px\"}})):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{dangerouslySetInnerHTML:{__html:announcementContent}})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"announcement-action\",onClick:()=>setAnnouncementHidden(!announcementHidden)},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"material-icons\"},\"close\"))),mobile?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\",{id:\"mobile\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"mobile-left\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"],{to:\"/\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{src:assets_img_memer_png__WEBPACK_IMPORTED_MODULE_4___default.a,alt:\"Logo\",width:\"42\"})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\",null,\"Dank Memer\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"mobile-hamburger\",onClick:()=>setDropdown(!dropdown)},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"material-icons\"},\"menu\")),dropdown?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"mobile-content\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"mobile-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{to:\"/commands\"},\"Commands\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"mobile-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{to:\"/faq\"},\"FAQ\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"mobile-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{to:\"/blogs\"},\"Blog\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:discount?\"mobile-nav-link discount\":\"mobile-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{to:\"/loot\"},discount?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",null,\"Store\"),\" \",/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{id:\"discount-countdown\"},\"SALE \",discountCountdown)):'Store')),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"mobile-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{to:\"/appeals\"},\"Appeal a ban\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"mobile-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{to:\"/reports\"},\"Report a user\")),isModerator||isAdmin?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"mobile-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{to:\"/control\"},\"Control panel\")):'',loggedIn?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"mobile-nav-link red\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{href:\"/oauth/logout\",rel:\"noreferrer noopener\"},\"Logout\")):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"mobile-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{href:\"/oauth/login?redirect=${window.location.pathname}\",rel:\"noreferrer noopener\"},\"Login\")))):''):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\",{id:\"desktop\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"desktop-left\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"],{to:\"/\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{src:assets_img_memer_png__WEBPACK_IMPORTED_MODULE_4___default.a,alt:\"Logo\",width:\"42\"})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\",{id:\"desktop-left-links\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"desktop-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{to:\"/commands\"},\"Commands\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"desktop-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{to:\"/faq\"},\"FAQ\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"desktop-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{to:\"/blogs\"},\"Blog\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:discount?\"desktop-nav-link discount\":\"desktop-nav-link\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"NavLink\"],{to:\"/loot\"},\"Store\"),\" \",discount?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{id:\"discount-countdown\"},\"SALE \",discountCountdown):''))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"desktop-right\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{href:\"https://discord.gg/meme\",rel:\"noreferrer noopener\",className:\"desktop-nav-link\"},\"Support\"),!loggedIn?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{href:`/oauth/login?redirect=${window.location.pathname}`,rel:\"noreferrer noopener\",className:\"desktop-nav-link highlight\"},\"Login\"):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"user-account\",onClick:()=>setDropdown(!dropdown)},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{id:\"user-account-avatar\",src:`https://cdn.discordapp.com/avatars/${id}/${avatar}`,alt:\"?\",width:\"32\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{id:\"user-account-name\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",null,username),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"material-icons\"},\"expand_more\")),dropdown?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"user-account-dropdown\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\",{id:\"user-account-dropdown-content\"},isModerator||isAdmin?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"dropdown-item\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"],{to:\"/control\",className:\"dropdown-link\"},\"Control panel\")):'',/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"dropdown-item\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"],{to:\"/appeals\",className:\"dropdown-link\"},\"Appeal a ban\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"dropdown-item\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"],{to:\"/reports\",className:\"dropdown-link\"},\"Report a user\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",{className:\"dropdown-item\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{href:\"/oauth/logout\",rel:\"noreferrer noopener\",className:\"dropdown-link red\"},\"Logout\")))):''))));};/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"withRouter\"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(store=>store)(Navbar)));\n\n//# sourceURL=webpack:///./src/app/components/navbar.jsx?");

/***/ }),

/***/ "./src/app/components/staff.jsx":
/*!**************************************!*\
  !*** ./src/app/components/staff.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return StaffCard; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var assets_styles_components_staffCard_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/styles/components/staffCard.scss */ \"./src/app/assets/styles/components/staffCard.scss\");\n/* harmony import */ var assets_styles_components_staffCard_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_styles_components_staffCard_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _pages_singular_util_socials_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/singular/util/socials.js */ \"./src/app/pages/singular/util/socials.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _pages_singular_util_images_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pages/singular/util/images.js */ \"./src/app/pages/singular/util/images.js\");\n/* harmony import */ var assets_img_staff_fallback_gif__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! assets/img/staff/fallback.gif */ \"./src/app/assets/img/staff/fallback.gif\");\n/* harmony import */ var assets_img_staff_fallback_gif__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(assets_img_staff_fallback_gif__WEBPACK_IMPORTED_MODULE_5__);\nconst UWU=new Audio(`/static/audio/uwu.wav`);const playAudio=()=>UWU.play();function StaffCard({name,avatar,social,about}){const[_avatar,_SetAvatar]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(avatar||_pages_singular_util_images_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"][name.toLowerCase().replace(/ /g,'--')]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{axios__WEBPACK_IMPORTED_MODULE_3__(_avatar).catch(e=>{_SetAvatar(assets_img_staff_fallback_gif__WEBPACK_IMPORTED_MODULE_5___default.a);});},[]);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"staff-card\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"staff-card-details\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{className:\"staff-card-details-picture\",src:_avatar,onClick:()=>{name==='Melmsie'?playAudio():console.log('Go click Mel\\'s avatar');}}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"staff-card-details-name\"},name),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"staff-card-details-about-container\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:about.length>120?\"staff-card-details-about scroll\":\"staff-card-details-about\",dangerouslySetInnerHTML:{__html:about}}))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"staff-card-socials\"},Object.entries(social).map(([socialName,link])=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{key:socialName,href:link},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{className:\"staff-card-socials-account\",alt:`${name}'s ${socialName} link`,src:_pages_singular_util_socials_js__WEBPACK_IMPORTED_MODULE_2__[socialName]})))));};\n\n//# sourceURL=webpack:///./src/app/components/staff.jsx?");

/***/ }),

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var _reducers_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reducers/index.js */ \"./src/app/reducers/index.js\");\n/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./actions/index.js */ \"./src/app/actions/index.js\");\n/* harmony import */ var _util_loadScript_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/loadScript.js */ \"./src/app/util/loadScript.js\");\n/* harmony import */ var _App_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./App.jsx */ \"./src/app/App.jsx\");\nconst composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||redux__WEBPACK_IMPORTED_MODULE_5__[\"compose\"];const store=Object(redux__WEBPACK_IMPORTED_MODULE_5__[\"createStore\"])(_reducers_index_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"],composeEnhancer(Object(redux__WEBPACK_IMPORTED_MODULE_5__[\"applyMiddleware\"])(redux_thunk__WEBPACK_IMPORTED_MODULE_4__[\"default\"])));window.mainStore=store;react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"Provider\"],{store:store},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"BrowserRouter\"],null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App_jsx__WEBPACK_IMPORTED_MODULE_9__[\"default\"],null))),document.getElementById('root'));document.addEventListener('drop',e=>{e.preventDefault();e.stopPropagation();return false;});document.addEventListener('dragover',e=>{e.preventDefault();e.stopPropagation();});// Set up login state\nfetch('/oauth/state',{credentials:'same-origin'}).then(r=>r.json()).then(res=>{if(res){store.dispatch(_actions_index_js__WEBPACK_IMPORTED_MODULE_7__[\"login\"](res));}});fetch('/api/discount').then(r=>r.json()).then(res=>store.dispatch(_actions_index_js__WEBPACK_IMPORTED_MODULE_7__[\"discount\"](res)));// Set up cookie consent\nObject(_util_loadScript_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])('//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js').then(()=>window.cookieconsent.initialise({palette:{popup:{background:'#252e39'},button:{background:'#14a7d0'}},position:'bottom-left',content:{href:'/privacy'}}));if('serviceWorker'in navigator){__webpack_require__.e(/*! import() */ 18).then(__webpack_require__.t.bind(null, /*! ./fix-caching.js */ \"./src/app/fix-caching.js\", 7));// navigator.serviceWorker.register('/service-worker.js').then(registration => {\n//   console.log('SW registered: ', registration);\n// }).catch(registrationError => {\n//   console.log('SW registration failed: ', registrationError);\n// });\n}\n\n//# sourceURL=webpack:///./src/app/index.js?");

/***/ }),

/***/ "./src/app/pages/control/admin/access.jsx":
/*!************************************************!*\
  !*** ./src/app/pages/control/admin/access.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var assets_styles_pages_control_admin_access_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/styles/pages/control/admin/access.scss */ \"./src/app/assets/styles/pages/control/admin/access.scss\");\n/* harmony import */ var assets_styles_pages_control_admin_access_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_styles_pages_control_admin_access_scss__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_controlCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/controlCard */ \"./src/app/components/controlCard.jsx\");\n/* harmony import */ var _components_editStaff__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/editStaff */ \"./src/app/components/editStaff.jsx\");\n/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/modal */ \"./src/app/components/modal/index.jsx\");\nfunction AdminAccess(props){const[staff,setStaff]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null);// const [inspID, setInspID] = useState(0);\n// const [inspAvatar, setInspAvatar] = useState(\"\");\n// const [inspUsername, setInspUsername] = useState(\"\");\n// const [inspSocials, setInspSocials] = useState({})\n// const [inspAbout, setInspAbout] = useState(\"\");\n// const [inspecting, setInspecting] = useState(false);\nObject(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{axios__WEBPACK_IMPORTED_MODULE_3__('/api/staff').then(({data:staff})=>{setStaff(staff);}).catch(()=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].dark(\"Our staff list was unable to be shown.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'noStaff'});});},[]);// const removeStaff = (id, username) => {\n// \tif(!confirm(`You are about to permanently remove all of ${username}'s card data. This action cannot be undone.\\n\\nDo you wish to continue?`))\n// \taxios({\n// \t\turl: `/api/admin/staff?id=${id}`,\n// \t\tmethod: 'DELETE'\n// \t}).then(() => {\n// \t\taxios('/api/staff').then(({ data: staff }) => {\n// \t\t\tsetStaff(staff);\n// \t\t}).catch(() => {\n// \t\t\ttoast.dark(\"Our staff list was unable to be shown.\", {\n// \t\t\t\tposition: \"top-right\",\n// \t\t\t\tautoClose: 10000,\n// \t\t\t\thideProgressBar: true,\n// \t\t\t\tpauseOnHover: true,\n// \t\t\t\tdraggable: true,\n// \t\t\t\tprogress: undefined,\n// \t\t\t\ttoastId: 'noStaff'\n// \t\t\t});\n// \t\t});\n// \t}).catch((e) => {\n// \t\ttoast.error(\"There was an issue when trying to remove that staff member. If this problem persists check the console for errors.\", {\n// \t\t\tposition: 'top-right',\n// \t\t\tautoClose: 3000,\n// \t\t\tpauseOnHover: true,\n// \t\t\tdraggable: true,\n// \t\t\ttoastId: 'noRemove'\n// \t\t})\n// \t})\n// }\n// const inspect = (id) =>  {\n// \taxios({\n// \t\turl: `/api/staff?id=${id}`,\n// \t\tmethod: 'GET'\n// \t}).then(({ data: user }) => {\n// \t\tuser = user[0]\n// \t\tsetInspID(id);\n// \t\tsetInspUsername(user.name);\n// \t\tsetInspAbout(user.about);\n// \t\tsetInspAvatar(user.avatar);\n// \t\tsetInspSocials(user.social);\n// \t\tsetInspecting(true);\n// \t}).catch(e => {\n// \t\tconsole.error(e);\n// \t\ttoast.dark(\"could not inspect.\", {\n// \t\t\tposition: \"top-right\",\n// \t\t\tautoClose: 10000,\n// \t\t\thideProgressBar: true,\n// \t\t\tpauseOnHover: true,\n// \t\t\tdraggable: true,\n// \t\t\tprogress: undefined,\n// \t\t\ttoastId: 'noStaff'\n// \t\t});\n// \t})\n// }\nreturn/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"admin-access\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"admin-access-title\"},\"Manage Staff Members\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"admin-access-cards\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_controlCard__WEBPACK_IMPORTED_MODULE_5__[\"default\"],{mainIcon:\"person_add\",colour:\"green\",title:\"Add a new<br/>staff member\",resize:true,action:{endpoint:\"/admin/staff?id={{input}}&category={{dropdown}}\",method:\"POST\"},inputOptions:{icon:\"badge\",placeholder:\"Account ID\"},dropdownOptions:{icon:\"badge\",initial:\"Staff type\",options:[{text:\"Moderator\",value:\"Moderators\"},{text:\"Honorable Mention\",value:\"Honorable Mentions\"},{text:\"Server Management\",value:\"Server Management\"},{text:\"Developer\",value:\"Developers\"}]},finish:()=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].dark(\"New staff member added.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'newStaff'});}}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_controlCard__WEBPACK_IMPORTED_MODULE_5__[\"default\"],{mainIcon:\"person_search\",colour:\"green\",title:\"Search for<br/>staff members\",resize:true,action:{endpoint:\"/admin/staff?id={{input}}\",method:\"GET\"},inputOptions:{icon:\"badge\",placeholder:\"Account ID\"},finish:()=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].dark(\"That staff member was found in the database.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'staffFound'});}}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_controlCard__WEBPACK_IMPORTED_MODULE_5__[\"default\"],{mainIcon:\"person_remove\",colour:\"red\",title:\"Remove a<br/>staff member\",resize:true,action:{endpoint:\"/admin/staff?id={{input}}\",method:\"DELETE\"},inputOptions:{icon:\"badge\",placeholder:\"Account ID\"},finish:()=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].dark(\"Staff member removed.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'newStaff'});}})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"admin-access-staff-list\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\",{id:\"admin-access-staff-list-title\"},\"All current staff members\"),staff&&Object.entries(staff).map(([category,users])=>users.map((user,i)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"staff-row\",key:i},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"staff-row-group\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{className:\"staff-row-group-picture\",src:user.avatar,alt:\"?\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"staff-row-group-username\"},user.name,\" \",/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"staff-row-group-id\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{style:{userSelect:\"none\"}},\"(\"),user._id,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{style:{userSelect:\"none\"}},\")\")))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"staff-row-role\"},category),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"staff-row-about\"},user.about.substr(0,100),user.about.length>100?'...':''))))));}/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(store=>store.login,null)(AdminAccess));\n\n//# sourceURL=webpack:///./src/app/pages/control/admin/access.jsx?");

/***/ }),

/***/ "./src/app/pages/control/admin/blogs.jsx":
/*!***********************************************!*\
  !*** ./src/app/pages/control/admin/blogs.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var assets_styles_pages_control_admin_blogs_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/styles/pages/control/admin/blogs.scss */ \"./src/app/assets/styles/pages/control/admin/blogs.scss\");\n/* harmony import */ var assets_styles_pages_control_admin_blogs_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_styles_pages_control_admin_blogs_scss__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var simplebar_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! simplebar-react */ \"./node_modules/simplebar-react/dist/simplebar-react.esm.js\");\n/* harmony import */ var simplebar_dist_simplebar_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! simplebar/dist/simplebar.min.css */ \"./node_modules/simplebar/dist/simplebar.min.css\");\n/* harmony import */ var simplebar_dist_simplebar_min_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(simplebar_dist_simplebar_min_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var markdown_it__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! markdown-it */ \"./node_modules/markdown-it/index.js\");\n/* harmony import */ var markdown_it__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(markdown_it__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react_markdown_editor_lite__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-markdown-editor-lite */ \"./node_modules/react-markdown-editor-lite/lib/index.js\");\n/* harmony import */ var react_markdown_editor_lite__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_markdown_editor_lite__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var react_markdown_editor_lite_lib_index_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-markdown-editor-lite/lib/index.css */ \"./node_modules/react-markdown-editor-lite/lib/index.css\");\n/* harmony import */ var react_markdown_editor_lite_lib_index_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_markdown_editor_lite_lib_index_css__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var html_to_md__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! html-to-md */ \"./node_modules/html-to-md/dist/index.js\");\n/* harmony import */ var html_to_md__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(html_to_md__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\nfunction AdminBlogs(props){const history=Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"useHistory\"])();const[blogContent,setBlogContent]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"\");const[currentBlog,setCurrentBlog]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null);const[blogTitle,setBlogTitle]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"\");const[blogDate,setBlogDate]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"\");const[blogDescription,setBlogDescription]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"\");const[blogAuthor,setBlogAuthor]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(props.username);const[blogs,setBlogs]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);const[htmlBlog,setHTMLBlog]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"\");const[editingExisting,setEditingExisting]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[submittable,setSubmittable]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const publish=()=>{if(!confirm(\"You are about to publish this blog post. Once you publish it you will be redirected to the blog page.\\n\\n Do you wish to continue?\"))return;axios__WEBPACK_IMPORTED_MODULE_3__({url:'/api/admin/blogs',method:'POST',data:{id:blogTitle.toLowerCase().replace(/ /g,'-').replace(/[^a-zA-Z0-9 -]/,''),name:blogTitle,date:blogDate,desc:blogDescription,author:blogAuthor,content:htmlBlog}}).then(()=>{return history.push(`/blogs/${blogTitle.toLowerCase().replace(/ /g,'-')}`);}).catch(e=>{console.group(\"Blog publishing error\");console.error(e.message);console.groupEnd();react_toastify__WEBPACK_IMPORTED_MODULE_11__[\"toast\"].error(\"There was an issue publish this blog post. If this persists, check the console for errors.\",{position:\"top-right\",autoClose:3000,pauseOnHover:true,draggable:true,toastId:'bannedUser'});});};const deleteBlog=()=>{if(!confirm(\"You are about to delete this blog post forever. This action cannot be reversed.\\n\\nDo you wish to continue?\"))return;axios__WEBPACK_IMPORTED_MODULE_3__({url:`/api/admin/blogs?id=${blogs[currentBlog]._id}`,method:'DELETE'}).then(()=>{return window.location.reload();}).catch(e=>{console.group(\"Blog publishing error\");console.error(e.message);console.groupEnd();react_toastify__WEBPACK_IMPORTED_MODULE_11__[\"toast\"].error(\"There was an issue publish this blog post. If this persists, check the console for errors.\",{position:\"top-right\",autoClose:3000,pauseOnHover:true,draggable:true,toastId:'bannedUser'});});};Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{axios__WEBPACK_IMPORTED_MODULE_3__('/api/blogs').then(({data:blogs})=>{setBlogs(blogs);});},[]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{if(blogTitle.length>=5&&blogDescription.length>=60&&blogContent.length>=200)return setSubmittable(true);else setSubmittable(false);},[blogTitle,blogDescription,blogContent]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{if(currentBlog===null||!blogs)return;setBlogTitle(blogs[currentBlog].name);setBlogDate(blogs[currentBlog].date);setBlogAuthor(blogs[currentBlog].author);setBlogDescription(blogs[currentBlog].desc);axios__WEBPACK_IMPORTED_MODULE_3__(`/api/blogs/${blogs[currentBlog]._id||blogs[currentBlog].id}`).then(({data:blog})=>{setBlogContent(html_to_md__WEBPACK_IMPORTED_MODULE_10__(blog.content));setHTMLBlog(blog.content);});},[currentBlog]);const mdParser=new markdown_it__WEBPACK_IMPORTED_MODULE_7___default.a();function handleEditorChange({html,text}){setHTMLBlog(html);setBlogContent(text);}const selectBlog=i=>{if(!confirm(\"All unsaved changes will be lost. Do you wish to continue?\\n\\nIf you wish to save the changes, you will need to do so yourself, either online or on your personal computer.\"))return;setCurrentBlog(i);setEditingExisting(true);};const clearEditor=()=>{if(!confirm(\"All unsaved changes will be lost. Do you wish to continue?\\n\\nIf you wish to save the changes, you will need to do so yourself, either online or on your personal computer.\"))return;setCurrentBlog(null);setBlogTitle(\"\");setBlogDescription(\"\");setBlogAuthor(props.username);setBlogContent(\"\");setEditingExisting(false);};return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"admin-blogs\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"admin-blogs-nav\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\",null,\"Blog posts\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"control-subtitle\"},\"Here you are able to create new and edit existing blog posts!\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"control-blogs\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"control-blogs-new\",onClick:()=>clearEditor()},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",null,\"Write a blog post\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"material-icons\"},\"post_add\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(simplebar_react__WEBPACK_IMPORTED_MODULE_5__[\"default\"],{style:{maxHeight:\"78vh\"}},blogs.map((blog,i)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:currentBlog===i?\"control-blog selected\":\"control-blog\",key:i,onClick:()=>selectBlog(i)},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\",{className:\"control-blog-title\"},blog.name),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"control-blog-description\"},blog.desc.substr(0,50),\"...\")))))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"admin-blogs-editor-container\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"blog-editor-details\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{id:\"blog-editor-details-title\",placeholder:\"Blog title\",value:blogTitle,onChange:e=>setBlogTitle(e.target.value),disabled:editingExisting}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{id:\"blog-editor-details-desc\",placeholder:\"Write a short description for your blog\",value:blogDescription,onChange:e=>setBlogDescription(e.target.value),disabled:editingExisting}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"blog-details-buttons\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:!submittable?\"blog-button disabled\":\"blog-button publish\",onClick:()=>submittable?publish():'',style:{display:\"flex\",alignItems:\"center\"}},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"material-icons\"},\"publish\"),\" Publish this blog post\"),currentBlog!==null?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"blog-button delete\",onClick:()=>deleteBlog(),style:{display:\"flex\",alignItems:\"center\"}},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"material-icons\"},\"delete\"),\" Delete blog post\"):'')),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_markdown_editor_lite__WEBPACK_IMPORTED_MODULE_8___default.a,{id:\"blog-editor\",renderHTML:text=>mdParser.render(text),onChange:handleEditorChange,canView:{fullScreen:false},value:blogContent})));}/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(store=>store.login,null)(AdminBlogs));\n\n//# sourceURL=webpack:///./src/app/pages/control/admin/blogs.jsx?");

/***/ }),

/***/ "./src/app/pages/control/admin/users.jsx":
/*!***********************************************!*\
  !*** ./src/app/pages/control/admin/users.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var assets_styles_pages_control_admin_users_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/styles/pages/control/admin/users.scss */ \"./src/app/assets/styles/pages/control/admin/users.scss\");\n/* harmony import */ var assets_styles_pages_control_admin_users_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_styles_pages_control_admin_users_scss__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_controlCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/controlCard */ \"./src/app/components/controlCard.jsx\");\nfunction AdminUsers(props){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"admin-users\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"admin-users-title\"},\"Control bot users\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"admin-users-cards\",className:\"card-grid\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_controlCard__WEBPACK_IMPORTED_MODULE_5__[\"default\"],{mainIcon:\"remove\",colour:\"red\",title:\"Restrict a user's access\",options:{includeBody:true},action:{endpoint:\"/admin/ban\",method:\"POST\"},inputOptions:{icon:\"badge\",placeholder:\"Account ID\"},dropdownOptions:{icon:\"desktop_access_disabled\",initial:\"Ban type\",options:[{text:\"Any reason\",value:\"Any\"},{text:\"Appeal ban\",value:\"Appeal\"},{text:\"Store ban\",value:\"Lootbox\"}]},finish:()=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].dark(\"The requested user has been banned!\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'bannedUser'});}}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_controlCard__WEBPACK_IMPORTED_MODULE_5__[\"default\"],{mainIcon:\"done\",colour:\"green\",title:\"Reinstate a user's access\",options:{includeBody:true},action:{endpoint:\"/admin/unban\",method:\"POST\"},inputOptions:{icon:\"badge\",placeholder:\"Account ID\"},dropdownOptions:{icon:\"desktop_windows\",initial:\"Ban reason\",options:[{text:\"Any reason\",value:\"Any\"},{text:\"Appeal ban\",value:\"Appeal\"},{text:\"Store ban\",value:\"Lootbox\"}]},finish:()=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].dark(\"That user's access has been reinstated.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'bannedUser'});}}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_controlCard__WEBPACK_IMPORTED_MODULE_5__[\"default\"],{mainIcon:\"person_search\",colour:\"green\",title:\"Review a user's access\",action:{endpoint:\"/admin/checkBan?type={{dropdown}}&id={{input}}\",method:\"GET\"},inputOptions:{icon:\"badge\",placeholder:\"Account ID\"},dropdownOptions:{icon:\"desktop_windows\",initial:\"Ban reason\",options:[{text:\"Any reason\",value:\"Any\"},{text:\"Appeal ban\",value:\"Appeal\"},{text:\"Store ban\",value:\"Lootbox\"}]},finish:()=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].dark(\"That user's access has been reinstated.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'bannedUser'});}}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_controlCard__WEBPACK_IMPORTED_MODULE_5__[\"default\"],{mainIcon:\"payments\",colour:\"green\",title:\"Find a store purchase\",action:{endpoint:\"/admin/findTransaction?{{dropdown}}={{input}}\",method:\"GET\"},inputOptions:{icon:\"person\",placeholder:\"User details\"},dropdownOptions:{icon:\"find_in_page\",initial:\"Find by\",options:[{text:'Account ID'},{text:'Payment ID'},{text:'PayPal E-Mail'},{text:'Full name'}]},finish:()=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].dark(\"That user's access has been reinstated.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'bannedUser'});}})));}/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(store=>store.login,null)(AdminUsers));\n\n//# sourceURL=webpack:///./src/app/pages/control/admin/users.jsx?");

/***/ }),

/***/ "./src/app/pages/control/admin/website.jsx":
/*!*************************************************!*\
  !*** ./src/app/pages/control/admin/website.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var assets_styles_pages_control_admin_website_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/styles/pages/control/admin/website.scss */ \"./src/app/assets/styles/pages/control/admin/website.scss\");\n/* harmony import */ var assets_styles_pages_control_admin_website_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_styles_pages_control_admin_website_scss__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_controlCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/controlCard */ \"./src/app/components/controlCard.jsx\");\nfunction AdminWebsite(props){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"admin-website\",style:{marginTop:\"6vh\"}},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"admin-website-title\"},\"Website management\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"admin-website-cards\",className:\"card-grid\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_controlCard__WEBPACK_IMPORTED_MODULE_5__[\"default\"],{mainIcon:\"store_front\",colour:\"green\",title:\"Start a<br>lootbox sale\",options:{includeBody:true},action:{endpoint:\"/admin/discount\",method:\"POST\"},inputOptions:{icon:\"local_offer\",placeholder:\"Sale percentage\",min:1,max:100},dropdownOptions:{icon:\"date_range\",initial:\"Sale duration\",options:[{text:\"1 Day\",value:\"24\"},{text:\"3 Days\",value:\"72\"},{text:\"1 Week\",value:\"168\"}]},finish:()=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].success(\"The discount has been added!\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'discountAdd'});}}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_controlCard__WEBPACK_IMPORTED_MODULE_5__[\"default\"],{mainIcon:\"campaign\",colour:\"green\",title:\"Add a new announcement\",options:{includeBody:true,bannerPreview:true},action:{endpoint:\"/admin/announcement\",method:\"POST\"},inputOptions:{icon:\"chat_bubble\",placeholder:\"Banner message\"},fillRow:true,finish:()=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].success(\"The announcement banner has been updated.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'newAnnouncement'});}})));}/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(store=>store.login,null)(AdminWebsite));\n\n//# sourceURL=webpack:///./src/app/pages/control/admin/website.jsx?");

/***/ }),

/***/ "./src/app/pages/control/controller.jsx":
/*!**********************************************!*\
  !*** ./src/app/pages/control/controller.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n/* harmony import */ var assets_img_memer_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/img/memer.png */ \"./src/app/assets/img/memer.png\");\n/* harmony import */ var assets_img_memer_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_img_memer_png__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var assets_styles_pages_control_control_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! assets/styles/pages/control/control.scss */ \"./src/app/assets/styles/pages/control/control.scss\");\n/* harmony import */ var assets_styles_pages_control_control_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(assets_styles_pages_control_control_scss__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _components_discordLogin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/discordLogin */ \"./src/app/components/discordLogin.jsx\");\n/* harmony import */ var _admin_access__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./admin/access */ \"./src/app/pages/control/admin/access.jsx\");\n/* harmony import */ var _admin_users__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./admin/users */ \"./src/app/pages/control/admin/users.jsx\");\n/* harmony import */ var _admin_website__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./admin/website */ \"./src/app/pages/control/admin/website.jsx\");\n/* harmony import */ var _admin_blogs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./admin/blogs */ \"./src/app/pages/control/admin/blogs.jsx\");\n/* harmony import */ var _mods_inspect__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mods/inspect */ \"./src/app/pages/control/mods/inspect.jsx\");\n/* harmony import */ var _mods_analytics__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./mods/analytics */ \"./src/app/pages/control/mods/analytics.jsx\");\n/* harmony import */ var _personalization_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./personalization/card */ \"./src/app/pages/control/personalization/card.jsx\");\n// Views\nfunction ControlPanelController(props){const[isLoaded,setIsLoaded]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[componentToRender,setComponentToRender]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null);const[overrideMargin,setOverrideMargin]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[dropdownOpen,setDropdownOpen]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);const[menuOpen,setMenuOpen]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{if(!componentToRender||!props.view)return;setIsLoaded(true);},[componentToRender]);Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{if(!props.pending&&!props.loggedIn)return;if(!props.pending&&props.loggedIn&&(props.view.includes(\"admin\")&&!props.isAdmin||props.view.includes(\"mods\")&&!props.isModerator))return window.location.href=\"https://www.youtube.com/watch?v=2ocykBzWDiM\";switch(props.view){case'none:determine':if(props.isAdmin)return window.location.replace('/control/admin/access');else if(props.isModerator)return window.location.replace('/control/mods/inspect');case'admin:access':setComponentToRender(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_admin_access__WEBPACK_IMPORTED_MODULE_8__[\"default\"],null));break;case'admin:users':setComponentToRender(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_admin_users__WEBPACK_IMPORTED_MODULE_9__[\"default\"],null));break;case'admin:website':setComponentToRender(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_admin_website__WEBPACK_IMPORTED_MODULE_10__[\"default\"],null));break;case'admin:blogs':setComponentToRender(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_admin_blogs__WEBPACK_IMPORTED_MODULE_11__[\"default\"],null));setOverrideMargin(true);break;case'mods:inspect':setComponentToRender(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mods_inspect__WEBPACK_IMPORTED_MODULE_12__[\"default\"],null));break;case'mods:analytics':setComponentToRender(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_mods_analytics__WEBPACK_IMPORTED_MODULE_13__[\"default\"],null));break;case'personalize:card':setComponentToRender(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_personalization_card__WEBPACK_IMPORTED_MODULE_14__[\"default\"],null));break;default:setComponentToRender(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"restricted\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"restricted-content\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"restricted-content-title\"},\"Restricted\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{id:\"restricted-content-body\"},\"The page you are trying to access is restricted. Please login to continue\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_discordLogin__WEBPACK_IMPORTED_MODULE_7__[\"default\"],null))));}},[props]);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"control-panel\"},isLoaded?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\",{id:\"mobile-nav\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{id:\"nav-logo-container\",to:\"/\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{src:\"nav-logo\",src:assets_img_memer_png__WEBPACK_IMPORTED_MODULE_4___default.a,width:\"60\"})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\",{id:\"mobile-nav-links\"},props.isAdmin?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/access\"},\"Access control\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/users\"},\"User control\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/website\"},\"Website management\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/blogs\"},\"Blog management\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/inspect\"},\"Inspect a user\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/analytics\"},\"Support analytics\"))):isModerator?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/inspect\"},\"Inspect a user\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/analytics\"},\"Support analytics\"))):''),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"mobile-nav-right\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"mobile-nav-right-hamburger\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{onClick:()=>{setDropdownOpen(false);setMenuOpen(!menuOpen);},className:\"material-icons\"},\"menu\"),menuOpen?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"mobile-nav-right-hamburger-links\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\",null,props.isAdmin?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/access\"},\"Access control\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/users\"},\"User control\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/website\"},\"Website management\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/blogs\"},\"Blog management\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/inspect\"},\"Inspect a user\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/analytics\"},\"Support analytics\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/personalize/card\"},\"Card appearance\"))):isModerator?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/personalize/card\"},\"Card appearance\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/inspect\"},\"Inspect a user\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/analytics\"},\"Support analytics\"))):'')):''),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"mobile-nav-right-account\",onClick:()=>{setMenuOpen(false);setDropdownOpen(!dropdownOpen);}},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"mobile-nav-right-account-info\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{id:\"mobile-nav-right-account-info-avatar\",src:`https://cdn.discordapp.com/avatars/${props.id}/${props.avatar}`,width:\"48\"})))),dropdownOpen?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"nav-account-dropdown\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/personalize/card\"},\"Card appearance\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{href:\"/oauth/logout\"},\"Logout\")))):''),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\",{id:\"desktop-nav\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],{id:\"nav-logo-container\",to:\"/\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{src:\"nav-logo\",src:assets_img_memer_png__WEBPACK_IMPORTED_MODULE_4___default.a,width:\"160\"})),props&&props.isAdmin?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"nav-category\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\",{className:\"nav-category-heading\"},\"Administration\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\",{className:\"nav-category-links\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/access\"},\"Access control\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/users\"},\"User control\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/website\"},\"Website management\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/admin/blogs\"},\"Blog management\")))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"nav-category\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\",{className:\"nav-category-heading\"},\"Moderation\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\",{className:\"nav-category-links\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/inspect\"},\"Inspect a user\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/analytics\"},\"Support analytics\"))))):props&&props.isModerator?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"nav-category\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\",{className:\"nav-category-heading\"},\"Moderation\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\",{className:\"nav-category-links\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/inspect\"},\"Inspect a user\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/mods/analytics\"},\"Support analytics\")))):'',/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"nav-category\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\",{className:\"nav-category-heading\"},\"Personalization\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\",{className:\"nav-category-links\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"],{to:\"/control/personalize/card\"},\"Card appearance\")))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"nav-account\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"nav-account-info\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{id:\"nav-account-info-avatar\",src:`https://cdn.discordapp.com/avatars/${props.id}/${props.avatar}`,width:\"48\"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"nav-account-info-user\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{id:\"nav-account-info-user-name\"},props.username),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{id:\"nav-account-info-user-discrim\"},\"#\",props.discriminator))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"nav-account-actions\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{href:\"/oauth/logout\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{title:\"Logout\",className:\"material-icons\"},\"logout\"))))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"content-container\",className:overrideMargin?'no-margin':''},componentToRender),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_3__[\"ToastContainer\"],null)):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"restricted\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"restricted-content\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"restricted-content-title\"},\"Restricted\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{id:\"restricted-content-body\"},\"The page you are trying to access is restricted. Please login to continue\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_discordLogin__WEBPACK_IMPORTED_MODULE_7__[\"default\"],null))));}/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"connect\"])(store=>store.login,null)(ControlPanelController));\n\n//# sourceURL=webpack:///./src/app/pages/control/controller.jsx?");

/***/ }),

/***/ "./src/app/pages/control/mods/analytics.jsx":
/*!**************************************************!*\
  !*** ./src/app/pages/control/mods/analytics.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var assets_styles_pages_control_mods_inspect_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/styles/pages/control/mods/inspect.scss */ \"./src/app/assets/styles/pages/control/mods/inspect.scss\");\n/* harmony import */ var assets_styles_pages_control_mods_inspect_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_styles_pages_control_mods_inspect_scss__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_controlCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/controlCard */ \"./src/app/components/controlCard.jsx\");\nfunction Analytics(props){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"mods-inspect\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"mods-inspect-title\"},\"Support channel analytics\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"iframe\",{style:{border:\"none\"},src:\"https://p.datadoghq.com/sb/a5f739cb1-ecdcf8cfecaf46c432ed77dd64cf7edc?from_ts=1614075099009&live=true&theme=dark&to_ts=1614679899009&tv_mode=true\",width:\"1280\",height:\"720\"}));}/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(store=>store.login,null)(Analytics));\n\n//# sourceURL=webpack:///./src/app/pages/control/mods/analytics.jsx?");

/***/ }),

/***/ "./src/app/pages/control/mods/inspect.jsx":
/*!************************************************!*\
  !*** ./src/app/pages/control/mods/inspect.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var assets_styles_pages_control_mods_inspect_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/styles/pages/control/mods/inspect.scss */ \"./src/app/assets/styles/pages/control/mods/inspect.scss\");\n/* harmony import */ var assets_styles_pages_control_mods_inspect_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_styles_pages_control_mods_inspect_scss__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_controlCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/controlCard */ \"./src/app/components/controlCard.jsx\");\nfunction ModsInspect(props){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"mods-inspect\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"mods-inspect-title\"},\"Inspect users\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"mods-inspect-cards\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_controlCard__WEBPACK_IMPORTED_MODULE_5__[\"default\"],{mainIcon:\"person_search\",colour:\"green\",title:\"Review a user's access\",action:{endpoint:\"/admin/checkBan?type={{dropdown}}&id={{input}}\",method:\"GET\"},inputOptions:{icon:\"badge\",placeholder:\"Account ID\"},dropdownOptions:{icon:\"desktop_windows\",initial:\"Ban reason\",options:[{text:\"Any reason\",value:\"Any\"},{text:\"Appeal ban\",value:\"Appeal\"},{text:\"Store ban\",value:\"Lootbox\"}]},finish:()=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].dark(\"That user's access has been reinstated.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'bannedUser'});}})));}/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(store=>store.login,null)(ModsInspect));\n\n//# sourceURL=webpack:///./src/app/pages/control/mods/inspect.jsx?");

/***/ }),

/***/ "./src/app/pages/control/personalization/card.jsx":
/*!********************************************************!*\
  !*** ./src/app/pages/control/personalization/card.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.js\");\n/* harmony import */ var _components_staff__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/staff */ \"./src/app/components/staff.jsx\");\n/* harmony import */ var _assets_styles_pages_control_personalization_card_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/styles/pages/control/personalization/card.scss */ \"./src/app/assets/styles/pages/control/personalization/card.scss\");\n/* harmony import */ var _assets_styles_pages_control_personalization_card_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_styles_pages_control_personalization_card_scss__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _singular_util_socials_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../singular/util/socials.js */ \"./src/app/pages/singular/util/socials.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);\nfunction ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _objectWithoutProperties(source,excluded){if(source==null)return{};var target=_objectWithoutPropertiesLoose(source,excluded);var key,i;if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++){key=sourceSymbolKeys[i];if(excluded.indexOf(key)>=0)continue;if(!Object.prototype.propertyIsEnumerable.call(source,key))continue;target[key]=source[key];}}return target;}function _objectWithoutPropertiesLoose(source,excluded){if(source==null)return{};var target={};var sourceKeys=Object.keys(source);var key,i;for(i=0;i<sourceKeys.length;i++){key=sourceKeys[i];if(excluded.indexOf(key)>=0)continue;target[key]=source[key];}return target;}function _toPropertyKey(arg){var key=_toPrimitive(arg,\"string\");return typeof key===\"symbol\"?key:String(key);}function _toPrimitive(input,hint){if(typeof input!==\"object\"||input===null)return input;var prim=input[Symbol.toPrimitive];if(prim!==undefined){var res=prim.call(input,hint||\"default\");if(typeof res!==\"object\")return res;throw new TypeError(\"@@toPrimitive must return a primitive value.\");}return(hint===\"string\"?String:Number)(input);}function PersonalizeCard(props){const[username,setUsername]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(props.username);const[avatar,setAvatar]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(`https://cdn.discordapp.com/avatars/${props.id}/${props.avatar}`);const[social,setSocial]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({});const[tempPfp,setTempPfp]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"\");const[tempAbout,setTempAbout]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"\");const[tempSocial,setTempSocial]=Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({});Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(()=>{axios__WEBPACK_IMPORTED_MODULE_6__({url:`/api/staff?id=${props.id}`,method:'GET'}).then(({data:user})=>{user=user[0];setTempPfp(user.avatar);setTempAbout(user.about);setTempSocial(user.social);setUsername(user.username);setSocial(user.social);}).catch(e=>{console.group(\"Unable to retrieve staff card information.\");console.error(e.message);console.groupEnd();});},[]);const socialsChange=(name,value)=>{if(value.length<1){const{[name]:v}=tempSocial,rest=_objectWithoutProperties(tempSocial,[name].map(_toPropertyKey));return setTempSocial(rest);}setTempSocial(_objectSpread(_objectSpread({},tempSocial),{},{[name]:value}));};const saveChanges=()=>{axios__WEBPACK_IMPORTED_MODULE_6__({url:`/api/${props.isAdmin?'admin':'mods'}/staff`,method:'PUT',data:{avatar:tempPfp,about:tempAbout,socials:tempSocial}}).then(()=>{window.location.reload();}).catch(e=>{react_toastify__WEBPACK_IMPORTED_MODULE_2__[\"toast\"].error(\"There was an issue while trying to update your staff card.\",{position:\"top-right\",autoClose:10000,hideProgressBar:true,pauseOnHover:true,draggable:true,progress:undefined,toastId:'noStaff'});});};return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"personalize-card\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{id:\"personalize-card-title\"},\"Personalize your staff card.\"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"personalize-card-content\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"personalize-card-content-preview\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_staff__WEBPACK_IMPORTED_MODULE_3__[\"default\"],{name:username,avatar:tempPfp,social:tempSocial,about:tempAbout}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{className:\"input-singular\",defaultValue:tempPfp.includes('cdn.discord')?'':tempPfp,onChange:e=>setTempPfp(e.target.value||avatar),placeholder:`Custom card picture`}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{id:\"personalize-card-content-preview-save\",className:\"hide-mobile\",onClick:saveChanges},\"Save changes\")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{id:\"personalize-card-content-info\"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"textarea\",{defaultValue:tempAbout,onChange:e=>setTempAbout(e.target.value)}),Object.entries(_singular_util_socials_js__WEBPACK_IMPORTED_MODULE_5__).map(([socialName,socialLink],i)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"input-group\",key:i},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"input-group-image\",style:{backgroundImage:`url(\"${socialLink}\")`}}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\",{defaultValue:social[socialName]?social[socialName]:'',onChange:e=>socialsChange(socialName,e.target.value),placeholder:`Your ${socialName.toLowerCase()} ${socialName.toLowerCase()!=='website'?socialName.toLowerCase()!=='discord'?'account ':'server ':''}URL`})))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{id:\"personalize-card-content-preview-save\",className:\"show-mobile\",onClick:saveChanges},\"Save changes\")));}/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(store=>store.login,null)(PersonalizeCard));\n\n//# sourceURL=webpack:///./src/app/pages/control/personalization/card.jsx?");

/***/ }),

/***/ "./src/app/pages/singular/util/images.js":
/*!***********************************************!*\
  !*** ./src/app/pages/singular/util/images.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst images={};const requireCtx=__webpack_require__(\"./src/app/assets/img/staff sync \\\\.(png|jpg|gif|webp)$\");requireCtx.keys().map(name=>images[name.slice(2).split('.')[0]]=requireCtx(name));/* harmony default export */ __webpack_exports__[\"default\"] = (images);\n\n//# sourceURL=webpack:///./src/app/pages/singular/util/images.js?");

/***/ }),

/***/ "./src/app/pages/singular/util/socials.js":
/*!************************************************!*\
  !*** ./src/app/pages/singular/util/socials.js ***!
  \************************************************/
/*! exports provided: Discord, Spotify, Twitter, Website, YouTube, GitHub, GitLab, Reddit, Twitch, Instagram */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var assets_img_svg_Discord_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! assets/img/svg/Discord.svg */ \"./src/app/assets/img/svg/Discord.svg\");\n/* harmony import */ var assets_img_svg_Discord_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(assets_img_svg_Discord_svg__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Discord\", function() { return assets_img_svg_Discord_svg__WEBPACK_IMPORTED_MODULE_0___default.a; });\n/* harmony import */ var assets_img_svg_Spotify_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/img/svg/Spotify.svg */ \"./src/app/assets/img/svg/Spotify.svg\");\n/* harmony import */ var assets_img_svg_Spotify_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_img_svg_Spotify_svg__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Spotify\", function() { return assets_img_svg_Spotify_svg__WEBPACK_IMPORTED_MODULE_1___default.a; });\n/* harmony import */ var assets_img_svg_Twitter_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/img/svg/Twitter.svg */ \"./src/app/assets/img/svg/Twitter.svg\");\n/* harmony import */ var assets_img_svg_Twitter_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(assets_img_svg_Twitter_svg__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Twitter\", function() { return assets_img_svg_Twitter_svg__WEBPACK_IMPORTED_MODULE_2___default.a; });\n/* harmony import */ var assets_img_svg_Website_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/img/svg/Website.svg */ \"./src/app/assets/img/svg/Website.svg\");\n/* harmony import */ var assets_img_svg_Website_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(assets_img_svg_Website_svg__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Website\", function() { return assets_img_svg_Website_svg__WEBPACK_IMPORTED_MODULE_3___default.a; });\n/* harmony import */ var assets_img_svg_YouTube_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/img/svg/YouTube.svg */ \"./src/app/assets/img/svg/YouTube.svg\");\n/* harmony import */ var assets_img_svg_YouTube_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_img_svg_YouTube_svg__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"YouTube\", function() { return assets_img_svg_YouTube_svg__WEBPACK_IMPORTED_MODULE_4___default.a; });\n/* harmony import */ var assets_img_svg_GitHub_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! assets/img/svg/GitHub.svg */ \"./src/app/assets/img/svg/GitHub.svg\");\n/* harmony import */ var assets_img_svg_GitHub_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(assets_img_svg_GitHub_svg__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"GitHub\", function() { return assets_img_svg_GitHub_svg__WEBPACK_IMPORTED_MODULE_5___default.a; });\n/* harmony import */ var assets_img_svg_GitLab_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! assets/img/svg/GitLab.svg */ \"./src/app/assets/img/svg/GitLab.svg\");\n/* harmony import */ var assets_img_svg_GitLab_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(assets_img_svg_GitLab_svg__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"GitLab\", function() { return assets_img_svg_GitLab_svg__WEBPACK_IMPORTED_MODULE_6___default.a; });\n/* harmony import */ var assets_img_svg_Reddit_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! assets/img/svg/Reddit.svg */ \"./src/app/assets/img/svg/Reddit.svg\");\n/* harmony import */ var assets_img_svg_Reddit_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(assets_img_svg_Reddit_svg__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Reddit\", function() { return assets_img_svg_Reddit_svg__WEBPACK_IMPORTED_MODULE_7___default.a; });\n/* harmony import */ var assets_img_svg_Twitch_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! assets/img/svg/Twitch.svg */ \"./src/app/assets/img/svg/Twitch.svg\");\n/* harmony import */ var assets_img_svg_Twitch_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(assets_img_svg_Twitch_svg__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Twitch\", function() { return assets_img_svg_Twitch_svg__WEBPACK_IMPORTED_MODULE_8___default.a; });\n/* harmony import */ var assets_img_instagram_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! assets/img/instagram.png */ \"./src/app/assets/img/instagram.png\");\n/* harmony import */ var assets_img_instagram_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(assets_img_instagram_png__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Instagram\", function() { return assets_img_instagram_png__WEBPACK_IMPORTED_MODULE_9___default.a; });\n\n\n//# sourceURL=webpack:///./src/app/pages/singular/util/socials.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\nfunction ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}const login=(state={pending:true,loggedIn:false},action)=>{switch(action.type){case'LOGIN':return _objectSpread({pending:false,loggedIn:true},action.user);case'LOGOUT':return _objectSpread({pending:false,loggedIn:false},action.user);default:return _objectSpread(_objectSpread({},state),{},{pending:false});}};/* harmony default export */ __webpack_exports__[\"default\"] = (login);\n\n//# sourceURL=webpack:///./src/app/reducers/login.js?");

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

/***/ "./src/app/util/routers/ControlRoute.jsx":
/*!***********************************************!*\
  !*** ./src/app/util/routers/ControlRoute.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ControlRoute; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _pages_control_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/control/controller */ \"./src/app/pages/control/controller.jsx\");\nfunction ControlRoute({path,exact,strict,view}){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{exact:exact,strict:strict,path:path,component:()=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Suspense\"],{fallback:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",null)},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_control_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"],{view:view}))});}\n\n//# sourceURL=webpack:///./src/app/util/routers/ControlRoute.jsx?");

/***/ }),

/***/ "./src/app/util/routers/NormalRoute.jsx":
/*!**********************************************!*\
  !*** ./src/app/util/routers/NormalRoute.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return NormalRoute; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _components_navbar_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/navbar.jsx */ \"./src/app/components/navbar.jsx\");\n/* harmony import */ var _components_footer_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/footer.jsx */ \"./src/app/components/footer.jsx\");\nfunction NormalRoute({path,exact,strict,component}){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"],{exact:exact,strict:strict,path:path,component:()=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Suspense\"],{fallback:/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",null)},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_navbar_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"],null),component,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_footer_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"],null))});}\n\n//# sourceURL=webpack:///./src/app/util/routers/NormalRoute.jsx?");

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