"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";
import { usePortfolio } from "@/hooks/portfolio.hook";
import { ITrade } from "@/interfaces/trade.interface";
import { format } from "date-fns";

export function TradesChart() {
  const { currentPortfolio } = usePortfolio();

  const calculatePNL = (trade: ITrade): number => {
    const { entry_price, exit_price, quantity } = trade;
    const pnl = (exit_price - entry_price) * quantity;
    return Math.round(pnl * 100) / 100;
  };

  const processedData = useMemo(() => {
    if (!currentPortfolio?.trades) return [];

    return [...currentPortfolio.trades]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((trade) => ({
        date: format(new Date(trade.date), "MM/dd/yyyy"),
        pnl: calculatePNL(trade),
      }));
  }, [currentPortfolio]);

  return (
    <div className="mt-4 -full h-130 p-4 bg-primary rounded-2xl shadow-md pb-10 text-white">
      <h2 className="text-xl font-semibold mb-4">Trades</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={processedData}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" tickMargin={10} />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              borderColor: "#374151",
              color: "#000",
            }}
            labelStyle={{ color: "#000" }}
            itemStyle={{ color: "#000" }}
          />
          <Line
            type="monotone"
            dataKey="pnl"
            stroke="#22c55e"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
