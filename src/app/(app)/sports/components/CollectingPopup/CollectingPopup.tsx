import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PopupShowing from "./ConditionalPopup/PopupShowing";

const PopUps = ({ selectedArray, setSelectedArray }: any) => {
  const [isModalOpen, setModalOpen] = useState(true);
  const [clickedItems, setClickedItems] = useState<string[]>([]);

  const handleClick = (itemName: any) => {
    if (!clickedItems.includes(itemName)) {
      setClickedItems((prevItems) => [...prevItems, itemName]);
      setModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col">
      <PopupShowing
        selectedArray={selectedArray}
        setSelectedArray={setSelectedArray}
      />
    </div>
  );
};

export default PopUps;
