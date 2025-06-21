import React, { useContext,useRef } from 'react';
import BusinessItem from './BusinessItem';
import { SelectedBusinessContext } from '/context/SelectedBusinessContext';
import { UserLocationContext } from '../../context/UserlocationContext';
import { useRouter } from 'next/navigation'; 

// Helper to pick one of 7 images based on index
const getCuisineImage = (cuisine, index) => {
  const safeCuisine = cuisine?.split(';')[0]?.toLowerCase() || 'restaurant';
  // console.log(safeCuisine);
  const imgIndex = (index % 7) + 1;
  return `/${safeCuisine}/${imgIndex}.png`;
};

function BusinessList({ businessList }) {
  const {userLocation, setUserLocation} = useContext(UserLocationContext);
  const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext);
  const scrollRef = useRef(null);  
  const router = useRouter();

    //finding the nearest business to the user location
  function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dlng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dlng/2) * Math.sin(dlng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}



  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };


  return (
    <div className="flex items-center gap-2 -mt-20 md:-mb-3">
      {/* Left scroll button */}
      <button onClick={scrollLeft} className="text-2xl px-2 py-1 bg-gray-400 rounded hover:bg-gray-500">&lt;</button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 no-scrollbar "
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {businessList
          .sort((a, b) => {
            const distanceA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
            const distanceB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
            return distanceA - distanceB;
          })
          .slice(0, 7)
          .map((item, index) => {
            const isSelected = selectedBusiness?.id === item.id;
            const imageUrl = getCuisineImage(item.cuisine, index);

            return (
              <div
                key={item.id || index}
                onClick={() => setSelectedBusiness(item)}
                className={`cursor-pointer transition-transform duration-200 ${
                  isSelected ? 'scale-105 shadow-lg border border-blue-500 rounded-lg' : ''
                }`}
              >
                <BusinessItem business={item} image={imageUrl} />
              </div>
            );
          })}
      </div>

      {/* Right scroll button */}
      <button onClick={scrollRight} className="text-2xl px-2 py-1 bg-gray-400 rounded-lg hover:bg-gray-500">&gt;</button>
    </div>
  );
}

export default BusinessList;
