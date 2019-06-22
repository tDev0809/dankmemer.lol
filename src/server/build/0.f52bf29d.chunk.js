(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/app/Pages/Staff/Developers/Developer.jsx":
/*!******************************************************!*\
  !*** ./src/app/Pages/Staff/Developers/Developer.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Developer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Developer.scss */ \"./src/app/Pages/Staff/Developers/Developer.scss\");\n/* harmony import */ var _Developer_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Developer_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _socials_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socials.js */ \"./src/app/Pages/Staff/Developers/socials.js\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(({name,picture,social,about})=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"staff-member\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\",{className:\"staff-name blurple\"},name),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"staff-social\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{className:\"staff-picture\",alt:`${name}'s avatar`,src:picture}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\",{className:\"staff-about-parent\"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:about.length>100?'staff-about':''},about))),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"staff-accounts\"},Object.entries(social).map(([socialName,link])=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\",{key:socialName,href:link},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\",{className:\"staff-account\",alt:`${name}'s ${socialName} link`,src:_socials_js__WEBPACK_IMPORTED_MODULE_2__[socialName]})))))));\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/Developers/Developer.jsx?");

/***/ }),

/***/ "./src/app/Pages/Staff/Developers/Developer.scss":
/*!*******************************************************!*\
  !*** ./src/app/Pages/Staff/Developers/Developer.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/Developers/Developer.scss?");

/***/ }),

/***/ "./src/app/Pages/Staff/Developers/socials.js":
/*!***************************************************!*\
  !*** ./src/app/Pages/Staff/Developers/socials.js ***!
  \***************************************************/
