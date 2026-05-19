import { placeOrder } from "@/lib/api/orders";
import { OrderFormValues } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePlaceOrder() {
  const queryClient = useQueryClient();
  const addPendingOrder = useOrderStore((s) => s.addPendingOrder);

  return useMutation({
    mutationFn: (values: OrderFormValues) => placeOrder(values),

    onSuccess: (placedOrder) => {
      // 1. Add to Zustand so OrderStatusFeed can track it
      addPendingOrder(placedOrder);

      // 2. Invalidate portfolio — holdings changed after a fill
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });

      // 3. Invalidate buying power — cash changed
      queryClient.invalidateQueries({ queryKey: ["account", "buyingPower"] });
    },

    onError: (error) => {
      // Error is exposed via mutation.error — handle display in the component
      console.error("Order rejected:", error.message);
    },
  });
}
