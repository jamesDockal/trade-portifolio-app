import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export function TradesTable() {
  const trades = [
    {
      id: 1,
      ticker: "TSLA",
      entry_price: 1,
      exit_price: 2,
      quantity: 10,
      date: new Date(),
    },
    {
      id: 2,
      ticker: "TSLA",
      entry_price: 1000,
      exit_price: 2000,
      quantity: 10,
      date: new Date(),
    },
    {
      id: 3,
      ticker: "TSLA",
      entry_price: 1000,
      exit_price: 2000,
      quantity: 10,
      date: new Date(),
    },
    {
      id: 4,
      ticker: "TSLA",
      entry_price: 1000,
      exit_price: 2000,
      quantity: 10,
      date: new Date(),
    },
  ];

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
        {trades.map((trade) => (
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