/*! exports provided: Discord, Spotify, Twitter, Website, YouTube, GitHub, GitLab, Reddit, Twitch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var assets_Discord_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! assets/Discord.svg */ \"./src/app/assets/Discord.svg\");\n/* harmony import */ var assets_Discord_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(assets_Discord_svg__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Discord\", function() { return assets_Discord_svg__WEBPACK_IMPORTED_MODULE_0___default.a; });\n/* harmony import */ var assets_Spotify_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/Spotify.svg */ \"./src/app/assets/Spotify.svg\");\n/* harmony import */ var assets_Spotify_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_Spotify_svg__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Spotify\", function() { return assets_Spotify_svg__WEBPACK_IMPORTED_MODULE_1___default.a; });\n/* harmony import */ var assets_Twitter_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/Twitter.svg */ \"./src/app/assets/Twitter.svg\");\n/* harmony import */ var assets_Twitter_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(assets_Twitter_svg__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Twitter\", function() { return assets_Twitter_svg__WEBPACK_IMPORTED_MODULE_2___default.a; });\n/* harmony import */ var assets_Website_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/Website.svg */ \"./src/app/assets/Website.svg\");\n/* harmony import */ var assets_Website_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(assets_Website_svg__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Website\", function() { return assets_Website_svg__WEBPACK_IMPORTED_MODULE_3___default.a; });\n/* harmony import */ var assets_YouTube_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/YouTube.svg */ \"./src/app/assets/YouTube.svg\");\n/* harmony import */ var assets_YouTube_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_YouTube_svg__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"YouTube\", function() { return assets_YouTube_svg__WEBPACK_IMPORTED_MODULE_4___default.a; });\n/* harmony import */ var assets_GitHub_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! assets/GitHub.svg */ \"./src/app/assets/GitHub.svg\");\n/* harmony import */ var assets_GitHub_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(assets_GitHub_svg__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"GitHub\", function() { return assets_GitHub_svg__WEBPACK_IMPORTED_MODULE_5___default.a; });\n/* harmony import */ var assets_GitLab_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! assets/GitLab.svg */ \"./src/app/assets/GitLab.svg\");\n/* harmony import */ var assets_GitLab_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(assets_GitLab_svg__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"GitLab\", function() { return assets_GitLab_svg__WEBPACK_IMPORTED_MODULE_6___default.a; });\n/* harmony import */ var assets_Reddit_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! assets/Reddit.svg */ \"./src/app/assets/Reddit.svg\");\n/* harmony import */ var assets_Reddit_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(assets_Reddit_svg__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Reddit\", function() { return assets_Reddit_svg__WEBPACK_IMPORTED_MODULE_7___default.a; });\n/* harmony import */ var assets_Twitch_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! assets/Twitch.svg */ \"./src/app/assets/Twitch.svg\");\n/* harmony import */ var assets_Twitch_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(assets_Twitch_svg__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"Twitch\", function() { return assets_Twitch_svg__WEBPACK_IMPORTED_MODULE_8___default.a; });\n\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/Developers/socials.js?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets sync \\.(png|jpg|gif)$":
/*!***********************************************************************!*\
  !*** ./src/app/Pages/Staff/assets sync nonrecursive \.(png|jpg|gif)$ ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./aetheryx.png\": \"./src/app/Pages/Staff/assets/aetheryx.png\",\n\t\"./auxim.gif\": \"./src/app/Pages/Staff/assets/auxim.gif\",\n\t\"./awkninja.gif\": \"./src/app/Pages/Staff/assets/awkninja.gif\",\n\t\"./benz.png\": \"./src/app/Pages/Staff/assets/benz.png\",\n\t\"./blair.gif\": \"./src/app/Pages/Staff/assets/blair.gif\",\n\t\"./cyberronin.gif\": \"./src/app/Pages/Staff/assets/cyberronin.gif\",\n\t\"./dauntless.gif\": \"./src/app/Pages/Staff/assets/dauntless.gif\",\n\t\"./devoxin.png\": \"./src/app/Pages/Staff/assets/devoxin.png\",\n\t\"./duckysoren.png\": \"./src/app/Pages/Staff/assets/duckysoren.png\",\n\t\"./evade-hype.gif\": \"./src/app/Pages/Staff/assets/evade-hype.gif\",\n\t\"./f-i-n-g-e-r-c-h-i-p-s.jpg\": \"./src/app/Pages/Staff/assets/f-i-n-g-e-r-c-h-i-p-s.jpg\",\n\t\"./fizzy-coco.png\": \"./src/app/Pages/Staff/assets/fizzy-coco.png\",\n\t\"./hale.jpg\": \"./src/app/Pages/Staff/assets/hale.jpg\",\n\t\"./honeepo.gif\": \"./src/app/Pages/Staff/assets/honeepo.gif\",\n\t\"./izzy.jpg\": \"./src/app/Pages/Staff/assets/izzy.jpg\",\n\t\"./kayla.jpg\": \"./src/app/Pages/Staff/assets/kayla.jpg\",\n\t\"./markie.png\": \"./src/app/Pages/Staff/assets/markie.png\",\n\t\"./melmsie.png\": \"./src/app/Pages/Staff/assets/melmsie.png\",\n\t\"./mook.png\": \"./src/app/Pages/Staff/assets/mook.png\",\n\t\"./nathan.gif\": \"./src/app/Pages/Staff/assets/nathan.gif\",\n\t\"./nelly.png\": \"./src/app/Pages/Staff/assets/nelly.png\",\n\t\"./nevulo.png\": \"./src/app/Pages/Staff/assets/nevulo.png\",\n\t\"./nunca.jpg\": \"./src/app/Pages/Staff/assets/nunca.jpg\",\n\t\"./nyx.png\": \"./src/app/Pages/Staff/assets/nyx.png\",\n\t\"./paradox.png\": \"./src/app/Pages/Staff/assets/paradox.png\",\n\t\"./rebelkay.png\": \"./src/app/Pages/Staff/assets/rebelkay.png\",\n\t\"./satan.png\": \"./src/app/Pages/Staff/assets/satan.png\",\n\t\"./shiiiitakë.png\": \"./src/app/Pages/Staff/assets/shiiiitakë.png\",\n\t\"./sinister.png\": \"./src/app/Pages/Staff/assets/sinister.png\",\n\t\"./tintin.jpg\": \"./src/app/Pages/Staff/assets/tintin.jpg\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/app/Pages/Staff/assets sync \\\\.(png|jpg|gif)$\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets_sync_nonrecursive_\\.(png%7Cjpg%7Cgif)$?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/aetheryx.png":
/*!*************************************************!*\
  !*** ./src/app/Pages/Staff/assets/aetheryx.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"2685c729bc43df90497e90a68128720a.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/aetheryx.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/auxim.gif":
/*!**********************************************!*\
  !*** ./src/app/Pages/Staff/assets/auxim.gif ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"f9686d600595721ac54b7a7168404291.gif\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/auxim.gif?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/awkninja.gif":
/*!*************************************************!*\
  !*** ./src/app/Pages/Staff/assets/awkninja.gif ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"7004017c3c43f15a470c1d9759df6c5a.gif\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/awkninja.gif?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/benz.png":
/*!*********************************************!*\
  !*** ./src/app/Pages/Staff/assets/benz.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"b9780742c74b0b41b1a033c23f0f77f4.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/benz.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/blair.gif":
/*!**********************************************!*\
  !*** ./src/app/Pages/Staff/assets/blair.gif ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"b37aa32ddea068b6ac1b2e368f67420e.gif\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/blair.gif?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/cyberronin.gif":
/*!***************************************************!*\
  !*** ./src/app/Pages/Staff/assets/cyberronin.gif ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"4390c6d7c518190c011063e87e94c804.gif\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/cyberronin.gif?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/dauntless.gif":
/*!**************************************************!*\
  !*** ./src/app/Pages/Staff/assets/dauntless.gif ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"3abd4c23480e08c908b52f2fa4eb01bd.gif\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/dauntless.gif?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/devoxin.png":
/*!************************************************!*\
  !*** ./src/app/Pages/Staff/assets/devoxin.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"098871d7646de09cd22d61ed1b792b08.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/devoxin.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/duckysoren.png":
/*!***************************************************!*\
  !*** ./src/app/Pages/Staff/assets/duckysoren.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"8af46f10990457648e9a98b1c3338791.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/duckysoren.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/evade-hype.gif":
/*!***************************************************!*\
  !*** ./src/app/Pages/Staff/assets/evade-hype.gif ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"2c4d371629ade0aaca58099f5ab4906f.gif\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/evade-hype.gif?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/f-i-n-g-e-r-c-h-i-p-s.jpg":
/*!**************************************************************!*\
  !*** ./src/app/Pages/Staff/assets/f-i-n-g-e-r-c-h-i-p-s.jpg ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"9a5ead126fb788f0d15f937cf8f01f26.jpg\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/f-i-n-g-e-r-c-h-i-p-s.jpg?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/fizzy-coco.png":
/*!***************************************************!*\
  !*** ./src/app/Pages/Staff/assets/fizzy-coco.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"ff07867ad010e3d4de12e81ae1fdd549.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/fizzy-coco.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/hale.jpg":
/*!*********************************************!*\
  !*** ./src/app/Pages/Staff/assets/hale.jpg ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"3cf48cbb795b89bc19ebaff5befc73dd.jpg\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/hale.jpg?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/honeepo.gif":
/*!************************************************!*\
  !*** ./src/app/Pages/Staff/assets/honeepo.gif ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"3e041f067b6b81cd06862b78876ea866.gif\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/honeepo.gif?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/izzy.jpg":
/*!*********************************************!*\
  !*** ./src/app/Pages/Staff/assets/izzy.jpg ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"73e7c290018e9b319498bc6518310bf2.jpg\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/izzy.jpg?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/kayla.jpg":
/*!**********************************************!*\
  !*** ./src/app/Pages/Staff/assets/kayla.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"c8c8388932e0ab0e39b67fea528dc513.jpg\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/kayla.jpg?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/markie.png":
/*!***********************************************!*\
  !*** ./src/app/Pages/Staff/assets/markie.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"3b53e372d4390e288cd9ef67714ef494.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/markie.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/melmsie.png":
/*!************************************************!*\
  !*** ./src/app/Pages/Staff/assets/melmsie.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"9f58e7f83c22fb7a8babefdcfd3d7097.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/melmsie.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/mook.png":
/*!*********************************************!*\
  !*** ./src/app/Pages/Staff/assets/mook.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"a7ce93ca1d4d20d238061df18290ca25.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/mook.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/nathan.gif":
/*!***********************************************!*\
  !*** ./src/app/Pages/Staff/assets/nathan.gif ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"864a5d79d2c1f6634554b071ef05e234.gif\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/nathan.gif?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/nelly.png":
/*!**********************************************!*\
  !*** ./src/app/Pages/Staff/assets/nelly.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"202bbf6f1adb3f77709ea357c0d034d0.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/nelly.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/nevulo.png":
/*!***********************************************!*\
  !*** ./src/app/Pages/Staff/assets/nevulo.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"9d8808f7f2f73f13ab836dc6b163cdd4.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/nevulo.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/nunca.jpg":
/*!**********************************************!*\
  !*** ./src/app/Pages/Staff/assets/nunca.jpg ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"474e76d7e0ad7b015a1a25e451ad120e.jpg\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/nunca.jpg?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/nyx.png":
/*!********************************************!*\
  !*** ./src/app/Pages/Staff/assets/nyx.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fd82c6d461ef22486ce672c1caa6a698.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/nyx.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/paradox.png":
/*!************************************************!*\
  !*** ./src/app/Pages/Staff/assets/paradox.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"4488e7e0105b9c01e04ac840d83cf76f.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/paradox.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/rebelkay.png":
/*!*************************************************!*\
  !*** ./src/app/Pages/Staff/assets/rebelkay.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d23f89b8e82c6a8068197c13ad322918.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/rebelkay.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/satan.png":
/*!**********************************************!*\
  !*** ./src/app/Pages/Staff/assets/satan.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"dbbe05ff88daff509536ac66f3850cfa.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/satan.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/shiiiitakë.png":
/*!***************************************************!*\
  !*** ./src/app/Pages/Staff/assets/shiiiitakë.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"1fb422c7961e6efadd15d229cb4bcd3b.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/shiiiitak%C3%AB.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/sinister.png":
/*!*************************************************!*\
  !*** ./src/app/Pages/Staff/assets/sinister.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"047ac076c8cf0a09e61542d78a2c4020.png\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/sinister.png?");

/***/ }),

