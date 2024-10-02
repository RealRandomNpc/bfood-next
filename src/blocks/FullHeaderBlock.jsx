import Image from "next/image";
import React from "react";

function FullHeaderBlock({ header_img }) {
  console.log("IMAGE", header_img);
  return (
    <div dir="rtl" className="relative">
      <Image
        src={header_img.url}
        width={header_img.width}
        height={header_img.height}
        alt={header_img.alt}
        className="h-[500px] object-cover w-full"
      />
      <div className="absolute top-3 left-1/2 -translate-x-1/2">
        <button className="rounded-full flex gap-3  bg-white/80 hover:bg-white backdrop-blur-md py-2 pl-6 pr-4 min-w-[250px]">
          <div className="aspect-square p-2 bg-b-primary-100 rounded-full">
            <Image
              src={"/assets/icons/userBold.svg"}
              width={30}
              height={30}
              alt="user icon"
              loading="eager"
            />
          </div>
          <div className="text-start leading-snug">
            <div>ברוך הבא</div>
            <div className="font-bold">להתחברות לחץ כאן</div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default FullHeaderBlock;
