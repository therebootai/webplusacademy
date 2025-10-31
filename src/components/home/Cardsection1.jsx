
"use client";

import Image from "next/image";

const cards = [
  { 
    logo: "/assets/card/ratioico1.png", 
    title: "15 + Years", 
    subtitle: "Of legacy",
    gradient: "from-[#F8EDD3] to-[#FFF9EA]"
  },
  { 
    logo: "/assets/card/ratioiconss2.png", 
    title: "10K +", 
    subtitle: "Students",
    gradient: "from-[#E3EBF7] to-[#F3F9FF]"
  },
  { 
    logo: "/assets/card/ratiocons3.png", 
    title: "Boys Hostel", 
    subtitle: "Facility",
    gradient: "from-[#E3F2E7] to-[#F4FEF6]"
  },
  { 
    logo: "/assets/card/ratiocons3.png", 
    title: "Girls Hostel", 
    subtitle: "Facility",
    gradient: "from-[#EDE2F4] to-[#F8F4FE]"
  },
];

export default function CardSection1() {
  return (
    <div className="w-full py-2 md:py-10 mx-auto" style={{ maxWidth: "1440px" }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition h-full bg-gradient-to-br ${card.gradient} text-white`}
          >
     
            <div className="mb-4">
              <Image
                src={card.logo}
                alt={`Logo ${index + 1}`}
                width={50}
                height={50}
              />
            </div>

     
            <h3 className="text-lg font-semibold mb-2 text-[#ED1F2B] md:text-[22px] lg:text-[30px]">{card.title}</h3>

           
            <p className="text-[#333069] md:text-[16px] lg:text-[20px]">{card.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
