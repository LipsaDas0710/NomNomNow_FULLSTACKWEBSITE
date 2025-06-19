// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import {connectDB} from "../../lib/mongodb";
// import Booking from "@/models/Booking";



// export async function POST(req) {
//   try {
//     await connectDB();
    
//      const session = await getServerSession(authOptions);
//      console.log(session);

    
//     // Debug logging
//     console.log('Session in API:', session);
//     console.log('Session user:', session?.user);
//     console.log('User ID:', session?.user?.id);
//     console.log('User email:', session?.user?.email);
    
//     if (!session || !session.user) {
//       return new Response(JSON.stringify({ error: "Unauthorized - No session" }), { 
//         status: 401 
//       });
//     }

//     // Try different possible user ID fields
//     const userId = session.user.id || session.user._id || session.user.email;
    
//     if (!userId) {
//       console.log('No user ID found in session:', session.user);
//       return new Response(JSON.stringify({ error: "Unauthorized - No user ID" }), { 
//         status: 401 
//       });
//     }

//     const { restaurantId,restaurantName, date, time, numberOfGuests, specialRequest } = await req.json();
    
//     // Validate required fields
//     if (!restaurantId || !date || !time || !numberOfGuests) {
//       return new Response(JSON.stringify({ error: "Missing required fields" }), { 
//         status: 400 
//       });
//     }

//     console.log('Creating booking with userId:', userId);

//     const newBooking = await Booking.create({
//       user: userId,
//       restaurantId,
//       restaurantName,
//       date: new Date(date),
//       time,
//       numberOfGuests,
//       specialRequest: specialRequest || '',
//     });

//     return new Response(JSON.stringify({ success: true, booking: newBooking }), { 
//       status: 201 
//     });
//   } catch (error) {
//     console.error("Booking error:", error);
//     return new Response(JSON.stringify({ error: error.message }), { 
//       status: 500 
//     });
//   }
// }


import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { connectDB } from "@/app/lib/mongodb";
import Booking from "@/models/Booking";

// === POST: Save Booking ===
export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { restaurantId, restaurantName, date, time, numberOfGuests, specialRequest } = await req.json();

    if (!restaurantId || !date || !time || !numberOfGuests) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const newBooking = await Booking.create({
      user: session.user.id,
      restaurantId,
      restaurantName,
      date: new Date(date),
      time,
      numberOfGuests,
      specialRequest: specialRequest || "",
    });

    return new Response(JSON.stringify({ success: true, booking: newBooking }), { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  console.log('Sending booking data:', bookingData);

}

// === GET: Fetch Bookings for Logged-In User ===
export async function GET(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const bookings = await Booking.find({ user: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return new Response(JSON.stringify({ success: true, bookings }), { status: 200 });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
