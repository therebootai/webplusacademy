"use client";
import MediaIcon from "@/icon/MediaIcon";
import PopUpIcon from "@/icon/PopUpIcon";
import SliderIcon from "@/icon/SliderIcon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBox2 } from "react-icons/bs";
import { FaRegBell, FaRegStickyNote } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import {
  LuLayoutPanelLeft,
  LuMessageSquareText,
  LuPanelsTopLeft,
} from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { PiMoneyWavyBold, PiUserCircleFill } from "react-icons/pi";

export default function TopHeader() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path || pathname.includes(path.split("/")[1])
      ? true
      : false;
  };

  const allNavLinks = [
    {
      icon: <SliderIcon />,
      label: "Slider",
      path: "/dashboard?page=1",
    },
    {
      icon: <PopUpIcon />,
      label: "Pop Up",
      path: "/pop-up?page=1",
    },
    {
      icon: <MediaIcon />,
      label: "Media",
      path: "/media?page=1",
    },
    {
      icon: <MdOutlineCategory />,
      label: "Category",
      path: "/add-manage-category",
    },
    {
      icon: <HiOutlineArchiveBox />,
      label: "Products",
      path: "/products?page=1",
    },
    {
      icon: <PiMoneyWavyBold />,
      label: "Payments",
      path: "/payments?page=1",
    },
    {
      icon: <GiProgression />,
      label: "Marketing",
      dropdown: [
        {
          label: "Coupon",
          path: "/marketing/add-manage-coupon?page=1",
        },
        {
          label: "WishList",
          path: "/marketing/wishlist?page=1",
        },
        {
          label: "Reviews",
          path: "/marketing/reviews?page=1",
        },
      ],
    },
    {
      icon: <LuLayoutPanelLeft />,
      label: "Masters",
      dropdown: [
        {
          label: "Pick Up",
          path: "/masters/pick-up",
        },
        {
          label: "Variable",
          path: "/masters/variable?page=1",
        },
        {
          label: "Users",
          path: "/masters/users",
        },
        {
          label: "Attributes",
          path: "/masters/attributes?page=1",
        },
      ],
    },
    {
      icon: <FaRegStickyNote />,
      label: "Components",
      dropdown: [
        {
          label: "Slider",
          path: "/components/slider?page=1",
        },
        {
          label: "Banner",
          path: "/components/banner?page=1",
        },
        {
          label: "Logo",
          path: "/components/logo?page=1",
        },
        {
          label: "Popup",
          path: "/components/popup?page=1",
        },
      ],
    },
  ];

  return (
    <nav className="flex flex-col bg-white">
      <div className="h-[4.5rem] flex flex-row justify-between items-center px-4 xl:px-8 gap-8">
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
        <div className="border border-custom-border flex justify-between flex-1 items-center px-6 py-3 rounded-full">
          <input
            placeholder="Search"
            pattern="^\S+$"
            className="flex-1 focus-within:outline-none bg-transparent"
          />
          <button type="button" className="text-2xl text-custom-border">
            <IoSearchSharp />
          </button>
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
      <div className="min-h-[4.5rem] items-center flex justify-between px-4 xlg:px-6 xl:px-8 xl:gap-4 flex-wrap xl:flex-nowrap">
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
    </nav>
  );
}
