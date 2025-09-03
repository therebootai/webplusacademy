"use client";
import { getAllSliders } from "@/actions/sliderActions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
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
    <div className="xxxl:px-40 mt-4 xxl:px-32 xl:px-24 xlg:px-16 lg:px-8 px-4 w-full">
      <div className="flex relative">
        <Swiper
          spaceBetween={10}
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
        >
          {allSiders.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img.slider_image?.secure_url as string}
                width={1440}
                height={868}
                alt="slider"
                priority
                className="object-cover  w-full h-auto  rounded-4xl inset-shadow-custom-light"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
