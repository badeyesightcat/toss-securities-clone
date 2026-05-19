export type OrderSide = "buy" | "sell";
export type OrderType = "market" | "limit";

export type OrderStatus =
  | "idle" // not submitted yet
  | "pending" // submitted, awaiting exchange ack
  | "partial" // partially filled
  | "filled" // fully executed
  | "cancelled" // cancelled before fill
  | "rejected"; // rejected by exchange

export interface OrderFormValues {
  ticker: string;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  limitPrice?: number; // only when type === "limit"
}

export interface PlacedOrder {
  orderId: string;
  ticker: string;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  limitPrice?: number;
  placedAt: string; // ISO 8601
  status: OrderStatus;
}

export interface OrderStatusEvent {
  orderId: string;
  status: OrderStatus;
  filledQuantity: number;
  averagePrice?: number;
  updatedAt: string;
}
