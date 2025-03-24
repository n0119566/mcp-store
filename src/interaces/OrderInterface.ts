export interface IOrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  customer: string;
  items: IOrderItem[];
  totalAmount: number;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod?: "credit_card" | "debit_card" | "paypal" | "cash";
  createdAt?: Date;
}
