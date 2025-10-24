"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect, useState } from "react";

const cards = [
  { img: "/assets/card/card1.png", subtitle: "A smart Mix both-Online and Classroom Learning" },
  { img: "/assets/card/cars.png", subtitle: "AI Based Customized homework system" },
  { img: "/assets/card/cards.png", subtitle: "Well researched and comprehensive study material" },
  { img: "/assets/card/cardss.png", subtitle: "Ensure Child's complete care and also safety" },
  { img: "/assets/card/cardssh.png", subtitle: "Regular Communication with the parents and the students" },
  { img: "/assets/card/cars.png", subtitle: "Test series, mock tests and DPPS for regular practice" },
];

export default function Cardsection2() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [navReady, setNavReady] = useState(false);
  const [activeBtn, setActiveBtn] = useState(""); 
  const [activeDot, setActiveDot] = useState(0); 

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

  return (
    <div className="w-full py-8 mx-auto" style={{ maxWidth: "1440px" }}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={30}
        slidesPerView={3}
        slidesPerGroup={3}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1, slidesPerGroup: 1 },
          768: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
        modules={[Navigation, Autoplay]}
        onSlideChange={(swiper) => {
          const groupIndex = Math.floor(swiper.realIndex / 3);
          setActiveDot(groupIndex);
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col bg-white rounded-xl transition overflow-hidden h-full">
              <div className="relative w-full h-64 md:h-72 lg:h-80">
                <Image
                  src={card.img}
                  alt={`Card ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-700">{card.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      
      <div className="flex justify-center gap-6 mt-4 md:hidden text-xl font-bold">
        <button
          ref={prevRef}
          onClick={() => setActiveBtn("prev")}
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
          onClick={() => setActiveBtn("next")}
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
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => swiperRef.current.slideTo(index * 3)}
            className={`h-3 rounded-full transition-all duration-300 ${
              activeDot === index ? "bg-red-500 w-3" : "bg-gray-300 w-3"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
