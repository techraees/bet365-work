import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";

import SystemElement from "./SystemElement";
import MultipleElement from "./MultipleElement";
import CouponElement from "./CouponElement";
import { placeCoupon } from "@/api";
const PopupShowing = () => {
  const {
    type,
    selections,
    system,
    addSelection,
    setType,
    clearSystem,
    clearSelections,
  } = useBetSlipStore();
  const [soloStatus, setSoloStatus] = useState<boolean>(true);
  const [systemStatus, setSystemStatus] = useState<boolean>(false);
  const [multipleStatus, setMultipleStatus] = useState<boolean>(false);
  const [showingContent, setShowingContent] = useState<boolean>(false);
  const [betPlaced, setBetPlaced] = useState<boolean>(false);
  const [betIsPlacing, setBetIsPlacing] = useState<boolean>(false);
  const [couponObject, setCouponObject] = useState<any>({});

  const { data: session } = useSession();
  const [showingFilterCollapse, setShowingFilterCollapse] =
    useState<any>(false);

  const router = useRouter();

  useEffect(() => {
    // If there is no session, redirect to the login page
    if (!session) {
      router.push("/auth/signin"); // Replace '/login' with your login route
    }
  }, [session, router]);

  const enableMultipleStatus = () => {
    setType("Multiple");
    clearSystem();
    setMultipleStatus(true);
    setSoloStatus(false);
    setSystemStatus(false);
    false;
  };

  const enableSoloStatus = () => {
    setType("Solo");
    clearSystem();
    setSoloStatus(true);
    setMultipleStatus(false);
    setSystemStatus(false);
    false;
  };

  const enableSystemStatus = () => {
    setType("System");
    clearSystem();
    setSoloStatus(false);
    setMultipleStatus(false);
    setSystemStatus(true);
    false;
  };

  const handleRemoveAllSelections = () => {
    clearSelections();
    clearSystem();
    setBetPlaced(false);
  };

  var selectedArray = selections;
  useEffect(() => {
    if (selections.length > 1) {
      enableMultipleStatus();
    } else {
      enableSoloStatus();
    }
  }, [selections]);

  // console.log({ handleArr: selectedArray });
  // Handling Deletion

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

  function handleClick() {
    console.log("place bet clicked");
    console.log({ evs: selections, type: type, system: system });
    setBetIsPlacing(true);
    let updatedSelections = selections.map((obj) => {
      // Create a new object with all properties from the original object
      let newObj = { ...obj };

      // Add the new key 'value_eu' with the value of the original 'value' key
      newObj.value_eu = obj.value;

      // Delete the original 'value' key
      delete newObj.value;

      return newObj;
    });
    var current_stake  = 0;
    var possible_winnings = 0;
    if(type=== "Solo"){
      current_stake = total_bet;
      possible_winnings = parseFloat(total_to_return);
    }
    if(type=== "System"){
      current_stake = total_bet_system;
      possible_winnings = parseFloat(total_possible_winnings);

    }
    if(type === "Multiple"){
      current_stake = total_bet_system
      possible_winnings = parseFloat(total_possible_winnings);
    }
    const payload = {
      type: type,
      selections: updatedSelections,
      system: system,
      stake: current_stake,
      possible_winnings: possible_winnings,
      allowOnChange: 1,
    };
    console.log({ payloadz: payload });
    // @ts-ignore
    const token = session?.user?.token;
    placeCoupon(token, payload).then((res) => {
      if (res.ok) {
        setBetIsPlacing(false);
        setBetPlaced(true);
      }
      res.json().then((result) => {
        setCouponObject(result.message);
        console.log({ rs: result });
      });
    });
  }

  function sumTotalStakesSystem(data: any) {
    let totalSum = 0;

    // Iterate over each key in the object
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const system = data[key];

        // Check if 'total_stake' exists and is a number
        if (system && typeof system.total_stake === "number") {
          totalSum += system.total_stake;
        }
      }
    }

    return totalSum;
  }

  function findPossibleWinnings(data: any) {
    var total_winnings = 0;
    var total_stake = 1;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const _data = data[key];
        const combinations = _data.combinations;

        if (combinations) {
          combinations.forEach((combination: any) => {
            combination.forEach((event: any) => {
              var stake_value = parseFloat(event.value);
              total_stake *= stake_value;
            });
            total_winnings += (total_stake) * parseFloat(data[key].single_stake)
            total_stake = 1;
          });
        }
      }
    }
    // total_winnings = total_stake;
    // console.log({total_winnings:total_winnings})
    return total_winnings.toFixed(2);
  }

  if (selectedArray.length > 0) {
    var combinations = countCombinations(selectedArray);
    var total_bet = selectedArray.reduce((sum, item) => {
      // console.log(parseFloat(item.stake_value));
      if (!isNaN(parseFloat(item.stake))) {
        return sum + parseFloat(item.stake);
      } else {
        return sum;
      }
    }, 0);

    var total_bet_system = sumTotalStakesSystem(system);

    var total_possible_winnings = findPossibleWinnings(system);

    var total_to_return = selectedArray.reduce((sum, item) => {
      // console.log(parseFloat(item.stake));
      if (
        !isNaN(parseFloat(item.stake)) &&
        !isNaN(parseFloat(item.value))
      ) {
        return sum + parseFloat(item.stake) * parseFloat(item.value);
      } else {
        return sum;
      }
    }, 0);

    total_bet = total_bet.toFixed(2);
    total_to_return = total_to_return.toFixed(2);
    console.log({ ccObj: couponObject });
    if (betPlaced && couponObject.selections !== undefined) {
      return (
        <>
          <div className="fixed bottom-9 rounded-[5px, 5px, 0, 0] flex flex-col bg-white rounded-[5px] z-50 left-0 w-screen md:left-[20%] md:w-full md:min-w-[300px] md:max-w-[500px]">
            <div className="bg-[#137a5a] flex rounded-t-[5px] items-center h-[55px] cursor-default shadow-[0_-2px_0_0_rgba(0,0,0,0.07)] border-b-[#189970] border-b border-solid">
              {/* //tick  */}
              <div className="w-7 h-7 bg-[#5fe8bd] flex-[0_0_auto] animate-[bss-ReceiptContent\_EmptyGrow_0.25s_linear_0.2s_forwards] ml-2.5 rounded-[90px] scale-1 ml-[15px]">
                <div className="custom-svg-background h-7 w-7 linear-animation"></div>
              </div>

              {/* //bet placed */}
              <div className="flex-[1_0_auto] pl-2.5">
                <div className="text-[17px] text-[#f8f8f8] leading-5 font-bold pb-0.5">
                  Bet Placed
                </div>
                <div className="text-[11px] text-[#9effe0] leading-[13px]">
                  Bet ref {couponObject._id}
                </div>
              </div>
              <div
                className="text-xs text-[#9effe0] flex-[0_0_auto] cursor-pointer leading-[14px] inline-flex items-center px-2.5"
                onClick={handleRemoveAllSelections}
              >
                Done
              </div>
            </div>

            <div className={showingContent ? "hidden" : "block"}>
              <div className="flex overflow-hidden overscroll-contain opacity-100 bg-transparent relative flex flex-col overflow-y-auto w-full transition-[height] duration-[0.25s] ease-[ease-in-out] pt-0">
                {couponObject.selections.map((item: any) => {
                  return (
                    <CouponElement
                      key={item._id}
                      id={item._id}
                      event_id={item.event_id}
                      event_name={item.event_name}
                      odd_name={item.odd_name}
                      odd_id={item.odd_id}
                      participant_id={item.participant_id}
                      participant_name={item.participant_name}
                      participant_handicap={item.participant_handicap}
                      odd_value={item.value_eu}
                      stake_value={item.stake}
                      bet_enabled={soloStatus ? true : false}
                    />
                  );
                })}
              </div>
              <div>
                <div className="bg-[#f0f0f0] w-full rounded-b-[5px]">
                  <div className="pt-1.5 pb-[7px] px-[15px]">
                    <div className="min-w-full relative flex rounded-b-[5px] h-full">
                      <div className="flex justify-start text-lg leading-[21px] items-center w-full relative">
                        <div className="text-left ml-2">
                          <div className="text-[10px] text-[#545454] leading-[13px] font-normal">
                            Total Stake
                          </div>
                          <div className="text-2xl text-[#545454] font-normal leading-6">
                            {couponObject.stake} 
                          </div>
                        </div>
                        <div className="flex-1"></div>{" "}
                        {/* Placeholder for centering */}
                        <div className="text-left">
                          <div className="text-[10px] text-[#545454] leading-[13px] font-normal">
                            Possible Winnings
                          </div>
                          <div className="text-2xl text-[#545454] font-normal leading-6">
                            {couponObject.possible_winnings} 
                          </div>
                        </div>
                        <div className="flex-1"></div>{" "}
                        {/* Placeholder for centering */}
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
    }
    return (
      <>
        <div className="fixed bottom-9 rounded-[5px, 5px, 0, 0] flex flex-col bg-white rounded-[5px] z-50 left-0 w-screen md:left-[20%] md:w-full md:min-w-[300px] md:max-w-[500px]">
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
                          index > 1 ? "hidden" : ""
                        }`}
                      >
                        {showingValue.event_name} - {showingValue.odd_name}
                        {/*{showingValue.home.substr(0, 10)} */}
                      </p>
                    ))}
                    <p
                      className={`${
                        selectedArray.length > 1
                          ? "text-[green] border-solid border-[green] hover:border-b-[1px] cursor-pointer"
                          : "hidden"
                      }`}
                    >
                      {selectedArray.length - 1}+ more
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
                  {/* @ts-ignore */}
                  €{session?.user?.balance?.sports_betting_slots}
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
                    onClick={() => {
                      handleRemoveAllSelections();
                    }}
                  >
                    Remove all
                  </div>
                </div>

                <div className="bss-ControlBar_TypesWrapper flex justify-center items-center relative">
                  {selections.length === 1 && (
                    <div>
                      <div
                        onClick={() => enableSoloStatus()}
                        className="bss-ControlBar_BetslipTypesButton  cursor-pointer  text-[11px] mr-2 border-solid border-[#137a5a] hover:border-b-[1px]"
                        style={{ lineHeight: "14px" }}
                      >
                        Singles
                      </div>
                    </div>
                  )}

                  {selections.length > 1 && (
                    <>
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
                    </>
                  )}
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
                    key={item._id}
                    id={item._id}
                    event_id={item.event_id}
                    event_name={item.event_name}
                    odd_name={item.odd_name}
                    odd_id={item.odd_id}
                    participant_id={item.participant_id}
                    participant_name={item.participant_name}
                    participant_handicap={item.participant_handicap}
                    odd_value={item.value}
                    stake_value={item.stake}
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
                      key={item._id}
                      id={item._id}
                      system_number={index + 1}
                      number_of_elements={item}
                      event_id={item.event_id}
                      event_name={item.event_name}
                      odd_name={item.odd_name}
                      odd_id={item.odd_id}
                      participant_id={item.participant_id}
                      participant_name={item.participant_name}
                      participant_handicap={item.participant_handicap}
                      odd_value={item.value}
                      stake_value={item.stake}
                    />
                  );
                })}
              </div>
            </div>
            <div className={multipleStatus ? "block" : "hidden"}>
              <div className="flex overflow-hidden overscroll-contain opacity-100 bg-transparent relative flex flex-col overflow-y-auto w-full transition-[height] duration-[0.25s] ease-[ease-in-out] pt-0">
                <MultipleElement
                  id={"1"}
                  system_number={combinations.length}
                  number_of_elements={combinations[combinations.length - 1]}
                />
              </div>
            </div>
            <div>
              <div className="bg-[#f0f0f0] w-full rounded-b-[5px]">
                <div className="min-w-full relative flex rounded-b-[5px]">
                  <div className="flex h-[50px] flex-[0_0_100%] relative cursor-pointer ml-auto mr-0 my-0 rounded-b-[5px]">
                    <div
                      className="flex flex-col text-lg leading-[21px] min-h-[50px] items-center justify-center w-full relative bg-[#137a5a] rounded-b-[5px]"
                      onClick={handleClick}
                    >
                      <div className="relative whitespace-nowrap cursor-pointer min-h-[48px] flex items-center justify-center flex-col w-full transition-[background-color] duration-[0.2s,height] delay-[0.2s] h-full pt-1.5 pb-[7px] px-2.5 pt-1.5 pb-[7px] px-[15px]">
                        {betIsPlacing ? (
                          <div className="text-center flex flex-wrap justify-center w-full leading-5 min-h-[16px] mt-5">
                              <div className="text-base text-white leading-[19px] relative whitespace-normal font-bold transition-opacity duration-[0.25s]">
                                <div className="bl-Preloader_Spinner bl-Spinner"></div>
                              </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-center flex flex-wrap justify-center w-full leading-5 min-h-[16px] mt-5">
                              <div className="text-base text-white leading-[19px] relative whitespace-normal font-bold transition-opacity duration-[0.25s]">
                                Place Bet
                              </div>
                              <div className="text-base text-[#9effe0] leading-[19px] font-bold ml-2.5">
                                {type === "Solo" && <div>€ {total_bet}</div>}
                                {type === "System" && (
                                  <div>€ {total_bet_system}</div>
                                )}
                                {type === "Multiple" && (
                                  <div>€ {total_bet_system}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {!betIsPlacing && (
                        <div className="flex flex-wrap text-center leading-[13px] text-[10px] text-[#9effe0] mb-6">
                          <div>Total To Return</div>
                          <div className="inline-block ml-[3px]">
                            {" "}
                            {type === "Solo" && <div>€ {total_to_return}</div>}
                            {type === "System" && (
                              <div>€ {total_possible_winnings}</div>
                            )}
                            {type === "Multiple" && (
                              <div>€ {total_possible_winnings}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
