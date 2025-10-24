"use client";
import { getAllSliders } from "@/actions/sliderActions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomeHero() {
  const [allSiders, setAllSliders] = useState<
    { slider_image: { secure_url: string } }[]
  >([]);
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
          {allSiders.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img.slider_image?.secure_url as string}
                width={1440}
                height={868}
                alt="slider"
                priority
                className="w-full h-full object-cover object-top sm:object-center"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
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
}
