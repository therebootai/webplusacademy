import { getAllGalleries } from "@/actions/galleryActions";
import AddNewMedia from "@/components/admin/media/AddNewMedia";
import MediaList from "@/components/admin/media/MediaList";
import { GalleryDocument } from "@/models/Gallery";
import AdminTemplate from "@/templates/AdminTemplate";
import PaginationBox from "@/ui/PaginationBox";

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

export default async function MediaPage() {
  const pageImageData = await getMediaImageData();
  const pageVideoData = await getMediaVideoData();

  return (
    <AdminTemplate>
      <AddNewMedia />
      <div className="flex flex-col gap-5">
        <h1 className="font-medium text-2xl text-site-black">Images</h1>
        <MediaList Media={pageImageData.data} />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="font-medium text-2xl text-site-black">Videos</h1>
        <MediaList Media={pageVideoData.data} videoOnly={true} />
      </div>
      <PaginationBox
        pagination={pageImageData?.pagination}
        prefix="/admin/gallery"
      />
    </AdminTemplate>
  );
}

async function getMediaImageData(): Promise<GalleryResponse> {
  try {
    const sliders = await getAllGalleries(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "image"
    );
    return sliders;
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
async function getMediaVideoData(): Promise<GalleryResponse> {
  try {
    const sliders = await getAllGalleries(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "video"
    );
    return sliders;
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
