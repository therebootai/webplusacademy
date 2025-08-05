"use client";

import useElementHeight from "@/hooks/useElementHeight";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import TopHeader from "./TopHeader";
import Popup from "./Popup";
import EnquiryForm from "./EnquiryForm";

interface NavbarProps {
  text: string;
  href?: string;
  subMenu?: { text: string; href: string }[];
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | string | null>(
    null
  );
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const [navMargin, headerRef] = useElementHeight<HTMLDivElement>();

  const toggleAppointmentModal = () =>
    setIsAppointmentModalOpen(!isAppointmentModalOpen);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const NavLinksData: NavbarProps[] = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "About Waveplus",
      href: "/about-us",
    },

    {
      text: "Our Courses",
      subMenu: [
        { text: "NEET Courses", href: "/our-courses/neet" },
        { text: "JEE Courses", href: "/our-courses/jee" },
        { text: "Class IX Courses", href: "/our-courses/class-ix" },
        { text: "Class X Courses", href: "/our-courses/class-x" },
        { text: "Class XI Courses", href: "/our-courses/class-xi" },
        { text: "Class XII Courses", href: "/our-courses/class-xiI" },
      ],
    },
    {
      text: "Facilities",
      href: "/facilities",
    },
    {
      text: "Results",
      href: "/results",
    },
    {
      text: "Gallery",
      subMenu: [
        { text: "Photo Gallery", href: "/gallery/image" },
        { text: "Video Gallery", href: "/gallery/video" },
      ],
    },
    {
      text: "Contact Us",
      href: "/contact-us",
    },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="z-[1000] w-full" style={{ marginBottom: `${navMargin}px` }}>
      <TopHeader ref={headerRef} />
      <div
        className={`flex justify-between items-center xl:px-16 lg:px-8 px-4 fixed xl:py-6 md:py-4 py-2 w-full z-[60]  top-0 transition-colors duration-500 shadow-nav bg-nav`}
        style={{ marginTop: scrolled ? 0 : `${navMargin}px` }}
      >
        {/* Logo */}

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

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center  justify-center gap-5">
          {NavLinksData.map((item, index) => (
            <li key={index} className="relative group">
              {item.href ? (
                <Link
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? "text-site-litegreen"
                      : "text-site-darkgreen"
                  } text-sm md:text-base xl:text-lg font-medium capitalize hover:text-site-litegreen transition-colors duration-300`}
                >
                  {item.text}
                </Link>
              ) : (
                <div className="relative">
                  <span
                    className={`${
                      item.href && isActive(item.href)
                        ? "text-site-litegreen"
                        : "text-site-darkgreen"
                    } text-sm md:text-base xl:text-lg font-medium capitalize cursor-pointer hover:text-site-darkgreen transition-colors duration-300`}
                  >
                    {item.text}
                  </span>
                  {item.subMenu && item.subMenu.length > 0 && (
                    <div className="absolute top-full bg-nav  left-1/2 -translate-x-1/2 duration-500 transition-all origin-top opacity-0 group-hover:opacity-100 size-0 group-hover:size-auto overflow-hidden flex rounded border border-white/50">
                      <div className="text-white flex flex-col whitespace-nowrap">
                        <ul className="flex flex-col gap-4">
                          {item.subMenu.map((menu, con) => (
                            <div
                              className="hover:bg-site-yellow hover:text-white text-site-darkgreen flex flex-col gap-6 whitespace-nowrap py-2 px-4 transition-colors duration-300"
                              key={con}
                            >
                              <li className="text-base xl:text-lg">
                                <Link
                                  href={menu.href}
                                  className="flex items-center z-10 gap-2 "
                                >
                                  {menu.text}
                                </Link>
                              </li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center lg:gap-5 text-xl font-medium">
          <button
            onClick={toggleAppointmentModal}
            className="text-lg font-semibold text-white [background:_radial-gradient(45.91%_85.94%_at_55.4%_14.06%,_rgba(255,255,255,0.40)_0%,_rgba(255,255,255,0.03)_100%),_radial-gradient(121.48%_78.97%_at_22.73%_20.31%,_rgba(243,203,30,0.20)_18.63%,_rgba(255,250,142,0.20)_100%),_radial-gradient(177.49%_126.29%_at_33.52%_-15.63%,_#FFD41A_0%,_rgba(35,173,140,0.58)_85.15%),_radial-gradient(317.72%_44.57%_at_82.39%_55.47%,_#41FF48_0%,_#27994A_100%),_#030303] hover:shadow-[0_0_20px_4px_rgba(34,197,94,0.6)] shadow-[0px_0px_10px_0px_rgba(255,255,255,0.60)_inset]
  hover:brightness-110 shadow-site-litegreen rounded-3xl flex justify-center items-center px-6 h-[2.5rem] buttonshine transform transition-all duration-700"
          >
            Admission Now
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          type="button"
          className="inline-flex lg:hidden text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title="menu-open"
        >
          <span
            className={`transform transition-transform duration-500 ${
              isMenuOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            {isMenuOpen ? (
              <IoCloseSharp
                style={{
                  fill: "url(#gradient1)",
                }}
              />
            ) : (
              <AiOutlineMenuFold
                style={{
                  fill: "url(#gradient1)",
                }}
              />
            )}
          </span>
        </button>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-nav absolute top-full w-full left-0 text-site-litegreen lg:hidden p-6 pb-12 rounded-b-lg h-fit overflow-y-scroll">
            <ul className="flex flex-col gap-4 capitalize">
              {NavLinksData.map((item, index) => (
                <li key={index} className="relative">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`hover:text-site-darkgreen text-base md:text-xl xl:text-lg ${
                        isActive(item.href)
                          ? "text-site-darkgreen"
                          : "text-site-litegreen"
                      }`}
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <div>
                      <div
                        className="flex justify-between items-center cursor-pointer lg:text-base text-base md:text-xl xl:text-lg"
                        onClick={() =>
                          setOpenDropdown(openDropdown === index ? null : index)
                        }
                      >
                        <span className="capitalize">{item.text}</span>
                        <span>{openDropdown === index ? "-" : "+"}</span>
                      </div>

                      {openDropdown === index && (
                        <div
                          className={`duration-500 transition-all origin-top ${
                            openDropdown === index
                              ? "h-auto opacity-100"
                              : "h-0 opacity-0"
                          } overflow-hidden flex flex-col rounded`}
                        >
                          {item.subMenu && item.subMenu.length > 0 && (
                            <ul className="flex flex-col">
                              {item.subMenu.map((menu, subIndex) => (
                                <div
                                  className="flex flex-col whitespace-nowrap p-2"
                                  key={subIndex}
                                >
                                  <li className="lg:text-base text-base md:text-xl xl:text-lg">
                                    <Link
                                      href={menu.href}
                                      className="flex items-center gap-2"
                                    >
                                      <span className="text-site-darkgreen">
                                        &gt;
                                      </span>
                                      {menu.text}
                                    </Link>
                                  </li>
                                </div>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
              <button
                onClick={toggleAppointmentModal}
                className="text-lg font-semibold text-white [background:_radial-gradient(45.91%_85.94%_at_55.4%_14.06%,_rgba(255,255,255,0.40)_0%,_rgba(255,255,255,0.03)_100%),_radial-gradient(121.48%_78.97%_at_22.73%_20.31%,_rgba(243,203,30,0.20)_18.63%,_rgba(255,250,142,0.20)_100%),_radial-gradient(177.49%_126.29%_at_33.52%_-15.63%,_#FFD41A_0%,_rgba(35,173,140,0.58)_85.15%),_radial-gradient(317.72%_44.57%_at_82.39%_55.47%,_#41FF48_0%,_#27994A_100%),_#030303] hover:shadow-[0_0_20px_4px_rgba(34,197,94,0.6)] shadow-[0px_0px_10px_0px_rgba(255,255,255,0.60)_inset]
  hover:brightness-110 shadow-site-litegreen rounded-3xl flex justify-center items-center px-6 h-[2.5rem] buttonshine transition-all duration-700"
              >
                Admission Now
              </button>
              <Link
                href="/guardian-login"
                className="text-lg font-semibold text-white [background:_radial-gradient(45.91%_85.94%_at_55.4%_14.06%,_rgba(255,255,255,0.40)_0%,_rgba(255,255,255,0.03)_100%),_radial-gradient(121.48%_78.97%_at_22.73%_20.31%,_rgba(243,203,30,0.20)_18.63%,_rgba(255,250,142,0.20)_100%),_radial-gradient(177.49%_126.29%_at_33.52%_-15.63%,_#FFD41A_0%,_rgba(35,173,140,0.58)_85.15%),_radial-gradient(317.72%_44.57%_at_82.39%_55.47%,_#41FF48_0%,_#27994A_100%),_#030303] hover:shadow-[0_0_20px_4px_rgba(34,197,94,0.6)] shadow-[0px_0px_10px_0px_rgba(255,255,255,0.60)_inset]
  hover:brightness-110 shadow-site-litegreen rounded-3xl flex justify-center items-center px-6 h-[2.5rem] buttonshine transition-all duration-700"
              >
                Student Login
              </Link>
            </ul>
          </div>
        )}
      </div>
      <Popup isOpen={isAppointmentModalOpen} onClose={toggleAppointmentModal}>
        <EnquiryForm />
      </Popup>
    </div>
  );
}
