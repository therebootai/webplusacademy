"use client";
import Person from "@/icon/Person";
import { testimonials } from "@/lib/testimonialData";
import CustomHeading from "@/ui/CustomHeading";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomeTestimonial() {
  const [slidesPerView, setSlidesPerView] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 968) {
        setSlidesPerView(2);
      } else if (window.innerWidth <= 1380) {
        setSlidesPerView(3);
      } else if (window.innerWidth <= 2080) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(testimonials.length);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [testimonials.length]);
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-3.5">
        <h3 className="text-site-darkgreen xl:text-base md:text-sm text-xs">
          Real Stories, Real Success
        </h3>
        <CustomHeading
          normal="What Students Say About"
          highlight="Waveplus Academy Experience"
          className="font-bold xl:text-3xl"
        />
      </div>
      <Swiper
        loop={testimonials.length !== slidesPerView}
        slidesPerView={slidesPerView}
        modules={[FreeMode, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={24}
        autoHeight
        className="!basis-full !w-full"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="!h-full">
            <TestimonailCard
              proPic={testimonial.proPic}
              name={testimonial.name}
              desc={testimonial.desc}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function TestimonailCard({
  proPic,
  name,
  desc,
}: {
  proPic: string;
  name: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col py-3.5 lg:py-5 px-4 lg:px-7 rounded-md bg-[linear-gradient(90deg,_#FAFAFA_0%,_#F5F5F5_100%)] gap-4 h-full">
      <div className="flex gap-1.5 lg:gap-3">
        <div className="flex flex-col gap-3.5">
          <div className=" flex flex-row gap-4 items-center">
            <div className="rounded-full border lg:border-2 size-[3rem] bg-site-darkgreen flex justify-center items-center border-site-yellow overflow-hidden">
              <Person />
            </div>

            <h2 className="text-lg lg:text-xl font-semibold text-site-darkgreen">
              {name}
            </h2>
          </div>
          <p className="text-site-gray lg:text-base text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}
