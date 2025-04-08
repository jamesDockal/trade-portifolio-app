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

  return (
    <div className="w-full overflow-hidden">
        <div className="flex flex-col md:flex-row items-centetr gap-10">
          {currentPortfolio && (
            <div className="bg-primary-foreground w-full md:w-[250px]">
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
