import { connectDB } from "../../lib/mongodb";
import User from "@/models/user";
import { hashPassword } from "../../lib/auth";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

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

    // Generate urlname from username
    const urlName = username.toLowerCase().replace(/\s+/g, '');
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username,
      urlName, // Match your schema field name
      email,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({ 
        message: "User registered successfully", 
        userId: newUser._id,
        urlname: newUser.urlName // Return urlName for consistency
      }), 
      {
        status: 201,
      }
    );

  } catch (err) {
    console.error("❌ Registration error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}