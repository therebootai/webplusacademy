"use client";
import MediaIcon from "@/icon/MediaIcon";
import PopUpIcon from "@/icon/PopUpIcon";
import ResultIcon from "@/icon/ResultIcon";
import SliderIcon from "@/icon/SliderIcon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { FaRegBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { LuMessageSquareText } from "react-icons/lu";
import { PiUserCircleFill } from "react-icons/pi";

export default function TopHeader() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path || pathname.includes(path.split("/")[1])
      ? true
      : false;
  };

  const allNavLinks: {
    icon: JSX.Element;
    label: string;
    path: string;
    dropdown?: { label: string; path: string }[];
  }[] = [
    {
      icon: <SliderIcon />,
      label: "Slider",
      path: "/admin?page=1",
    },
    {
      icon: <PopUpIcon />,
      label: "Pop Up",
      path: "/admin/pop-up?page=1",
    },
    {
      icon: <MediaIcon />,
      label: "Media",
      path: "/admin/media?page=1",
    },
    {
      icon: <ResultIcon />,
      label: "Result",
      path: "/admin/result?page=1",
    },
  ];

  return (
    <nav className="flex flex-col bg-white">
      <div className="flex flex-row justify-between items-center px-4 xl:px-8 gap-8 py-2 lg:py-4">
        <Link href={"/"}>
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={225}
            height={60}
            priority
            className="md:h-10 lg:h-12 xl:h-14 h-8 w-fit"
          />
        </Link>
        <div className="items-center flex justify-between px-4 xlg:px-6 xl:px-8 xl:gap-4 flex-wrap xl:flex-nowrap flex-1">
          {allNavLinks.map((link, index) => (
            <div className="group" key={index}>
              {!link.dropdown ? (
                <Link
                  href={link.path}
                  className={`inline-flex gap-2 items-center hover:text-custom-violet font-medium text-base lg:text-base xlg:text-base xl:text-xl ${
                    isActive(link.path)
                      ? "text-custom-violet"
                      : "text-custom-black"
                  }`}
                >
                  {link.icon}
                  {link.label}
                  {link.dropdown && <IoIosArrowDown />}
                </Link>
              ) : (
                <div className="relative" key={index}>
                  <h3
                    className={`inline-flex gap-2 items-center hover:text-custom-violet font-medium lg:text-base xlg:text-base xl:text-xl ${
                      isActive(link.dropdown[0].path)
                        ? "text-custom-violet"
                        : "text-custom-black"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                    <IoIosArrowDown />
                  </h3>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[12rem] bg-custom-violet/70 hidden group-hover:flex p-2 rounded-md flex-col gap-2 z-10">
                    {link.dropdown.map((item, index) => (
                      <Link
                        key={index}
                        href={item.path}
                        className="flex gap-4 items-center font-medium text-sm lg:text-lg text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <button type="button" className="text-custom-black text-2xl">
            <LuMessageSquareText />
          </button>
          <button type="button" className="text-custom-black text-2xl">
            <FaRegBell />
          </button>
          <div className="relative flex items-center group">
            <button type="button" className="text-custom-black text-2xl">
              <PiUserCircleFill />
            </button>
            {/* <div className="absolute top-full right-0 w-[10vmax] bg-custom-violet hidden group-hover:flex p-2 rounded-md flex-col gap-4 z-50">
              {user && (
                <div className="flex flex-col gap-2">
                  <h1 className="text-white text-base font-bold lg:text-xl">
                    {user.name}
                  </h1>
                  <h3 className="text-white text-base lg:text-sm font-medium">
                    Role: {user.role}
                  </h3>
                </div>
              )}
              <div className="h-0.5 w-full bg-custom-border" />
              <button
                type="button"
                onClick={handelLogout}
                className="flex gap-2 items-center font-medium text-sm lg:text-lg text-white whitespace-nowrap"
              >
                <IoIosLogOut />
                <span>Log Out</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
