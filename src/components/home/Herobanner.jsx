"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getAllSliders } from "@/actions/sliderActions";

const images = [
  "/assets/Slider/SLIDER 1.avif",
  "/assets/Slider/SLIDE 2.avif",
  "/assets/Slider/SLLIDE 3.avif",
  "/assets/Slider/SLIDE 4.avif",
  "/assets/Slider/SLIDE 5.avif",
];

const Herobanner = () => {
  const [allSiders, setAllSliders] = useState([]);
  async function getSliders() {
    try {
      const sliders = await getAllSliders(
        undefined,
        undefined,
        undefined,
        undefined,
        true
      );
      setAllSliders(sliders.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSliders();
  }, []);
  return (
    <div className="max-w-[1440px] mx-auto w-full h-auto">
      <div className="rounded-[15px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: ".custom-pagination", // custom pagination container
          }}
        >
          {allSiders.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src.slider_image?.secure_url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover object-top sm:object-center"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ Pagination lines below the image */}
      <div className="custom-pagination flex justify-center mt-4"></div>

      {/* 🔥 Custom CSS for line-style pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 25px !important;
          height: 8px !important;
          border-radius: 8px !important;
          background: #e4e1e1ff !important;
          opacity: 1 !important;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: #d50505ff !important;
          width: 25px !important;
        }
      `}</style>
    </div>
  );
};

export default Herobanner;
