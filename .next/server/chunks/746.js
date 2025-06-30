exports.id = 746;
exports.ids = [746];
exports.modules = {

/***/ 6302:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ AvatarPicker),
/* harmony export */   k: () => (/* binding */ getAvatarSVG)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__]);
framer_motion__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const skinTones = ["#f9dcc4", "#e0ac69", "#8d5524", "#c68642", "#b0b0b0"];
const hairColors = ["#222", "#ffe066", "#d2691e", "#b0b0b0", "#8d5524"];
const eyeColors = ["#222", "#1976d2", "#43a047", "#d84315"];
const vibes = [{
  label: "Happy",
  value: "happy",
  emoji: "😃"
}, {
  label: "Cool",
  value: "cool",
  emoji: "😎"
}, {
  label: "Sassy",
  value: "sassy",
  emoji: "😏"
}, {
  label: "Surprised",
  value: "surprised",
  emoji: "😮"
}, {
  label: "Edgy",
  value: "edgy",
  emoji: "😈"
}, {
  label: "Bad Boy",
  value: "badboy",
  emoji: "🦹"
} // Disney bad boy
];
const accessories = [{
  label: "None",
  value: ""
}, {
  label: "Glasses",
  value: "glasses",
  emoji: "🕶️"
}, {
  label: "Headphones",
  value: "headphones",
  emoji: "🎧"
}, {
  label: "Hat",
  value: "hat",
  emoji: "🧢"
}, {
  label: "Mustache",
  value: "mustache",
  emoji: "🦸"
}];
function getAvatarSVG(avatar) {
  const vibe = avatar?.vibe || "happy";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("svg", {
    width: "110",
    height: "110",
    viewBox: "0 0 110 110",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("defs", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("radialGradient", {
        id: "faceGrad",
        cx: "50%",
        cy: "38%",
        r: "65%",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "0%",
          stopColor: "#fff",
          stopOpacity: "0.98"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "40%",
          stopColor: avatar?.skin || "#f9dcc4"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "100%",
          stopColor: "#bfa77a"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("radialGradient", {
        id: "faceShadow",
        cx: "50%",
        cy: "80%",
        r: "60%",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "0%",
          stopColor: "#000",
          stopOpacity: "0.18"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "100%",
          stopColor: "transparent"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("linearGradient", {
        id: "hairGrad",
        x1: "0%",
        y1: "0%",
        x2: "100%",
        y2: "100%",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "0%",
          stopColor: avatar?.hair || "#222"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "60%",
          stopColor: "#fff",
          stopOpacity: "0.22"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "100%",
          stopColor: "#222",
          stopOpacity: "0.9"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("radialGradient", {
        id: "shine",
        cx: "60%",
        cy: "30%",
        r: "60%",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "0%",
          stopColor: "#fff",
          stopOpacity: "0.35"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "100%",
          stopColor: "transparent"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("radialGradient", {
        id: "cheekGrad",
        cx: "50%",
        cy: "50%",
        r: "50%",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "0%",
          stopColor: "#f8bbd0",
          stopOpacity: "0.9"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "100%",
          stopColor: "#f8bbd0",
          stopOpacity: "0"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("radialGradient", {
        id: "eyeGloss",
        cx: "60%",
        cy: "40%",
        r: "60%",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "0%",
          stopColor: "#fff",
          stopOpacity: "0.8"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "100%",
          stopColor: "transparent"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("linearGradient", {
        id: "lipGloss",
        x1: "0%",
        y1: "0%",
        x2: "100%",
        y2: "100%",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "0%",
          stopColor: "#fff",
          stopOpacity: "0.7"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "100%",
          stopColor: "transparent"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("radialGradient", {
        id: "shadowGrad",
        cx: "50%",
        cy: "50%",
        r: "50%",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "0%",
          stopColor: "#000",
          stopOpacity: "0.22"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "100%",
          stopColor: "#000",
          stopOpacity: "0"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("radialGradient", {
        id: "freckleGrad",
        cx: "50%",
        cy: "50%",
        r: "50%",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "0%",
          stopColor: "#bfa77a",
          stopOpacity: "0.12"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("stop", {
          offset: "100%",
          stopColor: "transparent"
        })]
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "55",
      cy: "98",
      rx: "32",
      ry: "10",
      fill: "url(#shadowGrad)"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "55",
      cy: "56",
      rx: "38",
      ry: "40",
      fill: "url(#faceGrad)",
      filter: "url(#shadow)"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "55",
      cy: "70",
      rx: "26",
      ry: "10",
      fill: "#000",
      opacity: "0.07"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "55",
      cy: "38",
      rx: "18",
      ry: "6",
      fill: "#fff",
      opacity: "0.12"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "45",
      cy: "68",
      rx: "2",
      ry: "1",
      fill: "url(#freckleGrad)"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "65",
      cy: "68",
      rx: "1.5",
      ry: "0.8",
      fill: "url(#freckleGrad)"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("g", {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "20",
        cy: "60",
        rx: "5",
        ry: "10",
        fill: avatar?.skin || "#f9dcc4",
        opacity: "0.95"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "90",
        cy: "60",
        rx: "5",
        ry: "10",
        fill: avatar?.skin || "#f9dcc4",
        opacity: "0.95"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "20",
        cy: "62",
        rx: "2",
        ry: "4",
        fill: "#bfa77a",
        opacity: "0.25"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "90",
        cy: "62",
        rx: "2",
        ry: "4",
        fill: "#bfa77a",
        opacity: "0.25"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "55",
      cy: "72",
      rx: "28",
      ry: "12",
      fill: "url(#faceShadow)"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "45",
      cy: "40",
      rx: "15",
      ry: "8",
      fill: "url(#shine)"
    }), avatar?.hairStyle !== "bald" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "55",
        cy: "32",
        rx: "36",
        ry: "20",
        fill: "url(#hairGrad)",
        style: {
          filter: "drop-shadow(0 6px 16px #2227)"
        }
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "45",
        cy: "28",
        rx: "15",
        ry: "7",
        fill: "url(#shine)",
        opacity: "0.8"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "65",
        cy: "38",
        rx: "10",
        ry: "4",
        fill: "#000",
        opacity: "0.08"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "35",
      cy: "75",
      rx: "7",
      ry: "4",
      fill: "url(#cheekGrad)"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "75",
      cy: "75",
      rx: "7",
      ry: "4",
      fill: "url(#cheekGrad)"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("g", {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "55",
        cy: "62",
        rx: "3.5",
        ry: "6",
        fill: "#e0bfa0",
        opacity: "0.28"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "53",
        cy: "66",
        rx: "0.7",
        ry: "1.2",
        fill: "#bfa77a",
        opacity: "0.4"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "57",
        cy: "66",
        rx: "0.7",
        ry: "1.2",
        fill: "#bfa77a",
        opacity: "0.4"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
        x: "54",
        y: "58",
        width: "2",
        height: "6",
        rx: "1",
        fill: "#fff",
        opacity: "0.13"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.AnimatePresence, {
      children: (() => {
        switch (vibe) {
          case "happy":
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "60",
                rx: "6",
                ry: "8",
                fill: "#fff"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "60",
                rx: "6",
                ry: "8",
                fill: "#fff"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "62",
                rx: "3",
                ry: "4",
                fill: avatar?.eyeColor || "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "62",
                rx: "3",
                ry: "4",
                fill: avatar?.eyeColor || "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "63",
                rx: "1.2",
                ry: "1.5",
                fill: "#111",
                opacity: "0.7"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "63",
                rx: "1.2",
                ry: "1.5",
                fill: "#111",
                opacity: "0.7"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "41",
                cy: "59",
                rx: "1.2",
                ry: "1.5",
                fill: "url(#eyeGloss)"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "65",
                cy: "59",
                rx: "1.2",
                ry: "1.5",
                fill: "url(#eyeGloss)"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "66",
                rx: "4",
                ry: "1",
                fill: "#bfa77a",
                opacity: "0.13"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "66",
                rx: "4",
                ry: "1",
                fill: "#bfa77a",
                opacity: "0.13"
              })]
            });

          case "cool":
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                x: "37",
                y: "60",
                width: "12",
                height: "5",
                rx: "2.5",
                fill: "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                x: "61",
                y: "60",
                width: "12",
                height: "5",
                rx: "2.5",
                fill: "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "62",
                rx: "4",
                ry: "2",
                fill: "url(#eyeGloss)",
                opacity: "0.5"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "62",
                rx: "4",
                ry: "2",
                fill: "url(#eyeGloss)",
                opacity: "0.5"
              })]
            });

          case "sassy":
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "60",
                rx: "6",
                ry: "4",
                fill: "#fff"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "60",
                rx: "3",
                ry: "2",
                fill: avatar?.eyeColor || "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "60",
                rx: "6",
                ry: "8",
                fill: "#fff"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "60",
                rx: "3",
                ry: "4",
                fill: avatar?.eyeColor || "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "41",
                cy: "59",
                rx: "1.2",
                ry: "1.5",
                fill: "url(#eyeGloss)"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "65",
                cy: "59",
                rx: "1.2",
                ry: "1.5",
                fill: "url(#eyeGloss)"
              })]
            });

          case "surprised":
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "60",
                rx: "4",
                ry: "7",
                fill: "#fff"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "60",
                rx: "2",
                ry: "3.5",
                fill: avatar?.eyeColor || "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "60",
                rx: "4",
                ry: "7",
                fill: "#fff"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "60",
                rx: "2",
                ry: "3.5",
                fill: avatar?.eyeColor || "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "41",
                cy: "59",
                rx: "1.2",
                ry: "1.5",
                fill: "url(#eyeGloss)"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "65",
                cy: "59",
                rx: "1.2",
                ry: "1.5",
                fill: "url(#eyeGloss)"
              })]
            });

          case "edgy":
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "60",
                rx: "6",
                ry: "8",
                fill: "#fff"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "60",
                rx: "2.5",
                ry: "3",
                fill: "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "60",
                rx: "6",
                ry: "8",
                fill: "#fff"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "60",
                rx: "2.5",
                ry: "3",
                fill: "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                x: "36",
                y: "54",
                width: "12",
                height: "2",
                rx: "1",
                fill: "#222",
                transform: "rotate(-15 42 55)"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                x: "60",
                y: "54",
                width: "12",
                height: "2",
                rx: "1",
                fill: "#222",
                transform: "rotate(15 66 55)"
              })]
            });

          case "badboy":
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "60",
                rx: "6",
                ry: "8",
                fill: "#fff"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "60",
                rx: "6",
                ry: "8",
                fill: "#fff"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "62",
                rx: "3",
                ry: "4",
                fill: avatar?.eyeColor || "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "62",
                rx: "3",
                ry: "4",
                fill: avatar?.eyeColor || "#222"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "43",
                cy: "63",
                rx: "1.2",
                ry: "1.5",
                fill: "#111",
                opacity: "0.7"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "67",
                cy: "63",
                rx: "1.2",
                ry: "1.5",
                fill: "#111",
                opacity: "0.7"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                x: "37",
                y: "54",
                width: "12",
                height: "3",
                rx: "1.5",
                fill: "#222",
                transform: "rotate(-25 43 55)"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                x: "61",
                y: "54",
                width: "12",
                height: "3",
                rx: "1.5",
                fill: "#222",
                transform: "rotate(25 67 55)"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                x: "40",
                y: "70",
                width: "1.5",
                height: "7",
                rx: "0.7",
                fill: "#b91c1c",
                transform: "rotate(-20 40 70)"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("circle", {
                cx: "80",
                cy: "90",
                r: "2.2",
                fill: "#fbbf24",
                stroke: "#222",
                strokeWidth: "0.7"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("path", {
                d: "M45 72 Q55 80 65 72",
                stroke: "#222",
                strokeWidth: "2.5",
                fill: "none"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("path", {
                d: "M50 75 Q55 78 60 75",
                stroke: "url(#lipGloss)",
                strokeWidth: "1.5",
                fill: "none"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("g", {
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                  x: "30",
                  y: "85",
                  width: "18",
                  height: "10",
                  rx: "2",
                  fill: "#ffe066",
                  stroke: "#bfa77a",
                  strokeWidth: "1.5"
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                  x: "32",
                  y: "87",
                  width: "14",
                  height: "6",
                  rx: "1",
                  fill: "#fff",
                  opacity: "0.7"
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                  x: "33",
                  y: "83",
                  width: "3",
                  height: "8",
                  rx: "1",
                  fill: "#222"
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                  x: "43",
                  y: "83",
                  width: "3",
                  height: "8",
                  rx: "1",
                  fill: "#222"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("g", {
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                  cx: "80",
                  cy: "80",
                  rx: "12",
                  ry: "7",
                  fill: "#fff",
                  stroke: "#222",
                  strokeWidth: "1"
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("text", {
                  x: "74",
                  y: "83",
                  fontSize: "10",
                  fontWeight: "bold",
                  fill: "#d84315",
                  fontFamily: "monospace",
                  children: "#@%!"
                })]
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "39",
                cy: "97",
                rx: "10",
                ry: "2",
                fill: "#000",
                opacity: "0.18"
              })]
            });

          default:
            return null;
        }
      })()
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("g", {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "55",
        cy: "76",
        rx: "8",
        ry: "3",
        fill: "#d84315",
        opacity: "0.7"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "55",
        cy: "77",
        rx: "7",
        ry: "2",
        fill: "#fff",
        opacity: "0.13"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
        cx: "55",
        cy: "75",
        rx: "8",
        ry: "2",
        fill: "#b91c1c",
        opacity: "0.18"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "32",
      cy: "60",
      rx: "4",
      ry: "2",
      fill: "#f8bbd0",
      opacity: "0.7"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "58",
      cy: "60",
      rx: "4",
      ry: "2",
      fill: "#f8bbd0",
      opacity: "0.7"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "32",
      cy: "59",
      rx: "1.2",
      ry: "0.7",
      fill: "#fff",
      opacity: "0.7"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
      cx: "58",
      cy: "59",
      rx: "1.2",
      ry: "0.7",
      fill: "#fff",
      opacity: "0.7"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.AnimatePresence, {
      children: (() => {
        switch (avatar?.accessory) {
          case "glasses":
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.g, {
              initial: {
                scale: 0
              },
              animate: {
                scale: 1.1
              },
              transition: {
                type: "spring"
              },
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "34",
                cy: "50",
                rx: "7",
                ry: "6",
                fill: "none",
                stroke: "#555",
                strokeWidth: "2.5"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("ellipse", {
                cx: "56",
                cy: "50",
                rx: "7",
                ry: "6",
                fill: "none",
                stroke: "#555",
                strokeWidth: "2.5"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                x: "41",
                y: "50",
                width: "8",
                height: "2",
                fill: "#555"
              })]
            });

          case "headphones":
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.g, {
              initial: {
                y: -15,
                opacity: 0
              },
              animate: {
                y: 0,
                opacity: 1
              },
              transition: {
                type: "spring"
              },
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                x: "18",
                y: "38",
                width: "6",
                height: "22",
                rx: "3",
                fill: "#1976d2"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                x: "66",
                y: "38",
                width: "6",
                height: "22",
                rx: "3",
                fill: "#1976d2"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("rect", {
                x: "24",
                y: "32",
                width: "42",
                height: "10",
                rx: "5",
                fill: "#1976d2"
              })]
            });

          case "hat":
            return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.ellipse, {
              cx: "55",
              cy: "18",
              rx: "24",
              ry: "8",
              fill: "#43a047",
              initial: {
                rotate: -20,
                y: -10,
                scale: 0.7
              },
              animate: {
                rotate: 0,
                y: 0,
                scale: 1
              },
              transition: {
                type: "spring"
              }
            });

          case "mustache":
            return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.path, {
              d: "M38 70 Q45 74 52 70",
              stroke: "#222",
              strokeWidth: "3",
              fill: "none",
              initial: {
                pathLength: 0
              },
              animate: {
                pathLength: 1
              },
              transition: {
                duration: 0.5
              }
            });

          default:
            return null;
        }
      })()
    })]
  });
}
function AvatarPicker({
  value,
  onChange
}) {
  const avatar = value || {};
  const {
    0: animVibe,
    1: setAnimVibe
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "flex flex-col gap-3 items-center w-full",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      className: "mb-2",
      children: getAvatarSVG(avatar)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "flex gap-2 items-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
        className: "text-xs text-gray-600",
        children: "Vibe:"
      }), vibes.map(v => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.button, {
        className: `px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${avatar.vibe === v.value ? "bg-pink-500 text-white scale-110 shadow" : "bg-gray-100 text-gray-700"}`,
        onClick: () => {
          setAnimVibe(v.value);
          onChange(_objectSpread(_objectSpread({}, avatar), {}, {
            vibe: v.value
          }));
          setTimeout(() => setAnimVibe(null), 400);
        },
        "aria-label": v.label,
        tabIndex: 0,
        whileTap: {
          scale: 1.2,
          rotate: v.value === "edgy" ? 10 : 0
        },
        animate: animVibe === v.value ? {
          scale: 1.3,
          rotate: v.value === "edgy" ? 10 : 0
        } : {},
        transition: {
          type: "spring",
          stiffness: 300
        },
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
          children: v.emoji
        }), v.label]
      }, v.value))]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "flex gap-2 items-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
        className: "text-xs text-gray-600",
        children: "Skin:"
      }), skinTones.map(color => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("button", {
        className: `w-6 h-6 rounded-full border-2 ${avatar.skin === color ? "border-blue-500 scale-110" : "border-gray-200"}`,
        style: {
          background: color
        },
        "aria-label": `Skin tone ${color}`,
        onClick: () => onChange(_objectSpread(_objectSpread({}, avatar), {}, {
          skin: color
        })),
        tabIndex: 0
      }, color))]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "flex gap-2 items-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
        className: "text-xs text-gray-600",
        children: "Hair:"
      }), hairColors.map(color => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("button", {
        className: `w-6 h-6 rounded-full border-2 ${avatar.hair === color ? "border-blue-500 scale-110" : "border-gray-200"}`,
        style: {
          background: color
        },
        "aria-label": `Hair color ${color}`,
        onClick: () => onChange(_objectSpread(_objectSpread({}, avatar), {}, {
          hair: color
        })),
        tabIndex: 0
      }, color)), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("button", {
        className: `px-2 py-1 rounded text-xs font-semibold ${avatar.hairStyle === "bald" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`,
        onClick: () => onChange(_objectSpread(_objectSpread({}, avatar), {}, {
          hairStyle: "bald"
        })),
        "aria-label": "Bald",
        tabIndex: 0,
        children: "Bald"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "flex gap-2 items-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
        className: "text-xs text-gray-600",
        children: "Eyes:"
      }), eyeColors.map(color => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("button", {
        className: `w-5 h-5 rounded-full border-2 ${avatar.eyeColor === color ? "border-blue-500 scale-110" : "border-gray-200"}`,
        style: {
          background: color
        },
        "aria-label": `Eye color ${color}`,
        onClick: () => onChange(_objectSpread(_objectSpread({}, avatar), {}, {
          eyeColor: color
        })),
        tabIndex: 0
      }, color))]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "flex gap-2 items-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
        className: "text-xs text-gray-600",
        children: "Accessory:"
      }), accessories.map(a => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.button, {
        className: `px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${avatar.accessory === a.value ? "bg-blue-500 text-white scale-110 shadow" : "bg-gray-100 text-gray-700"}`,
        onClick: () => onChange(_objectSpread(_objectSpread({}, avatar), {}, {
          accessory: a.value
        })),
        "aria-label": a.label,
        tabIndex: 0,
        whileTap: {
          scale: 1.2,
          rotate: a.value === "hat" ? -10 : 0
        },
        animate: avatar.accessory === a.value ? {
          scale: 1.2
        } : {},
        transition: {
          type: "spring",
          stiffness: 300
        },
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
          children: a.emoji
        }), a.label]
      }, a.value))]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("button", {
      className: "mt-2 px-3 py-1 bg-pink-500 text-white rounded text-xs",
      onClick: () => {
        const random = {
          skin: skinTones[Math.floor(Math.random() * skinTones.length)],
          hair: hairColors[Math.floor(Math.random() * hairColors.length)],
          hairStyle: Math.random() > 0.2 ? "short" : "bald",
          eyeColor: eyeColors[Math.floor(Math.random() * eyeColors.length)],
          vibe: vibes[Math.floor(Math.random() * vibes.length)].value,
          accessory: accessories[Math.floor(Math.random() * accessories.length)].value
        };
        onChange(random);
      },
      "aria-label": "Randomize avatar",
      tabIndex: 0,
      children: "\uD83C\uDFB2 Randomize All"
    })]
  });
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3670:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Layout)
/* harmony export */ });
/* unused harmony export metadata */
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AvatarPicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6302);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6197);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AvatarPicker__WEBPACK_IMPORTED_MODULE_3__, framer_motion__WEBPACK_IMPORTED_MODULE_4__]);
([_AvatarPicker__WEBPACK_IMPORTED_MODULE_3__, framer_motion__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const navLinks = [{
  href: "/explore",
  label: "Explore",
  icon: "🧭"
}, {
  href: "/calendar",
  label: "Calendar",
  icon: "📅"
}, {
  href: "/vision-board",
  label: "Vision Board",
  icon: "🌈"
}];

function getInitials(name) {
  if (!name) return "U";
  return name.split(" ").map(n => n[0]?.toUpperCase()).join("").slice(0, 2);
}

function Layout({
  children
}) {
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const {
    0: mobileMenuOpen,
    1: setMobileMenuOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const {
    0: scrolled,
    1: setScrolled
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const {
    0: userName,
    1: setUserName
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const {
    0: showToast,
    1: setShowToast
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const {
    0: avatar,
    1: setAvatar
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const {
    0: theme,
    1: setTheme
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("dark");
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // Close mobile menu on route change

  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    setUserName(localStorage.getItem("listoUserName"));
    const stored = localStorage.getItem("listoAvatar");
    setAvatar(stored ? JSON.parse(stored) : null); // Theme from localStorage

    const storedTheme = localStorage.getItem("listoTheme");
    if (storedTheme === "light" || storedTheme === "dark") setTheme(storedTheme);
  }, []); // Example: Show a toast when userName is set

  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (userName) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [userName]); // Theme switcher

  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("listoTheme", theme);
  }, [theme]); // Animation variants

  const logoVariants = {
    initial: {
      scale: 0.9,
      rotate: -8,
      opacity: 0
    },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8
      }
    }
  };
  const navLinkVariants = {
    initial: {
      opacity: 0,
      y: -10
    },
    animate: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.07,
        type: "spring",
        stiffness: 300
      }
    })
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: `min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-500 ${theme === "dark" ? "bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700" : "bg-gradient-to-br from-blue-100 via-white to-teal-100"}`,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
      className: "absolute -top-32 -left-32 w-96 h-96 z-0 pointer-events-none",
      initial: {
        opacity: 0,
        scale: 0.8
      },
      animate: {
        opacity: 0.25,
        scale: 1
      },
      transition: {
        duration: 1.2
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("svg", {
        viewBox: "0 0 400 400",
        fill: "none",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("ellipse", {
          cx: "200",
          cy: "200",
          rx: "180",
          ry: "120",
          fill: theme === "dark" ? "#38bdf8" : "#a5b4fc",
          fillOpacity: "0.5",
          filter: "url(#blur1)"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("filter", {
          id: "blur1",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("feGaussianBlur", {
            stdDeviation: "30"
          })
        })]
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
      className: "absolute -bottom-32 right-0 w-96 h-96 z-0 pointer-events-none",
      initial: {
        opacity: 0,
        scale: 0.8
      },
      animate: {
        opacity: 0.18,
        scale: 1
      },
      transition: {
        duration: 1.2,
        delay: 0.3
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("svg", {
        viewBox: "0 0 400 400",
        fill: "none",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("ellipse", {
          cx: "200",
          cy: "200",
          rx: "160",
          ry: "100",
          fill: theme === "dark" ? "#fbbf24" : "#f472b6",
          fillOpacity: "0.5",
          filter: "url(#blur2)"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("filter", {
          id: "blur2",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("feGaussianBlur", {
            stdDeviation: "30"
          })
        })]
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
      className: "absolute top-10 right-10 w-16 h-16 z-0 pointer-events-none",
      initial: {
        opacity: 0,
        scale: 0.7,
        rotate: -20
      },
      animate: {
        opacity: 0.4,
        scale: 1,
        rotate: 10
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      },
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("svg", {
        viewBox: "0 0 64 64",
        fill: "none",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("path", {
          d: "M32 4 L39 24 H60 L42 38 L49 58 L32 46 L15 58 L22 38 L4 24 H25 Z",
          fill: "#fbbf24",
          opacity: "0.7"
        })
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
      className: "absolute bottom-20 left-10 w-12 h-12 z-0 pointer-events-none",
      initial: {
        opacity: 0,
        scale: 0.7,
        rotate: 10
      },
      animate: {
        opacity: 0.3,
        scale: 1,
        rotate: -10
      },
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse"
      },
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("svg", {
        viewBox: "0 0 64 64",
        fill: "none",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("circle", {
          cx: "32",
          cy: "32",
          r: "28",
          fill: "#a5b4fc",
          opacity: "0.6"
        })
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
      className: "absolute top-1/2 left-1/2 w-10 h-10 z-0 pointer-events-none",
      style: {
        translate: "-50% -50%"
      },
      initial: {
        opacity: 0,
        scale: 0.7,
        rotate: 0
      },
      animate: {
        opacity: 0.25,
        scale: 1,
        rotate: 360
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
      },
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("svg", {
        viewBox: "0 0 64 64",
        fill: "none",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("ellipse", {
          cx: "32",
          cy: "32",
          rx: "24",
          ry: "12",
          fill: "#f472b6",
          opacity: "0.4"
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.header, {
      className: `sticky top-0 z-30 bg-white/30 dark:bg-blue-900/80 backdrop-blur-md text-blue-900 dark:text-white p-4 flex items-center justify-between shadow transition-shadow ${scrolled ? "shadow-lg" : ""}`,
      initial: {
        y: -40,
        opacity: 0
      },
      animate: {
        y: 0,
        opacity: 1
      },
      transition: {
        type: "spring",
        duration: 0.7
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
        className: "flex items-center gap-3",
        variants: logoVariants,
        initial: "initial",
        animate: "animate",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.span, {
          className: "bg-yellow-400 text-blue-900 font-extrabold rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-neon ring-4 ring-yellow-300 animate-pulse relative",
          whileHover: {
            scale: 1.1,
            rotate: 6
          },
          transition: {
            type: "spring",
            stiffness: 300
          },
          children: ["L", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.span, {
            className: "absolute -top-2 -right-2",
            initial: {
              scale: 0,
              opacity: 0
            },
            animate: {
              scale: [0, 1.2, 1],
              opacity: [0, 1, 0.7]
            },
            transition: {
              repeat: Infinity,
              duration: 2,
              delay: 0.7
            },
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("svg", {
              width: "18",
              height: "18",
              viewBox: "0 0 18 18",
              fill: "none",
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("path", {
                d: "M9 0 L10.5 7.5 L18 9 L10.5 10.5 L9 18 L7.5 10.5 L0 9 L7.5 7.5 Z",
                fill: "#fbbf24"
              })
            })
          })]
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("span", {
          className: "font-bold text-2xl tracking-tight drop-shadow-lg",
          style: {
            fontFamily: "'Quicksand', 'Baloo 2', sans-serif"
          },
          children: "LISTO"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("span", {
          className: "ml-2 text-sm text-teal-700 dark:text-teal-200 italic hidden sm:inline",
          children: "Dream. Do. Dominate."
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.span, {
          className: "ml-2 px-2 py-0.5 rounded-full bg-pink-200 text-pink-700 text-xs font-bold shadow hidden sm:inline-block",
          initial: {
            scale: 0.8,
            opacity: 0
          },
          animate: {
            scale: 1,
            opacity: 1
          },
          transition: {
            delay: 1.2,
            type: "spring"
          },
          children: "\u2728 New!"
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("nav", {
        className: "space-x-2 hidden md:block",
        "aria-label": "Main navigation",
        children: navLinks.map((link, i) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
          custom: i,
          variants: navLinkVariants,
          initial: "initial",
          animate: "animate",
          className: "inline-block",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
            href: link.href,
            className: `px-3 py-1 rounded-lg flex items-center gap-1 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 ${router.pathname === link.href ? "bg-yellow-400 text-blue-900 font-bold shadow" : "hover:bg-blue-800/80 hover:text-yellow-300 dark:hover:bg-blue-700/80"}`,
            tabIndex: 0,
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("span", {
              className: "text-lg",
              children: link.icon
            }), link.label]
          })
        }, link.href))
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("button", {
        className: "mx-2 p-2 rounded-full bg-white/60 dark:bg-blue-800/80 shadow hover:scale-110 transition",
        "aria-label": "Toggle theme",
        onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
        children: theme === "dark" ? "🌞" : "🌙"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
        className: "ml-2 relative group",
        initial: {
          opacity: 0,
          scale: 0.8
        },
        animate: {
          opacity: 1,
          scale: 1
        },
        transition: {
          delay: 0.4,
          type: "spring"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 border-yellow-400 shadow-lg hover:shadow-yellow-300/80 hover:scale-105 transition cursor-pointer ring-2 ring-yellow-200 relative",
          title: userName ? `Logged in as ${userName}` : "Guest",
          style: {
            boxShadow: theme === "dark" ? "0 0 0 4px #38bdf8, 0 2px 8px #0002" : "0 0 0 4px #fbbf24, 0 2px 8px #0001"
          },
          children: [(0,_AvatarPicker__WEBPACK_IMPORTED_MODULE_3__/* .getAvatarSVG */ .k)(avatar), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.span, {
            className: "absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-white",
            animate: {
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            },
            transition: {
              repeat: Infinity,
              duration: 1.2
            }
          })]
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("div", {
          className: "absolute left-1/2 -translate-x-1/2 mt-2 bg-black/80 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition",
          children: userName ? userName : "Guest"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("button", {
        className: "md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-2",
        "aria-label": "Open navigation menu",
        onClick: () => setMobileMenuOpen(v => !v),
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("span", {
          className: "block w-6 h-0.5 bg-current mb-1"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("span", {
          className: "block w-6 h-0.5 bg-current mb-1"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("span", {
          className: "block w-6 h-0.5 bg-current"
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.AnimatePresence, {
        children: mobileMenuOpen && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.nav, {
          className: "absolute top-16 right-4 bg-white/90 dark:bg-blue-900/95 rounded shadow-lg py-2 px-4 flex flex-col space-y-2 md:hidden animate-fade-in-scale",
          "aria-label": "Mobile navigation",
          initial: {
            opacity: 0,
            scale: 0.95,
            y: -10
          },
          animate: {
            opacity: 1,
            scale: 1,
            y: 0
          },
          exit: {
            opacity: 0,
            scale: 0.95,
            y: -10
          },
          transition: {
            duration: 0.2
          },
          children: navLinks.map(link => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
            href: link.href,
            className: `px-3 py-1 rounded-lg flex items-center gap-1 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 ${router.pathname === link.href ? "bg-yellow-400 text-blue-900 font-bold" : "hover:bg-blue-800/80 hover:text-yellow-300 dark:hover:bg-blue-700/80"}`,
            tabIndex: 0,
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("span", {
              className: "text-lg",
              children: link.icon
            }), link.label]
          }, link.href))
        })
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.AnimatePresence, {
      children: showToast && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
        className: "fixed top-20 right-4 z-50 animate-fade-in-scale bg-yellow-400 text-blue-900 px-4 py-2 rounded shadow-lg font-semibold",
        initial: {
          opacity: 0,
          x: 40
        },
        animate: {
          opacity: 1,
          x: 0
        },
        exit: {
          opacity: 0,
          x: 40
        },
        transition: {
          duration: 0.4
        },
        children: ["Welcome", userName ? `, ${userName}` : "", "!"]
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("main", {
      className: "flex-1 w-full max-w-6xl mx-auto px-2 sm:px-6 py-6 z-10",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("div", {
        className: "rounded-3xl bg-white/60 dark:bg-blue-900/60 shadow-xl p-6 backdrop-blur-md border border-blue-100 dark:border-blue-800",
        children: children
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("footer", {
      className: "relative bg-white/30 dark:bg-blue-900/80 backdrop-blur-md text-center p-2 text-xs text-gray-700 dark:text-gray-300 overflow-hidden",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.svg, {
        className: "absolute left-0 bottom-full w-full h-8",
        viewBox: "0 0 1440 80",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        initial: {
          y: 20
        },
        animate: {
          y: 0
        },
        transition: {
          duration: 1,
          type: "spring"
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.path, {
          d: "M0 40 Q 360 80 720 40 T 1440 40 V80H0V40Z",
          fill: theme === "dark" ? "#38bdf8" : "#a5b4fc",
          animate: {
            d: ["M0 40 Q 360 80 720 40 T 1440 40 V80H0V40Z", "M0 30 Q 360 60 720 30 T 1440 30 V80H0V30Z", "M0 40 Q 360 80 720 40 T 1440 40 V80H0V40Z"]
          },
          transition: {
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.svg, {
        className: "absolute left-0 bottom-[calc(100%-8px)] w-full h-8",
        viewBox: "0 0 1440 80",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        initial: {
          y: 30
        },
        animate: {
          y: 0
        },
        transition: {
          duration: 1.5,
          type: "spring"
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.path, {
          d: "M0 50 Q 360 90 720 50 T 1440 50 V80H0V50Z",
          fill: theme === "dark" ? "#fbbf24" : "#f472b6",
          opacity: "0.3",
          animate: {
            d: ["M0 50 Q 360 90 720 50 T 1440 50 V80H0V50Z", "M0 40 Q 360 70 720 40 T 1440 40 V80H0V40Z", "M0 50 Q 360 90 720 50 T 1440 50 V80H0V50Z"]
          },
          transition: {
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut"
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
        className: "relative z-10",
        children: ["\xA9 ", new Date().getFullYear(), " LISTO \u2014 Dream. Do. Dominate."]
      })]
    })]
  });
}
/* Import Google Fonts in your global CSS file (e.g., styles/globals.css) */

/* Example for app/layout.tsx */

const metadata = {
  icons: {
    icon: '/favicon.png'
  }
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3573:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ OnboardingModal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AvatarPicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6302);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AvatarPicker__WEBPACK_IMPORTED_MODULE_1__, framer_motion__WEBPACK_IMPORTED_MODULE_2__]);
([_AvatarPicker__WEBPACK_IMPORTED_MODULE_1__, framer_motion__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


 // Sound effect (put a short mp3 in /public/sounds/success.mp3)




const playSound = () => {
  const audio = new Audio("/sounds/success.mp3");
  audio.volume = 0.5;
  audio.play();
};

const steps = [{
  key: "welcome"
}, {
  key: "name"
}, {
  key: "avatar"
}, {
  key: "theme"
}, {
  key: "finish"
}]; // --- Seasonal/Easter Egg Vortex Themes ---

function getSeasonalVortexImages() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate(); // Halloween

  if (month === 9 && day >= 25 || month === 9 && day <= 31) {
    return ["🎃", "👻", "🦇", "🍬", "🕸️", "🧙‍♂️", "🧛‍♂️"];
  } // Christmas


  if (month === 11) {
    return ["🎄", "🎅", "🤶", "⛄", "❄️", "🦌", "🧦", "🎁"];
  } // New Year


  if (month === 0 && day <= 7) {
    return ["🎆", "🎉", "🥂", "🕛", "✨", "🎊"];
  } // Default/Brand


  return [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("svg", {
    width: "48",
    height: "48",
    viewBox: "0 0 48 48",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("circle", {
      cx: "24",
      cy: "24",
      r: "20",
      fill: "#fbbf24"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("text", {
      x: "24",
      y: "30",
      textAnchor: "middle",
      fontSize: "24",
      fill: "#fff",
      children: "\uD83D\uDE80"
    })]
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("svg", {
    width: "48",
    height: "48",
    viewBox: "0 0 48 48",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("rect", {
      x: "8",
      y: "8",
      width: "32",
      height: "32",
      rx: "8",
      fill: "#6366f1"
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("text", {
      x: "24",
      y: "32",
      textAnchor: "middle",
      fontSize: "24",
      fill: "#fff",
      children: "\uD83C\uDFA8"
    })]
  }), "🪐", "🌟", "✨", "🧠", "💡", "🎵", "📚", "🎲", "🦄", "🌈"];
} // --- Vortex Background with Gamified Progress & Accessibility ---


function VortexBackground({
  step,
  finished,
  reduceMotion
}) {
  const {
    0: tick,
    1: setTick
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const {
    0: burst,
    1: setBurst
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const vortexImages = getSeasonalVortexImages(); // Gamified: More images as you progress

  const imagesToShow = finished ? vortexImages.length : Math.max(3, Math.floor((step + 1) / steps.length * vortexImages.length));
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (finished) {
      setBurst(true);
      setTimeout(() => setBurst(false), 1200);
    }
  }, [finished]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!reduceMotion) {
      const interval = setInterval(() => setTick(t => t + 1), 40);
      return () => clearInterval(interval);
    }
  }, [reduceMotion]);
  if (reduceMotion) return null;
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
    "aria-hidden": "true",
    className: "pointer-events-none fixed inset-0 z-40 overflow-hidden",
    style: {
      filter: "blur(0.5px)"
    },
    children: vortexImages.slice(0, imagesToShow).map((img, i) => {
      const t = (tick + i * 20) / 60;
      const angle = t + i / vortexImages.length * 2 * Math.PI;
      const radius = burst ? 320 + 120 * Math.sin(t + i) : 180 + 60 * Math.sin(t + i);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const scale = burst ? 1.5 + 0.7 * Math.sin(t + i) : 1 + 0.4 * Math.sin(t + i);
      const blur = 1 + 2 * Math.abs(Math.cos(angle));
      return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
        style: {
          position: "absolute",
          left: `calc(50vw + ${x}px - 32px)`,
          top: `calc(50vh + ${y}px - 32px)`,
          fontSize: 64 + i % 3 * 12,
          opacity: 0.13 + 0.07 * Math.sin(t + i),
          filter: `blur(${blur}px)`,
          transform: `scale(${scale})`,
          zIndex: 0,
          userSelect: "none",
          pointerEvents: "none",
          transition: "filter 0.2s, opacity 0.2s, transform 0.2s"
        },
        children: img
      }, i);
    })
  });
}

function OnboardingModal({
  onClose,
  onComplete
}) {
  const {
    0: step,
    1: setStep
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const {
    0: name,
    1: setName
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const {
    0: error,
    1: setError
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const {
    0: avatar,
    1: setAvatar
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    0: theme,
    1: setTheme
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("bg-gradient-to-r from-blue-900 to-teal-600");
  const {
    0: finished,
    1: setFinished
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: reduceMotion,
    1: setReduceMotion
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const modalRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // Show only once: check localStorage

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (localStorage.getItem("seenOnboarding") === "true") {
      onClose();
    }
  }, [onClose]); // Accessibility: focus management

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (steps[step].key === "name") inputRef.current?.focus();
  }, [step]); // Sound on finish

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (finished && !reduceMotion) {
      playSound();
      setTimeout(() => setFinished(false), 1800);
    }
  }, [finished, reduceMotion]); // Keyboard navigation

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleEsc = e => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]); // Trap focus inside modal

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const focusableSelectors = ['button:not([disabled])', 'input:not([disabled])', '[tabindex]:not([tabindex="-1"])'];

    const handleTab = e => {
      if (!modalRef.current) return;
      const focusableEls = modalRef.current.querySelectorAll(focusableSelectors.join(','));
      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []); // Step handlers

  const handleNext = () => {
    if (steps[step].key === "name") {
      if (name.trim().length < 2) {
        setError("Please enter your name.");
        inputRef.current?.focus();
        return;
      }

      setError("");
    }

    setStep(s => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handleFinish = () => {
    localStorage.setItem("listoUserName", name.trim());
    if (avatar) localStorage.setItem("listoAvatar", JSON.stringify(avatar));
    localStorage.setItem("listoTheme", theme);
    localStorage.setItem("seenOnboarding", "true");
    setFinished(true);
    setTimeout(() => {
      onComplete(avatar, theme);
      onClose();
    }, 1200);
  };

  const handleSkip = () => {
    localStorage.setItem("seenOnboarding", "true");
    onComplete(null, theme);
    onClose();
  }; // Progress calculation


  const progress = (step + 1) / steps.length * 100;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50",
    "aria-modal": "true",
    role: "dialog",
    tabIndex: -1,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(VortexBackground, {
      step: step,
      finished: finished,
      reduceMotion: reduceMotion
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
      ref: modalRef,
      className: "bg-white rounded-2xl shadow-2xl max-w-md w-full px-10 py-8 flex flex-col items-center relative z-50",
      role: "document",
      initial: {
        opacity: 0,
        scale: 0.92,
        y: 60
      },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0
      },
      exit: {
        opacity: 0,
        scale: 0.92,
        y: 60
      },
      transition: {
        type: "spring",
        duration: 0.7
      },
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
        className: "absolute top-4 right-4 px-3 py-1 bg-gray-100 text-gray-700 rounded shadow text-xs hover:bg-gray-200 transition",
        onClick: () => setReduceMotion(r => !r),
        "aria-label": reduceMotion ? "Enable animations" : "Reduce motion / disable vortex",
        children: reduceMotion ? "Enable Animations" : "Reduce Motion"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {
        mode: "wait",
        children: [steps[step].key === "welcome" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
          initial: {
            opacity: 0,
            y: 40
          },
          animate: {
            opacity: 1,
            y: 0
          },
          exit: {
            opacity: 0,
            y: -40
          },
          transition: {
            duration: 0.4,
            type: "spring"
          },
          className: "mb-8 text-center",
          "aria-labelledby": "onboarding-title",
          "aria-describedby": "onboarding-desc",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("h2", {
            id: "onboarding-title",
            className: "text-4xl font-poppins font-extrabold mb-3 tracking-tight bg-gradient-to-r from-blue-700 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg",
            children: "Welcome to LISTO!"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("p", {
            id: "onboarding-desc",
            className: "mb-8 text-lg text-gray-700 font-medium tracking-wide",
            children: "Let\u2019s get you set up for your journey."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "flex gap-4 w-full justify-center mb-4",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold text-lg",
              onClick: handleNext,
              "aria-label": "Start onboarding",
              children: "Get Started"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "px-6 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition font-semibold text-lg",
              onClick: handleSkip,
              "aria-label": "Skip onboarding",
              children: "Skip"
            })]
          })]
        }, "welcome"), steps[step].key === "name" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
          initial: {
            opacity: 0,
            x: 40
          },
          animate: {
            opacity: 1,
            x: 0
          },
          exit: {
            opacity: 0,
            x: -40
          },
          transition: {
            duration: 0.4,
            type: "spring"
          },
          className: "mb-8",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("label", {
            htmlFor: "onboard-name",
            className: "block text-2xl font-poppins font-bold mb-2 text-center text-blue-700 tracking-tight",
            children: "What should we call you?"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("input", {
            ref: inputRef,
            id: "onboard-name",
            type: "text",
            className: "w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg text-center font-medium tracking-wide",
            placeholder: "Your name",
            value: name,
            onChange: e => {
              setName(e.target.value);
              setError("");
            },
            "aria-label": "Your name",
            maxLength: 32,
            onKeyDown: e => {
              if (e.key === "Enter") handleNext();
            }
          }), error && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
            className: "text-red-500 text-sm mt-1 text-center",
            children: error
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "flex gap-4 justify-center mt-8",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-lg font-semibold",
              onClick: handleNext,
              "aria-label": "Next step",
              children: "Next"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg",
              onClick: handleBack,
              "aria-label": "Back",
              disabled: step === 0,
              children: "Back"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg",
              onClick: handleSkip,
              "aria-label": "Skip onboarding",
              children: "Skip"
            })]
          })]
        }, "name"), steps[step].key === "avatar" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
          initial: {
            opacity: 0,
            x: 40
          },
          animate: {
            opacity: 1,
            x: 0
          },
          exit: {
            opacity: 0,
            x: -40
          },
          transition: {
            duration: 0.4,
            type: "spring"
          },
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
            className: "mb-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "flex flex-col items-center",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("p", {
                className: "mb-2 font-semibold text-gray-800",
                children: ["Choose your avatar", " ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("span", {
                  className: "text-gray-500 font-normal",
                  children: "(optional)"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
                className: "w-full flex flex-col items-center",
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_AvatarPicker__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                  value: avatar,
                  onChange: setAvatar
                }), !avatar && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
                  className: "text-center text-gray-400 text-sm mt-4",
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("span", {
                    className: "text-3xl block mb-2",
                    children: "\uD83D\uDE42"
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("span", {
                    children: "No avatar yet. You can always create one later from your profile page!"
                  })]
                }), avatar && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
                  className: "mt-4 flex flex-col items-center",
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("span", {
                    className: "text-3xl block mb-2",
                    children: (0,_AvatarPicker__WEBPACK_IMPORTED_MODULE_1__/* .getAvatarSVG */ .k)(avatar)
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("span", {
                    className: "text-xs text-gray-500",
                    children: "Looking good!"
                  })]
                })]
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "flex gap-4 justify-center mt-2",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg",
              onClick: handleBack,
              "aria-label": "Back",
              children: "Back"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-lg font-semibold",
              onClick: handleNext,
              "aria-label": "Next step",
              children: "Next"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg",
              onClick: handleSkip,
              "aria-label": "Skip onboarding",
              children: "Skip"
            })]
          })]
        }, "avatar"), steps[step].key === "theme" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
          initial: {
            opacity: 0,
            x: 40
          },
          animate: {
            opacity: 1,
            x: 0
          },
          exit: {
            opacity: 0,
            x: -40
          },
          transition: {
            duration: 0.4,
            type: "spring"
          },
          className: "mb-6",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("h3", {
            className: "text-xl font-semibold mb-2 text-center",
            children: "Pick a Profile Theme"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "flex gap-2 flex-wrap justify-center mb-4",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: `px-3 py-1 rounded ${theme === "bg-gradient-to-r from-blue-900 to-teal-600" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`,
              onClick: () => setTheme("bg-gradient-to-r from-blue-900 to-teal-600"),
              "aria-label": "Blue/Teal theme",
              children: "Blue/Teal"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: `px-3 py-1 rounded ${theme === "bg-gradient-to-r from-pink-500 to-yellow-300" ? "bg-pink-500 text-white" : "bg-white text-pink-500"}`,
              onClick: () => setTheme("bg-gradient-to-r from-pink-500 to-yellow-300"),
              "aria-label": "Pink/Yellow theme",
              children: "Pink/Yellow"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: `px-3 py-1 rounded ${theme === "bg-gradient-to-r from-green-400 to-blue-500" ? "bg-green-500 text-white" : "bg-white text-green-500"}`,
              onClick: () => setTheme("bg-gradient-to-r from-green-400 to-blue-500"),
              "aria-label": "Green/Blue theme",
              children: "Green/Blue"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: `px-3 py-1 rounded ${theme === "bg-gray-100" ? "bg-gray-400 text-white" : "bg-white text-gray-600"}`,
              onClick: () => setTheme("bg-gray-100"),
              "aria-label": "Minimal theme",
              children: "Minimal"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "flex gap-4 justify-center mt-2",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg",
              onClick: handleBack,
              "aria-label": "Back",
              children: "Back"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-lg font-semibold",
              onClick: handleNext,
              "aria-label": "Next step",
              children: "Next"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
              className: "px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition text-lg",
              onClick: handleSkip,
              "aria-label": "Skip onboarding",
              children: "Skip"
            })]
          })]
        }, "theme"), steps[step].key === "finish" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
          initial: {
            opacity: 0,
            scale: 0.9
          },
          animate: {
            opacity: 1,
            scale: 1
          },
          exit: {
            opacity: 0,
            scale: 0.9
          },
          transition: {
            duration: 0.5,
            type: "spring"
          },
          className: "mb-8 text-center",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("h2", {
            className: "text-3xl font-poppins font-extrabold mb-2 bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg",
            children: "You're all set!"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("p", {
            className: "mb-4 text-lg text-gray-700 font-medium",
            children: ["Welcome to ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("span", {
              className: "font-bold text-blue-700",
              children: name || "friend"
            }), "!"]
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
            initial: {
              scale: 0.8
            },
            animate: {
              scale: 1.1
            },
            transition: {
              type: "spring",
              duration: 0.6
            },
            className: "flex justify-center mb-4",
            children: (0,_AvatarPicker__WEBPACK_IMPORTED_MODULE_1__/* .getAvatarSVG */ .k)(avatar)
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("button", {
            className: "px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-lg font-semibold",
            onClick: handleFinish,
            "aria-label": "Finish onboarding",
            children: "Go to Dashboard"
          })]
        }, "finish")]
      }), finished && !reduceMotion && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        exit: {
          opacity: 0
        },
        className: "absolute inset-0 flex items-center justify-center pointer-events-none",
        style: {
          zIndex: 10
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("span", {
          className: "text-6xl animate-bounce",
          children: "\uD83C\uDF89"
        })
      })]
    })]
  });
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9742:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ho: () => (/* binding */ AuthProvider),
/* harmony export */   aC: () => (/* binding */ useAuth)
/* harmony export */ });
/* unused harmony export AuthContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(401);
/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2410);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase__WEBPACK_IMPORTED_MODULE_2__]);
([firebase_auth__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// context/AuthContext.tsx


 // ✅ Corrected import


const AuthContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
function AuthProvider({
  children
}) {
  const {
    0: user,
    1: setUser
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const unsub = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.onAuthStateChanged)(_lib_firebase__WEBPACK_IMPORTED_MODULE_2__/* .auth */ .I, user => setUser(user));
    return () => unsub();
  }, []);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(AuthContext.Provider, {
    value: {
      user
    },
    children: children
  });
}
function useAuth() {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2410:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ auth),
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   db: () => (/* binding */ db)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(401);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3477);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



