"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePortifolio } from "@/components/create-portifolio.component";
import { usePortifolio } from "@/hooks/portifio.hook";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { TradesTable } from "@/components/trades-table.component";

export default function Home() {
  const { currentPortifolio, portifolios } = usePortifolio();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center ">
        <div className="flex gap-10">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Portfolio
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Portfolio</DialogTitle>
              </DialogHeader>
              <CreatePortifolio closeModal={() => setOpen(false)} />
            </DialogContent>
          </Dialog>

          <Button size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>
        </div>

        <div className="bg-primary-foreground">
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
      {currentPortifolio?.name}

      <div className="mt-10">
        <TradesTable />
      </div>
    </div>
  );
}