/***/ "./src/app/Pages/Staff/assets/tintin.jpg":
/*!***********************************************!*\
  !*** ./src/app/Pages/Staff/assets/tintin.jpg ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"e0920fe19b49cc5353e99c9bf9a4a1a0.jpg\";\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/assets/tintin.jpg?");

/***/ }),

/***/ "./src/app/Pages/Staff/images.js":
/*!***************************************!*\
  !*** ./src/app/Pages/Staff/images.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst images={};const requireCtx=__webpack_require__(\"./src/app/Pages/Staff/assets sync \\\\.(png|jpg|gif)$\");requireCtx.keys().map(name=>images[name.slice(2,-4)]=requireCtx(name));/* harmony default export */ __webpack_exports__[\"default\"] = (images);\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/images.js?");

/***/ }),

/***/ "./src/app/Pages/Staff/index.jsx":
/*!***************************************!*\
  !*** ./src/app/Pages/Staff/index.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _users_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users.json */ \"./src/app/Pages/Staff/users.json\");\nvar _users_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./users.json */ \"./src/app/Pages/Staff/users.json\", 1);\n/* harmony import */ var _Developers_Developer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Developers/Developer */ \"./src/app/Pages/Staff/Developers/Developer.jsx\");\n/* harmony import */ var _images_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images.js */ \"./src/app/Pages/Staff/images.js\");\nfunction _extends(){_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};return _extends.apply(this,arguments);}const categories=Object.entries(_users_json__WEBPACK_IMPORTED_MODULE_1__);const getSocialIndex=({social})=>Object.keys(social).length===0?-1:1;/* harmony default export */ __webpack_exports__[\"default\"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(()=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"content\"},categories.map(([category,users])=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,{key:category},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\",{className:\"staff-title\"},category),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\",{className:\"staff-list\"},users.sort(()=>Math.random()-0.5).sort((a,b)=>getSocialIndex(a)-getSocialIndex(b)).map(user=>react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Developers_Developer__WEBPACK_IMPORTED_MODULE_2__[\"default\"],_extends({},user,{key:user.name,picture:_images_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"][user.name.toLowerCase().replace(/ /g,'-')]})))))))));\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/index.jsx?");

