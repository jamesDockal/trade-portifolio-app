"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

export default function Home() {
  const { currentPortifolio, portifolios } = usePortifolio();

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center ">
        <div className="flex gap-10">
          <AddPortifolio />

          <Button size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>
        </div>

        <div className="bg-primary-foreground w-[150px]">
          <Select value={currentPortifolio.name}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a portifolio" />
            </SelectTrigger>
            <SelectContent>
              {portifolios.map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-10">
        <TradesTable />
      </div>
    </div>
  );
}
