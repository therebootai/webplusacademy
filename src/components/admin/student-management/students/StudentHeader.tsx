"use client";

import SidePopUpSlider from "@/ui/SidePopup";
import { useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import AddNewStudent from "./AddNewStudent";

export default function StudentHeader() {
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <>
      <div className="flex gap-3.5">
        <button
          type="button"
          onClick={() => setShowPopUp(true)}
          className="flex items-center justify-center rounded-lg xl:text-lg md:text-base text-white bg-site-darkgreen px-5 py-3.5"
        >
          <LuUserPlus />
          <span className="ml-2">Add</span>
        </button>
      </div>
      <SidePopUpSlider
        showPopUp={showPopUp}
        handleClose={() => setShowPopUp(false)}
      >
        <AddNewStudent />
      </SidePopUpSlider>
    </>
  );
}
