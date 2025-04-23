"use client";
import Image from "next/image";
import Link from "next/link";
import { FaMobile } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import RebootAi from "@/icon/RebootAi";

export default function Footer() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const toggleAppointmentModal = () =>
    setIsAppointmentModalOpen(!isAppointmentModalOpen);

  const quickLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Waveplus",
      href: "/about-us",
    },

    { label: "Our Courses", href: "/our-courses" },
    {
      label: "Facilities",
      href: "/facilities",
    },
    {
      label: "Notice",
      href: "/notices",
    },
    {
      label: "Gallery",
      href: "/gallery",
    },
    {
      label: "Contact Us",
      href: "/contact-us",
    },
  ];

  const ourCourses = [
    {
      label: "JEE Coaching Center In Bagdogra",
      href: "#",
    },
    {
      label: "NEET Coaching Center In Bagdogra",
      href: "#",
    },
    {
      label: "JEE Coaching Center In Siliguri",
      href: "#",
    },
    {
      label: "NEET Coaching Center In Siliguri",
      href: "#",
    },
    {
      label: "IX - XII Coaching Center In Bagdogra",
      href: "#",
    },
    {
      label: "IX - XII Coaching Center In Siliguri",
      href: "#",
    },
  ];

  return (
    <footer className="w-full">
      <div className="h-1 w-full bg-site-litegreen" />
      <div className="xl:p-16 lg:p-8 p-4 bg-[#f5f5f5] w-full">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row  gap-4 w-full">
            <div className="flex flex-col gap-4 basis-full lg:basis-[25%] lg:mr-4">
              <div>
                <Image
                  src={"/logo.svg"}
                  alt="logo"
                  width={225}
                  height={60}
                  priority
                  className="md:h-10 lg:h-12 xl:h-14 h-8 w-fit"
                />
              </div>
              <p className="text-site-gray text-base">
                Finding your dream home starts here. At True Homes, we turn your
                vision into reality with trust, transparency, and unmatched real
                estate expertise. Let&apos;s begin today!
              </p>
              <button className="bg-green-dark-to-light rounded-md text-white flex justify-center items-center text-base h-[3rem] w-full xl:text-lg">
                Admission Open
              </button>
              <button className="bg-green-dark-to-light rounded-md text-white flex justify-center items-center text-base h-[3rem] w-full xl:text-lg">
                Download PDF
              </button>
            </div>

            <div className="flex flex-col gap-2 lg:gap-4 basis-full lg:basis-[25%] text-base lg:text-sm xl:text-base">
              <h1 className="font-bold text-site-darkgreen xl:text-2xl text-lg">
                Our Coaching Centers
              </h1>
              <ul className="flex flex-col gap-2 xl:text-lg text-sm">
                {ourCourses.map((service) => (
                  <li
                    className="hover:text-site-yellow text-site-gray"
                    key={service.label}
                  >
                    <Link href={service.href}>{service.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 lg:gap-4 basis-full  lg:basis-[25%]">
              <h1 className="font-bold text-site-darkgreen xl:text-2xl text-lg">
                Quick Links
              </h1>
              <ul className="flex flex-col gap-2 text-site-gray xl:text-lg text-sm">
                {quickLinks.map((service) => (
                  <li className="hover:text-site-yellow" key={service.label}>
                    <Link href={service.href}>{service.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex  flex-col gap-4 basis-full lg:basis-[25%]">
              <h1 className="font-bold text-site-darkgreen xl:text-2xl text-lg">
                Contact Information
              </h1>
              <div className="flex flex-col gap-2 text-sm xl:text-base">
                <Link
                  href="tel:+918945927196"
                  className="flex gap-2 text-site-gray"
                >
                  <FaMobile
                    size={24}
                    className="shrink-0 text-site-darkgreen"
                  />{" "}
                  <span className="">+91 89459 27196</span>
                </Link>
                <Link
                  href="mailto:truehomes@gmail.com"
                  className="flex gap-2 text-site-gray"
                >
                  <MdEmail size={24} className="shrink-0 text-site-darkgreen" />{" "}
                  <span className="">truehomes@gmail.com</span>
                </Link>
                <Link
                  href="https://maps.app.goo.gl/itkQPUvt7iep1Bv57?g_st=com.google.maps.preview.copy"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex gap-2 w-full xl:w-[80%] text-site-darkgreen"
                >
                  <IoLocationSharp size={24} className="shrink-0" />{" "}
                  <span className="text-site-gray">
                    Tarunjubari, Khaprail Bazar, Matigara, Siliguri, Darjeeling,
                    West Bengal - 734001
                  </span>
                </Link>
              </div>
              <div className="w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4264.216072495763!2d88.37506397543305!3d26.72627777675875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQzJzM0LjYiTiA4OMKwMjInMzkuNSJF!5e1!3m2!1sen!2sin!4v1744739873930!5m2!1sen!2sin"
                  loading="lazy"
                  className="rounded-lg w-full h-[10rem] lg:h-[12rem] xl:h-[13rem]"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <hr className="bg-[#cccccc] border-[#cccccc] w-full mt-8" />
        <div className="pt-6 flex lg:flex-row flex-col justify-between items-center">
          <div className="font-semibold text-site-gray text-center">
            <h1>
              © Copyright{" "}
              <Link href="/" className="text-site-darkgreen text-center">
                Waveplus Academy
              </Link>{" "}
              {/* <br /> */}- 2025 All Rights Reserved
            </h1>
          </div>
          <div className="text-site-darkgreen">
            <h1 className="inline-flex items-center gap-2 flex-wrap font-semibold">
              Design & Developed By:{" "}
              <span className="">
                <Link
                  href={"https://rebootai.in/"}
                  target="_blank"
                  className="inline"
                >
                  <RebootAi />
                </Link>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
}
