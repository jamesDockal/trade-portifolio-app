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

export default function Home() {
  const { currentPortifolio } = usePortifolio();

  return (
    <div>
      <div className="flex gap-10">
        <Dialog>
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
            <CreatePortifolio />
          </DialogContent>
        </Dialog>

        <Button size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>
      {currentPortifolio?.name}
    </div>
  );
}