/***/ }),

/***/ "./src/app/Pages/Staff/users.json":
/*!****************************************!*\
  !*** ./src/app/Pages/Staff/users.json ***!
  \****************************************/
/*! exports provided: Developers, Community Managers, Server Moderators, Honorable Mentions, default */
/***/ (function(module) {

eval("module.exports = {\"Developers\":[{\"name\":\"Nevulo\",\"about\":\"G'day, I'm Blake. I'm a web and software developer based in Australia.\",\"social\":{\"GitHub\":\"https://github.com/nevvulo\",\"Spotify\":\"https://open.spotify.com/user/talce8kvy7w0flxk2sv3iyxi4\",\"Reddit\":\"https://www.reddit.com/user/Nevulo\",\"Website\":\"https://nevulo.xyz\",\"Twitch\":\"https://www.twitch.tv/nevvulo\"}},{\"name\":\"Melmsie\",\"about\":\"Owner of Dank Memer, full time streamer, and best friend of Fizzy Coco\",\"social\":{\"Discord\":\"https://discord.gg/ks9c2Cd\",\"GitHub\":\"https://github.com/melmsie\",\"Spotify\":\"https://open.spotify.com/user/melmsaustin\",\"Twitter\":\"https://twitter.com/realmelmsie\",\"Twitch\":\"https://www.twitch.tv/melmsie\",\"YouTube\":\"https://www.youtube.com/c/Melmsie\"}},{\"name\":\"Aetheryx\",\"about\":\"who?\",\"social\":{\"GitHub\":\"https://github.com/aetheryx\",\"Reddit\":\"https://www.reddit.com/user/Dynamexia\"}},{\"name\":\"Auxim\",\"about\":\"Meme Grade Pythonker. Devourer of the frikandelbroodje.\",\"social\":{\"Discord\":\"https://discordapp.com/invite/BP2SV3J\",\"GitHub\":\"https://github.com/GeoffreyWesthoff\",\"GitLab\":\"https://gitlab.com/GeoffreyWesthoff\",\"Reddit\":\"https://www.reddit.com/user/le_spacecookie\",\"Twitter\":\"https://twitter.com/altdentifier\",\"Website\":\"https://altdentifier.com/\",\"Twitch\":\"https://www.twitch.tv/EXG_Auxim\"}}],\"Community Managers\":[{\"name\":\"Dauntless\",\"about\":\"aspiring programmer // comp sci student\",\"social\":{\"Discord\":\"https://discord.gg/FjBbCxC\",\"GitHub\":\"https://github.com/Dauntless7\",\"Reddit\":\"https://www.reddit.com/user/lonesomefickle\",\"Twitter\":\"https://twitter.com/nicolai5423\"}},{\"name\":\"Sinister\",\"about\":\"I help meth-heads change their light bulbs\",\"social\":{\"Twitch\":\"https://www.twitch.tv/sinister__1337\",\"Discord\":\"https://discord.gg/wdCVp9P\"}},{\"name\":\"Mook\",\"about\":\"Is this my peak?\",\"social\":{\"Discord\":\"https://discord.gg/HdQYu6U\",\"Twitter\":\"https://twitter.com/B_A_Services\"}}],\"Server Moderators\":[{\"name\":\"Nyx\",\"about\":\"Night Shift Security Boi\",\"social\":{\"Reddit\":\"https://www.reddit.com/user/Nyxgawr\",\"Spotify\":\"https://open.spotify.com/user/slashnyx/playlist/5aQkSFEXjGwzBJuFutQyGV\",\"Twitter\":\"https://twitter.com/Nyxgawr\"}},{\"name\":\"Fizzy Coco\",\"about\":\"Imagine having a bio in 2019, btw I'm mel's favorite\",\"social\":{\"Reddit\":\"https://www.reddit.com/u/rlcrawkm/\",\"Website\":\"https://m.youtube.com/watch?v=dQw4w9WgXcQ\"}},{\"name\":\"Honeepo\",\"about\":\"Just the name no I don't want a bio just put my name and connections\",\"social\":{\"Twitter\":\"https://twitter.com/MaejoonB\",\"YouTube\":\"https://www.youtube.com/channel/UC4YUCpsiIV8b8Ii8Em0iYLA\"}},{\"name\":\"Blair\",\"about\":\"preposterous boast but alas. i also like ass\",\"social\":{\"Discord\":\"https://discord.gg/fM5YVkk\",\"Reddit\":\"https://www.reddit.com/user/gotohellwhydontya\",\"Twitch\":\"https://twitch.tv/expectationsblair\"}},{\"name\":\"RebelKay\",\"about\":\"My bio is stupid.\",\"social\":{\"Discord\":\"https://discord.gg/qt4WBrU\"}},{\"name\":\"DuckySoren\",\"about\":\"The only thing I have going for me is being a duck.\",\"social\":{\"Discord\":\"https://discord.gg/NXAc5xs\"}},{\"name\":\"Benz\",\"about\":\"Always a dull moment.\",\"social\":{}},{\"name\":\"Kayla\",\"about\":\"Insert pretentious stuff about myself here\",\"social\":{\"Spotify\":\"https://open.spotify.com/user/kaylaramirez135\",\"Twitter\":\"https://twitter.com/Bfk4everr\",\"YouTube\":\"https://m.youtube.com/channel/UCCThI2y7_OGzI1oF1gsur-Q\"}},{\"name\":\"AwkNinja\",\"about\":\"Aerospace Engineer who also likes gaming and technology.\",\"social\":{\"Twitter\":\"https://twitter.com/mrawkninja\",\"Twitch\":\"https://www.twitch.tv/awkninja64\",\"YouTube\":\"https://www.youtube.com/channel/UCSXTVQOs5_RvfqxExsF0IpQ\"}},{\"name\":\"Nunca\",\"about\":\"Programming is a pastime. Love to help when I can.\",\"social\":{\"GitHub\":\"https://github.com/Ionomycin\",\"Discord\":\"https://discord.gg/s87mw8\"}},{\"name\":\"Izzy\",\"about\":\"Just Izzy\",\"social\":{}},{\"name\":\"Nelly\",\"about\":\"I'm obsessed with my cat. I also say \\\"bruh\\\" a lot.\",\"social\":{\"Spotify\":\"https://open.spotify.com/user/f8rd443tvo37m87xntw4oen45\",\"Twitch\":\"https://www.twitch.tv/stereotypicaly\"}},{\"name\":\"Shiiiitakë\",\"about\":\"Bloop.\",\"social\":{}},{\"name\":\"Nathan\",\"about\":\"Sometimes, a few words can sum up the wisdom of a thousand.\",\"social\":{}},{\"name\":\"Evade Hype\",\"about\":\"Not a big fan of bios, also rebel's best friend.\",\"social\":{\"Twitch\":\"https://www.twitch.tv/jerryrice\"}},{\"name\":\"Hale\",\"about\":\"Breh, i'm a cat girl furry weeb\",\"social\":{\"Twitter\":\"https://twitter.com/CastielObsessed\"}},{\"name\":\"f i n g e r c h i p s\",\"about\":\"bloop>\",\"social\":{}},{\"name\":\"Tintin\",\"about\":\"I would say something about myself, but you don't need to know that much\",\"social\":{}},{\"name\":\"Markie\",\"about\":\"I'm attractive to kpop, I also like bunnies owo\",\"social\":{\"Twitter\":\"https://twitter.com/MattariPH\"}},{\"name\":\"Satan\",\"about\":\"I have a special place in hell for anyone reading this.\",\"social\":{\"Discord\":\"https://discord.gg/GmRBbGx\"}}],\"Honorable Mentions\":[{\"name\":\"Paradox\",\"about\":\"Just a small time baguette, living in a croissant world\",\"social\":{\"GitHub\":\"https://github.com/ParadoxOrigins\",\"Twitter\":\"https://twitter.com/Paradox_Origins\"}},{\"name\":\"CyberRonin\",\"about\":\"Maniac who loves programming. I'm a full stack developer trying to get into UI/UX!\",\"social\":{\"GitHub\":\"https://github.com/TheCyberRonin\",\"GitLab\":\"https://gitlab.com/cyberronin\",\"Twitter\":\"https://twitter.com/thecyberronin\",\"Twitch\":\"https://www.twitch.tv/thecyberronin\",\"YouTube\":\"https://www.youtube.com/channel/UC3yrSVbg5CQJPKFi9aGrA4g\"}},{\"name\":\"Devoxin\",\"about\":\"Is breaking things considered a profession?\",\"social\":{\"GitHub\":\"https://github.com/Devoxin\",\"GitLab\":\"https://gitlab.com/Devoxin\",\"Twitter\":\"https://twitter.com/Dvoxn\",\"Website\":\"https://serux.pro\",\"Twitch\":\"https://www.twitch.tv/devoxin\"}}]};\n\n//# sourceURL=webpack:///./src/app/Pages/Staff/users.json?");

/***/ }),

