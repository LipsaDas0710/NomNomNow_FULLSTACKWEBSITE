// "use client";

// import { useEffect, useState } from "react";

// export default function BookingPage() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       // Replace with your actual API call
//       const data = [
//         {
//           restaurantName: "Tandoori Nights",
//           date: "2025-06-20",
//           time: "19:30",
//           guests: 4,
//           specialRequest: "Window seat, birthday celebration",
//         },
//         {
//           restaurantName: "Pasta House",
//           date: "2025-06-25",
//           time: "13:00",
//           guests: 2,
//         },
//       ];
//       setBookings(data);
//     };
//     fetchBookings();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center mt-10 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">Your Bookings</h1>

//       {bookings.length === 0 ? (
//         <p className="text-gray-500 dark:text-gray-400">No booking done.</p>
//       ) : (
//         <div className="w-full max-w-3xl space-y-6">
//           {bookings.map((booking, index) => (
//             <div
//               key={index}
//               className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm"
//             >
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
//                 {booking.restaurantName}
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300">
//                 <span className="font-medium">Date:</span> {booking.date}
//               </p>
//               <p className="text-gray-600 dark:text-gray-300">
//                 <span className="font-medium">Time:</span> {booking.time}
//               </p>
//               <p className="text-gray-600 dark:text-gray-300">
//                 <span className="font-medium">Guests:</span> {booking.guests}
//               </p>
//               {booking.specialRequest && (
//                 <p className="text-gray-600 dark:text-gray-300">
//                   <span className="font-medium">Special Request:</span> {booking.specialRequest}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/booking");
        const data = await res.json();

        if (data.success) {
          setBookings(data.bookings);
        } else {
          console.error("Error fetching bookings:", data.error);
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">Your Bookings</h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No bookings yet.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {booking.restaurantName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Date:</span>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Time:</span> {booking.time}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Guests:</span> {booking.numberOfGuests}
              </p>
              {booking.specialRequest && (
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Special Request:</span> {booking.specialRequest}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
