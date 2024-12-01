"use client";
import { blocks } from "@/blocks";
import { useProductsContext } from "@/providers/ProductsProvider";
import React, { useEffect, useState } from "react";

function PromotedSection({ afterSearchPromoted }) {
  const [isNoResults, setIsNoResults] = useState(false);
  const { filteredProducts, isLoading, isError, search, selectedTags } =
    useProductsContext();

  useEffect(() => {
    if (
      filteredProducts.length === 0 &&
      !isLoading &&
      !isError &&
      (search || selectedTags?.length > 0)
    ) {
      const t = setTimeout(() => setIsNoResults(true), 600);
      return () => {
        clearTimeout(t);
      };
    } else {
      setIsNoResults(false);
    }
  }, [
    filteredProducts.length,
    isError,
    isLoading,
    search,
    selectedTags?.length,
  ]);

  return (
    <>
      {isLoading && <span className="default-loader mx-auto mt-3"></span>}
      {isError && (
        <div className="text-red-500 mx-auto text-center">
          בעיה בבקשה לשרת, אנא נסה שנית
        </div>
      )}
      {isNoResults && (
          <div className="text-center mx-auto my-8 text-lg">
            לא נמצאו תוצאות עבור החיפוש...
          </div>
        )}
      {!search &&
        selectedTags.length === 0 &&
        !filteredProducts.length &&
        !isError &&
        !isLoading &&
        afterSearchPromoted?.map((b, idx) => {
          const Block = blocks[b.blockType];
          if (Block) {
            return <Block key={"promoted-section-" + idx} {...b} />;
          }

          return null;
        })}
    </>
  );
}

export default PromotedSection;
