"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/hooks/portfolio.hook";
import { currencyMask } from "@/utils/masks";
import { DatePicker } from "./datepicker.component";
import toast from "react-hot-toast";
import { ITrade } from "@/interfaces/trade.interface";

type Props = {
  closeModal: () => void;
};

export const CreateTrade: React.FC<Props> = ({ closeModal }) => {
  const { addTradeToPortfolio } = usePortfolio();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const entry_price = (data.entry_price as string).replace("$", "");
      const exit_price = (data.exit_price as string).replace("$", "");

      await addTradeToPortfolio({
        ...data,
        entry_price: parseFloat(entry_price),
        exit_price: parseFloat(exit_price),
        date: date!,
      } as ITrade);
      closeModal();
      toast.success("Traded add successfully");
    } catch (error) {
      toast.error("Fail to create portfolio");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <div className="flex flex-col">
        <label htmlFor="ticker" className="text-sm font-medium">
          Ticket
        </label>
        <Input
          id="ticker"
          name="ticker"
          type="text"
          placeholder="Enter the name of the ticker"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="entry_price" className="text-sm font-medium">
          Entry Price
        </label>
        <Input
          id="entry_price"
          name="entry_price"
          type="text"
          placeholder="Enter the entry price of the ticker"
          onChange={currencyMask}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="exit_price" className="text-sm font-medium">
          Exit Price
        </label>
        <Input
          id="exit_price"
          name="exit_price"
          type="text"
          placeholder="Enter the exit price of the ticker"
          onChange={currencyMask}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantity
        </label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          placeholder="Enter the number of tickers purchased"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="date" className="text-sm font-medium">
          Date
        </label>
        <DatePicker date={date} setDate={setDate} />
      </div>

      <Button
        className="mt-10"
        type="submit"
        variant="success"
        disabled={isLoading}
      >
        Add
      </Button>
    </form>
  );
};
