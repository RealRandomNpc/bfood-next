"use client";
import DeliveryDining from "@/assets/icons/DeliveryDining";
import Shopping from "@/assets/icons/Shopping";
import Image from "next/image";
import React, { useState } from "react";
import CartItem from "./CartItem";
import CartActionBtn from "./CartActionBtn";
import { useCartContext } from "@/providers/CartProvider";
import useDeliveryMethod from "@/hooks/useDeliveryMethod";
import CartDetails from "./CartDetails";

function CartSideBar({ isOpen, setIsOpen, cartSettings, triggerOrderNotesModal }) {
  const { cartItems } = useCartContext();
  const  {methodToIcon, methodToHebrew, selectedDeliveryMethod, deliveryMethods, setSelectedDeliveryMethod} = useDeliveryMethod({cartSettings});

  console.log("CART SETTINGS", cartSettings);
  return (
    <>
      <button
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/25  backdrop-blur z-10 ${
          isOpen ? "animate-to-show" : "animate-to-hide"
        }`}
      ></button>
      <div
        className={`fixed top-0 w-full flex gap-3 right-full h-screen  z-20 max-w-[370px] transition-transform duration-300 ${
          (isOpen && "translate-x-full") || ""
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="bg-b-bg-primary self-start mt-3 rounded-full p-1"
        >
          <Image
            src={"/assets/icons/tabler_x.svg"}
            width={20}
            height={20}
            alt="close cart"
            loading="lazy"
          />
        </button>
        <div
          className={` flex flex-col items-center w-full  py-5  bg-b-bg-primary h-screen rounded-r-2xl border-r border-b-product-border `}
        >
          {deliveryMethods.length > 1 && (
            <div className="w-full px-2">
              <div className="grid w-full items-stretch grid-cols-2 gap-2 px-3 py-2   border border-b-product-border rounded-xl">
                {deliveryMethods.map((m) => {
                  const Icon = methodToIcon[m];
                  return (
                    <button
                      className={`w-full flex flex-col py-2 items-center justify-center rounded-lg ${
                        (m === selectedDeliveryMethod &&
                          "bg-b-primary-100 text-b-text-900 font-bold") ||
                        "text-[#6C6C6C] "
                      }`}
                      key={"method-" + m}
                      onClick={() => setSelectedDeliveryMethod(m)}
                    >
                      <Icon
                        className={`${
                          (m === selectedDeliveryMethod &&
                            "[&>*]:fill-b-text-900") ||
                          ""
                        }`}
                      />
                      <span>{methodToHebrew[m]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {deliveryMethods.length <= 1 && (
            <div>
              אופציה לקבלת הזמנה:{" "}
              <span className="font-bold">
                {(selectedDeliveryMethod in methodToHebrew &&
                  methodToHebrew[selectedDeliveryMethod]) ||
                  "לא קיימת אופציה"}
              </span>
            </div>
          )}
          {cartSettings[selectedDeliveryMethod]?.more_details && (
            <div className="bg-b-primary-100 text-b-text-900 px-3 w-full py-1 mt-3">
              {cartSettings[selectedDeliveryMethod]?.more_details}
            </div>
          )}
          <div className="w-full mt-3 font-semibold px-3">ההזמנה שלי</div>
          <CartDetails />
          <div className="px-2 mt-2 w-full">
            <button className="flex items-center gap-2 w-full py-2 px-2 rounded-xl active:bg-gray-100" onClick={() => triggerOrderNotesModal()}>
              <div className="grid place-items-center p-2 bg-gray-200 rounded-full">
                <Image
                  src={"/assets/icons/chat.svg"}
                  alt="add delivery note"
                  width={20}
                  height={20}
                  loading="lazy"
                />
              </div>
              <span>הוספת הערה להזמנה</span>
            </button>
          </div>
          <div className="px-2 mt-2 w-full">
            <CartActionBtn href="/payment"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartSideBar;
