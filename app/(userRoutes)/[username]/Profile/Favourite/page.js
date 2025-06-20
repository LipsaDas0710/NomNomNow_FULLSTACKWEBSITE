"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router
import { useSession } from "next-auth/react";

export default function FavouritePage() {
  const [favourite, setFavourite] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router=useRouter();

  useEffect(() => {
    const fetchFavourite = async () => {
      try {
        const res = await fetch("/api/favourite");
        const data = await res.json();

        if (data.success) {
          setFavourite(data.favourite);
        } else {
          console.error("Error fetching favourite:", data.error);
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourite();
  }, []);

    const handleClick = (favorite) => {
  const query = new URLSearchParams({
    name: favourite.restaurantName,
    address: favourite.address,
    category:favourite.category,
    id:favourite.restaurantid,
    dis:favourite.dis,
    lat:favourite.lat,
    lng:favourite.lng,

  }).toString();
  if (session?.user?.urlname) {
      router.push(`/${session.user.urlname}/AboutRestaurant/BookTable?${query}`);
    } else {
      console.error("Session or user URL name missing");
    }

  // router.push(`/${session.user.urlname}/AboutRestaurant/BookTable?${query}`);
};

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">Your Favourite restaurants</h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      ) : favourite.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No favs yet.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-6" >
          {favourite.map((favourite, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm flex justify-between"
              
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2" >
                {favourite.restaurantName}
              </h2>
              <button className="bg-amber-500 text-white rounded-lg p-2 hover:bg-amber-800" onClick={()=>handleClick(favourite)}>Book Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
