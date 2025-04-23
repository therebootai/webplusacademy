import Image from "next/image";
export default function CourseCard({
  imgsrc,
  servicename,
  serviceDescription,
}: {
  imgsrc: string;
  servicename: string;
  serviceDescription: string;
}) {
  return (
    <div className="relative group">
      <div className="">
        <Image
          src={imgsrc}
          alt={servicename}
          width={1000}
          height={1000}
          className="w-full object-cover rounded h-[500px]"
        />
      </div>
      <div className="flex justify-end rounded-b items-end absolute  w-full bottom-0 h-[50%] bg-gradient-to-b from-transparent to-black px-4">
        <div className="flex flex-col justify-between text-site-yellow w-full pb-2 capitalize">
          <h1 className="lg:text-xl text-lg font-semibold">{servicename}</h1>
          <p className="lg:text-sm text-xs text-white group-hover:opacity-100 opacity-100 lg:opacity-0 group-hover:h-auto h-auto lg:h-0 transition-all transform duration-500">
            {serviceDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
