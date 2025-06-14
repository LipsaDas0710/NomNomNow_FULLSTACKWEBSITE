import axios from 'axios';
//const { default: axios } = require("axios");
// import axios from '../app/lib/axiosConfig';


const getPlace=(category,radius,lat,lng)=>axios.get('http://localhost:3000/api/openStreet-place?'+
'category='+category+'&lat='+lat+'&lng='+lng+'&radius='+radius)
// 'category='+category+'&radius='+radius+'&lat='+lat+'&lng='+lng)

// // 🔹 Direct call to Foursquare (for testing)
// const fetchFromFoursquare = (category, radius, lat, lng) => {
//   const FOURSQUARE_API_KEY = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY; // Put this in .env.local
//   return axios.get('https://api.foursquare.com/v3/places/search', {
//     headers: {
//       Authorization: FOURSQUARE_API_KEY,
//     },
//     params: {
//       ll: `${lat},${lng}`,
//       query: category,
//       radius,
//       limit: 20,
//     },
//   });
// };


// const FOURSQUARE_API_KEY = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;

// export const getPlaceDetails = async (placeId) => {
//   try {
//     const response = await axios.get(
//       `https://api.foursquare.com/v3/places/${placeId}`,
//       {
//         headers: {
//           Authorization: FOURSQUARE_API_KEY,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching Foursquare place details:', error.message);
//     return null;
//   }
// };

// === FOURSQUARE API SECTION ===

const FOURSQUARE_API_KEY = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;

// Get detailed place info from Foursquare
const getPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get(
      `https://api.foursquare.com/v3/places/${placeId}`,
      {
        headers: {
          Authorization: FOURSQUARE_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching place details:', error.message);
    return null;
  }
};

// (Optional) Get user tips/reviews from Foursquare
const getPlaceTips = async (placeId) => {
  try {
    const response = await axios.get(
      `https://api.foursquare.com/v3/places/${placeId}/tips`,
      {
        headers: {
          Authorization: FOURSQUARE_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching place tips:', error.message);
    return null;
  }
};


export default{
    getPlace,
    getPlaceDetails,
    getPlaceTips,

}


//http://localhost:3000/api/google-place?category=italian&lat=37.7749&lng=-122.4194&radius=5
//http://localhost:3000/api/google-place?category=[restaurant]&lat=37.7749&lng=-122.4194&radius=5


