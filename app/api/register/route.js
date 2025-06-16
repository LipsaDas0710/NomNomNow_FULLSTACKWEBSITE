// /app/api/register/route.js or /pages/api/register.js

import { connectDB } from "../../lib/mongodb";
import User from "@/models/user";
import { hashPassword } from "../../lib/auth";

export async function POST(req) {
  try {
    const { name, username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
      });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
      });
    }
    const urlName = username.toLowerCase().replace(/\s+/g, '');
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username,
      urlName,
      email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ message: "User registered successfully", userId: newUser._id }), {
      status: 201,
    });

  } catch (err) {
    console.error("❌ Registration error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
