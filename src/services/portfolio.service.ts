import { IPortfolio } from "@/interfaces/portfolio.interface";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class PortfolioService {
  private readonly api = axios.create({
    baseURL: url,
  });

  async createTrade(payload: IPortfolio) {
    const response = await this.api.post("/portfolios", payload);
    return response.data;
  }

  async getPortfolios() {
    const response = await this.api.get("/portfolios");
    return response.data;
  }
}
