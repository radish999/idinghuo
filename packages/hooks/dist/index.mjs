var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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

// src/useWallet.ts
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
var useWallet = () => {
  const [state, setState] = useState({
    address: null,
    balance: null,
    chainId: null,
    isConnected: false,
    error: null
  });
  const updateWalletState = useCallback(async (address) => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("No ethereum wallet found");
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();
      setState({
        address,
        balance: ethers.utils.formatEther(balance),
        chainId: network.chainId,
        isConnected: true,
        error: null
      });
    } catch (error) {
      setState((prev) => __spreadProps(__spreadValues({}, prev), { error }));
    }
  }, []);
  const connect = useCallback(async () => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("No ethereum wallet found");
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts[0])
        await updateWalletState(accounts[0]);
    } catch (error) {
      setState((prev) => __spreadProps(__spreadValues({}, prev), { error }));
    }
  }, [updateWalletState]);
  const disconnect = useCallback(() => {
    setState({
      address: null,
      balance: null,
      chainId: null,
      isConnected: false,
      error: null
    });
  }, []);
  useEffect(() => {
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
export {
  useWallet
};
