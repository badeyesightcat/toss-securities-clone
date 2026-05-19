"use client";

import { usePlaceOrder } from "@/hooks/usePlaceOrder";
import type { OrderFormValues, OrderSide, OrderType } from "@/types/order";
import { useState } from "react";

interface Props {
  ticker: string;
  side: OrderSide;
}

export function OrderForm({ ticker, side }: Props) {
  const mutation = usePlaceOrder();

  // Local form state — doesn't touch Zustand until submission
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [quantity, setQuantity] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const formValues: OrderFormValues = {
    ticker,
    side,
    type: orderType,
    quantity: Number(quantity),
    limitPrice: orderType === "limit" ? Number(limitPrice) : undefined,
  };

  const isValid =
    Number(quantity) > 0 && (orderType === "market" || Number(limitPrice) > 0);

  const handleSubmit = () => {
    setShowConfirm(false);
    mutation.mutate(formValues, {
      onSuccess: () => {
        // Reset form after successful submission
        setQuantity("");
        setLimitPrice("");
      },
    });
  };

  // After success — switch to showing the order status
  if (mutation.isSuccess && mutation.data) {
    return <OrderStatusFeed orderId={mutation.data.orderId} />;
  }

  return (
    <div>
      {/* Order type toggle: Market / Limit */}
      {/* Quantity input */}
      {/* Limit price input — only shown when type === "limit" */}
      {/* Estimated total (quantity × current price) */}

      {mutation.isError && (
        <p
          role="alert"
          className="text-shadow-red-500"
        >
          {mutation.error?.message ?? "Order failed. Try again."}
        </p>
      )}

      <button
        onClick={() => setShowConfirm(true)}
        disabled={!isValid || mutation.isPending}
      >
        {mutation.isPending
          ? "Placing order..."
          : `${side === "buy" ? "Buy" : "Sell"} ${ticker}`}
      </button>

      {showConfirm && (
        <OrderConfirmModal
          values={formValues}
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
