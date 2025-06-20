'use client'
import { useRouter } from "next/navigation";
import { UserLocationContext } from '../../../../context/UserlocationContext'
import { useSearchParams } from 'next/navigation';
import { useContext, useState, useEffect } from "react";
import { useSession } from 'next-auth/react'
import Heart from "react-heart"

export default function RestaurantLayout({ children }) {

    const {userLocation, setUserLocation} = useContext(UserLocationContext);
    const router=useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const address = searchParams.get('address');
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    const dis = searchParams.get('dis');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const { data: session } = useSession();
    const [isClick,setClick]=useState(false);
    const [active, setActive] = useState(false);

    const handleHeartClick = async () => {
  const newActiveState = !active;
  setActive(newActiveState);

  const favoriteData = {
    restaurantId: id,
    restaurantName: name,
    address: address,
    category:category,
    dis:dis,
    lat:lat,
    lng:lng,
  };

  try {
    if (newActiveState) {
      // === Add to favourites ===
      const response = await fetch('/api/favourite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(favoriteData),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Failed to save favorite:", result.error);
        alert(`Failed to save favorite: ${result.error}`);
      }
    } else {
      // === Remove from favourites ===
      const response = await fetch('/api/favourite', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId: id }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Failed to delete favorite:", result.error);
        alert(`Failed to delete favorite: ${result.error}`);
      }
    }
  } catch (err) {
    console.error("Error updating favorite:", err);
    alert("Error updating favorite.");
  }
};



//   const handleHeartClick = async () => {
//   const newActiveState = !active;
//   setActive(newActiveState);

//   if (newActiveState) {
//     try {
//       const favoriteData = {
//         restaurantId: id,
//         restaurantName: name,
//       };

//       const response = await fetch('/api/favourite', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(favoriteData),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         console.error("Failed to save favorite:", result.error);
//         alert(`Failed to save favorite: ${result.error}`);
//       }
//     } catch (err) {
//       console.error("Error saving favorite:", err);
//       alert("Error saving favorite.");
//     }
//   } else {
//     // Optional: You could also implement a DELETE to remove favorite here
//   }
// };

useEffect(() => {
  const checkIfFavorited = async () => {
    if (!session) return;

    try {
      const res = await fetch('/api/favourite');
      const data = await res.json();

      if (res.ok && Array.isArray(data.favourite)) {
        const isAlreadyFavourite = data.favourite.some(
          (fav) => fav.restaurantId === id
        );
        setActive(isAlreadyFavourite);
      }
    } catch (error) {
      console.error("Error checking favourite status:", error);
    }
  };

  checkIfFavorited();
}, [session, id]);

 const onDirectionClick=()=>{
      window.open('https://www.google.com/maps/dir/?api=1&origin='+
      userLocation.lat+','+userLocation.lng+'&destination='
      +lat
      +','+lng+'&travelmode=driving');

  }


const navigateWithBusinessData = (targetPath) => {
  const query = new URLSearchParams({
    name: name,
    address: address,
    category: category,
    id: id,
    lat:lat,
    lng:lng,
  }).toString();

  router.push(`${targetPath}?${query}`);
};


  return (
    <div className="font-sans">


      {/* Top info section */}
      <div className="px-10 py-6">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p className="text-gray-500 mt-1">{address}</p>



        {/* Buttons */}
        <div className="mt-4 flex gap-4 flex-wrap">
          <button className="border rounded-md px-4 py-2 flex items-center gap-2" onClick={()=>onDirectionClick()}>
            <span>📍</span> Direction
          </button>
          {/* <button className="border rounded-md px-4 py-2 flex items-center gap-2">
            <span>🔗</span> Share
          </button>
          <button className="border rounded-md px-4 py-2 flex items-center gap-2">
            <span>💬</span> Reviews
          </button> */}
          <div className="w-8 h-8">
            <Heart
                isActive={active}
                onClick={handleHeartClick}
                animationTrigger="both"
                inactiveColor="rgba(173, 48, 21)"
                activeColor="#ad3015"
                style={{ marginTop: '5px' }}
                animationDuration={0.1}
              />

          </div>
        </div>
        <div className="flex space-x-6 mt-6 mb-4 text-gray-600 text-lg border-b">
        <div
          className="cursor-pointer hover:text-pink-600 text-black dark:text-white px-4 py-2 rounded-lg pb-2 m-3"
          onClick={() => navigateWithBusinessData(`/${session.user.urlname}/AboutRestaurant/AddReview`)}
        >
            Add a Review
        </div>
        <div
          className="cursor-pointer hover:text-pink-600 text-black dark:text-white px-4 py-2 rounded-lg pb-2 m-3"
          onClick={() => navigateWithBusinessData(`/${session.user.urlname}/AboutRestaurant/BookTable`)}
        >
          Book a Table
        </div>
      </div>

      </div>


      {/* Page-specific content */}
      <div className="p-10">{children}</div>
    </div>
  );
}
