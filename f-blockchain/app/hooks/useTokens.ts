"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Token } from '../types';

export const useTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [displayedTokens, setDisplayedTokens] = useState<Token[]>([]);
  const [tokenFilter, setTokenFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
            },
          }
        );
  
        const fetchedTokens = response.data.map((coin: any) => ({
          id: coin.id,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          image: coin.image,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
        }));
  
        console.log("Fetched tokens:", fetchedTokens);  
        setTokens(fetchedTokens);
        setDisplayedTokens(fetchedTokens.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch token data:", error);
      }
    };
  
    fetchTokenData();
  }, []);

  const filterTokens = (filter: string) => {
    setTokenFilter(filter);
    let filteredTokens: Token[] = [];
    switch (filter) {
      case "New":
        filteredTokens = tokens.slice(0, 10);
        break;
      case "Gainers 24h":
        filteredTokens = tokens
          .slice()
          .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        break;
      case "Losers 24h":
        filteredTokens = tokens
          .slice()
          .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
        break;
      case "Top Stable":
        filteredTokens = tokens.filter((token) => Math.abs(token.price_change_percentage_24h) < 1);
        break;
      default:
        filteredTokens = tokens;
    }
    setDisplayedTokens(filteredTokens.slice(0, 6));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = tokens.filter(
      (token) =>
        token.symbol.toLowerCase().includes(searchTerm) ||
        token.name.toLowerCase().includes(searchTerm)
    );
    setDisplayedTokens(filtered.slice(0, 6));
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollTop + clientHeight === scrollHeight) {
      const currentLength = displayedTokens.length;
      const nextTokens = tokens.slice(currentLength, currentLength + 6);
      setDisplayedTokens((prev) => [...prev, ...nextTokens]);
    }
  };

  return {
    tokens,
    displayedTokens,
    tokenFilter,
    searchTerm,
    setSearchTerm,
    filterTokens,
    handleSearch,
    handleScroll,
  };
};