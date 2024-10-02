import React from "react";
import Marquee from "react-fast-marquee";

function MarqueeBlock({ speed = 50, text, autoFill = true }) {
  return (
    <div dir="ltr" className="bg-b-primary-default h-8">
      <Marquee
        className="bg-b-primary-default text-b-text-900 py-1"
        speed={speed}
        autoFill={autoFill}
        direction="right"
      >
        {text}
      </Marquee>
    </div>
  );
}

export default MarqueeBlock;
