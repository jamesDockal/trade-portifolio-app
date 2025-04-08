"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ITrade, usePortfolio } from "@/hooks/portfolio.hook";
import { currencyMask } from "@/utils/masks";
import { DatePicker } from "./datepicker.component";
import toast from "react-hot-toast";

type Props = {
  closeModal: () => void;
};

export const CreateTrade: React.FC<Props> = ({ closeModal }) => {
  const { addTradeToPortfolio } = usePortfolio();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data: ITrade = Object.fromEntries(
        formData.entries()
      ) as unknown as ITrade;

      await addTradeToPortfolio({
        ...data,
        date: date!,
      });
      closeModal();
      toast.success("Submitted successfully!");
    } catch (error) {
      toast.error("Fail to create portfolio");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium">
          Ticket
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter the name of the ticket"
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
          placeholder="Enter the entry price of the ticket"
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
          placeholder="Enter the exit price of the ticket"
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
          placeholder="Enter the number of tickets purchased"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="date" className="text-sm font-medium">
          Date
        </label>
        <DatePicker date={date} setDate={setDate} />
      </div>

      <Button className="mt-10" type="submit" variant="success">
        Add
      </Button>
    </form>
  );
};
