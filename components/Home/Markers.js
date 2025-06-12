import React, { useState, useEffect, useRef} from 'react'
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import BusinessItem from './BusinessItem';
import GlobalApi from '../../Shared/GlobalApi';
import { SelectedBusinessContext } from '@/context/SelectedBusinessContext';
import { UserLocationContext } from '../../context/UserlocationContext';
import { useContext } from 'react';

const userIcon = L.icon({
  iconUrl: '/circle.png',
  iconSize: [15, 15],
  iconAnchor: [7.5, 7.5]
});

const Markers = ({ businessList }) => {
  const [imageMap, setImageMap] = useState({});
  const [activePopup, setActivePopup] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext);
  const {userLocation, setUserLocation} = useContext(UserLocationContext);
  const map = useMap(); // Get map instance from react-leaflet

  // Utility to get a local image path
  const getImagePath = (cuisine, index) => {
    if (cuisine) {
      const folder = cuisine.toLowerCase().trim();
      return `/${folder}/${(index % 7) + 1}.png`;
    }
    return `/restaurant/${(index % 7) + 1}.png`;
  };

  useEffect(() => {
    const newMap = {};
    businessList.forEach((b, i) => {
      newMap[b.id] = getImagePath(b.cuisine, i);
    });
    setImageMap(newMap);
  }, [businessList]);

  // Handle marker click and calculate popup position
  const handleMarkerClick = (business) => {
    const point = map.latLngToContainerPoint([business.lat, business.lon]);
    
    setPopupPosition({
      x: point.x,
      y: point.y
    });
    
    setActivePopup(business);
    setSelectedBusiness(business);
  };

  // Close popup
  const closePopup = () => {
    setActivePopup(null);
  };

  // Auto-open popup when a business is selected from the list
  useEffect(() => {
    if (selectedBusiness && map) {
      // Find the business in the current businessList
      const businessInList = businessList.find(b => b.id === selectedBusiness.id);
      
      if (businessInList) {
        // Calculate popup position for the selected business
        const point = map.latLngToContainerPoint([businessInList.lat, businessInList.lon]);
        
        setPopupPosition({
          x: point.x,
          y: point.y
        });
        
        setActivePopup(businessInList);
      }
    }
  }, [selectedBusiness, map, businessList]);


  // Update popup position when map moves
  useEffect(() => {
    if (activePopup && map) {
      const updatePopupPosition = () => {
        const point = map.latLngToContainerPoint([activePopup.lat, activePopup.lon]);
        setPopupPosition({
          x: point.x,
          y: point.y
        });
      };

      map.on('move', updatePopupPosition);
      map.on('zoom', updatePopupPosition);

      return () => {
        map.off('move', updatePopupPosition);
        map.off('zoom', updatePopupPosition);
      };
    }
  }, [activePopup, map]);

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
    <>
      {/* Markers */}
      {businessList.sort((a, b) => {
            // Calculate distance for restaurant a
            const distanceA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lon);
            // Calculate distance for restaurant b
            const distanceB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lon);
            // Sort by distance (ascending - nearest first)
            return distanceA - distanceB;
      }).slice(0, 7).map((business) => (
        <Marker
          key={business.id || business.lat + '-' + business.lon}
          position={[business.lat, business.lon]}
          icon={userIcon}
          eventHandlers={{
            click: () => setSelectedBusiness(business),
          }}
        />
      ))}

      {/* Custom Popup Portal */}
      {activePopup && (
        <>
          {/* Background overlay to catch clicks */}
          <div 
            className="fixed inset-0 z-[999]" 
            onClick={closePopup}
          />
          
          {/* Custom Popup */}
          <div 
            className="fixed z-[1000] bg-white  rounded-lg shadow-xl border pointer-events-auto overflow-hidden"
            style={{
              left: `${popupPosition.x - -210}px`, // Center the 300px wide popup
              top: `${popupPosition.y - 230}px`,  // Position above marker (400px height + 15px gap)
              width: '200px',
              height: '270px',
              overflow: 'hidden',
              padding: '10px',  
              center: 'center',
            }}
          >
            {/* Close button */}
            <button 
              onClick={closePopup}
              className="absolute top-2 right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 z-10 text-sm font-bold"
            >
              x
            </button>
            
            {/* Popup content */}
            <div className="w-full h-full " >
                <BusinessItem 
                  business={activePopup} 
                  image={imageMap[activePopup.id] || '/placeholder.jpeg'} 
                  showDir={true}
                />
              
            </div>
            
            {/* Popup arrow pointing down to marker */}
            <div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid white',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
          </div>
        </>
      )}
    </>
  )
}

export default Markers;