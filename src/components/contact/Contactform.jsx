"use client";

import React, { useState } from "react";

const Contactform = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    class: "",
    location: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage = `Name: ${formData.name}\nMobile: ${formData.mobile}\nclass:${formData.class}\nLocation: ${formData.location}\nMessage: ${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const whatsappUrl = isDesktop
      ? `https://web.whatsapp.com/send?phone=+919800009494&text=${encodedMessage}`
      : `https://api.whatsapp.com/send?phone=+919800036666&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    setFormData({
      name: "",
      mobile: "",
      class: "",
      location: "",
      message: "",
    });
  };

  return (
    <section className="bg-white md:px-40 px-4">
      <div className=" flex flex-col md:flex-row items-stretch justify-center gap-6 py-6 max-w-[1440px] mx-auto">
        {/* Left Form Section (40%) */}
        <div className="w-full md:w-[40%] bg-gradient-to-b from-[#f3f6ff] to-white p-8 rounded-2xl shadow-md flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-left mb-6">
            Career You're Passionate About Is There For You!{" "}
            {/* <span className="text-indigo-600">Quote Today!</span> */}
          </h2>
          <form
            className="space-y-4 flex-1 flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            {/* Grid for 2 inputs per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                required
              />
            </div>

            {/* Another row with 2 fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.class}
                onChange={(e) =>
                  setFormData({ ...formData, class: e.target.value })
                }
                required
              >
                <option>Select class</option>
                <option value="NEET">NEET</option>
                <option value="NEET CRASH">NEET CRASH</option>
                <option value="11th">11Th</option>
                <option value="12th">12Th</option>
                
              </select>
              <input
                type="text"
                placeholder="Location"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <textarea
              placeholder="Message"
              rows="3"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>

            <div className="flex items-center justify-between mt-4 ">
              <button
                type="submit"
                className="py-3 px-20 text-white rounded-[10px] 
             bg-defined-red"
              >
                Submit
              </button>

             
            </div>
          </form>
        </div>

        {/* Right Map Section (60%) */}
        <div className="w-full md:w-[60%]  rounded-2xl overflow-hidden shadow-md flex bg-white">
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4232.162646698342!2d88.3756663231694!3d26.726042685793097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQzJzM0LjYiTiA4OMKwMjInMzkuNSJF!5e1!3m2!1sen!2sin!4v1760696505429!5m2!1sen!2sin"
            allowFullScreen
            className="w-full h-[400px] border-0 bg-white"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contactform;


 