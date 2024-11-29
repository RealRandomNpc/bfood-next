import { useProductsContext } from "@/providers/ProductsProvider";
import React from "react";
import CategoryList from "./CategoryList";

function ProductsDisplay() {
  const {
    preloadedCategories,
    filteredProducts,
    isError,
    isLoading,
    search,
    selectedTags,
  } = useProductsContext();
  return (
    <div className="mx-auto max-w-5xl px-2 py-6 relative">
      {!isError && !isLoading && (
        <>
          {filteredProducts.length === 0 &&
            preloadedCategories.map((category) => (
              <div key={category.id}>
                <div className="text-xl leading-tight text-b-text-900 font-bold">
                  {category.title}
                </div>
                <div className="text-base leading-tight text-b-text-600">
                  {category.sub_title}
                </div>
                <CategoryList products={category.products} />
              </div>
            ))}
          {(filteredProducts.length > 0 &&
            (search || selectedTags?.length > 0) && (
              <CategoryList products={filteredProducts} />
            )) || <></>}
        </>
      )}
    </div>
  );
}

export default ProductsDisplay;
