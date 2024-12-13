"use client";
import ProductsProvider from "@/providers/ProductsProvider";
import React from "react";
import SearchProducts from "./SearchProducts";
import TagsSelector from "./TagsSelector";
import ProductsDisplay from "./ProductsDisplay";
import PromotedSection from "./PromotedSection";
import CartProvider from "@/providers/CartProvider";

function ProductsPage({
  preloadedCategories,
  availableTags,
  afterSearchPromoted,
  cartSettings,
  preloadedProductOptions
}) {
  return (
    <CartProvider cartSettings={cartSettings}>
      <ProductsProvider preloadedCategories={preloadedCategories} preloadedProductOptions={preloadedProductOptions}>
        <SearchProducts />
        <TagsSelector availableTags={availableTags} />
        <PromotedSection afterSearchPromoted={afterSearchPromoted} />
        <ProductsDisplay />
      </ProductsProvider>
    </CartProvider>
  );
}

export default ProductsPage;
