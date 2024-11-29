"use client";
import { useUserContext } from "@/providers/UserProvider";
import Image from "next/image";
import React from "react";

function UserConnectBtn() {
  const { triggerConnectModal } = useUserContext();
  return (
    <button
      className="rounded-full flex gap-3  bg-white/80 hover:bg-white backdrop-blur-md py-2 pl-6 pr-4 min-w-[250px]"
      onClick={() => triggerConnectModal()}
    >
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
  );
}

export default UserConnectBtn;
