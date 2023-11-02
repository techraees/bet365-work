import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const PopupShowing = ({ selectedArray, setSelectedArray }: any) => {
  const [showingContent, setShowingContent] = useState<any>(false);
  const [showingFilterCollapse, setShowingFilterCollapse] =
    useState<any>(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [clickedItems, setClickedItems] = useState<string[]>([]);
  const [showingPrice, setShowingPrice] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState<any>(false);

  const handleClick = (itemName: any) => {
    if (!clickedItems.includes(itemName)) {
      setClickedItems((prevItems) => [...prevItems, itemName]);
      setModalOpen(true);
    }
  };
  // Handling Deletion
  const handleDeletingSelection = (deletingItem: any) => {
    const filteredArr = selectedArray.filter((filterObj: any) => {
      // Check if `home` property is different
      if (filterObj.home !== deletingItem.home) {
        return true;
      }

      // Check if `rows` properties are different
      for (const key in filterObj.rows) {
        if (filterObj.rows[key] !== deletingItem.rows[key]) {
          return true;
        }
      }

      return false;
    });
    console.log(filteredArr, selectedArray, "I am present 7");

    setSelectedArray(filteredArr);
  };
  const [isChangeAccepted, setIsChangeAccepted] = useState<boolean>(false);

  const handleRemoveItem = (itemName: string) => {
    setClickedItems((prevItems) =>
      prevItems.filter((item) => item !== itemName)
    );
  };

  const handleAcceptChange = () => {
    // Perform the necessary data change logic here
    // For example, update the state or make an API call

    // For demonstration, let's toggle the change status
    setIsChangeAccepted((prevStatus) => !prevStatus);
  };

  switch (true) {
    case selectedArray.length >= 1 && selectedArray.length < 4:
      return (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translate(-50%, 0%)",
          }}
          className=" text-white w-[35.15vw]"
        >
          <div className="flex flex-col">
            {selectedArray.map((valueSingle: any) => (
              <div className="upper px-[0.4rem] py-[0.5rem] bg-white">
                <span
                  className="icon text-black relative opacity-[0.3] cursor-pointer"
                  onClick={() => handleDeletingSelection(valueSingle)}
                >
                  <svg
                    className="absolute top-[10px] left-[-9px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 68 68"
                    fill="none"
                  >
                    <path
                      d="M25.4558 25.4561L42.4264 42.4266"
                      stroke="#190B47"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M25.4558 42.4266L42.4264 25.4561"
                      stroke="#190B47"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div
                  className="user_detail flex flex-col ml-[1.25rem] "
                  style={{ marginLeft: "1.1rem" }}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-[0.5rem]">
                      <h3 className="text-[#545454] text-[15px] font-[700]">
                        {valueSingle.home.substr(0, 20)}
                      </h3>
                      <span className="price text-[#137a5a] font-[700]">
                        {valueSingle.rows.value}
                      </span>
                    </div>
                    {selectedArray.length >= 2 && (
                      <p className="text-black">Hello</p>
                    )}
                  </div>
                  <div className="desc text-[#666] text-[11px] leading-[20px]">
                    <p>{valueSingle.away}</p>
                    <p>{valueSingle.awayscore}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="lower flex w-[100%]">
              <div className="left-btn bg-[#333333] flex w-[50%] justify-between items-center px-[0.75rem] py-[0.1rem]">
                <h3 className="text-[0.75rem] text-[#58d7af] font-[400] text-[1rem]">
                  Set Stake
                </h3>
                <div className="flex flex-col justify-end items-end opacity-[0.3] hover:opacity-[1]">
                  <span className="text-[0.75rem] text-[#cecece]">
                    Remember
                  </span>
                  <div className="pr-[0.5rem]">
                    <input type="checkbox" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="right-btn bg-[#757575] flex w-[50%] justify-center items-center font-[500] text-[1rem] text-[#cecece]">
                Place Bet
              </div>
            </div>
          </div>
        </div>
      );

      return (
        <div className="fixed top-0 right-0 bg-[red] w-[10rem] h-[20rem]">
          Treple
        </div>
      );
    case selectedArray.length > 3:
      return (
        <>
          <div
            style={{
              position: "fixed",
              bottom: "2.25rem",
              left: "50%",
              transform: "translate(-50%, 0%)",
            }}
            className="rounded-[5px, 5px, 0, 0] flex flex-col bg-white rounded-[5px] w-[450px] "
          >
            <div
              className="flex justify-between bg-[#f0f0f0]"
              style={{
                borderBottom: "1px solid #d4d4d4",
              }}
            >
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
                    console.log("SHOW");
                  }}
                  className={`bs-EditButton text-[#137a5a] text-[11px] cursor-pointer hover:border-b-[1px] border-[#137a5a] border-solid w-fit leading-[1rem] ${
                    !showingContent ? "block" : "hidden"
                  }`}
                >
                  Show Options
                </span>
                <div className={showingContent ? "block" : "hidden"}>
                  <h1 className="text-[#666] text-[11px] flex flex-wrap overflow-hidden max-h-[36px] items-center mb-[9px] transition-margin">
                    {selectedArray.map((showingValue: any, index: number) => (
                      <p
                        key={index}
                        className={`mr-[5px] text-[#666] text-[12px] leading-[18px] inline-flex self-center ${
                          index > 10 ? "hidden" : ""
                        }`}
                      >
                        {showingValue.home.substr(0, 10)}
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
                  <div className="bs-Balance_Value ">€11.84</div>
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
                  style={{ transform: "rotate(-90deg)", color: "#126e01" }}
                />
              </div>
            </div>
            {showingFilterCollapse && (
              <div className="h-[45px]" style={{ background: "#f3f3f3" }}>
                <div className="bss-ControlBar flex justify-between items-center h-full px-[10px] text-[#137a5a]">
                  <div className="bss-ControlBar_RemoveButton flex justify-center items-center">
                    <div
                      onClick={() => setSelectedArray([])}
                      className="bss-ControlBar_RemoveAll text-[11px] border-solid border-[#137a5a] hover:border-b-[1px] cursor-pointer"
                      style={{ lineHeight: "14px" }}
                    >
                      Remove all
                    </div>
                  </div>

                  <div className="bss-ControlBar_TypesWrapper flex justify-center items-center relative">
                    <div
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="bss-ControlBar_BetslipTypesButton  cursor-pointer  text-[11px] mr-2 border-solid border-[#137a5a] hover:border-b-[1px]"
                      style={{ lineHeight: "14px" }}
                    >
                      Singles and Multiples
                    </div>
                    <div className="bss-ControlBar_BarsIcon">
                      <FontAwesomeIcon
                        icon={faBars}
                        style={{ fontSize: "12px" }}
                      />
                    </div>
                    <div
                      className={`absolute ${
                        !showDropdown ? "block" : "hidden"
                      }`}
                      style={{
                        top: "1.5rem",
                        right: "-0.5rem",
                        width: "130%",
                        borderRadius: "50%",
                      }}
                    >
                      <div className="bs-BetslipTypesOptions text-[14px] bg-white">
                        <div className="bs-BetslipTypeItem border-solid border-[1px]  border-[#2b2b2b]">
                          <div
                            className="bs-BetslipTypeItem_Label p-2"
                            style={{ borderLeft: "5px solid #2ec193" }}
                          >
                            Singles and Multiples
                          </div>
                        </div>
                        <div className="bs-BetslipTypeItem  border-solid border-[1px]  border-[#2b2b2b]">
                          <div className="bs-BetslipTypeItem_Label p-2">
                            Banker
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={showingContent ? "hidden" : "block"}>
              <ul className="h-[400px] overflow-auto">
                {selectedArray.map((item: any) => {
                  return (
                    <div
                      className="flex justify-between"
                      style={{
                        borderBottom: "1px solid #d4d4d4",
                        background: "#e5e5e5",
                      }}
                      key={item._id}
                    >
                      <div className="flex py-3 pl-[6px]">
                        <FontAwesomeIcon
                          className="w-[12px] h-[16px] opacity-[0.2]"
                          icon={faTimes}
                          style={{
                            color: "#545454",
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeletingSelection(item)} // Added onClick to remove item
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex flex-col py-3 pl-3">
                          <div className="flex flex-col"></div>
                          <div className="flex flex-col">
                            <div className="flex justify-between">
                              {" "}
                              <h5 className="text-[16px] text-[#545454] leading-[18px] font-[700] pb-[3px] ">
                                {item.away}
                              </h5>
                              <div className="bg-[#5fe8bd] flex justify-center items-center font-[700]  text-[15px] text-[#000] px-2 ">
                                {item.rows.value}
                              </div>
                            </div>
                            <div className="text-[11px] leading-[16px] text-[#666] ">
                              {item.awayscore ? item.awayscore : "1"}
                            </div>
                          </div>
                          <div className="text-[11px] leading-[16px] text-[#666]">
                            {item.home}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-[25%]">
                        <input
                          type="text"
                          onChange={(e) => setShowingPrice(e.target.value)}
                          placeholder="Stake"
                          className="text-[#6e6e6e] bg-white w-[w-full] h-[50%] outline-none text-right"
                          style={{
                            borderBottom: "1px solid black",
                            fontSize: "14px",
                            paddingRight: "8px",
                          }}
                        />
                        <div className="flex text-[#666] text-[11px]">
                          <div className="bss-StakeBox_ToReturn-label ">
                            To Return
                          </div>
                          <div className="bss-StakeBox_ToReturn-value ">
                            €{showingPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ul>
              <div>
                {isChangeAccepted ? (
                  // Render changed data
                  <div className="bg-[#757575] rounded-[5px 5px 0 0] py-4">
                    <div className="text-[#c3c3c3] text-center font-[700] text-[18px] leading-[21px]">
                      Place Bet <span className="text-[#a49d9d]">€0.00</span>
                    </div>
                  </div>
                ) : (
                  // Render default data
                  <div className="bg-[#5fe8bd] rounded-[5px 5px 0 0]">
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
                )}
              </div>
            </div>
          </div>
        </>
      );
      break;
  }
};

export default PopupShowing;
