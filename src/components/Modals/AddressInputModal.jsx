import React, { useState } from "react";
import DefaultModal from "./DefaultModal";
import { useUserContext } from "@/providers/UserProvider";
import { cn } from "@/utils/cn";
import { IoAddSharp } from "react-icons/io5";

const addressInputs = {
  // residence_type: 'house',
  city: {
    className: "w-[240px]",
    required: true,
    type: "text",
    placeholder: "עיר",
  },
  street: {
    className: "w-[240px]",
    required: true,
    type: "text",
    placeholder: "רחוב",
  },
  house_number: {
    className: "w-[150px] max-w-[230px]",
    required: true,
    type: "number",
    placeholder: "מספר בית",
  },
  floor_number: {
    className: "w-[150px] max-w-[230px]",
    required: false,
    type: "number",
    placeholder: "מספר קומה",
  },
  apartment_number: {
    className: "w-[150px] max-w-[230px]",
    required: false,
    type: "number",
    placeholder: "מספר דירה",
  },
  entrance: {
    className: "w-[150px] max-w-[230px]",
    required: false,
    type: "text",
    placeholder: "כניסה",
  },
};

const AVAILABLE_RESIDENCE_TYPES = ["house", "apartment", "office"];

function AddressInputModal({ addressModalState, setAddressModalState }) {
  const { residenceTypeToIcon, addUserAddress, residenceTypeToHebrew } =
    useUserContext();
  const [residenceType, setResidenceType] = useState(
    AVAILABLE_RESIDENCE_TYPES[0]
  );

  const closeModal = () => {
    setAddressModalState("close");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());
    formObject.residence_type = residenceType;
    console.log(formObject);

    addUserAddress(formObject);
    closeModal();
  };

  return (
    <DefaultModal
      modalId={"address-input-modal"}
      modalState={addressModalState}
      closeModal={closeModal}
      setModalState={setAddressModalState}
      className={"max-h-[75vh] text-b-text-900"}
    >
      <h6 className="text-2xl font-semibold mb-2">הוספת כתובת למשלוח</h6>
      <form className="flex flex-wrap gap-3" onSubmit={handleSubmit}>
        {Object.keys(addressInputs).map((k, idx) => {
          const currentInput = addressInputs[k];
          return (
            <input
              key={k}
              required={currentInput.required}
              type={currentInput.type}
              name={k}
              className={cn(
                `grow px-3 py-2 rounded-md border border-b-product-border`,
                currentInput.className
              )}
              placeholder={currentInput.placeholder}
            />
          );
        })}
        <div className="basis-full">
          <span className="font-semibold">סוג המיקום</span>
          <div className="flex gap-2 mt-2">
            {AVAILABLE_RESIDENCE_TYPES.map((t) => {
              const isSelected = t === residenceType;
              const Icon = residenceTypeToIcon[t];
              return (
                <button
                  role="button"
                  type="button"
                  key={t}
                  className={`flex flex-col grow w-[88px] gap-1 items-center py-3 rounded-lg border ${
                    (isSelected && "border-b-primary-default") ||
                    "border-transparent"
                  }`}
                  title={residenceTypeToHebrew[t]}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setResidenceType(t);
                  }}
                >
                  <div
                    className={`rounded-full relative w-10 h-10 aspect-square bg-b-gray-100 grid place-items-center overflow-hidden `}
                  >
                    <Icon size={24} />
                  </div>
                  <div
                    className={`text-xs ${
                      (isSelected && "font-bold text-b-text-600") || ""
                    }`}
                  >
                    {residenceTypeToHebrew[t]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="submit"
          // onClick={(e) => {
          //   closeModal();
          // }}
          className="bg-b-primary-default flex items-center justify-center gap-2 rounded-lg py-3 px-3 w-full text-b-text-900 font-semibold active:brightness-95 mt-2"
        >
          <IoAddSharp size={20} className="text-b-text-900" />
          <span>שמירה</span>
        </button>
      </form>
    </DefaultModal>
  );
}

export default AddressInputModal;
