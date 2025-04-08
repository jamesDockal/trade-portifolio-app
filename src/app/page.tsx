"use client";

import { usePortfolio } from "@/hooks/portfolio.hook";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { TradesTable } from "@/components/trades-table.component";
import { AddTrade } from "@/components/add-trade.component";
import { ChartArea, Loader2, Table } from "lucide-react";
import { AddPortfolio } from "@/components/add-portfolio.component";
import { useState } from "react";
import { TradesChart } from "@/components/trades-chart.component";
import { ITrade } from "@/interfaces/trade.interface";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { currentPortfolio, portfolios, isLoading, changeCurrentPortfolio } =
    usePortfolio();

  const [isFocusingInChart, setIsFocusingInChart] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const formatToCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const calculatePNL = (trade: ITrade): number => {
    const { entry_price, exit_price, quantity } = trade;
    const pnl = (exit_price - entry_price) * quantity;
    return Math.round(pnl * 100) / 100;
  };

  const totalPnL =
    currentPortfolio?.trades?.reduce(
      (acc, trade) => acc + calculatePNL(trade),
      0
    ) ?? 0;
  const isPositive = totalPnL >= 0;

  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between flex-wrap gap-6">
        <div className="flex-1 flex flex-col lg:flex-row items-center gap-6 w-full flex-wrap">
          {currentPortfolio && (
            <div className="bg-primary-foreground w-full lg:w-[250px]">
              <Select
                value={currentPortfolio?.id.toString()}
                onValueChange={changeCurrentPortfolio}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a portfolio" />
                </SelectTrigger>
                <SelectContent>
                  {portfolios.map(({ name, id }) => (
                    <SelectItem key={id} value={id.toString()}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <AddPortfolio />

          {currentPortfolio && <AddTrade />}
        </div>

        <Card className="w-full lg:w-auto border border-muted bg-background shadow-sm rounded-xl">
          <CardContent className="flex flex-col items-center justify-center text-center px-6 py-3">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Total PnL
            </span>
            <span
              className={`text-xl font-semibold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatToCurrency(totalPnL)}
            </span>
          </CardContent>
        </Card>
      </div>

      {currentPortfolio && (
        <div className="mt-10">
          <div className="flex justify-end gap-2">
            <div
              className={`${
                !isFocusingInChart && "bg-primary text-secondary"
              } cursor-pointer p-2 rounded`}
              onClick={() => setIsFocusingInChart(false)}
            >
              <Table />
            </div>
            <div
              className={`${
                isFocusingInChart && "bg-primary text-secondary"
              } cursor-pointer p-2 rounded`}
              onClick={() => setIsFocusingInChart(true)}
            >
              <ChartArea />
            </div>
          </div>
          {isFocusingInChart ? <TradesChart /> : <TradesTable />}
        </div>
      )}
    </div>
  );
}
