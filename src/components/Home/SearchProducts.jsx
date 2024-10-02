"use client";
import { useCartContext } from "@/providers/CartProvider";
import { useProductsContext } from "@/providers/ProductsProvider";
import Image from "next/image";
import React from "react";

function SearchProducts() {
  const { search, setSearch } = useProductsContext();
  const { setIsOpen } = useCartContext();

  return (
    <div className="mx-auto max-w-5xl px-2 py-6 relative">
      <div className="flex items-center justify-center gap-4 max-w-2xl w-full mx-auto">
        <div className="relative grow">
          <input
            type="text"
            className="bg-b-gray-100 focus:outline-gray-300 focus:outline focus:outline-2 rounded-lg py-3 min-w-60 md:min-w-96 pl-10 pr-3 font-semibold w-full"
            placeholder="מתחשק לי..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className="absolute left-1 top-1/2 -translate-y-1/2 p-[6px] rounded-full active:bg-black/10">
            <Image
              src={"assets/icons/search.svg"}
              width={28}
              height={28}
              alt="search icon"
            />
          </button>
        </div>
        <div className="absolute md:relative md:top-0 -top-14 left-2 mb-3 md:mb-0 h-screen md:h-full">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex sticky top-2 z-10 items-center gap-3 py-3 px-4 rounded-lg bg-b-gray-100  active:bg-b-gray-200"
          >
            <Image
              src={"assets/icons/shoppingCart.svg"}
              alt="shopping cart"
              width={24}
              height={24}
            />
            <span>עגלה</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchProducts;
