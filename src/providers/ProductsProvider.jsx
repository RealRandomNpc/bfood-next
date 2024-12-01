"use client";
import useDebounce from "@/hooks/useDebounce";
import React, { createContext, useContext, useEffect, useState } from "react";
import qs from "qs";
import ProductModal from "@/components/Modals/ProductModal";
import useSWR from "swr";

const CLOSING_MODAL_ANIMATION_DURATION = 330;

const getFilteredProducts = async ({
  // signal,
  selectedTagsNames = [],
  selectedCategoriesNames = [],
  search = "",
}) => {
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
      // signal,
      mode: 'no-cors'
    }
  );

  return (await response.json()).docs;
};

const getProductOptions = async (productId) => {
  if (!productId) return null;

  const query = {
    products: {
      in: productId,
    },
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query, // ensure that `qs` adds the `where` property, too!
      depth: 1,
    },
    { addQueryPrefix: true }
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/products-options${stringifiedQuery}`, {
      mode: 'no-cors'
    }
  );

  return (await response.json()).docs[0];
};

const ProductsContext = createContext();
export const useProductsContext = () => useContext(ProductsContext);

const ProductsProvider = ({ children, preloadedCategories = [] }) => {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  // const [isLoadingProductDetails, setIsLoadingProductDetails] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [productModalState, setProductModalState] = useState("close");
  const [productInModal, setProductInModal] = useState(null);
  // const [productInModalOptions, setProductInModalOptions] = useState(null);

  const debouncedSearch = useDebounce("", search);
  const debouncedSelectedTags = useDebounce([], selectedTags);

  const { data: filteredProducts, error: isProductsError, isLoading } = useSWR(
    {
      selectedTagsNames: debouncedSelectedTags
        .filter((tag) => tag?.type !== "category")
        .map((t) => t.name),
      selectedCategoriesNames: debouncedSelectedTags
        .filter((tag) => tag?.type === "category")
        .map((t) => t.name),
      debouncedSearch
    },
    getFilteredProducts, {
      fallbackData: []
    }
  );
  console.log("productInModal?.id", productInModal?.id)
  const {data: productInModalOptions, isLoading: isLoadingProductDetails, error: errorProductsDetails} = useSWR(
    productInModal?.id,
    getProductOptions
  )

  const openModal = (selectedProduct) => {
    setProductModalState("open");
    setProductInModal(selectedProduct);
  };
  const closeModal = () => {
    setProductModalState("close");
    setTimeout(() => {
      setProductInModal(() => null);
    }, CLOSING_MODAL_ANIMATION_DURATION);
  };

  // useEffect(() => {
  //   if (!search && selectedTags.length === 0) return;

  //   setIsLoading(true);
  // }, [selectedTags, search]);

  // useEffect(() => {
  //   if (!debouncedSearch && debouncedSelectedTags.length === 0) {
  //     setFilteredProducts([]);
  //     return;
  //   }
  //   setIsLoading(true);
  //   setIsError(false);

  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   (async () => {
  //     try {
  //       const [queryProducts, _] = await Promise.all([
  //         getFilteredProducts(
  //           signal,
  // debouncedSelectedTags
  //   .filter((tag) => tag?.type !== "category")
  //   .map((t) => t.name),
  // debouncedSelectedTags
  //   .filter((tag) => tag?.type === "category")
  //   .map((t) => t.name),
  //           debouncedSearch
  //         ),
  //         new Promise((resolve) => {
  //           setTimeout(resolve, 500);
  //         }),
  //       ]);

  //       setFilteredProducts(queryProducts?.docs || []);
  //     } catch (error) {
  //       setIsError(true);
  //       console.log("Some error:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();

  //   return () => {
  //     controller.abort();
  //   };
  // }, [debouncedSelectedTags, debouncedSearch]);

  // useEffect(() => {
  //   if (!productInModal || !productInModal?.id) return;
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   setIsLoadingProductDetails(true);

  //   (async () => {
  //     try {
  //       const productOptions = await getProductOptions(
  //         productInModal?.id,
  //         signal
  //       );

  //       setProductInModalOptions(productOptions?.docs[0] || null);
  //     } catch (error) {
  //     } finally {
  //       setIsLoadingProductDetails(false);
  //     }
  //   })();

  //   return () => {
  //     controller.abort();
  //   };
  // }, [productInModal]);

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
        openModal,
        closeModal,
        setProductModalState,
        productModalState,
        productInModal,
        productInModalOptions,
      }}
    >
      {children}
      <ProductModal />
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
