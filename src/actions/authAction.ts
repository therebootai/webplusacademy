"use server";
import { verifyToken } from "@/util/jsonToken";
import { cookies } from "next/headers";

export async function checkTokenAuth() {
  try {
    const cookieStore = await cookies(); // Get cookies from request
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return { success: false, user: null };
    }

    const userId = verifyToken(token);

    if (userId && typeof userId === "object") {
      return { success: true, user: JSON.parse(JSON.stringify(userId)) };
    } else {
      (await cookies()).delete("token");
      return { success: false, user: null };
    }
  } catch (error) {
    console.log(error);
    (await cookies()).delete("token");
    return { success: false, user: null };
  }
}
