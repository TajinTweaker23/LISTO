"use strict";
(() => {
var exports = {};
exports.id = 198;
exports.ids = [198];
exports.modules = {

/***/ 1518:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
// pages/api/search.ts
async function handler(req, res) {
    // 1) Extract the “q” query parameter
    const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
    if (!q) {
        return res.status(400).json({
            error: "Missing query parameter 'q'"
        });
    }
    // 2) Read either GOOGLE_CX or SEARCH_ENGINE_ID from environment
    //    (we set NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID in .env.local)
    const cx = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!cx || !apiKey) {
        console.error("❌  Missing CX or API key. SEARCH_ENGINE_ID:", process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID, "GOOGLE_API_KEY:", process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
        return res.status(500).json({
            error: "Server misconfigured: missing NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID / NEXT_PUBLIC_GOOGLE_API_KEY"
        });
    }
    // 3) Build the Google Custom Search URL
    const url = new URL("https://www.googleapis.com/customsearch/v1");
    url.searchParams.set("key", apiKey);
    url.searchParams.set("cx", cx);
    url.searchParams.set("q", q);
    // For now, we’re only getting images
    url.searchParams.set("searchType", "image");
    url.searchParams.set("num", "12");
    try {
        const response = await fetch(url.toString());
        const text = await response.text();
        if (!response.ok) {
            let googleError;
            try {
                googleError = JSON.parse(text);
            } catch  {
                googleError = text;
            }
            console.error("\uD83D\uDEA8 Google CSE error:", response.status, googleError);
            return res.status(502).json({
                error: "Bad response from Google CSE",
                status: response.status,
                googleError
            });
        }
        // Parse JSON and return
        const data = JSON.parse(text);
        return res.status(200).json(data);
    } catch (err) {
        console.error("\uD83D\uDCA5 Error fetching from Google CSE:", err);
        return res.status(500).json({
            error: err.message || "Unknown error"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1518));
module.exports = __webpack_exports__;

})();