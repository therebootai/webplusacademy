import CareerIcon from "@/icon/CareerIcon";

export default function AboutCard({
  heading,
  para,
}: {
  heading: string;
  para: string;
}) {
  return (
    <div className="flex lg:gap-5 gap-3.5">
      <CareerIcon />
      <div className="flex flex-col gap-2 lg:gap-3.5">
        <h3 className="text-site-darkgreen font-semibold xl:text-xl md:text-lg text-base">
          {heading}
        </h3>
        <p className="text-site-gray xl:text-base sm:text-sm text-xs">{para}</p>
      </div>
    </div>
  );
}
