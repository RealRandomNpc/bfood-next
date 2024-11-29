import UserConnectBtn from "@/components/User/UserConnectBtn";
import Image from "next/image";
import React from "react";

function FullHeaderBlock({ header_img }) {

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
        <UserConnectBtn />
      </div>
    </div>
  );
}

export default FullHeaderBlock;
