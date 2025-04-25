"use client";

import { deleteComponent, updateSlider } from "@/actions/sliderActions";
import { Component } from "@/models/Sliders";
import AdminCard from "@/ui/AdminCard";

export default function SliderList({ Sliders }: { Sliders: Component[] }) {
  return (
    <div className="grid grid-cols-4 gap-5 place-items-stretch justify-items-stretch">
      {Sliders.map((slider: any) => (
        <AdminCard
          img={slider.slider_image.secure_url}
          name={slider.name}
          key={slider.componentId}
          status={slider.status}
          deleteCard={() => deleteComponent(slider._id)}
          changeStatus={() =>
            updateSlider(slider._id as string, undefined, !slider.status)
          }
        />
      ))}
    </div>
  );
}