/***/ "./src/app/assets/Discord.svg":
/*!************************************!*\
  !*** ./src/app/assets/Discord.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"f8389ca1a741a115313bede9ac02e2c0.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/Discord.svg?");

/***/ }),

/***/ "./src/app/assets/GitHub.svg":
/*!***********************************!*\
  !*** ./src/app/assets/GitHub.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d219fc5e66cd2e90747714476d460f31.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/GitHub.svg?");

/***/ }),

/***/ "./src/app/assets/GitLab.svg":
/*!***********************************!*\
  !*** ./src/app/assets/GitLab.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d567e9a616e39c0944842fbb4da9f516.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/GitLab.svg?");

/***/ }),

/***/ "./src/app/assets/Reddit.svg":
/*!***********************************!*\
  !*** ./src/app/assets/Reddit.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"ac7b60ebdb785a784e379362b3a0e1b2.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/Reddit.svg?");

/***/ }),

/***/ "./src/app/assets/Spotify.svg":
/*!************************************!*\
  !*** ./src/app/assets/Spotify.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"ded344c86c35138f7e53c6225ed98816.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/Spotify.svg?");

/***/ }),

/***/ "./src/app/assets/Twitch.svg":
/*!***********************************!*\
  !*** ./src/app/assets/Twitch.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"68f7b9f66e8ba664e2adbe0b81c0c18f.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/Twitch.svg?");

/***/ }),

/***/ "./src/app/assets/Twitter.svg":
/*!************************************!*\
  !*** ./src/app/assets/Twitter.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"9be66c09991347ecc68ec5063d920ab7.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/Twitter.svg?");

/***/ }),

/***/ "./src/app/assets/Website.svg":
/*!************************************!*\
  !*** ./src/app/assets/Website.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d8851beea04ea75ca3febac546828318.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/Website.svg?");

/***/ }),

/***/ "./src/app/assets/YouTube.svg":
/*!************************************!*\
  !*** ./src/app/assets/YouTube.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"f7f02af468d2e829ae42eade5689accd.svg\";\n\n//# sourceURL=webpack:///./src/app/assets/YouTube.svg?");

/***/ })

}]);