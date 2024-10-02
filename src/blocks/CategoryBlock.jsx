import CategoryList from "@/components/Home/CategoryList";
import React from "react";

const CategoryBlock = ({ products, title, sub_title }) => {
  return (
    <div className="mx-auto max-w-5xl px-2 py-6 relative">
      <div className="text-xl leading-tight text-b-text-900 font-bold">
        {title}
      </div>
      <div className="text-base leading-tight text-b-text-600">{sub_title}</div>
      <CategoryList products={products} />
    </div>
  );
};

export default CategoryBlock;
