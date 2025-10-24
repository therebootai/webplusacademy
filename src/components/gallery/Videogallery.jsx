
"use client";

import React from "react";

const Videogallery = () => {
  const videos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    "https://www.youtube.com/embed/L_jWHffIx5E",
    "https://www.youtube.com/embed/tVj0ZTS4WF4",
  ];

  return (
    <section className="px-4 md:px-8 py-8 max-w-[1440px] mx-auto">
     

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
            <iframe
              src={video}
              title={`YouTube Video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Videogallery;
