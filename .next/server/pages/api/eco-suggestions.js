"use strict";
(() => {
var exports = {};
exports.id = 411;
exports.ids = [411];
exports.modules = {

/***/ 8767:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
// pages/api/eco-suggestions.ts
const ecoSuggestions = [{
  title: "Local Food Bank",
  desc: "Donate or volunteer to fight hunger.",
  lat: 40.7608,
  lng: -111.8910,
  img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=500&q=80"
} // Add more real opportunities or fetch dynamically!
];
function handler(req, res) {
  const {
    lat,
    lng
  } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      error: "Missing lat/lng"
    });
  } // Basic "nearby" filter


  const suggestions = ecoSuggestions.sort((a, b) => {
    const da = Math.abs(a.lat - Number(lat)) + Math.abs(a.lng - Number(lng));
    const db = Math.abs(b.lat - Number(lat)) + Math.abs(b.lng - Number(lng));
    return da - db;
  });
  res.status(200).json({
    suggestions
  });
} // Remove unrelated React component code from this API route file.
// Move Mascot and SomeComponent to their own files in the components/ui directory.

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8767));
module.exports = __webpack_exports__;

})();