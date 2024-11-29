import { useCartContext } from '@/providers/CartProvider'
import React from 'react'

function PaymentTotal({deliveryFee = 0}) {
  const {cartPrice} = useCartContext();
  return (
    <div className="py-4 px-3 rounded-xl border border-b-product-border bg-b-gray-100">
    <div className="px-3 mb-3">
      <div className="font-bold mb-5 text-lg">סיכום הזמנה</div>
      <div className="flex justify-between">
        <span>סכום הזמנה</span>
        <span className="font-semibold">{cartPrice}₪</span>
      </div>
      <div className="flex justify-between">
        <span>דמי משלוח</span>
        <span className="font-semibold">{deliveryFee}₪</span>
      </div>
      <div className="h-px bg-b-product-border w-full my-3"></div>
      <div className="flex justify-between">
        <span className="font-semibold">סה&quot;כ</span>
        <span className="font-semibold">{cartPrice + deliveryFee}₪</span>
      </div>
    </div>
    <button className="w-full py-4 text-b-bg-primary bg-b-primary-default rounded-xl text-lg font-bold tracking-wider group/pay relative hover:brightness-95">
      <span className="inset-0 absolute group-active/pay:animate-ping-small bg-b-primary-default rounded-xl opacity-70"></span>
      <span className="relative">לתשלום</span>
    </button>
  </div>
  )
}

export default PaymentTotal