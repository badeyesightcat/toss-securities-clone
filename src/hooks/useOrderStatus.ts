import { useOrderStore } from "@/store/orderStore";
import { OrderStatusEvent } from "@/types/order";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const TERMINAL_STATUSES = new Set(["filled", "cancelled", "rejected"]);

export function useOrderStatus(orderId: string | null) {
  const updateOrderStatus = useOrderStore((s) => s.updateOrderStatus);
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // No orderId yet (before submission) — do nothing
    if (!orderId) return;

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/orders/${orderId}/status`,
    );
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const msg: OrderStatusEvent = JSON.parse(event.data);

      // 1. Update Zustand — triggers re-render in OrderStatusFeed
      updateOrderStatus(
        msg.orderId,
        msg.status,
        msg.filledQuantity,
        msg.averagePrice,
      );

      // 2. On fill: invalidate portfolio so holdings refresh
      if (msg.status === "filled") {
        queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        ws.close(); // terminal state — no more events expected
      }

      // 3. On terminal status: close the socket
      if (TERMINAL_STATUSES.has(msg.status)) {
        ws.close();
      }
    };

    ws.onerror = () => {
      // Fallback: poll order status if WS fails
      console.warn(`WS failed for order ${orderId}, consider polling fallback`);
    };

    // Cleanup: always close on unmount or orderId change
    return () => ws.close();
    // eslint-disable-next-line
  }, [orderId]); // reconnects only when orderId changes
}
