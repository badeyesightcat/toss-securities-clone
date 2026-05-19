import { OrderFormValues, PlacedOrder } from "@/types/order";

export async function PlaceOrder(
  values: OrderFormValues,
): Promise<PlacedOrder> {
  const res = await fetch("api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    // Parse the error body so useMutation's error state
    // contains the exchange's rejection reason
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? "Order failed");
  }

  return res.json();
}
