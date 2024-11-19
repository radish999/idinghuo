// src/WalletButton/index.tsx
import React from "react";
import { Button } from "@mui/material";
import { useWallet } from "@idinghuo/hooks";

// src/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/WalletButton/index.tsx
var WalletButton = ({
  className,
  connectText = "\u8FDE\u63A5\u94B1\u5305",
  disconnectText = "\u65AD\u5F00\u8FDE\u63A5"
}) => {
  const { isConnected, address, connect, disconnect } = useWallet();
  return /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: isConnected ? disconnect : connect,
      className: cn(
        "px-4 py-2 rounded-lg font-medium",
        isConnected ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600",
        className
      )
    },
    isConnected ? /* @__PURE__ */ React.createElement(React.Fragment, null, disconnectText, address && /* @__PURE__ */ React.createElement("span", { className: "ml-2 text-sm opacity-80" }, "(", address.slice(0, 6), "...", address.slice(-4), ")")) : connectText
  );
};

// src/Card/index.tsx
import React2 from "react";
import { Card as MuiCard, CardContent, CardHeader } from "@mui/material";
var Card = ({
  title,
  children,
  className
}) => {
  return /* @__PURE__ */ React2.createElement(MuiCard, { className: cn("rounded-lg shadow", className) }, title && /* @__PURE__ */ React2.createElement(CardHeader, { title }), /* @__PURE__ */ React2.createElement(CardContent, null, children));
};
export {
  Card,
  WalletButton,
  cn
};
