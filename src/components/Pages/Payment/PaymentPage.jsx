"use client";
import useDeliveryMethod from "@/hooks/useDeliveryMethod";
import React from "react";
import CartDetails from "../../Cart/CartDetails";
import CartProvider from "@/providers/CartProvider";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import PaymentTotal from "./PaymentTotal";
import DeliveryDetails from "./DeliveryDetails";
import UserProvider from "@/providers/UserProvider";

function PaymentPage({ cartSettings }) {
  const {
    methodToIcon,
    methodToHebrew,
    selectedDeliveryMethod,
    deliveryMethods,
    methodToServiceTitle,
    setSelectedDeliveryMethod,
  } = useDeliveryMethod({ cartSettings });
  return (
    <CartProvider withSideBar={false} cartSettings={cartSettings}>
      <div className="max-w-4xl mx-auto pt-4 pb-10 px-4 flex flex-wrap gap-4">
        <div className="basis-[350px] grow-[9999] ">
          <div>
            <div className="flex items-center gap-2 px-2 my-2">
              <Link
                href={"/"}
                className="rounded-full aspect-square p-2 bg-b-gray-100"
                prefetch={false}
              >
                <BsArrowRight />
              </Link>
              <span className="font-semibold text-b-text-600">חזרה</span>
            </div>
            {deliveryMethods.length > 1 && (
              <div className="w-full">
                <div className="grid w-full items-stretch grid-cols-2 gap-2 px-3 py-1   border border-b-product-border rounded-xl">
                  {deliveryMethods.map((m) => {
                    const Icon = methodToIcon[m];
                    return (
                      <button
                        className={`w-full flex gap-2 py-2 items-center justify-center rounded-lg ${
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
              <div className="bg-b-gray-200/50 text-b-text-600 font-bold px-3 w-full py-2 mt-3 rounded-md">
                {cartSettings[selectedDeliveryMethod]?.more_details}
              </div>
            )}
            <div className="mt-5">
              <h2 className="font-semibold text-2xl mb-2">
                {methodToServiceTitle[selectedDeliveryMethod]}
              </h2>
              <DeliveryDetails
                selectedDeliveryMethod={selectedDeliveryMethod}
                storeAddress={cartSettings.store_address}
              />
            </div>
            <div className="mt-5">
              <h2 className="font-semibold text-2xl mb-2">פירוט הזמנה</h2>
              <CartDetails />
            </div>
          </div>
        </div>
        <div className=" basis-[260px] grow">
          <PaymentTotal />
        </div>
      </div>
    </CartProvider>
  );
}

export default PaymentPage;
