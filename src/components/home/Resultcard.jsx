"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect, useState } from "react";

const cards = [
  { img: "/assets/studentcard/1.jpg" },
  { img: "/assets/studentcard/card2.jpg" },
  { img: "/assets/studentcard/cards3.jpg" },
  { img: "/assets/studentcard/cad4.jpg" },
];

export default function Resultcard() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [navReady, setNavReady] = useState(false);
  const [activeBtn, setActiveBtn] = useState(""); 
  const [activeDot, setActiveDot] = useState(0); 

  const slidesPerGroup = 2; 
  const totalGroups = Math.ceil(cards.length / slidesPerGroup);

  useEffect(() => {
    setNavReady(true);
  }, []);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [navReady]);

  const handleButtonClick = (type) => setActiveBtn(type);

  return (
    <div className="w-full py-8 mx-auto" style={{ maxWidth: "1440px" }}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={30}
        slidesPerView={2}
        slidesPerGroup={slidesPerGroup}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1, slidesPerGroup: 1 },
          768: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 2, slidesPerGroup: 2 },
        }}
        modules={[Navigation, Autoplay]}
        onSlideChange={(swiper) => {
          const groupIndex = Math.floor(swiper.realIndex / slidesPerGroup);
          setActiveDot(groupIndex);
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col rounded-xl overflow-hidden border-[0.2px] border-gray-300 h-full">
              <div className="w-full h-auto flex justify-center items-center bg-white rounded-xl overflow-hidden border-[0.2px] border-gray-300">
                <Image
                  src={card.img}
                  alt={`Card ${index}`}
                  width={600}
                  height={400}
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    
      <div className="flex justify-center gap-6 mt-4 md:hidden text-xl font-bold">
        <button
          ref={prevRef}
          onClick={() => handleButtonClick("prev")}
          className={`px-4 py-3 rounded-full transition-all duration-200 ${
            activeBtn === "prev"
              ? "bg-red-500 text-white scale-105"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
        >
          ←
        </button>
        <button
          ref={nextRef}
          onClick={() => handleButtonClick("next")}
          className={`px-4 py-3 rounded-full transition-all duration-200 ${
            activeBtn === "next"
              ? "bg-red-500 text-white scale-105"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
        >
          →
        </button>
      </div>

     
      <div className="hidden md:flex justify-center gap-4 mt-6">
        {Array.from({ length: totalGroups }).map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current.slideTo(index * slidesPerGroup)}
            className={`h-3 rounded-full transition-all duration-300 ${
              activeDot === index ? "bg-red-500 w-3" : "bg-gray-300 w-3"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
