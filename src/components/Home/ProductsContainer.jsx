"use client";
import ProductsProvider from "@/providers/ProductsProvider";
import React from "react";
import SearchProducts from "./SearchProducts";
import TagsSelector from "./TagsSelector";
import ProductsDisplay from "./ProductsDisplay";
import PromotedSection from "./PromotedSection";
import CartProvider from "@/providers/CartProvider";

function ProductsContainer({
  preloadedCategories,
  availableTags,
  afterSearchPromoted,
  cartSettings,
}) {
  return (
    <CartProvider cartSettings={cartSettings}>
      <ProductsProvider preloadedCategories={preloadedCategories}>
        <SearchProducts />
        <TagsSelector availableTags={availableTags} />
        <PromotedSection afterSearchPromoted={afterSearchPromoted} />
        <ProductsDisplay />
      </ProductsProvider>
    </CartProvider>
  );
}

export default ProductsContainer;
