import React, { useEffect, useState } from "react";
import CartActionBtn from "./CartActionBtn";

function BottomSummary({ setIsOpen }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="fixed z-10 bottom-0 w-full">
      <div className="mx-auto p-2 w-full max-w-[380px] ">
        {scrollPosition > 150 && (
          <CartActionBtn
            text="לצפייה בהזמנה"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
}

export default BottomSummary;
