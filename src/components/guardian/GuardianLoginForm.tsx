"use client";

import { loginStudent } from "@/actions/studentAction";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useActionState, useContext, useState } from "react";

export default function GuardianLoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailorphoneError, setEmailorphoneError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const router = useRouter();

  const { login } = useContext(AuthContext);

  async function handleLogin(prevState: unknown, formData: FormData) {
    try {
      const emailOrPhone = formData.get("emailOrPhone");
      const password = formData.get("password");

      if (!emailOrPhone || !password) {
        return {
          success: false,
          data: null,
          message: "All fields are required",
        };
      }

      const loginResponse = await loginStudent(
        emailOrPhone as string,
        password as string
      );

      if (!loginResponse.success) {
        throw Error(loginResponse.message);
      }

      login(loginResponse.data);

      router.push("/student");
    } catch (error) {
      console.log(error);
      error instanceof Error && alert(error.message);
    }
  }

  const [, formAction, isPending] = useActionState(handleLogin, null);
  return (
    <form
      className="flex flex-col gap-5 lg:gap-2 xlg:gap-4"
      action={formAction}
    >
      <div className="flex flex-col gap-2 ">
        <label
          className="xl:text-lg text-base font-normal"
          htmlFor="emailOrPhone"
        >
          Mobile Number
        </label>
        <input
          type="text"
          id="emailOrPhone"
          name="emailOrPhone"
          className="bg-[#EFEFEF] text-[#333333]  placeholder-[#00000033] rounded-sm xlg:rounded-md h-[2.5rem] lg:h-[2.8rem] xlg:h-[3rem] px-2 text-sm xlg:text-lg outline-none"
        />
        {emailorphoneError && (
          <div className="text-red-500 text-sm mt-1">{emailorphoneError}</div>
        )}
      </div>
      <div className="flex flex-col  gap-2">
        <label className="xl:text-lg text-base font-normal" htmlFor="password">
          Password:
        </label>
        <div className="flex h-[2.5rem] lg:h-[2.8rem] xlg:h-[3rem] w-full items-center justify-between rounded-sm xlg:rounded-md bg-[#EFEFEF] ">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="bg-[#EFEFEF] rounded-sm xlg:rounded-md h-[2.5rem] lg:h-[2.8rem] xlg:h-[3rem] px-2 w-full text-[#333333]  placeholder-[#00000033] text-sm xlg:text-lg border-none focus:outline-none"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="mr-4 h-5 w-5 text-[#00000033] cursor-pointer"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="m2.999 3 18 18M9.843 9.914a3 3 0 0 0 4.265 4.22M6.5 6.646A10.024 10.024 0 0 0 2.457 12c1.274 4.057 5.065 7 9.542 7 1.99 0 3.842-.58 5.4-1.582m-6.4-12.369c.329-.032.663-.049 1-.049 4.478 0 8.268 2.943 9.542 7a9.954 9.954 0 0 1-1.189 2.5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="none"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path d="M12.001 5C7.524 5 3.733 7.943 2.46 12c1.274 4.057 5.065 7 9.542 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7Z" />
              </svg>
            )}
          </div>
        </div>
        {passwordError && (
          <div className="text-red-500 text-sm mt-1">{passwordError}</div>
        )}
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-row gap-1 items-center xl:text-lg text-base font-medium">
          <input type="checkbox" name="" id="remember_me" />
          <label htmlFor="remember_me">Remember me</label>
        </div>
        <div className="text-[#27B3FF] xl:text-lg text-base font-medium">
          Forgot password?
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="w-[30%] rounded xlg:rounded-md sm:h-[2rem] xl:h-[2.5rem] flex justify-center items-center text-white text-base font-medium bg-[#27B3FF]"
        >
          {isPending ? "Wait..." : "Login"}
        </button>
      </div>
    </form>
  );
}
