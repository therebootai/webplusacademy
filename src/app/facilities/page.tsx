import MainTemplate from "@/templates/MainTemplate";
import CustomHeading from "@/ui/CustomHeading";
import SubBanner from "@/ui/SubBanner";
import Image from "next/image";
import { HiMiniCheckBadge } from "react-icons/hi2";

export default function FacilitiesPage() {
  return (
    <MainTemplate>
      <SubBanner heading="Our Facilities" />
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 xl:px-16 lg:px-8 px-4">
        <div className="flex flex-col lg:flex-row gap-5">
          <Image
            src="/extra/HostelFacility.jpg"
            alt="Hostel Facility"
            width={636}
            height={464}
            className="object-cover rounded lg:basis-1/2 basis-full"
          />
          <Image
            src="/extra/TeachingMethodologies.jpg"
            alt="Teaching Methodologies"
            width={636}
            height={464}
            className="object-cover rounded lg:basis-1/2 basis-full"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          {[
            {
              title: "Hostel Facility",
              desc: "Lorem ipsum dolor sit amet consectetur. Id egestas dapibus habitasse enim sodales bibendum. Pulvinar aliquet mauris interdum auctor bibendum congue lectus. Velit sagittis vulputate massa viverra porttitor diam nibh. Aliquam amet laoreet amet aliquet arcu est fames. Phasellus sem arcu morbi magna posuere in integer quisque enim. Aliquet eget tellus eu pulvinar id posuere ac eget. Dictum dui euismod id nec sem blandit nulla posuere. Eget ut sed vitae non lacus egestas est tellus. Integer mollis etiam vitae commodo molestie eget. Elementum id senectus ullamcorper eget sed habitant. Congue odio eleifend proin vestibulum velit sed. Dui aliquam dictum consequat sed. Mi ac id netus risus posuere. Tristique nibh non vitae pellentesque eu feugiat vitae elit turpis. Arcu eu eros duis arcu gravida. Bibendum et sem commodo",
            },
            {
              title: "Teaching Methodologies",
              desc: "Lorem ipsum dolor sit amet consectetur. Id egestas dapibus habitasse enim sodales bibendum. Pulvinar aliquet mauris interdum auctor bibendum congue lectus. Velit sagittis vulputate massa viverra porttitor diam nibh. Aliquam amet laoreet amet aliquet arcu est fames. Phasellus sem arcu morbi magna posuere in integer quisque enim. Aliquet eget tellus eu pulvinar id posuere ac eget. Dictum dui euismod id nec sem blandit nulla posuere. Eget ut sed vitae non lacus egestas est tellus. Integer mollis etiam vitae commodo molestie eget. Elementum id senectus ullamcorper eget sed habitant. Congue odio eleifend proin vestibulum velit sed. Dui aliquam dictum consequat sed. Mi ac id netus risus posuere. Tristique nibh non vitae pellentesque eu feugiat vitae elit turpis. Arcu eu eros duis arcu gravida. Bibendum et sem commodo",
            },
          ].map((item, index) => (
            <div className="flex flex-col gap-5" key={index}>
              <h1 className="xl:text-3xl md:text-2xl text-xl text-site-darkgreen font-bold">
                {item.title}
              </h1>
              <p className="text-site-gray xl:text-base sm:text-sm text-xs text-justify">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          {[
            {
              title: {
                normal: "Why Choose Our ",
                highlighted: "Hostel Facilities",
              },
              points: [
                "Safe, Secured Living Spaces",
                "Nutritious, Homely Daily Meals",
                "24/7 Power Backup Facility",
                "Hygienic Rooms and Bathrooms",
                "Study-Friendly Environment",
                "On-Campus Warden Supervision",
              ],
            },
            {
              title: {
                normal: "Why Choose Our ",
                highlighted: "Teaching Methodologies",
              },
              points: [
                "Daily Practice With Feedback",
                "Topic-Wise Mock Tests",
                "Result-Oriented Study Plans",
                "Real-World Application Focus",
                "Concepts Made Crystal Clear",
                "Personalized Doubt Solving",
              ],
            },
          ].map((item, index) => (
            <div
              className="flex flex-col gap-5 lg:basis-1/2 basis-full"
              key={index}
            >
              <CustomHeading
                normal={item.title.normal}
                highlight={item.title.highlighted}
                className="font-bold"
              />
              <div className="grid grid-cols-2 gap-3.5">
                {item.points.map((point, ind) => (
                  <p
                    className="text-site-darkgreen xl:text-xl md:text-lg text-base inline-flex items-center gap-2"
                    key={ind}
                  >
                    <HiMiniCheckBadge className="shrink-0" /> {point}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainTemplate>
  );
}