const firebaseConfig = {
  apiKey: "AIzaSyCRleusZM0M2tpA8JoS8NyEElntli8aadw",
  authDomain: "listo-listo.firebaseapp.com",
  projectId: "listo-listo",
  storageBucket: "listo-listo.appspot.com",
  messagingSenderId: "70588131341",
  appId: "1:70588131341:web:f75739f617781be275cd44"
};
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3376:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   app: () => (/* binding */ app),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9742);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3670);
/* harmony import */ var _components_OnboardingModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3573);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6764);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(401);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3477);
/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2410);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6197);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3745);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_context_AuthContext__WEBPACK_IMPORTED_MODULE_1__, _components_Layout__WEBPACK_IMPORTED_MODULE_2__, _components_OnboardingModal__WEBPACK_IMPORTED_MODULE_3__, firebase_auth__WEBPACK_IMPORTED_MODULE_5__, firebase_firestore__WEBPACK_IMPORTED_MODULE_6__, _lib_firebase__WEBPACK_IMPORTED_MODULE_7__, framer_motion__WEBPACK_IMPORTED_MODULE_8__, firebase_app__WEBPACK_IMPORTED_MODULE_10__]);
([_context_AuthContext__WEBPACK_IMPORTED_MODULE_1__, _components_Layout__WEBPACK_IMPORTED_MODULE_2__, _components_OnboardingModal__WEBPACK_IMPORTED_MODULE_3__, firebase_auth__WEBPACK_IMPORTED_MODULE_5__, firebase_firestore__WEBPACK_IMPORTED_MODULE_6__, _lib_firebase__WEBPACK_IMPORTED_MODULE_7__, framer_motion__WEBPACK_IMPORTED_MODULE_8__, firebase_app__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// pages/_app.tsx











const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_5__.getAuth)(_lib_firebase__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z);
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.getFirestore)(_lib_firebase__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z);

