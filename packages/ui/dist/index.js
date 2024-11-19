"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Card: () => Card,
  WalletButton: () => WalletButton,
  cn: () => cn
});
module.exports = __toCommonJS(src_exports);

// src/WalletButton/index.tsx
var import_react = __toESM(require("react"));
var import_material = require("@mui/material");
var import_hooks = require("@idinghuo/hooks");

// src/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/WalletButton/index.tsx
var WalletButton = ({
  className,
  connectText = "\u8FDE\u63A5\u94B1\u5305",
  disconnectText = "\u65AD\u5F00\u8FDE\u63A5"
}) => {
  const { isConnected, address, connect, disconnect } = (0, import_hooks.useWallet)();
  return /* @__PURE__ */ import_react.default.createElement(
    import_material.Button,
    {
      onClick: isConnected ? disconnect : connect,
      className: cn(
        "px-4 py-2 rounded-lg font-medium",
        isConnected ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600",
        className
      )
    },
    isConnected ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, disconnectText, address && /* @__PURE__ */ import_react.default.createElement("span", { className: "ml-2 text-sm opacity-80" }, "(", address.slice(0, 6), "...", address.slice(-4), ")")) : connectText
  );
};

// src/Card/index.tsx
var import_react2 = __toESM(require("react"));
var import_material2 = require("@mui/material");
var Card = ({
  title,
  children,
  className
}) => {
  return /* @__PURE__ */ import_react2.default.createElement(import_material2.Card, { className: cn("rounded-lg shadow", className) }, title && /* @__PURE__ */ import_react2.default.createElement(import_material2.CardHeader, { title }), /* @__PURE__ */ import_react2.default.createElement(import_material2.CardContent, null, children));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Card,
  WalletButton,
  cn
});
