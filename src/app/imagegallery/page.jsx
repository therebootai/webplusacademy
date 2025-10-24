import { getAllGalleries } from "@/actions/galleryActions";
import Gallery from "@/components/gallery/Gallery";
import GalleryList from "@/components/gallery/GalleryList";
import Subbanner from "@/components/global/Subbanner";
import MainTemplates from "@/templates/Maintemplates";
import React from "react";

export const metadata = {
  title: "Gallery | Waveplus Academy – NEET Coaching in Siliguri",
  description:
    "View our gallery showcasing classroom sessions, student achievements, and events at Waveplus Academy – the leading NEET coaching center in Siliguri.",
};

const page = async () => {
  const data = await getPageData();
  return (
    <>
      <MainTemplates>
        <Subbanner heading="Image Gallery" />
        <section className="px-4 md:px-40 py-10">
          {data && <GalleryList data={data?.data} type={"image"} />}
        </section>
      </MainTemplates>
    </>
  );
};

export default page;

async function getPageData() {
  try {
    const data = await getAllGalleries(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "image"
    );
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  }
}
