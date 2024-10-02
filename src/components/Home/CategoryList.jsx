import ProductItem from "@/components/Home/ProductItem";
import React from "react";

const CategoryList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 place-items-stretch lg:grid-cols-2">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default CategoryList;
