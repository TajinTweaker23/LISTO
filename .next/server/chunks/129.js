"use strict";
exports.id = 129;
exports.ids = [129];
exports.modules = {

/***/ 9129:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Navbar)
/* harmony export */ });
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6152);
/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9742);
/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2410);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(401);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5893);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lucide_react__WEBPACK_IMPORTED_MODULE_2__, _context_AuthContext__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase__WEBPACK_IMPORTED_MODULE_4__, firebase_auth__WEBPACK_IMPORTED_MODULE_5__]);
([lucide_react__WEBPACK_IMPORTED_MODULE_2__, _context_AuthContext__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase__WEBPACK_IMPORTED_MODULE_4__, firebase_auth__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function Navbar({
  theme
}) {
  const {
    user
  } = (0,_context_AuthContext__WEBPACK_IMPORTED_MODULE_3__/* .useAuth */ .aC)();
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();

  const handleSignOut = async () => {
    await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_5__.signOut)(_lib_firebase__WEBPACK_IMPORTED_MODULE_4__/* .auth */ .I);
    router.push("/login");
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("nav", {
    className: `w-full py-4 px-6 flex justify-between items-center z-30 relative
        ${theme === "dark" ? "bg-[#181824]/80 border-b border-fuchsia-400/20 shadow-lg" : "bg-white/80 border-b border-cyan-400/20 shadow-lg"}
        backdrop-blur-xl transition-all duration-300`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
      href: "/",
      className: "flex items-center gap-2 group",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_2__.LayoutGrid, {
        className: "h-7 w-7 text-pink-500 group-hover:rotate-12 transition-transform duration-300"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("span", {
        className: "font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-neon",
        children: "LISTO"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: "flex items-center gap-6",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
        href: "/",
        className: "flex items-center gap-1 hover:text-blue-500 transition-colors",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_2__.Home, {
          className: "h-5 w-5"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("span", {
          className: "hidden sm:inline",
          children: "Home"
        })]
      }), user && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
        href: "/dashboard",
        className: "flex items-center gap-1 hover:text-purple-500 transition-colors",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_2__.LayoutGrid, {
          className: "h-5 w-5"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("span", {
          className: "hidden sm:inline",
          children: "Dashboard"
        })]
      }), user ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
          href: "/profile",
          className: "flex items-center gap-1 hover:text-pink-500 transition-colors",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_2__.User, {
            className: "h-5 w-5"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("span", {
            className: "hidden sm:inline",
            children: "Profile"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("button", {
          onClick: handleSignOut,
          className: "flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-neon hover:scale-105 transition-all",
          title: "Sign out",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(lucide_react__WEBPACK_IMPORTED_MODULE_2__.LogOut, {
            className: "h-5 w-5"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx("span", {
            className: "hidden sm:inline",
            children: "Sign Out"
          })]
        })]
      }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx((next_link__WEBPACK_IMPORTED_MODULE_0___default()), {
        href: "/login",
        className: "px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-neon hover:scale-105 transition-all",
        children: "Login"
      })]
    })]
  });
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;