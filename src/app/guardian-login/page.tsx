import GuardianLoginForm from "@/components/guardian/GuardianLoginForm";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function GuardianLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token && token.value) {
    redirect("/student");
  }

  return (
    <div className="flex justify-center h-screen bg-[#EDF4F7] overflow-y-scroll bg-no-repeat bg-cover bg-center overflow-x-hidden items-center">
      <div className="lg:w-[45%] xl:w-[40%] w-[95%] md:w-[60%] bg-white h-fit py-10 lg:px-6 xlg:px-16 gap-8 flex flex-col rounded-lg text-black">
        <div className="flex flex-col justify-center items-center gap-4 ">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={225}
            height={60}
            priority
            className="md:h-10 lg:h-12 xl:h-14 h-8 w-fit"
          />
          <div className="xl:text-lg text-base">
            Welcome back, Login to your account
          </div>
        </div>
        <GuardianLoginForm />
      </div>
    </div>
  );
}
