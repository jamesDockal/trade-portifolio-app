import { ITrade } from "./trade.interface";

export type IPortfolio = {
  id: number;
  name: string;
  initialAmount: number;
  trades: ITrade[];
};
