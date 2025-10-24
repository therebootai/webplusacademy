"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const tabData = {
  NEET: [
    { id: 1, img: "/assets/neet/cardss1.avif", link: "/neet" },
    { id: 2, img: "/assets/neet/neetcrash.avif", link: "/neet" },
    { id: 3, img: "/assets/neet/cardss1.avif", link: "/neet" },
  ],
  "NEET CRASH": [
    { id: 1, img: "/assets/neet/neetcrash.avif", link: "/neet" },
    { id: 2, img: "/assets/neet/cardss1.avif", link: "/neet" },
    { id: 3, img: "/assets/neet/cardss1.avif", link: "/neet" },
  ],
  "11th & 12th": [
    { id: 1, img: "/assets/neet/cardss1.avif", link: "/neet" },
    { id: 2, img: "/assets/neet/cardss1.avif", link: "/neet" },
    { id: 3, img: "/assets/neet/neetcrash.avif", link: "/neet" },
  ],
};

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("NEET");

  return (
    <section className="max-w-[1440px] mx-auto py-10">

      <div className="flex justify-center gap-8 mb-8 bg-[#F6F6F7]  py-5">
        {Object.keys(tabData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-md font-semibold transition-all ${
              activeTab === tab
                ? "bg-[#242459] text-white w-[180px] ring-2 ring-[#242459] ring-opacity-50"
                : "text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tabData[activeTab].map((card) => (
          <div
            key={card.id}
            className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg border-[0.2px] border-gray-400"
          >
            
            <Image
              src={card.img}
              alt={`Card ${card.id}`}
              layout="fill"
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

          
            <div className="absolute bottom-8 left-1/4 transform -translate-x-1/2">
              <Link href={card.link}>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-md transition-all">
                  Explore More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
