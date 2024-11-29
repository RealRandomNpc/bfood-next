"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const typeToSubTitle = {
  single: ({ currentSum, minSelect, maxSelect }) =>
    currentSum >= minSelect
      ? `אפשר לבחור עוד ${maxSelect - currentSum} פריטים נוספים `
      : `נדרש לבחור לפחות עוד ${minSelect - currentSum} פריטים`,
  multiple: ({ currentSum, minSelect, maxSelect }) =>
    currentSum >= minSelect
      ? `אפשר לבחור עוד ${maxSelect - currentSum} פריטים נוספים `
      : `נדרש לבחור לפחות עוד ${minSelect - currentSum} פריטים`,
  radio: () => "אפשר לבחור רק אחד",
};

// const typeToToggleAction =

const typeToToggleAction = {
  radio: ({ optionId, availableOptions }) => {
    return {
      [optionId]: {
        ...availableOptions?.find((opt) => opt?.id === optionId),
        amount: 1,
      },
    };
  },
  single: ({
    selectedOptions,
    optionId,
    maxSelect,
    minSelect,
    currentSum,
    availableOptions,
  }) => {
    if (optionId in selectedOptions) {
      if (minSelect < currentSum) delete selectedOptions[optionId];
    } else {
      if (maxSelect > currentSum) {
        selectedOptions[optionId] = {
          ...availableOptions?.find((opt) => opt?.id === optionId),
          amount: 1,
        };
      }
    }

    return selectedOptions;
  },
  multiple: () => {},
};

function DefaultProductOptionBlock({
  options_type,
  title,
  sub_title,
  min_select,
  max_select,
  available_options,
  selectedOptions,
  setSelectedOptions,
}) {
  const [currentSum, setCurrentSum] = useState(0);

  const toggleOption = (optionId) => {
    const copySelectedOptions = { ...selectedOptions };

    const newSelectedOptions = typeToToggleAction[options_type]({
      optionId,
      selectedOptions: copySelectedOptions,
      availableOptions: available_options,
      minSelect: min_select,
      maxSelect: max_select,
      currentSum,
    });

    setSelectedOptions(newSelectedOptions);
  };

  useEffect(() => {
    setCurrentSum(
      Object.values(selectedOptions || {}).reduce(
        (acc, option) => acc + option?.amount,
        0
      )
    );
  }, [selectedOptions]);

  return (
    <div className="w-full">
      <div className="leading-none font-bold">{title}</div>
      <div className="leading-none text-sm ">
        {typeToSubTitle[options_type]({
          currentSum,
          maxSelect: max_select,
          minSelect: min_select,
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-1 pt-2">
        {["single", "radio"].includes(options_type) &&
          available_options?.map((option, idx) => {
            const isSelected = Object.keys(selectedOptions || {}).includes(
              option.id
            );

            return (
              <button
                key={option?.id || idx}
                className={`flex flex-col basis-[87.5px] gap-1 items-center py-3 rounded-lg border ${
                  (isSelected && "border-b-product-border") ||
                  "border-transparent"
                }`}
                title={option?.name}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(option.id);
                }}
              >
                <div
                  className={`rounded-full relative w-10 h-10 aspect-square bg-gray-200 grid place-items-center overflow-hidden `}
                >
                  <span className="text-white text-lg font-bold">
                    {option?.name?.slice(0, 1)}
                  </span>
                  {option?.img?.url && (
                    <Image
                      className="absolute inset-0"
                      src={option?.img?.url}
                      alt={option?.img?.alt}
                      width={option?.img?.width}
                      height={option?.img?.height}
                    />
                  )}
                </div>
                <div
                  className={`text-xs ${
                    (isSelected && "font-bold text-b-text-600") || ""
                  }`}
                >
                  {option?.name}
                </div>
                <div
                  className={`text-xs ${
                    (isSelected && "text-b-primary-default") || ""
                  }`}
                >
                  {(option.extra_price &&
                    option.extra_price?.toFixed(2) + "₪") ||
                    ""}
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default DefaultProductOptionBlock;
