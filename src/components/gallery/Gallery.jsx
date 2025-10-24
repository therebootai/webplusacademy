"use client";
import { useState } from "react";
import Image from "next/image";

const Gallery = () => {
  const images = [
    "/assets/gallery/galleryimg1.png",
    "/assets/gallery/galleryimg1.png",
    "/assets/gallery/galleryimg1.png",
    "/assets/gallery/galleryimg1.png",
    "/assets/gallery/galleryimg1.png",
    "/assets/gallery/galleryimg1.png",
    "/assets/gallery/galleryimg1.png",
    "/assets/gallery/galleryimg1.png",
    "/assets/gallery/galleryimg1.png",
  ];

  const [active, setActive] = useState(null);

  return (
    <section className="min-h-screen bg-white py-10">
      <div className="max-w-[1440px] mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-md cursor-pointer group "
              onClick={() => setActive(i)}
            >
              <Image
                src={src}
                alt={`gallery-${i + 1}`}
                width={400}
                height={300}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 "
          onClick={() => setActive(null)}
        >
          <div
            className="relative flex justify-center items-center max-w-4xl w-full max-h-[80vh] mt-2 md:mt-8"
            onClick={(e) => e.stopPropagation()}
          >
          
            <button
              className="absolute top-2 right-2 z-50 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-900 transition"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ✕
            </button>

       
           

          
            <Image
              src={images[active]}
              alt={`large-${active + 1}`}
              width={500}
              height={400}
              className="object-contain rounded-lg"
            />
              
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
