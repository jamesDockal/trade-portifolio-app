"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IPortifolio, usePortifolio } from "@/hooks/portifio.hook";
import { currencyMask } from "@/utils/masks";

type Props = {
  closeModal: () => void;
};

export const CreatePortifolio: React.FC<Props> = ({ closeModal }) => {
  const { createPortifolio } = usePortifolio();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: IPortifolio = Object.fromEntries(
      formData.entries()
    ) as unknown as IPortifolio;

    await createPortifolio(data);
    closeModal();
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
      <Button type="submit" variant="success">
        Create
      </Button>
    </form>
  );
};
