(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./src/app/Pages/Landing/Landing.scss":
/*!********************************************!*\
  !*** ./src/app/Pages/Landing/Landing.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Pages/Landing/Landing.scss?");

/***/ }),

/***/ "./src/app/Pages/Landing/index.jsx":
/*!*****************************************!*\
  !*** ./src/app/Pages/Landing/index.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Landing_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Landing.scss */ \"./src/app/Pages/Landing/Landing.scss\");\n/* harmony import */ var _Landing_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Landing_scss__WEBPACK_IMPORTED_MODULE_1__);\nconst data=[{name:'Commands',description:'See all of the commands Dank Memer has to offer your server!',link:'/commands'},{name:'Premium',description:'Click here to head to Patreon to see our premium perk selections!',link:'https://www.patreon.com/join/dankmemerbot?'},{name:'Lootboxes',description:'Dank Memer? More like EA: Memer edtion, come check out our \"surprise mechanics\"!',link:'/loot'},{name:'Support',description:'Have trouble or questions about the bot? Head over to our support server!',link:'https://discord.gg/meme'}];const peepos=Array(7).fill(0).map((_,i)=>new Audio(`/static/peepo${i}.mp3`));let currentAudio=-1;const playAudio=()=>(peepos[++currentAudio]||peepos[currentAudio=0]).play();/* harmony default export */ __webpack_exports__[\"default\"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"eee\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{className:\"title\"},\"thanks for adding \",react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"pepple\"},\"dank memer\"))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"list\"},data.map(({name,description,link})=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{key:name,href:link,className:\"boxy\",onMouseEnter:()=>playAudio()},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\",{className:\"name\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"blurple\"},name)),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"about-text\"},description)))))));\n\n//# sourceURL=webpack:///./src/app/Pages/Landing/index.jsx?");

/***/ })

}]);