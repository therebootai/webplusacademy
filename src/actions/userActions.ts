"use server";

import { connectToDataBase } from "@/db/connection";
import User from "@/models/User";
import { generateToken, verifyToken } from "@/util/jsonToken";
import { cookies } from "next/headers";

export async function getUser(userId: string | undefined) {
  try {
    await connectToDataBase();

    const query: { userId?: string } = {};
    if (userId) query.userId = userId;

    const users = await User.find(query).lean();

    return { success: true, data: users };
  } catch (error) {
    console.log(error);
    return { success: false, data: [] };
  }
}

export async function loginUser(emailOrPhone: string, password: string) {
  try {
    await connectToDataBase();

    if (!emailOrPhone || !password) {
      return { success: false, data: null, message: "All fields are required" };
    }

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user || !(await user.matchPassword(password))) {
      return { success: false, data: null, message: "Credentials mismatch" };
    }

    const plainUser = user.toObject();

    const token = generateToken({ ...plainUser });

    const cookieStore = await cookies();
    cookieStore.set("token", token ?? "");

    return { success: true, data: JSON.parse(JSON.stringify(plainUser)) };
  } catch (error) {
    console.log(error);
    return { success: false, data: null };
  }
}

export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function checkTokenAuth() {
  try {
    const cookieStore = await cookies(); // Get cookies from request
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return { success: false, user: null };
    }

    const user = verifyToken(token) ?? { user: null };

    if (!user) {
      (await cookies()).delete("token");
      return { success: false, user: null };
    }

    return { success: false, user: user };
  } catch (error) {
    console.log(error);
    (await cookies()).delete("token");
    return { success: false, user: null };
  }
}
