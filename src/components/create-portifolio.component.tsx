"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePortifolio } from "@/hooks/portifio.hook";
import { currencyMask } from "@/utils/masks";
import { IPortifolio } from "@/interfaces/portfolio.interface";
import toast from "react-hot-toast";

type Props = {
  closeModal: () => void;
};

export const CreatePortifolio: React.FC<Props> = ({ closeModal }) => {
  const { createPortifolio } = usePortifolio();

  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setisLoading(true);
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const initialAmount = (data.initialAmount as string).replace("$", "");

      await createPortifolio({
        name: data.name,
        initialAmount: parseFloat(initialAmount),
      } as IPortifolio);
      closeModal();
      toast.success("Successfully create portfolio!");
    } catch (error) {
      toast.error("Fail to create portfolio");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <label htmlFor="name" className="text-sm font-medium">
        Portifolio name
      </label>
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="Enter the name of the portifolio"
        className="mb-5"
      />
      <label htmlFor="initialAmount" className="text-sm font-medium">
        Inital Amount
      </label>
      <Input
        id="initialAmount"
        name="initialAmount"
        type="text"
        placeholder="Enter the inital amount of the portifolio"
        onChange={currencyMask}
      />
      <Button type="submit" variant="success" disabled={isLoading}>
        Create
      </Button>
    </form>
  );
};
