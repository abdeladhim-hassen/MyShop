import { OrderDetailsProductResponse } from "./OrderDetailsProductResponse";

export interface OrderDetailsResponse {
    OrderDate: Date;
    TotalPrice: number;
    Products: OrderDetailsProductResponse[];
  }