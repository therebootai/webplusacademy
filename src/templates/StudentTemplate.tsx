import GuardianTopHeader from "@/components/guardian/GuardianTopHeader";

export default function StudentTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex w-full h-full flex-col overflow-x-hidden ">
        <div className="flex flex-col">
          <div>
            <GuardianTopHeader />
          </div>
        </div>

        <div className="px-4 xl:px-8 flex flex-col gap-9">{children}</div>
      </div>
    </div>
  );
}
