"use client";
import useDebounce from "@/hooks/useDebounce";
import React, { createContext, useContext, useEffect, useState } from "react";
import qs from "qs";

const getFilteredProducts = async (
  signal,
  selectedTagsNames = [],
  selectedCategoriesNames = [],
  search = ""
) => {
  if (!search && !selectedTagsNames.length && !selectedCategoriesNames.length)
    return;

  const query = { and: [] };

  if (search) {
    query.and.push({
      or: [
        {
          name: {
            like: search,
          },
        },
        {
          description: {
            like: search,
          },
        },
      ],
    });
  }
  if (selectedTagsNames.length > 0 || selectedCategoriesNames.length > 0) {
    query.and.push({
      or: [
        {
          "category.title": {
            in: selectedCategoriesNames.join(","),
          },
        },
        {
          "tags.tag.name": {
            in: selectedTagsNames.join(","),
          },
        },
      ],
    });
  }

  // const query = {
  //   or: [
  //     {
  //       "category.id": {
  //         in: selectedTagsIds.join(","),
  //       },
  //     },
  //     {
  //       "tags.id": {
  //         in: selectedTagsIds.join(","),
  //       },
  //     },
  //   ],
  // };

  // const query = {
  //   or: [
  //     {
  //       name: {
  //         contains: search,
  //       },
  //     }, {
  //       description: {
  //         contains: search,
  //       },

  //     }
  //   ],
  // };
  console.log("QUERY", query);

  const stringifiedQuery = qs.stringify(
    {
      where: query, // ensure that `qs` adds the `where` property, too!
    },
    { addQueryPrefix: true }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/products${stringifiedQuery}`,
    {
      signal,
    }
  );

  return await response.json();
};

const ProductsContext = createContext();
export const useProductsContext = () => useContext(ProductsContext);

const ProductsProvider = ({ children, preloadedCategories = [] }) => {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const debouncedSearch = useDebounce("", search);
  const debouncedSelectedTags = useDebounce([], selectedTags);

  useEffect(() => {
    if (!search && selectedTags.length === 0) return;

    setIsLoading(true);
  }, [selectedTags, search]);

  useEffect(() => {
    if (!debouncedSearch && debouncedSelectedTags.length === 0) {
      setFilteredProducts([]);
      return;
    }
    setIsLoading(true);
    setIsError(false);

    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const [queryProducts, _] = await Promise.all([
          getFilteredProducts(
            signal,
            debouncedSelectedTags
              .filter((tag) => tag?.type !== "category")
              .map((t) => t.name),
            debouncedSelectedTags
              .filter((tag) => tag?.type === "category")
              .map((t) => t.name),
            debouncedSearch
          ),
          new Promise((resolve) => {
            setTimeout(resolve, 1500);
          }),
        ]);

        console.log("HELLO", queryProducts);

        setFilteredProducts(queryProducts?.docs || []);
      } catch (error) {
        setIsError(true);
        console.log("Some error:", error);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [debouncedSelectedTags, debouncedSearch]);

  return (
    <ProductsContext.Provider
      value={{
        search,
        selectedTags,
        setSearch,
        setSelectedTags,
        preloadedCategories,
        filteredProducts,
        isLoading,
        isError,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
