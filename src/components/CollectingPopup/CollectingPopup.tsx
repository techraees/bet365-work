import React, { useState } from "react";

import PopupShowing from "./ConditionalPopup/PopupShowing";

const PopUps = () => {
  return (
    <div className="absolute flex flex-col z-50">
      <PopupShowing />
    </div>
  );
};

export default PopUps;
