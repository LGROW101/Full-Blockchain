"use client";

import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { useTokens } from '../hooks/useTokens';
import { SwapForm } from './SwapForm';
import { Token } from '../types';

export default function SwapPage() {
  const { account, balance, connectWallet } = useWeb3();
  const {
    tokens,
    displayedTokens, 
    tokenFilter,
    searchTerm,
    setSearchTerm,
    filterTokens,
    handleSearch,
    handleScroll,
  } = useTokens();

  const [tokenIn, setTokenIn] = useState<Token | null>(null);
  const [tokenOut, setTokenOut] = useState<Token | null>(null);
  const [amountIn, setAmountIn] = useState<string>("0.1");
  const [amountOut, setAmountOut] = useState<string>("0");
  const [showTokensIn, setShowTokensIn] = useState<boolean>(false);
  const [showTokensOut, setShowTokensOut] = useState<boolean>(false);

  useEffect(() => {
    if (tokens.length > 0) {
      setTokenIn(tokens[0]);
      setTokenOut(tokens[1]);
    }
  }, [tokens]);

  useEffect(() => {
    const calculateOutputAmount = () => {
      if (tokenIn && tokenOut && amountIn) {
        const amount = parseFloat(amountIn);
        if (!isNaN(amount) && amount > 0) {
          const exchangeRate = tokenIn.current_price / tokenOut.current_price;
          setAmountOut((amount * exchangeRate).toFixed(6));
          console.log(`Exchange rate: 1 ${tokenIn.symbol} = ${exchangeRate.toFixed(6)} ${tokenOut.symbol}`);
        } else {
          setAmountOut("0");
        }
      }
    };
  
    calculateOutputAmount();
  }, [tokenIn, tokenOut, amountIn]);

  const handleAmountInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmountIn(value);
    }
  };

  const handleTokenInSelect = (token: Token) => {
    console.log("Selected token in:", token);
    setTokenIn(token);
    setShowTokensIn(false);
  };
  
  const handleTokenOutSelect = (token: Token) => {
    console.log("Selected token out:", token);
    setTokenOut(token);
    setShowTokensOut(false);
  };

  const swapTokens = async () => {
    if (tokenIn && tokenOut && amountIn && amountOut && account) {
      console.log("Swapping tokens...");
      // ในการใช้งานจริง คุณจะต้องเชื่อมต่อกับ smart contract ของ DEX บน BSC
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Swap
        </h1>
        <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
          Trade tokens in an instant
        </p>

        {account && (
          <div className="mb-4 text-center">
            <p>Connected: {account}</p>
            <p>Balance: {balance} BNB</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <SwapForm
            amountIn={amountIn}
            amountOut={amountOut}
            handleAmountInChange={handleAmountInChange}
            displayedTokens={displayedTokens} 
            handleTokenInSelect={handleTokenInSelect}
            handleTokenOutSelect={handleTokenOutSelect}
            showTokensIn={showTokensIn}
            showTokensOut={showTokensOut}
            setShowTokensIn={setShowTokensIn}
            setShowTokensOut={setShowTokensOut}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            tokenFilter={tokenFilter}
            filterTokens={filterTokens}
            handleScroll={handleScroll}
          />

          {account ? (
            <button
              onClick={swapTokens}
              className="w-full bg-blue-500 text-white rounded-lg py-3 px-4 mt-6 hover:bg-blue-600 transition duration-300 focus:outline-none text-lg font-semibold"
            >
              Swap
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="w-full bg-blue-500 text-white rounded-lg py-3 px-4 mt-6 hover:bg-blue-600 transition duration-300 focus:outline-none text-lg font-semibold"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}