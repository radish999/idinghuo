"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  useWallet: () => useWallet
});
module.exports = __toCommonJS(src_exports);

// src/useWallet.ts
var import_react = require("react");
var import_ethers = require("ethers");
var useWallet = () => {
  const [state, setState] = (0, import_react.useState)({
    address: null,
    balance: null,
    chainId: null,
    isConnected: false,
    error: null
  });
  const updateWalletState = (0, import_react.useCallback)(async (address) => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("No ethereum wallet found");
      }
      const provider = new import_ethers.ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();
      setState({
        address,
        balance: import_ethers.ethers.utils.formatEther(balance),
        chainId: network.chainId,
        isConnected: true,
        error: null
      });
    } catch (error) {
      setState((prev) => __spreadProps(__spreadValues({}, prev), { error }));
    }
  }, []);
  const connect = (0, import_react.useCallback)(async () => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("No ethereum wallet found");
      }
      const provider = new import_ethers.ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts[0])
        await updateWalletState(accounts[0]);
    } catch (error) {
      setState((prev) => __spreadProps(__spreadValues({}, prev), { error }));
    }
  }, [updateWalletState]);
  const disconnect = (0, import_react.useCallback)(() => {
    setState({
      address: null,
      balance: null,
      chainId: null,
      isConnected: false,
      error: null
    });
  }, []);
  (0, import_react.useEffect)(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts[0])
          updateWalletState(accounts[0]);
        else
          disconnect();
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    };
  }, [updateWalletState, disconnect]);
  return __spreadProps(__spreadValues({}, state), {
    connect,
    disconnect
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useWallet
});
