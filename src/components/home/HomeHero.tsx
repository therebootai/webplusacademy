"use client";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomeHero() {
  return (
    <div className="flex relative">
      <Swiper
        spaceBetween={10}
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {["/slider/slider-1.png", "/slider/slider-2.png"].map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              width={1440}
              height={868}
              alt="slider"
              priority
              className="object-cover block w-full h-[85vh]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
