"use server";

import { connectToDataBase } from "@/db/connection";
import User from "@/models/User";
import { generateCustomId } from "@/util/generateCustomId";
import { generateToken } from "@/util/jsonToken";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export async function getUser(userId: string | undefined) {
  try {
    await connectToDataBase();

    const query: { userId?: string } = {};
    if (userId) query.userId = userId;

    const users = await User.find(query);

    return { success: true, data: users };
  } catch (error) {
    console.log(error);
    return { success: false, data: [] };
  }
}

export async function createNewUser(
  name: string,
  email: string,
  phone: string,
  password: string
) {
  try {
    if (!name || !email || !phone || !password) {
      return { success: false, data: null, message: "All fields are required" };
    }

    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingUser) {
      return { success: false, data: null, message: "User already exists" };
    }

    const userId = await generateCustomId(User, "userId", "userId");

    const data = new User({
      userId,
      name,
      email,
      phone,
      password,
    });

    // Save the new user to the database
    const newUser = await data.save();

    const token = generateToken({ ...newUser });

    const cookieStore = await cookies();
    cookieStore.set("token", token ?? "");

    return {
      success: true,
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return { success: false, data: null };
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

    const token = generateToken({ ...user });

    const cookieStore = await cookies();
    cookieStore.set("token", token ?? "");

    return { success: true, data: user };
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

export async function deleteUser(userId: string) {
  try {
    await connectToDataBase();
    const deletedUser = await User.findOneAndDelete({
      $or: [
        { userId: userId },
        { _id: mongoose.Types.ObjectId.isValid(userId) ? userId : undefined },
      ],
    });
    if (!deletedUser) {
      return { success: false, data: null, message: "User not found" };
    }
    return { success: true, data: deletedUser };
  } catch (error) {
    console.log(error);
    return { success: false, data: null };
  }
}
