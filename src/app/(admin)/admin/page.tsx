import { getAllSliders } from "@/actions/sliderActions";
import AddNewSlider from "@/components/admin/dashboard/sliders/AddNewSlider";
import SliderList from "@/components/admin/dashboard/sliders/SliderList";
import { Component } from "@/models/Sliders";
import AdminTemplate from "@/templates/AdminTemplate";
import PaginationBox from "@/ui/PaginationBox";

type SliderResponse = {
  success: boolean;
  data: Component[];
  pagination: {
    totalCount: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
};

export default async function AdminPage() {
  const pageData = await getSliderData();

  return (
    <AdminTemplate>
      <AddNewSlider />
      <SliderList Sliders={pageData.data} />
      <PaginationBox pagination={pageData?.pagination} prefix="/admin" />
    </AdminTemplate>
  );
}

async function getSliderData(): Promise<SliderResponse> {
  try {
    const sliders = await getAllSliders();
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
