"use client";
import { useState } from "react";

export const Aboutsection1 = () => {
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
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row gap-18">

   
        <div className="w-full lg:flex-[3] flex flex-col justify-center">
          <h4 className="md:text-[16px] text-defined-brown mb-2">
            About Waveplus Academy
          </h4>
          <h2 className="md:text-[28px] font-bold mb-2">
            Looking for the Best <span className="text-defined-red">NEET Coaching in Siliguri?</span> 
          </h2>
          <p className="text-gray-600">
            When you are a student aspiring to become a doctor, then the first
            thing you will come across is that you have to decide on the best
            NEET coaching in Siliguri. And, frankly speaking, we know it is not
            easy. It is so confusing with so many institutes out there promising
            success. However, here is the thing, success in NEET does not come
            by promises, it comes by the right guidance, setting and
            preparation. That is what we are addressing. We do not teach at
            WavePlus Academy, we mentor. We have not only the experienced but
            also the enthusiastic members of the faculty because they are keen
            on ensuring that the experiences of the students are smooth and
            goal-oriented. As one of the most reputable coaching centers in the
            area, we are situated in Bagdogra, Darjeeling, and are well-known
            for offering the best NEET coaching in Siliguri. We have assisted
            students over the years in realizing their full potential, gaining
            self-assurance, and achieving the outcomes they have strived for.
            Coaching in this case is never of the one-size-fits-all type.
            Students are unique in their strengths and weaknesses and thus we
            ensure that learning is personal, clear, and productive. Therefore,
            when you are serious about cracking NEET, then it is not advisable
            to choose an institute randomly. Select the one with the focus upon
            you. Select one that is a mix of professional guidance, good course
            content, frequent feedback and general development. That is why
            students refer to WavePlus Academy as the best NEET coaching in
            Siliguri - we do not simply teach success, we create it one step at
            a time.
          </p>
        </div>

      
        <div className="w-full lg:flex-[2] bg-[#F9FAFB] rounded-lg shadow-md">

        
          <h3 className="text-[19px] font-semibold text-defined-red text-center py-3 px-6 bg-[#FFE5E5] rounded-t-lg">
            Career You're Passionate About Is There For You!
          </h3>

       
          <div className="p-6 flex flex-col gap-4">
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
                <option value="">Select class</option>
                <option value="NEET">NEET</option>
                <option value="NEET CRASH">NEET CRASH</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
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
                className="bg-defined-red text-white font-semibold py-2 px-4 rounded-lg transition"
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
