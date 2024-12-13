import React, { useLayoutEffect, useState } from "react";
import DefaultModal from "./DefaultModal";
import Image from "next/image";
import { useProductsContext } from "@/providers/ProductsProvider";
import { IoAddSharp } from "react-icons/io5";
import { blocks } from "@/blocks";
import { useCartContext } from "@/providers/CartProvider";

function ProductModal() {
  const {
    closeModal,
    productModalState,
    productInModal,
    productInModalOptions,
    setProductModalState,
  } = useProductsContext();

  const { addItemToCart } = useCartContext();

  const [selectedOptionsArr, setSelectedOptionsArr] = useState(() =>
    new Array(productInModalOptions?.product_options_blocks?.length || 0).fill(
      {}
    )
  );

  useLayoutEffect(() => {
    setSelectedOptionsArr(
      new Array(
        productInModalOptions?.product_options_blocks?.length || 0
      ).fill({})
    );
  }, [productInModalOptions]);

  return (
    <DefaultModal
      modalId={"product-options-modal"}
      modalState={productModalState}
      closeModal={closeModal}
      setModalState={setProductModalState}
      className={"max-h-[80vh]"}
    >
      <div className="py-2 flex items-center justify-between">
        <div className="w-fit leading-none">
          <div className="font-bold">{productInModal?.name}</div>
          <div className="text-sm">אנא בחר תוספות</div>
        </div>
        <div className="w-24 aspect-square">
          {productInModal?.img?.sizes?.thumbnail && (
            <Image
              src={productInModal?.img?.sizes?.thumbnail?.url}
              alt={productInModal?.img?.alt}
              width={productInModal?.img?.sizes?.thumbnail?.width}
              height={productInModal?.img?.sizes?.thumbnail?.height}
              className="w-24 aspect-square"
            />
          )}
        </div>
      </div>
      <div className="mt-1 mb-3 h-px w-full bg-b-product-border"></div>
      <div className="flex flex-col gap-3 w-full overflow-y-auto max-h-[50vh]">
        {productInModalOptions?.product_options_blocks?.map((b, idx) => {
          const Block = blocks[b.blockType];

          if (Block) {
            return (
              <Block
                key={"modal-option-block-" + idx}
                {...b}
                selectedOptions={selectedOptionsArr[idx]}
                setSelectedOptions={(selectedObj) =>
                  setSelectedOptionsArr((prev) => {
                    prev[idx] = selectedObj || {};
                    return prev.map((s) => ({ ...s }));
                  })
                }
              />
            );
          }
          return null;
        })}
      </div>

      <button
        onClick={(e) => {
          addItemToCart({
            name: productInModal.name,
            price: productInModal.price,
            img: productInModal.img,
            id: productInModal.id,
            options: productInModalOptions?.product_options_blocks.map(
              (b, idx) => ({ ...b, selected_options: selectedOptionsArr[idx] })
            ),
          });
          closeModal();
        }}
        className="bg-b-primary-default flex items-center justify-center gap-2 rounded-lg py-3 px-3 w-full text-b-text-900 font-semibold active:brightness-95 mt-2"
      >
        <span>הוסף</span>
        <IoAddSharp size={20} className="text-b-text-900" />
      </button>
      <div className="w-full h-7 md:h-0"></div>
    </DefaultModal>
  );
}

export default ProductModal;
