import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import useBetSlipStore from "@/store/betSlipStore";
import BetSlipElement from "./BetSlipElement";
import { useSession } from "next-auth/react";
import SystemElement from "./SystemElement";
import MultipleElement from "./MultipleElement";
const SYSTEM_NAMES = {
  1: "Singles",
  2: "Doubles",
  3: "Triples",
  4: "Tetrades",
  5: "Pentades",
  6: "Eksades",
  7: "Eftades",
  8: "Oktades",
};
const PopupShowing = () => {
  const [soloStatus, setSoloStatus] = useState<any>(true);
  const [systemStatus, setSystemStatus] = useState<any>(false);
  const [multipleStatus, setMultipleStatus] = useState<any>(false);
  const [showingContent, setShowingContent] = useState<any>(false);
  const { data: session } = useSession();
  const [showingFilterCollapse, setShowingFilterCollapse] = useState<any>(
    false
  );

  const enableMultipleStatus = () => {
    setMultipleStatus(true);
    setSoloStatus(false);
    setSystemStatus(false);
    false;
  };

  const enableSoloStatus = () => {
    setSoloStatus(true);
    setMultipleStatus(false);
    setSystemStatus(false);
    false;
  };

  const enableSystemStatus = () => {
    setSoloStatus(false);
    setMultipleStatus(false);
    setSystemStatus(true);
    false;
  };

  const [showDropdown, setShowDropdown] = useState<any>(false);

  const { selections, addSelection } = useBetSlipStore();

  var selectedArray = selections;

  console.log({ selections: selections });
  // console.log({ handleArr: selectedArray });
  // Handling Deletion
  const [isChangeAccepted, setIsChangeAccepted] = useState<boolean>(false);

  const countCombinations = (selections_arr: any) => {
    var combs = [] as any;
    for (var i = 1; i <= selections_arr.length; i++) {
      combs.push(calculateCombinations(selections_arr.length, i));
    }
    return combs;
  };

  function calculateCombinations(n: any, k: any) {
    if (k === 0 || k === n) return 1;
    k = Math.min(k, n - k);
    let result = 1;
    for (let i = 1; i <= k; i++) {
      result *= (n - i + 1) / i;
    }
    return result;
  }

  function findCombinations<T>(arr: T[], x: number): T[][] {
    if (x === 0) {
      return [[]]; // Return an array with an empty array for 0 elements
    } else if (x > arr.length) {
      return []; // Return an empty array if x is greater than the array length
    } else {
      const combinationsList: T[][] = [];
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          combinationsList.push([arr[i], arr[j]]);
        }
      }
      return combinationsList;
    }
  }

  const handleAcceptChange = () => {
    // Perform the necessary data change logic here
    // For example, update the state or make an API call

    // For demonstration, let's toggle the change status
    setIsChangeAccepted((prevStatus) => !prevStatus);
  };

  if (selectedArray.length > 0) {
    var combinations = countCombinations(selectedArray);
    var all_combinations = findCombinations(selectedArray, 2);
    console.log({ all_combos: all_combinations, combinations });
    var total_bet = selectedArray.reduce((sum, item) => {
      // console.log(parseFloat(item.stake_value));
      if (!isNaN(parseFloat(item.stake_value))) {
        console.log({ hh: item.stake_value });
        return sum + parseFloat(item.stake_value);
      } else {
        return sum;
      }
    }, 0);

    var total_to_return = selectedArray.reduce((sum, item) => {
      // console.log(parseFloat(item.stake_value));
      if (
        !isNaN(parseFloat(item.stake_value)) &&
        !isNaN(parseFloat(item.value))
      ) {
        return sum + parseFloat(item.stake_value) * parseFloat(item.value);
      } else {
        return sum;
      }
    }, 0);

    total_bet = total_bet.toFixed(2);
    total_to_return = total_to_return.toFixed(2);
    return (
      <>
        <div className="fixed left-[40%] bottom-9 rounded-[5px, 5px, 0, 0] flex flex-col bg-white rounded-[5px] w-[450px] z-50">
          <div className="flex justify-between rounded-[5px] bg-[#f0f0f0] border-b-[1px] border-b-[#d4d4d4] border-solid">
            <div className="flex flex-col pl-[15px] flex-1">
              <div className="text-[17px]  font-[700] pt-[15px] text-[#545454] leading-[10px] flex items-center pb-[5px] relative">
                Selections
                <span className="w-[15px] h-[15px] leading-none text-[10px] bg-[#126e51] text-[#fff] text-center pointer-events-none rounded-full absolute top-0 left-[90px] mt-2">
                  <p className="mt-[2px]">{selectedArray.length}</p>
                </span>
              </div>
              <span
                onClick={() => {
                  setShowingFilterCollapse(!showingFilterCollapse);
                }}
                className={`bs-EditButton text-[#137a5a] text-[11px] cursor-pointer hover:border-b-[1px] border-[#137a5a] border-solid w-fit leading-[1rem] ${
                  !showingContent ? "block" : "hidden"
                }`}
              >
                Show Options
              </span>
              <div className={showingContent ? "block" : "hidden"}>
                <h1 className="text-[#666] text-[11px] flex flex-wrap overflow-hidden max-h-[36px] items-center mb-[9px] transition-margin">
                  <div className="w-full align-top relative items-stretch min-h-[75px] pb-2.5">
                    {selectedArray.map((showingValue: any, index: number) => (
                      <p
                        key={index}
                        className={`mr-[5px] text-[#666] text-[12px] leading-[18px] inline-flex self-center ${
                          index > 10 ? "hidden" : ""
                        }`}
                      >
                        hello
                        {/*{showingValue.home.substr(0, 10)} */}
                      </p>
                    ))}
                    <p
                      className={`${
                        selectedArray.length > 9
                          ? "text-[green] border-solid border-[green] hover:border-b-[1px] cursor-pointer"
                          : "hidden"
                      }`}
                    >
                      {selectedArray.length - 9}+ more
                    </p>
                  </div>
                </h1>
              </div>
            </div>
            <div
              style={{ lineHeight: "1rem" }}
              className={`flex flex-col text-[#666] text-[11px] justify-center items-center pr-2 ${
                !showingContent ? "block" : "hidden"
              }`}
            >
              <div className="bs-Balance_Label ">Balance</div>
              <div className="bs-Balance_ValueWrapper ">
                <div className="bs-Balance_Value ">
                  €{session?.user?.balance?.sports_betting}
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                setShowingContent(!showingContent);
              }}
              className={`w-[15%] min-h-[54px] flex items-center justify-center cursor-pointer right-0 top-0 h-full transition-opacity duration-500 border-opacity-50 ${
                showingContent ? "rotate-[180deg]" : "rotate-[0deg]"
              }`}
              style={
                !showingContent
                  ? { borderLeft: "1px solid #d4d4d4" }
                  : { borderRight: "1px solid #d4d4d4" }
              }
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ transform: "rotate(90deg)", color: "#126e01" }}
              />
            </div>
          </div>
          {showingFilterCollapse && (
            <div className="h-[45px]" style={{ background: "#f3f3f3" }}>
              <div className="bss-ControlBar flex justify-between items-center h-full px-[10px] text-[#137a5a]">
                <div className="bss-ControlBar_RemoveButton flex justify-center items-center">
                  <div
                    className="bss-ControlBar_RemoveAll text-[11px] border-solid border-[#137a5a] hover:border-b-[1px] cursor-pointer"
                    style={{ lineHeight: "14px" }}
                  >
                    Remove all
                  </div>
                </div>

                <div className="bss-ControlBar_TypesWrapper flex justify-center items-center relative">
                  <div
                    onClick={() => enableSoloStatus()}
                    className="bss-ControlBar_BetslipTypesButton  cursor-pointer  text-[11px] mr-2 border-solid border-[#137a5a] hover:border-b-[1px]"
                    style={{ lineHeight: "14px" }}
                  >
                    Singles
                  </div>
                  <div
                    onClick={() => enableMultipleStatus()}
                    className="bss-ControlBar_BetslipTypesButton  cursor-pointer  text-[11px] mr-2 border-solid border-[#137a5a] hover:border-b-[1px]"
                    style={{ lineHeight: "14px" }}
                  >
                    Multiples
                  </div>
                  <div
                    onClick={() => enableSystemStatus()}
                    className="bss-ControlBar_BetslipTypesButton  cursor-pointer  text-[11px] mr-2 border-solid border-[#137a5a] hover:border-b-[1px]"
                    style={{ lineHeight: "14px" }}
                  >
                    System
                  </div>
                  <div className="bss-ControlBar_BarsIcon"></div>
                </div>
              </div>
            </div>
          )}
          <div className={showingContent ? "hidden" : "block"}>
            <div className="flex overflow-hidden overscroll-contain opacity-100 bg-transparent relative flex flex-col overflow-y-auto w-full transition-[height] duration-[0.25s] ease-[ease-in-out] pt-0">
              {selectedArray.map((item: any) => {
                return (
                  <BetSlipElement
                    id={item._id}
                    event_id={item.event_id}
                    event_name={item.event_name}
                    odd_name={item.odd_name}
                    odd_id={item.odd_id}
                    participant_id={item.participant_id}
                    participant_name={item.participant_name}
                    participant_handicap={item.participant_handicap}
                    odd_value={item.value}
                    stake_value={item.stake_value}
                    bet_enabled={soloStatus ? true : false}
                  />
                );
              })}
            </div>
            <div className={systemStatus ? "block" : "hidden"}>
              <div className="flex overflow-hidden overscroll-contain opacity-100 bg-transparent relative flex flex-col overflow-y-auto w-full transition-[height] duration-[0.25s] ease-[ease-in-out] pt-0">
                {combinations.map((item: any, index: any) => {
                  return (
                    <SystemElement
                      id={item._id}
                      system_number={SYSTEM_NAMES[index + 1]}
                      number_of_elements={item}
                      event_id={item.event_id}
                      event_name={item.event_name}
                      odd_name={item.odd_name}
                      odd_id={item.odd_id}
                      participant_id={item.participant_id}
                      participant_name={item.participant_name}
                      participant_handicap={item.participant_handicap}
                      odd_value={item.value}
                      stake_value={item.stake_value}
                    />
                  );
                })}
              </div>
            </div>
            <div className={multipleStatus ? "block" : "hidden"}>
              <div className="flex overflow-hidden overscroll-contain opacity-100 bg-transparent relative flex flex-col overflow-y-auto w-full transition-[height] duration-[0.25s] ease-[ease-in-out] pt-0">
                <MultipleElement
                  system_number={SYSTEM_NAMES[combinations.length]}
                  number_of_elements={combinations[combinations.length - 1]}
                />
              </div>
            </div>
            <div>
              <div className="bg-[#f0f0f0] w-full rounded-b-[5px]">
                <div className="min-w-full relative flex rounded-b-[5px]">
                  <div className="flex h-[50px] flex-[0_0_100%] relative cursor-pointer ml-auto mr-0 my-0 rounded-b-[5px]">
                    <div className="flex flex-col text-lg leading-[21px] min-h-[50px] items-center justify-center w-full relative bg-[#137a5a] rounded-b-[5px]">
                      <div className="relative whitespace-nowrap cursor-pointer min-h-[48px] flex items-center justify-center flex-col w-full transition-[background-color] duration-[0.2s,height] delay-[0.2s] h-full pt-1.5 pb-[7px] px-2.5 pt-1.5 pb-[7px] px-[15px]">
                        <div className="text-center flex flex-wrap justify-center w-full leading-5 min-h-[16px] mt-5">
                          <div className="text-base text-white leading-[19px] relative whitespace-normal font-bold transition-opacity duration-[0.25s]">
                            Place Bet
                          </div>
                          <div className="text-base text-[#9effe0] leading-[19px] font-bold ml-2.5">
                            € {total_bet}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap text-center leading-[13px] text-[10px] text-[#9effe0] mb-6">
                        <div>Total To Return</div>
                        <div className="inline-block ml-[3px]">
                          {" "}
                          € {total_to_return}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* {isChangeAccepted ? (
                  // Render changed data
                  <div className="rounded-[5px 5px 0 0]">
                    <div className="bg-[#757575] rounded-b-[5px] py-4">
                      <div className="text-[#c3c3c3] text-center font-[700] text-[18px] leading-[21px]">
                        Place Bet <span className="text-[#a49d9d]">€0.00</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Render default data
                  <div className="bg-[#5fe8bd] rounded-b-[5px]">
                    <div className="text-center text-[10px] text-[#1f4d3e] ">
                      The price of your selections changed
                    </div>
                    <div
                      className="text-[#1f4d3e] text-center font-[700] text-[16px] leading-[19px] pb-3"
                      onClick={handleAcceptChange}
                    >
                      Accept Change
                    </div>
                  </div>
                )} */}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default PopupShowing;
