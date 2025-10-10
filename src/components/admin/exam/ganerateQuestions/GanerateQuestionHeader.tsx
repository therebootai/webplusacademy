"use client";
import React, { useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import AddGanerateQuestion from "./AddGanerateQuestion";
import SidePopUpSlider from "@/ui/SidePopup";

const GanerateQuestionHeader = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popupKey, setPopupKey] = useState(0);

  function openAddPopup() {
    setPopupKey((k) => k + 1);
    setShowPopUp(true);
  }
  return (
    <div className=" flex flex-row justify-between gap-4 items-center">
      <div></div>
      <div>
        <button
          type="button"
          onClick={openAddPopup}
          className="flex w-fit items-center justify-center rounded-lg xl:text-base md:text-base text-white bg-site-darkgreen px-5 h-[2.5rem] "
        >
          <LuUserPlus />
          <span className="ml-2">Generate Questions</span>
        </button>
      </div>
      <SidePopUpSlider
        showPopUp={showPopUp}
        handleClose={() => setShowPopUp(false)}
        clsprops=" !w-[75%]"
      >
        <AddGanerateQuestion key={popupKey} />
      </SidePopUpSlider>
    </div>
  );
};

export default GanerateQuestionHeader;
