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
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ITrade } from "@/interfaces/trade.interface";

export function TradesTable() {
  const { currentPortfolio } = usePortfolio();

  const formatToCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const calculatePNL = (trade: ITrade) => {
    return (trade.exit_price - trade.entry_price) * trade.quantity;
  };

  const trades = currentPortfolio?.trades;

  if (!trades?.length) {
    return (
      <Card className="max-w-md mx-auto text-center p-6 flex flex-col items-center gap-4">
        <AlertCircle className="text-muted-foreground w-10 h-10" />
        <CardContent className="p-0">
          <h3 className="text-lg font-semibold">No Trades Registered</h3>
        </CardContent>
      </Card>
    );
  }

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
        {trades?.map((trade) => (
          <TableRow key={trade.id}>
            <TableCell>{trade.ticker}</TableCell>
            <TableCell>{formatToCurrency(trade.exit_price)}</TableCell>
            <TableCell>{formatToCurrency(trade.entry_price)}</TableCell>
            <TableCell>{trade.quantity}</TableCell>
            <TableCell>{format(trade.date, "MM/dd/yyyy")}</TableCell>
            <TableCell>{formatToCurrency(calculatePNL(trade))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
