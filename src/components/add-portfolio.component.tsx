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

export const AddPortfolio: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="w-full lg:w-[150px]">
          <Plus className="mr-2 h-4 w-4" />
          Create Portfolio
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Portfolio</DialogTitle>
        </DialogHeader>
        <CreatePortfolio closeModal={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
