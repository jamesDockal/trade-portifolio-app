"use client";

import { IPortifolio } from "@/interfaces/portfolio.interface";
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

type IPortifolioContext = {
  currentPortifolio: IPortifolio | null;
  createPortifolio: (data: IPortifolio) => Promise<void>;
  addTradeToPortifolio: (data: ITrade) => void;
  portifolios: IPortifolio[];
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

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

  const getAllPortfolios = async () => {
    try {
      setIsLoading(true);
      const allPortfolios = await portfolioService.getPortfolios();
      setPortifolios(allPortfolios);
      setCurrentPortifolio(allPortfolios[0]);
    } catch {
      toast.error("Fail to get portfolios");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPortfolios();
  }, []);

  return (
    <PortifolioContext.Provider
      value={{
        currentPortifolio,
        createPortifolio,
        portifolios,
        addTradeToPortifolio,
        isLoading,
      }}
    >
      {children}
    </PortifolioContext.Provider>
  );
};

export const usePortifolio = () => {
  return useContext(PortifolioContext);
};
