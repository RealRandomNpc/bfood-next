"use client";
import { useCartContext } from "@/providers/CartProvider";
import { useProductsContext } from "@/providers/ProductsProvider";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ProductItem({
  price,
  description,
  name,
  img,
  id,
  has_product_options,
}) {
  const { openModal } = useProductsContext();
  const { addItemToCart, isItemInCartById, incAmountById } = useCartContext();
  const [isDisabled, setIsDisable] = useState(false);

  const handleAddItem = () => {
    if (has_product_options) {
      openModal({
        price,
        description,
        name,
        img,
        id,
        has_product_options,
      });
      return;
    }

    isItemInCartById(id)
      ? incAmountById(id)
      : addItemToCart({ name, price, img, id, has_product_options });
    setIsDisable(true);
  };

  useEffect(() => {
    if (!isDisabled) return;

    const t = setTimeout(() => {
      setIsDisable(false);
    }, 1500);

    return () => {
      clearTimeout(t);
    };
  }, [isDisabled]);

  return (
    <button
      className=" w-full p-2 "
      onClick={handleAddItem}
      disabled={isDisabled}
    >
      <div className="flex overflow-hidden border border-b-gray-200 rounded-2xl active:outline-4 active:outline active:outline-gray-100 ">
        <div className="relative">
          <Image
            src={img.sizes?.thumbnail?.url}
            alt={img.alt}
            width={img.sizes?.thumbnail?.width}
            height={img.sizes?.thumbnail?.width}
            className="w-[128px] h-[128px] object-contain"
          />
          {isDisabled && (
            <div className="inset-0 bg-gray-200/50 absolute animate-to-show">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="product-loader"></span>
              </div>
            </div>
          )}
        </div>
        <div className="self-stretch flex flex-col items-start py-2 pl-3 pr-2">
          <div className="font-bold">{name}</div>
          <div className=" text-start text-gray-400 my-auto">{description}</div>
          <div className="font-bold">{price}₪</div>
        </div>
      </div>
    </button>
  );
}

export default ProductItem;
