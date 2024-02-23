import Chevron from "@/components/ui/icons/chevron";
import React from "react";

type Props = {
  stake: string;
  headerText: string;
  couponID: string;
  collapsed: boolean;
  onClick: () => void;
};

export default function BetItemHeader({ stake, headerText, couponID, collapsed, onClick }: Props) {
  return (
    <div
      className="h-[50px] flex items-center relative z-0 justify-between cursor-pointer"
      style={{ transform: "translateZ(0)" }}
      onClick={onClick}
    >
      <div className="flex flex-[0_2_100%] text-[15px] text-[color(display-p3_0.157_1_0.733)] items-baseline overflow-hidden h-[21px] pl-5  hover:text-white">
        <div className="text-[15px] inline-flex shrink-0 font-bold leading-[23px] relative pr-2">
          €{stake}
        </div>
        <div className='text-[15px] inline-flex shrink-0 font-bold leading-[23px] relative pr-2 before:content-["_"] before:block before:absolute before:h-px before:bg-[color(display-p3_0.157_1_0.733)] before:w-full before:opacity-0 before:top-5'>
          {headerText} [ID:{couponID}]
        </div>
      </div>
      <div className="flex items-center min-h-[45px] text-[12px] text-[white] px-[30px] py-0 mt-[5px]">
        <Chevron className={`h-[8px] w-[12px] fill-white ${collapsed ? '' : 'rotate-180'}`} />
      </div>
    </div>
  );
}
