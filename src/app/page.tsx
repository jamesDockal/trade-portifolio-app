"use client";

import { usePortifolio } from "@/hooks/portifio.hook";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { TradesTable } from "@/components/trades-table.component";
import { AddPortifolio } from "@/components/add-portifolio.component";
import { AddTrade } from "@/components/add-trade.component";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { currentPortifolio, portifolios, isLoading } = usePortifolio();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full flex items-center">
        <div className="flex gap-10">
          {currentPortifolio && (
            <div className="bg-primary-foreground w-[250px]">
              <Select value={currentPortifolio?.name}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a portifolio" />
                </SelectTrigger>
                <SelectContent>
                  {portifolios.map(({ name, id }) => (
                    <SelectItem key={id} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <AddPortifolio />

          {currentPortifolio && <AddTrade />}
        </div>
      </div>

      {currentPortifolio && (
        <div className="mt-10">
          <TradesTable />
        </div>
      )}
    </div>
  );
}
