"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePortfolio } from "@/components/create-portfolio.component";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { CreateTrade } from "./create-trade.component";

export const AddTrade: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Add Trade
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Trade</DialogTitle>
        </DialogHeader>
        <CreateTrade closeModal={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
