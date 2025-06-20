import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { connectDB } from "@/app/lib/mongodb";
import Favourite from "@/models/Favourite";

// === POST: Save Booking ===
export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { restaurantId, restaurantName } = await req.json();

    if (!restaurantId || ! restaurantName ) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const newFavourite = await Favourite.create({
      user: session.user.id,
      restaurantId,
      restaurantName,
    });

    return new Response(JSON.stringify({ success: true, favourite: newFavourite }), { status: 201 });
  } catch (error) {
    console.error("Adding favourite error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

}

// === GET: Fetch Bookings for Logged-In User ===
export async function GET(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const favourite = await Favourite.find({ user: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return new Response(JSON.stringify({ success: true, favourite }), { status: 200 });
  } catch (error) {
    console.error("Fetch favourite saving error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


// === DELETE: Remove Favourite ===
export async function DELETE(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { restaurantId } = await req.json();

    if (!restaurantId) {
      return new Response(JSON.stringify({ error: "Missing restaurantId" }), { status: 400 });
    }

    await Favourite.findOneAndDelete({
      user: session.user.id,
      restaurantId,
    });

    return new Response(JSON.stringify({ success: true, message: "Favourite removed" }), { status: 200 });
  } catch (error) {
    console.error("Delete favourite error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
