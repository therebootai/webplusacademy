"use client";
import Image from "next/image";

// AboutSection1 (second section)
export const Hostelfacilities = () => {
  return (
    <section className="w-full flex justify-center bg-white  pt-5 pb-1 pb-10">
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row gap-18">
        {/* Left content - same total width as first section’s two cards */}

        {/* Right image — same width ratio as AboutSection */}
        <div className="w-full lg:flex-[2] relative rounded-lg overflow-hidden h-64 md:h-96">
          <Image
            src="/assets/facilities/HostelFacility.png"
            alt="About2 Image"
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full lg:flex-[2]   flex flex-col justify-center ">
          <h4 className="text-sm text-[#0095FF] mb-2">Hostel Facility</h4>
          <h2 className="text-2xl font-bold mb-2">Hostel Facility of WavePlus Academy</h2>
          <p className="text-gray-600">
            WavePlus Academy offers a comfortable and secure hostel facility for
            outstation students, ensuring a conducive environment for academic
            focus. The hostels are well-equipped with essential amenities such
            as clean and spacious rooms, 24/7 water supply, and Wi-Fi
            connectivity to facilitate uninterrupted study sessions. The
            accommodation is designed to offer a homely atmosphere with proper
            meals, ensuring students' overall well-being. Safety and security
            are a top priority, with round-the-clock supervision and access to
            medical care when needed. With dedicated study areas and
            recreational spaces, students can balance academics and relaxation.
            This facility enables students to concentrate fully on their studies
            without distractions, helping them achieve their academic goals with
            ease and comfort.
          </p>
        </div>
      </div>
    </section>
  );
};
