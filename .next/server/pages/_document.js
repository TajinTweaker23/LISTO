"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./pages/_document.tsx":
/*!*****************************!*\
  !*** ./pages/_document.tsx ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Document)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framer-motion */ \"framer-motion\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__]);\nframer_motion__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nfunction Document() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {\n        lang: \"en\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"preconnect\",\n                        href: \"https://fonts.googleapis.com\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\travi\\\\LISTO\\\\pages\\\\_document.tsx\",\n                        lineNumber: 9,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"preconnect\",\n                        href: \"https://fonts.gstatic.com\",\n                        crossOrigin: \"anonymous\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\travi\\\\LISTO\\\\pages\\\\_document.tsx\",\n                        lineNumber: 10,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        href: \"https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@500;700&display=swap\",\n                        rel: \"stylesheet\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\travi\\\\LISTO\\\\pages\\\\_document.tsx\",\n                        lineNumber: 11,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        type: \"image/png\",\n                        href: \"/favicon.png\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\travi\\\\LISTO\\\\pages\\\\_document.tsx\",\n                        lineNumber: 12,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\travi\\\\LISTO\\\\pages\\\\_document.tsx\",\n                lineNumber: 7,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\travi\\\\LISTO\\\\pages\\\\_document.tsx\",\n                        lineNumber: 15,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\travi\\\\LISTO\\\\pages\\\\_document.tsx\",\n                        lineNumber: 16,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.button, {\n                        className: \"fixed bottom-8 right-8 z-50 bg-indigo-500 hover:bg-pink-400 text-white rounded-full shadow-xl p-5 text-3xl border-4 border-white dark:border-indigo-900\",\n                        whileHover: {\n                            scale: 1.15,\n                            rotate: 8\n                        },\n                        whileTap: {\n                            scale: 0.95\n                        },\n                        animate: {\n                            y: [\n                                0,\n                                -10,\n                                0\n                            ]\n                        },\n                        transition: {\n                            repeat: Infinity,\n                            duration: 2\n                        },\n                        \"aria-label\": \"Quick Action\",\n                        children: \"+\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\travi\\\\LISTO\\\\pages\\\\_document.tsx\",\n                        lineNumber: 17,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\travi\\\\LISTO\\\\pages\\\\_document.tsx\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\travi\\\\LISTO\\\\pages\\\\_document.tsx\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fZG9jdW1lbnQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBNkQ7QUFDdEI7QUFFeEIsU0FBU0s7SUFDdEIscUJBQ0UsOERBQUNMLCtDQUFJQTtRQUFDTSxNQUFLOzswQkFDVCw4REFBQ0wsK0NBQUlBOztrQ0FFSCw4REFBQ007d0JBQUtDLEtBQUk7d0JBQWFDLE1BQUs7Ozs7OztrQ0FDNUIsOERBQUNGO3dCQUFLQyxLQUFJO3dCQUFhQyxNQUFLO3dCQUE0QkMsYUFBWTs7Ozs7O2tDQUNwRSw4REFBQ0g7d0JBQUtFLE1BQUs7d0JBQXVHRCxLQUFJOzs7Ozs7a0NBQ3RILDhEQUFDRDt3QkFBS0MsS0FBSTt3QkFBT0csTUFBSzt3QkFBWUYsTUFBSzs7Ozs7Ozs7Ozs7OzBCQUV6Qyw4REFBQ0c7O2tDQUNDLDhEQUFDViwrQ0FBSUE7Ozs7O2tDQUNMLDhEQUFDQyxxREFBVUE7Ozs7O2tDQUNYLDhEQUFDQyxpREFBTUEsQ0FBQ1MsTUFBTTt3QkFDWkMsV0FBVTt3QkFDVkMsWUFBWTs0QkFBRUMsT0FBTzs0QkFBTUMsUUFBUTt3QkFBRTt3QkFDckNDLFVBQVU7NEJBQUVGLE9BQU87d0JBQUs7d0JBQ3hCRyxTQUFTOzRCQUFFQyxHQUFHO2dDQUFDO2dDQUFHLENBQUM7Z0NBQUk7NkJBQUU7d0JBQUM7d0JBQzFCQyxZQUFZOzRCQUFFQyxRQUFRQzs0QkFBVUMsVUFBVTt3QkFBRTt3QkFDNUNDLGNBQVc7a0NBQ1o7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1UIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGlzdG8vLi9wYWdlcy9fZG9jdW1lbnQudHN4P2QzN2QiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHRtbCwgSGVhZCwgTWFpbiwgTmV4dFNjcmlwdCB9IGZyb20gJ25leHQvZG9jdW1lbnQnO1xyXG5pbXBvcnQgeyBtb3Rpb24gfSBmcm9tICdmcmFtZXItbW90aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERvY3VtZW50KCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8SHRtbCBsYW5nPVwiZW5cIj5cclxuICAgICAgPEhlYWQ+XHJcbiAgICAgICAgey8qIEdvb2dsZSBGb250czogSW50ZXIgYW5kIFBvcHBpbnMgKi99XHJcbiAgICAgICAgPGxpbmsgcmVsPVwicHJlY29ubmVjdFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tXCIvPlxyXG4gICAgICAgIDxsaW5rIHJlbD1cInByZWNvbm5lY3RcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbVwiIGNyb3NzT3JpZ2luPVwiYW5vbnltb3VzXCIvPlxyXG4gICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyOndnaHRANDAwOzcwMCZmYW1pbHk9UG9wcGluczp3Z2h0QDUwMDs3MDAmZGlzcGxheT1zd2FwXCIgcmVsPVwic3R5bGVzaGVldFwiLz5cclxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3BuZ1wiIGhyZWY9XCIvZmF2aWNvbi5wbmdcIiAvPlxyXG4gICAgICA8L0hlYWQ+XHJcbiAgICAgIDxib2R5PlxyXG4gICAgICAgIDxNYWluIC8+XHJcbiAgICAgICAgPE5leHRTY3JpcHQgLz5cclxuICAgICAgICA8bW90aW9uLmJ1dHRvblxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTggcmlnaHQtOCB6LTUwIGJnLWluZGlnby01MDAgaG92ZXI6YmctcGluay00MDAgdGV4dC13aGl0ZSByb3VuZGVkLWZ1bGwgc2hhZG93LXhsIHAtNSB0ZXh0LTN4bCBib3JkZXItNCBib3JkZXItd2hpdGUgZGFyazpib3JkZXItaW5kaWdvLTkwMFwiXHJcbiAgICAgICAgICB3aGlsZUhvdmVyPXt7IHNjYWxlOiAxLjE1LCByb3RhdGU6IDggfX1cclxuICAgICAgICAgIHdoaWxlVGFwPXt7IHNjYWxlOiAwLjk1IH19XHJcbiAgICAgICAgICBhbmltYXRlPXt7IHk6IFswLCAtMTAsIDBdIH19XHJcbiAgICAgICAgICB0cmFuc2l0aW9uPXt7IHJlcGVhdDogSW5maW5pdHksIGR1cmF0aW9uOiAyIH19XHJcbiAgICAgICAgICBhcmlhLWxhYmVsPVwiUXVpY2sgQWN0aW9uXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICArXHJcbiAgICAgICAgPC9tb3Rpb24uYnV0dG9uPlxyXG4gICAgICA8L2JvZHk+XHJcbiAgICA8L0h0bWw+XHJcbiAgKTtcclxufSJdLCJuYW1lcyI6WyJIdG1sIiwiSGVhZCIsIk1haW4iLCJOZXh0U2NyaXB0IiwibW90aW9uIiwiRG9jdW1lbnQiLCJsYW5nIiwibGluayIsInJlbCIsImhyZWYiLCJjcm9zc09yaWdpbiIsInR5cGUiLCJib2R5IiwiYnV0dG9uIiwiY2xhc3NOYW1lIiwid2hpbGVIb3ZlciIsInNjYWxlIiwicm90YXRlIiwid2hpbGVUYXAiLCJhbmltYXRlIiwieSIsInRyYW5zaXRpb24iLCJyZXBlYXQiLCJJbmZpbml0eSIsImR1cmF0aW9uIiwiYXJpYS1sYWJlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_document.tsx\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "framer-motion":
/*!********************************!*\
  !*** external "framer-motion" ***!
  \********************************/
/***/ ((module) => {

module.exports = import("framer-motion");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("./pages/_document.tsx")));
module.exports = __webpack_exports__;

})();