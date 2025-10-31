"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Studentlogin from "./Studentlogin";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineMenuFold } from "react-icons/ai";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Waveplus", href: "/about" },
    {
      name: "Our Courses",
      subMenu: [
        { name: "NEET", href: "/neet" },
        { name: "Crash-Course", href: "/neetcrashcource" },
        { name: "Class-XI", href: "/xi" },
        { name: "Class-XII", href: "/xii" },
      ],
    },
    { name: "Facilities", href: "/facilities" },
    {
      name: "Gallery",
      subMenu: [
        { name: "Image Gallery", href: "/imagegallery" },
        { name: "Video Gallery", href: "/videogallery" },
      ],
    },
    { name: "Result", href: "/result" },
    { name: "Contact Us", href: "/contact" },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
useEffect(() => {
  const onDocClick = (e) => {
    if (window.innerWidth >= 1024) { // desktop only
      if (e.target.closest && e.target.closest(".nav-dropdown")) return;
      setDropdownOpen({});
    }
  };
  document.addEventListener("click", onDocClick);
  return () => document.removeEventListener("click", onDocClick);
}, []);
  return (
    <>
      <nav
        className={`bg-white fixed w-full z-50 transition-shadow duration-300 py-1 md:h-[5rem] h-[4rem] ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="w-full   px-4 xl:px-40 flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/assets/headerlogo.png"
                alt="logo"
                height={70}
                width={170}
                priority
                className="  "
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex   flex-grow justify-center items-center">
            {navItems.map((item, idx) =>
              item.subMenu ? (
                <div
                  key={idx}
                  className="relative nav-dropdown"
                  onMouseEnter={() =>
                    setDropdownOpen((prev) => ({ ...prev, [item.name]: true }))
                  }
                  onMouseLeave={() =>
                    setDropdownOpen((prev) => ({ ...prev, [item.name]: false }))
                  }
                >
                  {/* Dropdown button */}
                  <button className="flex items-center gap-1 hover:text-red-600 transition px-2 py-1">
                    <span>{item.name}</span>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform duration-300 ${
                        dropdownOpen[item.name]
                          ? "rotate-180 text-red-600"
                          : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Dropdown menu */}
                  <div
                    className={`absolute top-full left-0 bg-white shadow-md rounded-md w-48 overflow-hidden origin-top transition-all duration-300 transform ${
                      dropdownOpen[item.name]
                        ? "opacity-100 scale-y-100 visible pointer-events-auto"
                        : "opacity-0 scale-y-95 invisible pointer-events-none"
                    }`}
                  >
                    {item.subMenu.map((sub, sidx) => (
                      <Link
                        key={sidx}
                        href={sub.href}
                        className="block w-full px-4 py-2 hover:bg-red-100 transition"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={idx}
                  href={item.href}
                  className="hover:text-red-600 transition px-2 py-1"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Desktop Login */}
          <div className="hidden lg:flex">
            <Link
              href="/guardian-login"
              className="bg-red-600 text-white px-2 xl:px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Student Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-start">
            <button
              type="button"
              className="text-3xl flex items-center justify-center relative -top-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <IoCloseSharp /> : <AiOutlineMenuFold />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-white shadow-md overflow-hidden transition-max-height duration-500 ${
            menuOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          {navItems.map((item, idx) =>
            item.subMenu ? (
              <div key={idx} className="border-b border-gray-200">
                <button
                  onClick={() =>
                    setDropdownOpen((prev) => ({
                      ...prev,
                      [item.name]: !prev[item.name],
                    }))
                  }
                  className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-100"
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-300 ${
                      dropdownOpen[item.name] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Mobile Submenu */}
                <div
                 className={`overflow-hidden transition-all duration-300 ${
    dropdownOpen[item.name] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
  }`}
                >
                  {item.subMenu.map((sub, sidx) => (
                    <Link
                      key={sidx}
                      href={sub.href}
                      className="block px-6 py-2 hover:bg-gray-100"
                     
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={idx}
                href={item.href}
                className="block px-4 py-3 border-b border-gray-200 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}

          {/* Mobile Login */}
          <div className="flex justify-center py-3 border-b border-gray-200">
            <Link
              href="/guardian-login"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition w-[180px]"
            >
              Student Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Student Login Popup */}
      {showLogin && <Studentlogin onClose={() => setShowLogin(false)} />}
    </>
  );
}
