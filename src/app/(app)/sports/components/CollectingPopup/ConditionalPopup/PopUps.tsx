import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const PopUps = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [clickedItems, setClickedItems] = useState<string[]>([]);

  const handleClick = (itemName: any) => {
    if (!clickedItems.includes(itemName)) {
      setClickedItems((prevItems) => [...prevItems, itemName]);
      setModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col">
      {isModalOpen && (
        <div className="fixed rounded-[5px 5px 0 0] flex left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-[2rem] bg-white rounded-[5px] w-[23.438vw] justify-between">
          <div className="flex flex-col pl-[15px]">
            <div className="text-[17px] font-[700] pt-[10px] text-[#545454] leading-[20px] flex items-center pb-[5px] relative">
              Selections
              <span className="w-[15px] h-[15px] leading-none text-[10px] bg-[#126e51] text-[#fff] text-center pointer-events-none rounded-full absolute top-0 left-[90px] mt-2">
                <p className="mt-[2px]">{clickedItems.length}</p>
              </span>
            </div>
            <div className="">
              <h1 className="text-[#666] text-[11px] flex flex-wrap overflow-hidden max-h-[36px] items-center mb-[9px] transition-margin">
                {clickedItems.map((item, index) => (
                  <p
                    key={index}
                    className={`mr-[5px] text-[#666] text-[12px] leading-[18px] inline-flex self-center`}
                  >
                    {item},
                  </p>
                ))}
              </h1>
            </div>
          </div>
          <div
            className="background-size-[12px 7px] h-full min-h-[65px] flex items-center justify-center cursor-pointer w-[55px] right-0 top-0 h-full transition-opacity duration-500 border-opacity-50"
            style={{ borderLeft: "1px solid #d4d4d4" }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ transform: "rotate(-90deg)", color: "#126e01" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUps;
