import Image from "next/image";

export default function SubBanner({
  imgsrc = "/custom-bg/subbanner-bg.png",
  heading,
}: {
  imgsrc?: string;
  heading: string;
}) {
  return (
    <div className="relative ">
      <div className="w-full h-[10rem] lg:h-[10vmax]  xl:h-[20rem]  overflow-hidden mt-10 md:mt-0">
        <Image
          src={imgsrc}
          alt="Sub Banner"
          width={1440}
          height={150}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="absolute inset-0 z-10  opacity-90 flex flex-col items-center justify-center h-full">
        <h1 className="text-lg md:text-xl font-semibold lg:text-3xl text-defined-red opacity-100 text-center text-shadow">
          {heading}
        </h1>
      </div>
    </div>
  );
}
