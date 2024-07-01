import React from 'react';
import Image from 'next/image';
import { Token } from '../types';

interface TokenSelectorProps {
  tokens: Token[];
  onSelect: (token: Token) => void;
  showTokens: boolean;
  setShowTokens: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tokenFilter: string;
  filterTokens: (filter: string) => void;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  selectedToken: Token | null;  // เพิ่ม prop นี้
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  tokens,
  onSelect,
  showTokens,
  setShowTokens,
  searchTerm,
  handleSearch,
  tokenFilter,
  filterTokens,
  handleScroll,
  selectedToken,  // เพิ่ม prop นี้
}) => (
  <div className="relative">
    <button
      onClick={() => setShowTokens(!showTokens)}
      className="bg-white text-base sm:text-lg font-semibold focus:outline-none rounded-lg px-2 py-1 sm:px-3 sm:py-2 flex items-center"
    >
      {selectedToken ? (  // ใช้ selectedToken แทน tokens[0]
        <>
          <Image
            src={selectedToken.image}
            alt={selectedToken.symbol}
            width={24}
            height={24}
            className="mr-2"
          />
          <span>{selectedToken.symbol}</span>
        </>
      ) : (
        <span>Select Token</span>
      )}
      <svg
        className="w-4 h-4 ml-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
    {showTokens && (
      <div className="absolute right-0 mt-2 py-2 w-64 bg-white rounded-md shadow-xl z-20">
        <input
          type="text"
          placeholder="Search tokens"
          value={searchTerm}
          onChange={handleSearch}  // แก้ไขตรงนี้
          className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none"
        />
        <div className="flex flex-wrap gap-2 p-2">
          {["All", "New", "Gainers 24h", "Losers 24h", "Top Stable"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => filterTokens(filter)}
                className={`px-2 py-1 text-xs rounded ${
                  tokenFilter === filter
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
        <div
          className="max-h-60 overflow-y-auto"
          onScroll={handleScroll}  // แก้ไขตรงนี้
        >
          {tokens.map((token) => (
            <button
              key={token.id}
              onClick={() => onSelect(token)}
              className="flex items-center w-full px-3 py-2 hover:bg-gray-100"
            >
              <Image
                src={token.image}
                alt={token.symbol}
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="text-sm">{token.symbol}</span>
              <span className="text-xs text-gray-500 ml-2">{token.name}</span>
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);