function MyApp({
  Component,
  pageProps
}) {
  const {
    0: showOnboarding,
    1: setShowOnboarding
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_5__.onAuthStateChanged)(auth, async user => {
      if (user) {
        // Check onboarding status in Firestore
        const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.doc)(db, "users", user.uid);
        const userSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.getDoc)(userRef);

        if (userSnap.exists() && userSnap.data().onboarded) {
          setShowOnboarding(false);
        } else {
          setShowOnboarding(true);
        }
      } else {
        setShowOnboarding(false);
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  if (loading) return null; // or a spinner

  if (showOnboarding) {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_components_OnboardingModal__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
      onClose: () => setShowOnboarding(false),
      onComplete: async () => {
        const user = auth.currentUser;

        if (user) {
          const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.doc)(db, "users", user.uid);
          await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.setDoc)(userRef, {
            onboarded: true
          }, {
            merge: true
          });
        }

        setShowOnboarding(false);
      }
    });
  } // Example: Add darkMode state (default: false)


  const {
    0: darkMode,
    1: setDarkMode
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_context_AuthContext__WEBPACK_IMPORTED_MODULE_1__/* .AuthProvider */ .Ho, {
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: `${darkMode ? "dark" : ""} font-sans transition-all duration-300`,
        style: {
          fontFamily: "'Quicksand', sans-serif"
        },
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(Component, _objectSpread({}, pageProps)), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_8__.motion.button, {
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
        })]
      })
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp); // If you need backend API routes, place them in the /pages/api directory as separate files.
// firebase.ts




const firebaseConfig = {
  apiKey: "AIzaSyCRleusZM0M2tpA8JoS8NyEElntli8aadw",
  authDomain: "listo-listo.firebaseapp.com",
  projectId: "listo-listo",
  storageBucket: "listo-listo.appspot.com",
  messagingSenderId: "70588131341",
  appId: "1:70588131341:web:f75739f617781be275cd44"
};
const app = !(0,firebase_app__WEBPACK_IMPORTED_MODULE_10__.getApps)().length ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_10__.initializeApp)(firebaseConfig) : (0,firebase_app__WEBPACK_IMPORTED_MODULE_10__.getApp)();
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5539:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Document)
/* harmony export */ });
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6859);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__]);
framer_motion__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




function Document() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_0__.Html, {
    lang: "en",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_0__.Head, {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("link", {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("link", {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("link", {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@500;700&display=swap",
        rel: "stylesheet"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("link", {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("body", {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(next_document__WEBPACK_IMPORTED_MODULE_0__.Main, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(next_document__WEBPACK_IMPORTED_MODULE_0__.NextScript, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.button, {
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
      })]
    })]
  });
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6764:
/***/ (() => {



/***/ })

};
;