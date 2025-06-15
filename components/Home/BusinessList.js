import React, { useContext } from 'react';
import BusinessItem from './BusinessItem';
import { SelectedBusinessContext } from '/context/SelectedBusinessContext';
import { UserLocationContext } from '../../context/UserlocationContext';

// Helper to pick one of 7 images based on index
const getCuisineImage = (cuisine, index) => {
  const safeCuisine = cuisine?.split(';')[0]?.toLowerCase() || 'restaurant';
  console.log(safeCuisine);
  const imgIndex = (index % 7) + 1;
  return `/${safeCuisine}/${imgIndex}.png`;
};

function BusinessList({ businessList }) {
  const {userLocation, setUserLocation} = useContext(UserLocationContext);
  const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext);

    //finding the nearest business to the user location
  function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}


  return (
    <div className='flex overflow-x-auto gap-4 '
    style={{
          WebkitScrollbar: 'none',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}    
    >
      {businessList.sort((a, b) => {
                  // Calculate distance for restaurant a
                  const distanceA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lon);
                  // Calculate distance for restaurant b
                  const distanceB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lon);
                  // Sort by distance (ascending - nearest first)
                  return distanceA - distanceB;
            }).slice(0, 7).map((item, index) => {
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
  );
}

export default BusinessList;
