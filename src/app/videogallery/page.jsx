import Videogallery from "@/components/gallery/Videogallery";
import Subbanner from "@/components/global/Subbanner";
import MainTemplates from "@/templates/Maintemplates";
import React from "react";
import { getAllGalleries } from "@/actions/galleryActions";
import GalleryList from "@/components/gallery/GalleryList";
export const dynamic = "force-dynamic"; 

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
        <Subbanner heading="Video Gallery" />

        <section className="px-4 lg:px-28 xl:px-40 py-10">
          {data && <GalleryList data={data?.data} type={"video"} />}
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
      true,
      "video"
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
