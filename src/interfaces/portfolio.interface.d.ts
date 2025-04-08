import { ITrade } from "@/hooks/portifio.hook";

export type IPortifolio = {
  name: string;
  initialAmount: number;
  trades: ITrade[];
};
