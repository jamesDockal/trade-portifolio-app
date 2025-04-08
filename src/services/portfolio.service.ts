import { IPortifolio } from "@/interfaces/portfolio.interface";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class PortfolioService {
  private readonly api = axios.create({
    baseURL: url,
  });

  createTrade = async (payload: IPortifolio) => {
    const response = await this.api.post("/portfolios", payload);
    return response.data;
  };
}
