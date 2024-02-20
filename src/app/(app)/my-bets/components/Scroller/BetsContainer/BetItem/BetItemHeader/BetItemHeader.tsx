import React from "react";

type Props = {
  stake: string;
  headerText: string;
  couponID: string;
};

export default function BetItemHeader({ stake, headerText, couponID }: Props) {
  return (
    <div
      className="h-[50px] flex items-center relative z-0 justify-between cursor-pointer border-b-[hsla(0,0%,100%,0.1)] border-b border-solid"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="flex flex-[0_2_100%] text-[15px] text-[color(display-p3_0.157_1_0.733)] items-baseline overflow-hidden h-[21px] pl-5  hover:text-white">
        <div className="text-[15px] inline-flex shrink-0 font-bold leading-[23px] relative pr-2">
          €{stake}
        </div>
        <div className='text-[15px] inline-flex shrink-0 font-bold leading-[23px] relative pr-2 before:content-["_"] before:block before:absolute before:h-px before:bg-[color(display-p3_0.157_1_0.733)] before:w-full before:opacity-0 before:top-5'>
          {headerText} [ID:{couponID}]
        </div>
      </div>
    </div>
  );
}
