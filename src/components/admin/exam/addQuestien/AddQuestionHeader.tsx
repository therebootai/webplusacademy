"use client";
import SidePopUpSlider from "@/ui/SidePopup";
import React, { useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import AddQuestionForm from "./AddQuestionForm";

const AddQuestionHeader = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popupKey, setPopupKey] = useState(0);

  function openAddPopup() {
    setPopupKey((k) => k + 1);
    setShowPopUp(true);
  }

  return (
    <div className="flex items-center gap-4 justify-between">
      <div></div>
      <div className="flex flex-row gap-4 items-center">
        <button
          type="button"
          onClick={openAddPopup}
          className="flex w-fit items-center justify-center rounded-lg xl:text-base md:text-base text-white bg-site-darkgreen px-5 h-[2.5rem] "
        >
          <LuUserPlus />
          <span className="ml-2">Add</span>
        </button>
        <button
          type="button"
          className="flex w-fit items-center justify-center rounded-lg xl:text-base md:text-base text-white bg-site-darkgreen px-5 h-[2.5rem] "
        >
          <LuUserPlus />
          <span className="ml-2">Bulk Upload</span>
        </button>
      </div>
      <SidePopUpSlider
        showPopUp={showPopUp}
        handleClose={() => setShowPopUp(false)}
      >
        <AddQuestionForm key={popupKey} />
      </SidePopUpSlider>
    </div>
  );
};

export default AddQuestionHeader;
