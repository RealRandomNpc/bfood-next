import React from 'react'
import CartItem from './CartItem';
import { useCartContext } from '@/providers/CartProvider';

function CartDetails() {
  const { cartItems } = useCartContext();
  return (
    <div className="grow w-full flex flex-col gap-2 p-4 rounded-xl border border-b-b-product-border mt-1 overflow-y-auto">
    {cartItems.map((item, idx) => (
      <CartItem key={idx} item={item} cartItemIndex={idx} />
    ))}
    </div>
  )
}

export default CartDetails