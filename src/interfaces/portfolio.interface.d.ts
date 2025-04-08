import { ITrade } from "@/hooks/portifio.hook";

export type IPortifolio = {
  id: number;
  name: string;
  initialAmount: number;
  trades: ITrade[];
};
