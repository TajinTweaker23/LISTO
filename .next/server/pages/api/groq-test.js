"use strict";
(() => {
var exports = {};
exports.id = 913;
exports.ids = [913];
exports.modules = {

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6197:
/***/ ((module) => {

module.exports = import("framer-motion");;

/***/ }),

/***/ 6219:
/***/ ((module) => {

module.exports = import("groq-sdk");;

/***/ }),

/***/ 8612:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var groq_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6219);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7403);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([groq_sdk__WEBPACK_IMPORTED_MODULE_0__, framer_motion__WEBPACK_IMPORTED_MODULE_1__]);
([groq_sdk__WEBPACK_IMPORTED_MODULE_0__, framer_motion__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



async function handler(req, res) {
  const groq = new groq_sdk__WEBPACK_IMPORTED_MODULE_0__.Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{
        role: "user",
        content: "Hello from Vercel!"
      }]
    });
    res.status(200).json({
      message: response.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
} // Add this near the end of your main layout or each page

/*#__PURE__*/
react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.button, {
  className: "fixed bottom-8 right-8 z-50 bg-indigo-500 hover:bg-pink-400 text-white rounded-full shadow-xl p-5 text-3xl border-4 border-white dark:border-indigo-900",
  whileHover: {
    scale: 1.15,
    rotate: 8
  },
  whileTap: {
    scale: 0.95
  },
  animate: {
    y: [0, -10, 0]
  },
  transition: {
    repeat: Infinity,
    duration: 2
  },
  "aria-label": "Quick Action",
  children: "+"
});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [403], () => (__webpack_exec__(8612)));
module.exports = __webpack_exports__;

})();