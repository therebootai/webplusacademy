"use client";
import { IoClose } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Appmodal = ({ isOpen, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    class: "",
    location: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.mobile ||
      !form.class ||
      !form.location ||
      !form.message
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (form.mobile.length !== 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    const dest = "+919614016184";
    let message = `*Name:* ${form.name}
   *Phone:* ${form.mobile}
   *location:* ${form.location}
   *class:* ${form.class}   
   *Message:* ${form.message}
     `;
    message = encodeURIComponent(message);

    const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);
    const baseUrl = isMobile
      ? "https://api.whatsapp.com/send"
      : "https://web.whatsapp.com/send";

    const url = `${baseUrl}?phone=${dest}&text=${message}`;

    try {
      const newWindow = window.open(url, "_blank");
      if (newWindow) {
        newWindow.focus();
      } else {
        toast.error(
          "Failed to open the link. Please check your browser settings."
        );
      }
    } catch (error) {
      console.error("Error opening new window:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 10); 
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  return (
    <div
      className={`self-padding fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-[1000] 
      transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`rounded-md shadow transition-all duration-700 ease-in-out ${
          showModal ? "scale-100 translate-y-0" : "scale-95 translate-y-5"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            className="absolute cursor-pointer top-2 right-3 bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300 transition-all"
            onClick={onClose}
          >
            <IoClose size={22} />
          </button>

          <div className="flex flex-col gap-4 justify-center items-center w-full bg-gradient-to-b from-[#f3f6ff] to-white p-8 rounded-2xl shadow-md">
            <h1 className="pt-6 w-full lg:w-[70%] text-center text-3xl font-semibold">
             Book a class-Call Today!{" "}
             
            </h1>

            <form
              className="flex flex-col items-center gap-6 w-full"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                className="w-full px-4 py-2 placeholder:text border bg-white border-gray-300 rounded-md outline-none"
                required
              />
              <input
                type="number"
                name="mobile"
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                placeholder="Mobile Number"
                className="w-full px-4 py-2 placeholder:text border bg-white border-gray-300 rounded-md outline-none"
                required
              />

              <select
                name="class"
                onChange={(e) => setForm({ ...form, class: e.target.value })}
                className="w-full px-4 py-2 placeholder:text border bg-white border-gray-300 rounded-md outline-none"
              >
                 <option>Select class</option>
                <option value="NEET">NEET</option>
                <option value="NEET CRASH">NEET CRASH</option>
                <option value="11th">Class-11th</option>
                <option value="12th">Class- 12th</option>
              </select>

              <input
                type="location"
                name="location"
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="location"
                className="w-full px-4 py-2 placeholder:text border bg-white border-gray-300 rounded-md outline-none"
              />
              <input
                type="text"
                name="message"
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Message"
                className="w-full px-4 py-2 placeholder:text- border bg-white border-gray-300 rounded-md outline-none"
                
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-defined-red rounded-md outline-none"

              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appmodal;
