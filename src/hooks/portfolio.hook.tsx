"use client";

import { IPortfolio } from "@/interfaces/portfolio.interface";
import { PortfolioService } from "@/services/portfolio.service";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";

export type ITrade = {
  id: number;
  ticker: string;
  entry_price: number;
  exit_price: number;
  quantity: number;
  date: Date;
};

type IPortfolioContext = {
  currentPortfolio: IPortfolio | null;
  createPortfolio: (data: IPortfolio) => Promise<void>;
  addTradeToPortfolio: (data: ITrade) => void;
  portfolios: IPortfolio[];
  isLoading: boolean;
  changeCurrentPortfolio: (id: number | string) => void;
};

const PortfolioContext = createContext<IPortfolioContext>(
  {} as IPortfolioContext
);

export const PortfolioProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const portfolioService = new PortfolioService();

  const [currentPortfolio, setCurrentPortfolio] = useState<IPortfolio | null>(
    null
  );
  const [portfolios, setPortfolios] = useState([] as IPortfolio[]);
  const [isLoading, setIsLoading] = useState(true);

  const createPortfolio = async (data: IPortfolio) => {
    const newPortfolio = await portfolioService.createTrade(data);

    setCurrentPortfolio(newPortfolio);
    setPortfolios((oldState) => [...oldState, newPortfolio]);
  };

  const addTradeToPortfolio = (newTrade: ITrade) => {
    setCurrentPortfolio(
      (oldState) =>
        ({
          ...oldState,
          trades: [...(oldState?.trades || []), newTrade],
        } as IPortfolio)
    );
  };

  const getAllPortfolios = async () => {
    try {
      setIsLoading(true);
      const allPortfolios = await portfolioService.getPortfolios();
      setPortfolios(allPortfolios);
      setCurrentPortfolio(allPortfolios[0]);
    } catch {
      toast.error("Fail to get portfolios");
    } finally {
      setIsLoading(false);
    }
  };

  const changeCurrentPortfolio = (id: number | string) => {
    const selectedPortfolio = portfolios.find(
      (portfolio) => portfolio.id == id
    );
    if (selectedPortfolio) {
      setCurrentPortfolio(selectedPortfolio);
    }
  };

  useEffect(() => {
    getAllPortfolios();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        currentPortfolio,
        createPortfolio,
        portfolios,
        addTradeToPortfolio,
        isLoading,
        changeCurrentPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  return useContext(PortfolioContext);
};
