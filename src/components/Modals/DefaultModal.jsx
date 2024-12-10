"use client";
import { cn } from "@/utils/cn";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

function DefaultModal({
  modalId,
  modalState,
  setModalState,
  children,
  closeModal,
  className,
  bgClassName,
  wrapperClassName,
}) {
  const modalRef = useRef();
  const [isClosing, setIsClosing] = useState(false);

  useLayoutEffect(() => {
    if (!modalRef.current) return;

    const closeModalAfterAnimation = () => {
      setIsClosing(() => false);
      // modalRef.current?.close();
      setModalState("close");
    };

    // if (modalState === "open") {
    //   // modalRef.current?.showModal();
    // } else {

    // if (modalState === "closing") {
    //   setIsClosing(() => true);
    //   modalRef.current.addEventListener(
    //     "animationend",
    //     closeModalAfterAnimation,
    //     { once: true }
    //   );
    //   return () => {
    //     modalRef.current?.removeEventListener(
    //       "animationend",
    //       closeModalAfterAnimation
    //     );
    //   };
    // }

    return;
  }, [modalState, modalRef.current]);

  console.log("modalState", modalState, isClosing);

  return (
    <div
      id={modalId}
      className={cn(
        `regular-dialog fixed z-50 inset-0 bg-black/10 flex flex-col items-center justify-end md:justify-start backdrop-blur-sm rounded-lg ${
          (modalState === "close" && !isClosing && "hidden") || ""
        }`,
        bgClassName
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
        ref={modalRef}
        className={cn(
          `${
            (modalState === "open" && "slide-in-dialog") || ""
          } w-full md:max-w-xl max-h-screen md:py-20`,
          wrapperClassName
        )}
        tabIndex={0}
      >
        <div
          className={cn(
            `relative min-w-full sm:min-w-[370px] md:min-w-[420px] w-full max-h-[90vh] py-6 px-6 bg-b-product-bg border border-b-product-border text-b-text-900 rounded-t-lg md:rounded-lg`,
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
          <div className="absolute md:hidden left-1/2 -translate-x-1/2 top-2 w-12 h-1 bg-gray-400 rounded-full"></div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default DefaultModal;
