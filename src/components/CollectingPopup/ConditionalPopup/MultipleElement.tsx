"use client";
import useBetSlipStore from "@/store/betSlipStore";
import { useEffect, useState } from "react";
import React from "react";

type SystemNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

function MultipleElement({
  id,
  system_number,
  number_of_elements,
}: any) {



const SYSTEM_NAMES: { [key in SystemNumber]: string } = {

  1: "Singles",
  2: "Doubles",
  3: "Triples",
  4: "Tetrades",
  5: "Pentades",
  6: "Eksades",
  7: "Eftades",
  8: "Oktades",
};

  var system_name = SYSTEM_NAMES[system_number as SystemNumber];

  const {
    selections,
    system,
    addSystem,
    removeSystem
  } = useBetSlipStore();


  var stake_value = ""
  if(system[system_name] !== undefined){
    stake_value = system[system_name].single_stake
  }

  function getCombinations<T>(arr: T[], comboLength: number): T[][] {
    const allCombos: T[][] = [];

    const innerCombos = (start: number, choiceSoFar: T[]) => {
        if (choiceSoFar.length === comboLength) {
            allCombos.push(choiceSoFar);
            return;
        }

        for (let i = start; i < arr.length; i++) {
            innerCombos(i + 1, [...choiceSoFar, arr[i]]);
        }
    };

    innerCombos(0, []);
    return allCombos;
  }




  var combinations= getCombinations(selections, parseInt(system_number));
  const handleStakeChange = (event: any) => {
    if(!isNaN(parseFloat(event.target.value))){
      addSystem(system_name, {number_of_elements:number_of_elements, single_stake: event.target.value, total_stake: number_of_elements* parseFloat(event.target.value), combinations:combinations});
    }else{
      removeSystem(system_name);
    }
  };


  return (
    <div
      className="overflow-hidden whitespace-nowrap text-[0] leading-[0] transition-opacity duration-[0.5s] flex flex-[0_0_auto] w-full relative flex-col border-b-neutral-300 border-b border-solid"
      key={id}
    >
      <div className="min-w-full inline-flex flex-wrap relative">
        <div className="w-full align-top relative items-stretch min-h-[75px] pb-2.5 bg-[#cdcdcd]">
          <div className="flex ml-5">
            <div className="flex-[1_1_100%]">
              <div className="flex pl-2.5 pr-1 py-0">
                <div className="flex-auto flex flex-wrap">
                  <div className="flex flex-[1_1_100%] pt-2.5 pb-[3px] px-0">
                    <div className="text-[15px] text-[#545454] leading-[18px] inline whitespace-normal font-bold pr-[5px]">
                      {system_name}
                    </div>
                    <div className="inline text-right font-bold flex-auto">
                      <div className="text-neutral-700 font-bold cursor-default text-[15px] text-neutral-700 leading-[18px] pl-1 pr-1.5">
                        {number_of_elements} x
                      </div>
                    </div>
                  </div>
                  <div className="flex min-h-[18px] items-center justify-start pb-0.5">
                    {!isNaN(parseFloat(stake_value)) && (
                    <div className="text-[11px] text-[#666] leading-4 flex justify-start whitespace-normal pr-[5px]">
                      {/* Cost: {stake_value * number_of_elements} */}
                    </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="transition-[padding] duration-[0.2s] whitespace-normal flex px-2.5 py-0">
                <div className="flex flex-[1_1_100%]">
                  <div className="text-[11px] text-[#666] leading-4 flex justify-start whitespace-normal pr-[5px] pb-px">
                    {/* To Return:  */}

                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-[1_0_100%] pt-2.5 pb-[3px] px-0"> */}
            {/* <div className="text-[11px] text-[#666]">8x</div> */}
            {/* </div> */}

            <div className="min-w-[118px] flex-[0_0_118px] opacity-1">
              <div className="relative flex-[0_0_100%] text-right h-[37px]">
                <div className="h-[35px] text-[15px] transition-[background] duration-[0.25s,box-shadow] delay-[0.2s] relative inline-flex justify-end w-full h-[35px] text-[15px] transition-[background] duration-[0.25s,box-shadow] delay-[0.2s] relative inline-flex justify-end w-ful">
                  <input
                    type="text"
                    value={stake_value}
                    onChange={handleStakeChange}
                    placeholder="stake"
                    className="outline-0 outline-[invert] h-[37px] relative inline-flex items-center justify-end w-[118px] caret-[#137a5a] text-right leading-[18px] text-[15px] text-[#545454] opacity-100 px-2.5 py-0 rounded-none border-[none]"
                  />
                </div>
              </div>
              {!isNaN(parseFloat(stake_value)) && (
                <div className="w-[118px] justify-end text-[11px] text-[#666] leading-[15px] transition-opacity duration-[0.35s] text-right whitespace-nowrap flex-wrap ml-auto pl-[5px] pr-2.5 pt-3 pb-0">
                  Stake €{parseFloat(stake_value) * number_of_elements}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultipleElement;
