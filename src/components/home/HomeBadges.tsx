"use client";
import CustomHeading from "@/ui/CustomHeading";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const badges = [
  "/marquee-badge/Achievers.png",
  "/marquee-badge/teacher.png",
  "/marquee-badge/10 years.png",
  "/marquee-badge/msme.png",
];

export default function HomeBadges() {
  const [slidesPerView, setSlidesPerView] = useState<number>(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 968) {
        setSlidesPerView(2);
      } else if (window.innerWidth <= 1380) {
        setSlidesPerView(3);
      } else if (window.innerWidth <= 2080) {
        setSlidesPerView(4);
      } else {
        setSlidesPerView(badges.length);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [badges.length]);

  return (
    <div className="flex flex-col gap-7 items-center">
      <div className="flex flex-col gap-3.5 items-center">
        <h3 className="text-site-darkgreen xl:text-base md:text-sm text-xs text-center">
          Lorem ipsum dolor sit amet consectetur.
        </h3>
        <CustomHeading
          normal="Lorem ipsum dolor sit "
          highlight="amet consectetur."
          className="font-bold xl:text-3xl"
        />
      </div>
      <Swiper
        loop={badges.length !== slidesPerView}
        slidesPerView={slidesPerView}
        modules={[FreeMode, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={47}
        className="basis-full w-full"
      >
        {badges.map((badge, index) => (
          <SwiperSlide key={index}>
            <Image
              src={badge}
              alt={`Badge ${index}`}
              className="aspect-square object-contain shadow-md shadow-white/25"
              width={266}
              height={266}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
