export type ITrade = {
  id: number;
  ticker: string;
  entry_price: number;
  exit_price: number;
  quantity: number;
  date: Date;
  portfolioId: number;
};
