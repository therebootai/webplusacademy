"use client";

import { useState, useRef, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    name: "Dinchen Tamang",
    course: "NEET 2024",
    comment:
      "The teachers are incredibly supportive and helped me achieve my dream of IIT. Their guidance made all the difference!",
    img: "/assets/students/Dinchen Tamang 2024.jpg",
  },
  {
    id: 2,
    name: "Karma Kazana Bhutia",
    course: "NEET",
    comment:
      "The personalized attention and mock tests helped me improve my scores significantly. Highly recommend this institute!",
    img: "/assets/students/karma kazana Bhutia.jpg",
  },
  {
    id: 3,
    name: "Karma Tshering Uden",
    course: "NEET 2022",
    comment:
      "Excellent faculty and great environment for learning. Every concept is explained with clarity and patience.",
    img: "/assets/students/Karma Tshering Uden 2022.jpg",
  },
  {
    id: 4,
    name: "Nishumita Subba",
    course: "NEET 2023",
    comment:
      "The classroom sessions were interactive and fun. I gained a lot of confidence and improved my problem-solving speed.",
    img: "/assets/students/Nishumita Subba 2023.jpg",
  },
  {
    id: 6,
    name: "Phungwama Limboo",
    course: "NEET Aspirant",
    comment:
      "The teachers are incredibly supportive and helped me achieve my dream of IIT. Their guidance made all the difference!",
    img: "/assets/students/Phungwama Limboo.jpg",
  },
  {
    id: 7,
    name: "Rinchen Bhutia",
    course: "NEET",
    comment:
      "The personalized attention and mock tests helped me improve my scores significantly. Highly recommend this institute!",
    img: "/assets/students/Rinchen Bhutia 2023.jpg",
  },
  {
    id: 8,
    name: "Samir Sharma",
    course: "NEET 2024",
    comment:
      "Excellent faculty and great environment for learning. Every concept is explained with clarity and patience.",
    img: "/assets/students/Samir Sharma 2024.jpg",
  },
  {
    id: 9,
    name: "Swekar Subba",
    course: "NEET 2023",
    comment:
      "The classroom sessions were interactive and fun. I gained a lot of confidence and improved my problem-solving speed.",
    img: "/assets/students/Swekar Subba  2023.jpg",
  },
];

export default function StudentTestimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navReady, setNavReady] = useState(false);
  const [activeBtn, setActiveBtn] = useState(""); // mobile navigation
  const [activeDot, setActiveDot] = useState(0); // desktop pagination

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

  const slidesPerGroup = 1;
  const slidesPerViewDesktop = 3;
  const totalGroups = Math.ceil(testimonials.length / slidesPerGroup);

  return (
    <section className="w-full bg-gray-50 py-16 px-4 lg:px-28 xl:px-40">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-16 transition-all duration-700 bg-[#FFFDFA] py-10 border-[0.2px] border-gray-300 rounded-[20px] px-6">
          <div className="flex-1 flex justify-center md:justify-start">
            <img
              src={testimonials[activeIndex].img}
              alt={testimonials[activeIndex].name}
              className="lg:size-80 md:size-[15rem]size-[17rem]  object-cover shadow-lg transition-all duration-700 bg-[#F4D8B2] rounded-[20px]"
            />
          </div>
          <div className="flex-1 text-center md:text-left relative md:-ml-6 pr-16">
            <FaQuoteLeft className="text-5xl text-gray-300 absolute -top-5 left-0" />
            <p className="text-lg italic text-gray-700 mt-6 transition-opacity duration-500">
              {testimonials[activeIndex].comment}
            </p>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              {testimonials[activeIndex].name}
            </h3>
            <p className="text-sm text-gray-500">
              {testimonials[activeIndex].course}
            </p>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          slidesPerGroup={slidesPerGroup}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay, Navigation]}
          onSlideChange={(swiper) =>
            setActiveDot(Math.floor(swiper.realIndex / slidesPerGroup))
          }
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: slidesPerViewDesktop },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={item.id}>
              {({ isActive }) => {
                useEffect(() => {
                  if (isActive) {
                    setActiveIndex(index);
                  }
                }, [isActive]);
                return (
                  <div
                    onClick={() => {
                      setActiveIndex(index);
                      swiperRef.current?.slideToLoop(index);
                    }}
                    className={`cursor-pointer bg-[#FFFDFA] shadow-md rounded-2xl p-6 transition-all duration-300 md:h-[240px] ${
                      activeIndex === index ? "border-2 border-red-500" : ""
                    }`}
                  >
                    <FaQuoteLeft className="text-3xl text-gray-300 mb-3" />
                    <p className="text-gray-700 text-sm italic mb-6">
                      {item.comment.length > 100
                        ? item.comment.slice(0, 100) + "..."
                        : item.comment}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-20 h-20 rounded-full object-cover border"
                      />
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">{item.course}</p>
                      </div>
                    </div>
                  </div>
                );
              }}
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
    </section>
  );
}
