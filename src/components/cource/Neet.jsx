"use client";
import Image from "next/image";
import { useState } from "react";

export const Neet = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    class: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const phoneNumber = "+919614016184"; 

    const message = `Hello, I'm ${formData.name}.
Class: ${formData.class}
Mobile: ${formData.mobile}
Location: ${formData.location}
Message: ${formData.message}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank"); 
  };

  return (
    <section className="w-full flex justify-center bg-white pt-5 pb-1">
      <div className="w-full max-w-[1440px] flex flex-col md:flex-row gap-8">

        {/* Left Image */}
        <div className="w-full md:w-[70%] flex justify-center items-center">
          <Image
            src="/assets/facilities/TeachingMethodologies.png"
            alt="About Waveplus Academy"
              width={1280}
            height={934}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-[30%] bg-[#F9FAFB] rounded-lg shadow-md">

          {/* Heading at the very top */}
          <h3 className="lg:text-[19px] text-base font-semibold text-defined-red text-center py-3 px-6 bg-[#FFE5E5] rounded-t-lg">
            Career You're Passionate About Is There For You!
          </h3>

          {/* Form Container */}
          <div className="lg:p-6 p-4 flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0095FF]"
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0095FF]"
              />
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0095FF]"
              >
                <option value="">Select Class</option>
                <option value="NEET">NEET</option>
                <option value="NEET Crash Course">NEET Crash Course</option>
                <option value="Class -11th">Class -11th</option>
                <option value="Class -12th">Class -12th</option>
              </select>
              <input
                type="text"
                name="location"
                placeholder="Enter Your Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0095FF]"
              />
              <textarea
                name="message"
                placeholder="Enter Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0095FF]"
              ></textarea>
              <button
                type="submit"
                className="bg-defined-red text-white font-semibold py-2 px-4 rounded-lg  transition"
              >
                Submit
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
