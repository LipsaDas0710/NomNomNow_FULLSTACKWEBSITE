import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ✅ FIXED
import { connectDB } from "../../lib/mongodb"; // ✅ make sure file exists
import User from "@/models/user"; // ✅ make sure file exists

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ urlname: user.urlname });
  } catch (error) {
    console.error("Error fetching urlname:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
