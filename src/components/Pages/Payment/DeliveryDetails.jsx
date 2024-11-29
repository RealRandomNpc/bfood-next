"use client";
import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { MdApartment } from "react-icons/md";
import { HiBuildingOffice } from "react-icons/hi2";
import { useUserContext } from "@/providers/UserProvider";
import { IoIosAdd } from "react-icons/io";
import { FaShop } from "react-icons/fa6";
import AddressInputModal from "../../Modals/AddressInputModal";

const DELIVERY_ADDRESS = [
  {
    residence_type: "house",
    city: "San Francisco",
    street: "Boulevard Street",
    house_number: "123",
    floor_number: "1",
    apartment_number: "1",
  },
];

function DeliveryDetails({ selectedDeliveryMethod, storeAddress = {} }) {
  const {
    userAddresses,
    addUserAddress,
    selectedAddressIndex,
    setSelectedAddressIndex,
    residenceTypeToIcon,
    residenceTypeToHebrew,
  } = useUserContext();
  const [addressModalState, setAddressModalState] = useState("close");

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        {selectedDeliveryMethod === "delivery" && (
          <>
            {userAddresses.map((a, idx) => {
              const Icon = residenceTypeToIcon[a.residence_type];
              return (
                <button
                  className={`flex px-4 py-4 gap-3 w-full rounded-lg border ${
                    (selectedAddressIndex === idx &&
                      "text-b-text-900 border-b-product-border") ||
                    "text-b-text-600 border-transparent"
                  }`}
                  key={idx}
                  onClick={() => setSelectedAddressIndex(idx)}
                >
                  <Icon size={24} />
                  <span className="font-bold">
                    {residenceTypeToHebrew[a.residence_type]}
                  </span>
                  <span>
                    {a.city}, {a.street}
                  </span>
                </button>
              );
            })}
            <button
              className="flex px-4 py-2 gap-3 rounded-md text-b-text-600 active:bg-b-gray-100 w-full active:text-b-text-900"
              onClick={() => setAddressModalState("open")}
            >
              <IoIosAdd size={24} />
              <span>הוספת כתובת</span>
            </button>
          </>
        )}
        {selectedDeliveryMethod === "pickup" && (
          <button
            className={`flex mt-2 px-4 py-4 gap-3 w-full rounded-lg border text-b-text-900 border-b-product-border`}
          >
            <FaShop size={24} />
            <span>
              <span className="font-semibold">{storeAddress.city}</span>
              <span>
                , רחוב {storeAddress.street}, מספר {storeAddress.house_number}
              </span>
            </span>
          </button>
        )}
      </div>
      <AddressInputModal
        setAddressModalState={setAddressModalState}
        addressModalState={addressModalState}
      />
    </>
  );
}

export default DeliveryDetails;
