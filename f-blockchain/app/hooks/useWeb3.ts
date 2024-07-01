"use client";

import { useState, useEffect } from 'react';
import Web3 from 'web3';

// เพิ่มการประกาศ type สำหรับ window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    const initWeb3 = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.log("Please install MetaMask!");
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      if (web3 && account) {
        try {
          const balance = await web3.eth.getBalance(account);
          setBalance(web3.utils.fromWei(balance, "ether"));
        } catch (error) {
          console.error("Failed to get balance:", error);
        }
      }
    };

    getBalance();
  }, [web3, account]);

  const connectWallet = async () => {
    if (web3 && window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error("Ethereum object not found, install MetaMask.");
    }
  };

  return { web3, account, balance, connectWallet };
};