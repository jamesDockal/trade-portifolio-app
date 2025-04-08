"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePortfolio } from "@/hooks/portfolio.hook";
import { format } from "date-fns";

export function TradesTable() {
  const { currentPortfolio } = usePortfolio();

  const formatToCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ticket</TableHead>
          <TableHead>Entry Price</TableHead>
          <TableHead>Exit Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>PnL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentPortfolio?.trades?.map((trade) => (
          <TableRow key={trade.id}>
            <TableCell>{trade.ticker}</TableCell>
            <TableCell>{formatToCurrency(trade.exit_price)}</TableCell>
            <TableCell>{formatToCurrency(trade.entry_price)}</TableCell>
            <TableCell>{trade.quantity}</TableCell>
            <TableCell>{format(trade.date, "MM/dd/yyyy")}</TableCell>
            <TableCell>
              {(trade.exit_price - trade.entry_price) * trade.quantity}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
