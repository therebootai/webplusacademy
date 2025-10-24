"use client";
import Image from "next/image";

export default function TabCard() {
  return (
    <div className="max-w-[400px] bg-white rounded-xl shadow-md overflow-hidden p-6 flex flex-col justify-between relative">
   
      <div className="absolute top-0 right-0 w-[180px] h-full bg-indigo-100 rounded-l-full -z-10"></div>

    
      <div className="flex flex-col items-start space-y-3">
        <h2 className="text-3xl font-bold text-red-600">JEE Dropper</h2>
        <h3 className="text-2xl font-semibold text-blue-800">Batch</h3>
        <p className="text-lg font-medium text-red-600">For Class 12th Pass</p>

        
        <div className="border-2 border-red-500 rounded-md px-4 py-2 mt-3">
          <p className="text-red-600 font-semibold">Admission Open</p>
        </div>

        <p className="text-gray-600 font-medium">Target Year - 2026</p>

     
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-all">
          Explore More
        </button>
      </div>

  
      <div className="absolute bottom-0 right-3">
        <Image
          src="/assets/students/studentss.png" 
          alt="Student"
          width={220}
          height={190}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
