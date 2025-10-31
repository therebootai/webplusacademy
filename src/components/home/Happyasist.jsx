"use client";
import { useState } from "react";
import Image from "next/image";
import Appmodal from "../global/Appmodal";

export default function Happyasist() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const toggleAppointmentModal = () => {
    setIsAppointmentModalOpen(!isAppointmentModalOpen);
  };

  return (
    // 🌈 Full-width background
    <section className="bg-gradient-to-r from-[#CC2020] via-[#B11717] to-[#A11111] py-10">
      {/* 🎯 Centered content area */}
      <div className="max-w-[1440px] mx-auto flex flex-col-reverse md:flex-row justify-between items-center px-4 lg:px-28 xl:px-40 gap-6">
        {/* Left Content */}
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            HAPPY TO ASSIST YOU!
          </h2>
          <p className="text-white mb-5 leading-relaxed">
            Need more details about courses? Our expert academic counsellor will
            be happy to guide you everything that you want to know.
          </p>

          <button
            onClick={toggleAppointmentModal}
            className="px-8 py-3 bg-[#00205A] text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
          >
            Register Now
          </button>
        </div>

        {/* Right Image */}
        <div className="">
          <Image
            src="/assets/person1.jpg"
            alt="Doctor Consultation"
            width={450}
            height={300}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Modal */}
      <Appmodal isOpen={isAppointmentModalOpen} onClose={toggleAppointmentModal} />
    </section>
  );
}
