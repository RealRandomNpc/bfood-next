import { useCartContext } from "@/providers/CartProvider";
import { cn } from "@/utils/cn";
import React from "react";

function CartActionBtn({ text = "לתשלום", className, onClick = () => {} }) {
  const { cartAmount, cartPrice } = useCartContext();

  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-b-primary-default flex items-center gap-2 rounded-lg py-3 px-3 w-full text-b-bg-primary font-semibold active:brightness-95",
        className
      )}
    >
      <div className="grid place-items-center aspect-square w-8 text-sm rounded-full p-1 bg-b-text-900 text-b-bg-primary font-normal">
        <span>{cartAmount}</span>
      </div>
      <span className="text-lg ">{text}</span>
      <span className="mr-auto">{cartPrice.toFixed(2)} ₪</span>
    </button>
  );
}

export default CartActionBtn;
