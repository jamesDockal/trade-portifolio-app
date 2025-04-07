"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type IPortifolio = {
  name: string;
  initialAmount: number;
};

type IPortifolioContext = {
  currentPortifolio: IPortifolio;
  createPortifolio: (data: IPortifolio) => void;
  portifolios: IPortifolio[];
};

const PortifolioContext = createContext<IPortifolioContext>(
  {} as IPortifolioContext
);

export const PortifolioProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [currentPortifolio, setCurrentPortifolio] = useState({} as IPortifolio);
  const [portifolios, setPortifolios] = useState([] as IPortifolio[]);

  const createPortifolio = (data: IPortifolio) => {
    setCurrentPortifolio(data);
    setPortifolios((oldState) => [...oldState, data]);
  };

  return (
    <PortifolioContext.Provider
      value={{ currentPortifolio, createPortifolio, portifolios }}
    >
      {children}
    </PortifolioContext.Provider>
  );
};

export const usePortifolio = () => {
  return useContext(PortifolioContext);
};
