"use client";

import { IPortifolio } from "@/interfaces/portfolio.interface";
import { PortfolioService } from "@/services/portfolio.service";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type ITrade = {
  id: number;
  ticker: string;
  entry_price: number;
  exit_price: number;
  quantity: number;
  date: Date;
};

type IPortifolioContext = {
  currentPortifolio: IPortifolio | null;
  createPortifolio: (data: IPortifolio) => Promise<void>;
  addTradeToPortifolio: (data: ITrade) => void;
  portifolios: IPortifolio[];
};

const PortifolioContext = createContext<IPortifolioContext>(
  {} as IPortifolioContext
);

export const PortifolioProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const portfolioService = new PortfolioService();

  const [currentPortifolio, setCurrentPortifolio] =
    useState<IPortifolio | null>(null);
  const [portifolios, setPortifolios] = useState([] as IPortifolio[]);

  const createPortifolio = async (data: IPortifolio) => {
    const newPortfolio = await portfolioService.createTrade(data);

    setCurrentPortifolio(newPortfolio);
    setPortifolios((oldState) => [...oldState, newPortfolio]);
  };

  const addTradeToPortifolio = (newTrade: ITrade) => {
    setCurrentPortifolio(
      (oldState) =>
        ({
          ...oldState,
          trades: [...(oldState?.trades || []), newTrade],
        } as IPortifolio)
    );
  };

  return (
    <PortifolioContext.Provider
      value={{
        currentPortifolio,
        createPortifolio,
        portifolios,
        addTradeToPortifolio,
      }}
    >
      {children}
    </PortifolioContext.Provider>
  );
};

export const usePortifolio = () => {
  return useContext(PortifolioContext);
};
