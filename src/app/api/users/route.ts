import { connectToDataBase } from "@/db/connection";
import User from "@/models/User";
import { generateId } from "@/util/generateId";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDataBase();
    const { name, email, phone, password } = await request.json();
    // Check if all fields are provided
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email or phone already exists in the database
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email or Phone already in use" },
        { status: 400 }
      );
    }

    // Generate custom user ID (you may already have a method for this)
    const userId = await generateId(User, "userId", "userId");

    // Create a new user
    const data = new User({
      userId,
      name,
      email,
      phone,
      password,
    });

    // Save the new user to the database
    const newUser = await data.save();

    // Respond with the newly created user and token
    return NextResponse.json({ ...newUser.toObject() }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 500 });
  }
}
