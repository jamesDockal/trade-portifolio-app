"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ITrade = {
  id: number;
  ticker: string;
  entry_price: number;
  exit_price: number;
  quantity: number;
  date: Date;
};

export type IPortifolio = {
  name: string;
  initialAmount: number;
  trades: ITrade[];
};

type IPortifolioContext = {
  currentPortifolio: IPortifolio | null;
  createPortifolio: (data: IPortifolio) => void;
  addTradeToPortifolio: (data: ITrade) => void;
  portifolios: IPortifolio[];
};

const PortifolioContext = createContext<IPortifolioContext>(
  {} as IPortifolioContext
);

export const PortifolioProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [currentPortifolio, setCurrentPortifolio] =
    useState<IPortifolio | null>(null);
  const [portifolios, setPortifolios] = useState([] as IPortifolio[]);

  const createPortifolio = (data: IPortifolio) => {
    setCurrentPortifolio(data);
    setPortifolios((oldState) => [...oldState, data]);
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
