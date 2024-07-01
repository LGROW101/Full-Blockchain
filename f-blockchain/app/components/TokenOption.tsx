import React from 'react';
import Image from 'next/image';
import { Token } from '../types';


interface TokenOptionProps {
  token: Token;
  onSelect: () => void;
}

export const TokenOption: React.FC<TokenOptionProps> = ({ token, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none"
    >
      <Image
        src={token.image}
        alt={token.symbol}
        width={24}
        height={24}
        className="mr-2"
      />
      <span className="text-sm">{token.symbol}</span>
    </button>
  );
};