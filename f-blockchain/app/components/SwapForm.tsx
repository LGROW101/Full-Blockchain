"use client";

import React from 'react';
import { Token } from '../types';
import { TokenSelector } from './TokenSelector';

interface SwapFormProps {
  amountIn: string;
  amountOut: string;
  handleAmountInChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayedTokens: Token[];
  handleTokenInSelect: (token: Token) => void;
  handleTokenOutSelect: (token: Token) => void;
  showTokensIn: boolean;
  showTokensOut: boolean;
  setShowTokensIn: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTokensOut: React.Dispatch<React.SetStateAction<boolean>>;
  tokenIn: Token | null;
  tokenOut: Token | null;
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tokenFilter: string;
  filterTokens: (filter: string) => void;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
}

export const SwapForm: React.FC<SwapFormProps> = ({
  amountIn,
  amountOut,
  handleAmountInChange,
  displayedTokens,
  handleTokenInSelect,
  handleTokenOutSelect,
  showTokensIn,
  showTokensOut,
  setShowTokensIn,
  setShowTokensOut,
  tokenIn,
  tokenOut,
  searchTerm,
  handleSearch,
  tokenFilter,
  filterTokens,
  handleScroll,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
        <p className="text-gray-600 text-xs sm:text-sm mb-1">You send</p>
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={amountIn}
            onChange={handleAmountInChange}
            className="bg-transparent text-xl sm:text-2xl font-bold focus:outline-none w-1/2"
          />
          <TokenSelector
            tokens={displayedTokens}
            onSelect={handleTokenInSelect}
            showTokens={showTokensIn}
            setShowTokens={setShowTokensIn}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            tokenFilter={tokenFilter}
            filterTokens={filterTokens}
            handleScroll={handleScroll}
            selectedToken={tokenIn}
          />
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
        <p className="text-gray-600 text-xs sm:text-sm mb-1">You get</p>
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={amountOut}
            readOnly
            className="bg-transparent text-xl sm:text-2xl font-bold focus:outline-none w-1/2"
          />
          <TokenSelector
            tokens={displayedTokens}
            onSelect={handleTokenOutSelect}
            showTokens={showTokensOut}
            setShowTokens={setShowTokensOut}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            tokenFilter={tokenFilter}
            filterTokens={filterTokens}
            handleScroll={handleScroll}
            selectedToken={tokenOut}
          />
        </div>
      </div>

      <div className="text-center text-gray-600">
  {tokenIn && tokenOut && (
    <p>
      1 {tokenIn.symbol} ={" "}
      {(tokenIn.current_price / tokenOut.current_price).toFixed(6)}{" "}
      {tokenOut.symbol}
    </p>
  )}
</div>
    </div>
  );
};