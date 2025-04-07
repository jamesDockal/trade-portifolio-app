import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="flex gap-10">
        <Button size="lg" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Create Portifolio
        </Button>

        <Button size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>
    </div>
  );
}
