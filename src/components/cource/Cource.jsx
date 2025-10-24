"use client";
import { useState } from "react";

export const Cource = () => {
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
    alert("Form submitted successfully!");
  };

  return (
    <section className="w-full flex justify-center bg-white pt-5 pb-1">
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row gap-8">
        {/* Left Side - Image */}
        <div className="w-full lg:flex-[3] flex justify-center items-center">
          <img
            src="/assets/facilities/TeachingMethodologies.png" // <-- replace with your image path
            alt="About Waveplus Academy"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:flex-[2] bg-[#F9FAFB] rounded-lg shadow-md p-6">
          <h3 className="text-[19px] font-semibold mb-4 text-defined-red">
            Career You're Passionate About Is There For You!
          </h3>
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
              <option value="AC Technician">AC Technician</option>
              <option value="Refrigerator Expert">Refrigerator Expert</option>
              <option value="Washing Machine Repair">
                Washing Machine Repair
              </option>
              <option value="Electrician">Electrician</option>
              <option value="Other">Other</option>
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
              className="bg-[#0095FF] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#0077cc] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
