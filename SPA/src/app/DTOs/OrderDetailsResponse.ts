import { OrderDetailsProductResponse } from "./OrderDetailsProductResponse";

export interface OrderDetailsResponse {
    orderDate: Date;
    totalPrice: number;
    products: OrderDetailsProductResponse[];
  }
