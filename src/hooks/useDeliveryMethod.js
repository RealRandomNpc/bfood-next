import React, { useState } from 'react'
import DeliveryDining from "@/assets/icons/DeliveryDining";
import Shopping from "@/assets/icons/Shopping";

const methodToHebrew = {
  delivery: "משלוח",
  pickup: "איסוף עצמי",
};

const methodToServiceTitle = {
  delivery: "כתובת משלוח",
  pickup: 'פרטי איסוף'
}

const methodToIcon = {
  delivery: DeliveryDining,
  pickup: Shopping,
};


function useDeliveryMethod({ cartSettings}) {
  const [deliveryMethods, setDeliveryMethods] = useState(() => {
    return ["delivery", "pickup"].filter((m) => cartSettings[m]?.is_active);
  });
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(() => {
    return ["delivery", "pickup"].filter((m) => cartSettings[m]?.is_active)[0];
  });

  return {methodToIcon, methodToHebrew, methodToServiceTitle, selectedDeliveryMethod, deliveryMethods, setSelectedDeliveryMethod}
}

export default useDeliveryMethod