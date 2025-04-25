import { getAllGalleries } from "@/actions/galleryActions";
import GalleryList from "@/components/gallery/GalleryList";
import { GalleryDocument } from "@/models/Gallery";
import MainTemplate from "@/templates/MainTemplate";
import SubBanner from "@/ui/SubBanner";

type GalleryResponse = {
  success: boolean;
  data: GalleryDocument[];
  pagination: {
    totalCount: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
};

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const data = await getPageData(type);
  return (
    <MainTemplate>
      <SubBanner heading={type + " Gallery"} />
      <h1 className="ps-4 lg:ps-8 xl:ps-16 capitalize text-site-darkgreen text-xl md:text-2xl lg:text-3xl font-bold">
        {type + "s"}
      </h1>
      {data && <GalleryList data={data?.data} type={type} />}
    </MainTemplate>
  );
}

async function getPageData(type: string): Promise<GalleryResponse> {
  try {
    const data = await getAllGalleries(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      type
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
