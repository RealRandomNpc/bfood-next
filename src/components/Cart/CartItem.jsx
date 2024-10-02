import { useCartContext } from "@/providers/CartProvider";
import Image from "next/image";
import React from "react";

const EXAMPLE = {
  id: "66f97e94b7c3f2c9e0d746e7",
  amount: 1,
  name: "לאפה שווארמה",
  description: "שווארמה, לאפה, חמוצים, עגבניה, חסה, אבוקדו, חריף",
  price: 59,
  img: {
    id: "66f97e8db7c3f2c9e0d746dc",
    alt: "שווארמה לאפה",
    filename: "meoravYerushalmi.jpg",
    mimeType: "image/jpeg",
    filesize: 9417,
    width: 300,
    height: 300,
    focalX: 50,
    focalY: 50,
    sizes: {
      thumbnail: {
        width: 256,
        height: 256,
        mimeType: "image/jpeg",
        filesize: 7074,
        filename: "meoravYerushalmi-256x256.jpg",
        url: "http://localhost:4000/media/meoravYerushalmi-256x256.jpg",
      },
      regular: {
        width: 300,
        height: 300,
        mimeType: "image/jpeg",
        filesize: 9417,
        filename: "meoravYerushalmi-300x300.jpg",
        url: "http://localhost:4000/media/meoravYerushalmi-300x300.jpg",
      },
    },
    createdAt: "2024-09-29T16:21:33.719Z",
    updatedAt: "2024-09-29T16:21:33.719Z",
    url: "http://localhost:4000/media/meoravYerushalmi.jpg",
  },
  tags: [],
  createdAt: "2024-09-29T16:21:40.593Z",
  updatedAt: "2024-09-29T16:25:39.486Z",
  category: {
    id: "66f97f7db7c3f2c9e0d7479f",
    title: "שווארמות",
    sub_title: "משהו טעעעעיייייםםםםםם",
    products: ["66f97e94b7c3f2c9e0d746e7", "66f97edcb7c3f2c9e0d74701"],
    priority: 0,
    createdAt: "2024-09-29T16:25:33.770Z",
    updatedAt: "2024-09-29T16:25:33.770Z",
  },
};

function CartItem({ item = EXAMPLE, cartItemIndex }) {
  const { decAmountByIndex, incAmountByIndex } = useCartContext();

  return (
    <div className="flex gap-2 items-start">
      <button className="flex gap-2 text-start grow">
        <Image
          src={item.img.url}
          alt={item.img.alt}
          width={item.img.width}
          height={item.img.height}
          className="w-14 h-14 aspect-square object-cover"
        />
        <div>
          <div className="font-bold leading-none">{item.name}</div>
          {/* FOR ITEM OPTIONS */}
          <div className=" min-h-5 my-1"></div>
          <div className="text-b-primary-default font-bold">
            {item.price.toFixed(2)} ₪
          </div>
        </div>
      </button>
      <div className="rounded-lg aspect-square relative grid place-items-center w-8 border border-b-product-border group/amount">
        <span className=" select-none">{item.amount}</span>
        <div className="absolute left-full hidden group-hover/amount:flex hover:flex group-focus-within/amount:flex items-center inset-y-0  rounded-lg bg-b-text-900 text-b-bg-primary">
          <button
            className="h-full aspect-square grid place-items-center"
            onClick={() => incAmountByIndex(cartItemIndex)}
          >
            <Image
              src={"assets/icons/add.svg"}
              width={20}
              height={20}
              alt="add more of this item"
              loading="lazy"
            />
          </button>
          <button
            className="h-full aspect-square grid place-items-center"
            onClick={() => decAmountByIndex(cartItemIndex)}
          >
            <Image
              src={"assets/icons/remove.svg"}
              width={20}
              height={20}
              alt="remove of this item"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
