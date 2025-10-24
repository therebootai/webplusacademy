"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { FaPhone } from "react-icons/fa6";
import { GiArchiveRegister } from "react-icons/gi";
import Appmodal from "@/components/global/Appmodal";

const OnlyMobile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const toggleAppointmentModal = () =>
    setIsAppointmentModalOpen(!isAppointmentModalOpen);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollThreshold = window.innerWidth <= 768 ? 100 : 300;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (
      scrollTop > scrollThreshold &&
      scrollTop + windowHeight < documentHeight - 50
    ) {
      setIsVisible(true);
      setIsAnimated(true);
    } else {
      setIsVisible(false);
      setIsAnimated(false);
    }
  };

  return (
    <div
      className={`fixed w-full p-2 z-[80] bottom-0 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex md:hidden justify-between bg-white items-center p-4 h-[4rem] rounded-lg border-[#004a7e] border-2 ${
          isAnimated ? "bottomToTop" : ""
        }`}
      >
        <Link
          target="_blank"
          href="https://api.whatsapp.com/send?phone=+919614016184"
          className="flex flex-col items-center gap-2 text-sm text-[#004a7e] font-semibold"
        >
          <span className="text-xl">
            <TbBrandWhatsappFilled className="text-[#004a7e]" />
          </span>
          <span>Whatsapp</span>
        </Link>

        <button
          onClick={toggleAppointmentModal}
          className="flex flex-col gap-2 items-center h-[4rem] text-sm text-custom-white font-semibold"
        >
          <span className="absolute -top-4 bg-white w-[4rem] h-[4rem] border-t-[2px] border-[#004a7e] rounded-full justify-center items-center flex">
            <span className="flex w-[3rem] h-[3rem] text-xl bg-custom-lightpurple rounded-full justify-center items-center relative">
              <GiArchiveRegister className="size-8 text-[#004a7e]" />
            </span>
          </span>
          <span
            className="relative top-8 text-[#004a7e]"
            onClick={toggleAppointmentModal}
          >
            Registration Now
          </span>
        </button>

        <Link
          href="tel:+919614016184"
          target="_blank"
          className="flex flex-col gap-2 items-center text-sm text-[#004a7e] font-semibold"
        >
          <span className="text-xl">
            <FaPhone className="text-[#004a7e]" />
          </span>
          <span>Call Now</span>
        </Link>
      </div>
     

        <Appmodal isOpen={isAppointmentModalOpen}
        onClose={toggleAppointmentModal} />

      
    </div>
  );
};

export default OnlyMobile;
