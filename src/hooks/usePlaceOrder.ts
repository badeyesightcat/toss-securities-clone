import { placeOrder } from "@/lib/api/orders";
import { OrderFormValues } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/* // What you get back
const mutation = usePlaceOrder();

mutation.mutate(formValues); // submit the order

mutation.isPending; // true while POST is in flight
mutation.isSuccess; // true after onSuccess fires
mutation.isError; // true if the POST threw
mutation.error?.message; // exchange rejection reason
mutation.data; // the PlacedOrder returned on success
mutation.reset(); // clear back to idle state
*/

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
