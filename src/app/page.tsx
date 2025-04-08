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
import { Loader2 } from "lucide-react";
import { AddPortfolio } from "@/components/add-portfolio.component";

export default function Home() {
  const { currentPortfolio, portfolios, isLoading } = usePortfolio();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full flex items-center">
        <div className="flex gap-10">
          {currentPortfolio && (
            <div className="bg-primary-foreground w-[250px]">
              <Select value={currentPortfolio?.name}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a portfolio" />
                </SelectTrigger>
                <SelectContent>
                  {portfolios.map(({ name, id }) => (
                    <SelectItem key={id} value={name}>
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
      </div>

      {currentPortfolio?.trades?.length && (
        <div className="mt-10">
          <TradesTable />
        </div>
      )}
    </div>
  );
}
