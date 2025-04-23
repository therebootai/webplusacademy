import Link from "next/link";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";

export default function TopHeader({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={ref}>
      <div className="h-1 w-full bg-site-litegreen" />
      <header className="flex bg-site-yellow">
        <div className="[clip-path:_polygon(0%_0%,_100%_0%,_95%_100%,_0%_100%)] bg-green-dark-to-light py-6 pl-16 pr-9 hidden md:flex gap-4 z-10">
          <div className="flex md:gap-2 sm:gap-1 items-center text-[10px] lg:text-sm xl:text-base text-white">
            <BiSolidPhoneCall size={20} className="text-site-yellow" />
            <Link href="tel:+919614016184">+91 96140 16184</Link>{" "}
          </div>
          <Link
            href="https://api.whatsapp.com/send?phone=+919614016184"
            className="flex md:gap-2 sm:gap-1 items-center font-semibold md:flex text-white text-[10px] lg:text-sm xl:text-base"
          >
            <IoLogoWhatsapp size={20} className="text-site-yellow" />
            <span>+91 96140 16184</span>
          </Link>
          <Link
            href="mailto:info@waveplusacademy.com"
            className="flex md:gap-2 sm:gap-1 items-center font-semibold md:flex text-white text-[10px] lg:text-sm xl:text-base"
          >
            <MdEmail size={20} className="text-site-yellow" />
            <span>info@waveplusacademy.com</span>
          </Link>
        </div>
        <div className="py-3.5 md:py-6 pl-3.5 md:pl-9 md:pr-16 text-base text-site-darkgreen">
          <div className="inline-block animate-marquee">
            Website under maintenance....
          </div>
        </div>
      </header>
    </div>
  );
}
