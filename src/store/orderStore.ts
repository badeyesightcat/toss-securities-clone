import { OrderStatus, PlacedOrder } from "@/types/order";
import { create } from "zustand";

interface OrderState {
  // Map of orderId → PlacedOrder for all active orders
  orders: Record<string, PlacedOrder>;

  addPendigOrder: (order: PlacedOrder) => void;

  // Called by useOrderStatus when a WS event arrives
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    filledQuantity: number,
    averagePrice?: number,
  ) => void;

  clearFilledOrders: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: {},

  addPendigOrder: (order) =>
    set((s) => ({
      orders: { ...s.orders, [order.orderId]: order },
    })),

  updateOrderStatus: (orderId, status, filledQuantity, averagePrice) =>
    set((s) => {
      if (!s.orders[orderId]) return s;

      return {
        orders: {
          ...s.orders,
          [orderId]: {
            ...s.orders[orderId],
            status,
            filledQuantity,
            averagePrice,
          },
        },
      };
    }),

  clearFilledOrders: () =>
    set((s) => ({
      orders: Object.fromEntries(
        Object.entries(s.orders).filter(
          ([, o]) => o.status !== "filled" && o.status !== "cancelled",
        ),
      ),
    })),
}));
