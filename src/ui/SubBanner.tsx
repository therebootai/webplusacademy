import Image from "next/image";
import Link from "next/link";

export default function SubBanner({
  imgsrc = "/custom-bg/subbanner-bg.png",
  heading,
}: {
  imgsrc?: string;
  heading: string;
}) {
  return (
    <div className="relative">
      <div className="w-full h-[65vmin] overflow-hidden ">
        <Image
          src={imgsrc}
          alt="Sub Banner"
          fill
          className="object-cover h-full w-full"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-white-to-ash flex items-center justify-center flex-col size-full lg:gap-6 gap-4">
        <h1 className="text-lg md:text-xl font-semibold lg:text-3xl text-site-darkgreen text-center capitalize">
          {heading}
        </h1>
      </div>
    </div>
  );
}
