"use client";

import Image from "next/image";
import React from "react";

const toppers = [
  { img: "/assets/card/card1.png", name: "ARNAV NIGAM", rank: "11" },
  { img: "/assets/card/card2.png", name: "KARMANYA GUPTA", rank: "37" },
  { img: "/assets/card/card3.png", name: "RAMIT GOYAL", rank: "45" },
  { img: "/assets/card/card4.png", name: "MAULIK JAIN", rank: "52" },
];

export default function ResultCard() {
  return (
    <div className="max-w-[660px] w-full bg-white shadow-lg rounded-2xl p-6 border border-gray-200 mx-auto">
      
      <h2 className="text-center text-[#E31E25] font-bold text-xl mb-6">
        JEE ADV. 2025 RESULT
      </h2>

   
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      
        <div className="grid grid-cols-2 gap-6">
          {toppers.map((student, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 mb-3">
                <Image
                  src={student.img}
                  alt={student.name}
                  fill
                  className="rounded-full object-cover border-2 border-[#E31E25]"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#E31E25] text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                  AIR {student.rank}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#E31E25] uppercase leading-tight">
                {student.name}
              </h3>
            </div>
          ))}
        </div>

      
        <div className="flex items-center justify-center">
          <div className="relative w-50 h-50 flex items-center justify-center rounded-full border-[10px] border-green-200 shadow-inner">
            <div className="text-center">
              <p className="text-[10px] font-semibold text-gray-600 leading-tight">
                Motion % of <br /> Qualified <br /> Students in JEE Adv.
              </p>
              <p className="text-[12px] font-semibold text-gray-500 mt-1">
                3231 / 6332
              </p>
              <p className="text-[#E31E25] text-xl font-bold mt-1">=51.02%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


