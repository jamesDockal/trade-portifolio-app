"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePortifolio } from "@/components/create-portifolio.component";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export const AddPortifolio: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
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
  );
};
