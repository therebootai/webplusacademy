"use client";
import { createContext, useContext, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";

type AccordionContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export default function Accordian({
  children,
  className = "",
  open = false,
}: {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <AccordionContext.Provider value={{ isOpen, setIsOpen }}>
      <AnimatePresence initial={false}>
        <div
          className={`bg-[#f5f5f5] backdrop-blur-xs flex flex-col gap-6 rounded-sm xl:py-5 md:py-4 py-3 xl:px-7 md:px-6 px-4 ${className}`}
        >
          {children}
        </div>
      </AnimatePresence>
    </AccordionContext.Provider>
  );
}

Accordian.Trigger = function Trigger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion.Trigger must be used within an Accordion");
  }
  const { isOpen, setIsOpen } = context;

  return (
    <button
      className={`w-full text-left relative ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
      <motion.span
        className={`absolute right-[4.4%] top-1/2 transform -translate-y-1/2 text-site-black text-lg xl:text-xl transition-transform duration-300 ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
      >
        <FaAngleRight />
      </motion.span>
    </button>
  );
};

Accordian.Content = function Content({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion.Trigger must be used within an Accordion");
  }
  const { isOpen } = context;

  return isOpen ? (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      {children}
    </motion.div>
  ) : null;
};
