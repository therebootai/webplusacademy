import TopHeader from "@/components/admin/dashboard/TopHeader";

export default function AdminTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex w-full h-full flex-col overflow-x-hidden ">
        <div className="flex flex-col">
          <div>
            <TopHeader />
          </div>
        </div>

        <div className="">{children}</div>
      </div>
    </div>
  );
}
