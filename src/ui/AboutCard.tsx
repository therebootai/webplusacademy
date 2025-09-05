import CareerIcon from "@/icon/CareerIcon";

export default function AboutCard({
  heading,
  para,
}: {
  heading: string;
  para: string;
}) {
  return (
    <div className="flex lg:gap-3 gap-2">
      <CareerIcon />
      <div className="flex flex-col gap-2 ">
        <h3 className="text-site-darkgreen font-semibold xl:text-lg md:text-base text-base">
          {heading}
        </h3>
        <p className="text-site-gray xl:text-sm sm:text-xs text-xs">{para}</p>
      </div>
    </div>
  );
}
