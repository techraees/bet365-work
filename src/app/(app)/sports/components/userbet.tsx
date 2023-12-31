"use client";

import { getCoupons } from "@/api";
import { BetClose } from "@/components/ui/icons/dialogclose";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const UserBet = () => {
  const { data: session } = useSession();
  const userdata = session as any;

  return null;
  return (
    <div className=" w-[450px] bg-white text-sm fixed bottom-0 left-1/2 transform -translate-x-1/2 z-[1000]">
      <div className="flex flex-col">
        <div className="flex w-full py-2">
          <div>
            <BetClose className="cursor-pointer" />
          </div>
          <div className="flex flex-1 flex-col px-2">
            <div className="flex">
              <div>Guatemala</div>
              <div>1.002</div>
            </div>
            <div className="flex">
              <div>Fulltime Result</div>
            </div>
            <div className="flex">
              <div>Guatemala v El Salvador</div>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <button className="h-[50px] flex-1 bg-[#333] text-[#58d7af] font-bold text-base">
            Set Stake
          </button>
          <button className="h-[50px] flex-1 bg-[#58d7af] text-[#1f4d3e] font-bold text-base">
            Accept Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBet;

