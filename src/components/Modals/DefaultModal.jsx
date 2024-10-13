import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useState } from "react";

function DefaultModal({
  modalId,
  modalState,
  children,
  closeModal,
  className,
}) {
  const modalRef = useRef();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!modalRef.current) return;

    const closeModalAfterAnimation = () => {
      setIsClosing(() => false);
      modalRef.current?.close();
    };

    if (modalState === "open") {
      modalRef.current?.showModal();
    } else {
      setIsClosing(() => true);
      modalRef.current.addEventListener(
        "animationend",
        closeModalAfterAnimation,
        { once: true }
      );
    }

    return () => {
      modalRef.current?.removeEventListener(
        "animationend",
        closeModalAfterAnimation
      );
    };
  }, [modalState, modalRef.current]);

  return (
    <dialog
      ref={modalRef}
      id={modalId}
      className={cn(
        `regular  backdrop-blur-sm rounded-lg  ${
          (modalState === "open" && "showing") || (isClosing && "closing") || ""
        }`,
        className
      )}
      onClick={function (event) {
        var rect = modalRef.current?.getBoundingClientRect();
        var isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          closeModal();
        }
      }}
    >
      <div
        className={cn(
          `relative min-w-[330px] sm:min-w-[370px] md:min-w-[420px] w-full md:max-w-2xl  py-6 px-6 bg-b-product-bg border border-b-product-border text-b-text-900 rounded-lg`,
          className
        )}
      >
        <button
          className="absolute top-2 right-2 cursor-pointer  aspect-square  focus:focus:outline-none p-1 active:bg-gray-100/50 rounded-full"
          onClick={() => closeModal()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-b-text-900 hover:text-b-text-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </dialog>
  );
}

export default DefaultModal;
