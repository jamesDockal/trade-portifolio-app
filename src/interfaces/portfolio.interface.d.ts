import { ITrade } from "@/hooks/portfolio.hook";

export type IPortfolio = {
  id: number;
  name: string;
  initialAmount: number;
  trades: ITrade[];
};
