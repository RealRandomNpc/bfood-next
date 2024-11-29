import React, { useEffect, useState } from "react";
import DefaultModal from "./DefaultModal";

function OrderNotesModal({
  orderNotesModalState,
  setOrderNotesModalState,
  setOrderNotes,
  orderNotes,
}) {
  const [inputNotes, setInputNotes] = useState(orderNotes);

  const closeModal = () => {
    setInputNotes("");
    setOrderNotesModalState("close");
  };

  useEffect(() => {
    setInputNotes(orderNotes);
  }, [orderNotes]);
  
  return (
    <DefaultModal
      modalId={"order-notes-modal"}
      modalState={orderNotesModalState}
      setModalState={setOrderNotesModalState}
      closeModal={closeModal}
      wrapperClassName={"md:max-w-lg"}
    >
      <div className="text-center text-xl font-semibold">הערות להזמנה</div>
      <textarea
        value={inputNotes}
        onChange={(e) => setInputNotes(e.target.value)}
        placeholder="כאן רושמים את הערות להזמנה"
        className="rounded-xl border border-b-product-border mt-2 w-full p-2 placeholder:text-b-text-600 text-b-text-900"
        rows={8}
      ></textarea>

      <button
        onClick={(e) => {
          setOrderNotes(inputNotes);
          closeModal();
        }}
        className="bg-b-primary-default flex items-center justify-center gap-2 rounded-lg py-3 px-3 w-full text-b-text-900 font-semibold active:brightness-95 mt-2"
      >
        <span>שמירה</span>
      </button>
    </DefaultModal>
  );
}

export default OrderNotesModal;
