// // Import dependencies
// import { NextResponse } from 'next/server';


// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const category = searchParams.get('category') || 'restaurant';
//   const lat = searchParams.get('lat');
//   const lng = searchParams.get('lng');
//   const radius = searchParams.get('radius') || 1000;

//   const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY;

//   if (!lat || !lng) {
//     return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
//   }

//   try {
//     // Step 1: Search Places
//     const searchRes = await fetch(
//       `https://api.foursquare.com/v3/places/search?query=${category}&ll=${lat},${lng}&radius=${radius}&limit=7`,
//       {
//         headers: {
//           Accept: 'application/json',
//           Authorization: FOURSQUARE_API_KEY
//         }
//       }
//     );
//     const searchData = await searchRes.json();

//     // Step 2: Fetch Photo for each place
//     const resultsWithPhotos = await Promise.all(
//       (searchData.results || []).map(async (place) => {
//         let photoUrl = null;

//         try {
//           const photoRes = await fetch(
//             `https://api.foursquare.com/v3/places/${place.fsq_id}/photos?limit=1`,
//             {
//               headers: {
//                 Accept: 'application/json',
//                 Authorization: FOURSQUARE_API_KEY
//               }
//             }
//           );
//           let photoUrl = null;

// try {
//   const photoRes = await fetch(
//     `https://api.foursquare.com/v3/places/${place.fsq_id}/photos?limit=1`,
//     {
//       headers: {
//         Accept: 'application/json',
//         Authorization: FOURSQUARE_API_KEY
//       }
//     }
//   );

//   // ✅ Check if the response is OK (status 200–299)
//   if (photoRes.ok) {
//     const photoData = await photoRes.json();

//     if (photoData.length > 0) {
//       photoUrl = `${photoData[0].prefix}original${photoData[0].suffix}`;
//     }
//   } else {
//     // ❗ Response not OK – read plain text error
//     const errorText = await photoRes.text();
//     console.error(`Photo API Error (${place.name}):`, errorText);
//   }
// } catch (e) {
//   console.error(`Failed to fetch photo for ${place.name}`, e);
// }


//           if (photoData.length > 0) {
//             photoUrl = `${photoData[0].prefix}original${photoData[0].suffix}`;
//           }
//         } catch (e) {
//           console.error(`Failed to fetch photo for ${place.name}`, e);
//         }

//         const categoryName = place.categories?.[0]?.name || '';
//         const cuisine = extractCuisine(categoryName).toLowerCase();

//         return {
//           id: place.fsq_id,
//           name: place.name,
//           lat: place.geocodes?.main?.latitude,
//           lng: place.geocodes?.main?.longitude,
//           address: place.location?.formatted_address || '',
//           category: categoryName,
//           cuisine,
//           image: photoUrl
//         };
        
//       })
//     );

//     return NextResponse.json(resultsWithPhotos);
//   } catch (error) {
//     console.error('Foursquare API Error:', error);
//     return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
//   }
// }

// // Utility function to extract cuisine from category name
// function extractCuisine(categoryName) {
//   if (!categoryName) return '';
//   // Remove common suffixes like "Restaurant", "Place", "Spot"
//   const cleaned = categoryName.replace(/(Restaurant|Place|Spot)$/i, '').trim();
//   // Return first word capitalized
//   return cleaned.split(' ')[0] || '';
// }


// Import dependencies
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const category = (searchParams.get('category') || 'restaurant').toLowerCase(); // Case-insensitive
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || 1000;

  const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY;

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
  }

  try {
    // Step 1: Search Places
    const searchRes = await fetch(
      `https://api.foursquare.com/v3/places/search?query=${category}&ll=${lat},${lng}&radius=${radius}&limit=7`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: FOURSQUARE_API_KEY,
        },
      }
    );

    const searchData = await searchRes.json();

    // Step 2: Add photos for each result
    const resultsWithPhotos = await Promise.all(
      (searchData.results || []).map(async (place) => {
        let photoUrl = null;

        try {
          const photoRes = await fetch(
            `https://api.foursquare.com/v3/places/${place.fsq_id}/photos?limit=1`,
            {
              headers: {
                Accept: 'application/json',
                Authorization: FOURSQUARE_API_KEY,
              },
            }
          );

          if (photoRes.ok) {
            const photoData = await photoRes.json();
            if (photoData.length > 0) {
              photoUrl = `${photoData[0].prefix}original${photoData[0].suffix}`;
            }
          } else {
            const errorText = await photoRes.json().catch(() => ({}));
            console.error(`Photo API Error (${place.name}):`, errorText|| 'Unknown error');
          }
        } catch (e) {
          console.error(`Failed to fetch photo for ${place.name}`, e);
        }

        const categoryName = place.categories?.[0]?.name || '';
        const cuisine = extractCuisine(categoryName).toLowerCase();

        return {
          id: place.fsq_id,
          name: place.name,
          lat: place.geocodes?.main?.latitude,
          lng: place.geocodes?.main?.longitude,
          address: place.location?.formatted_address || '',
          category: categoryName,
          cuisine,
          image: photoUrl,
        };
      })
    );

    return NextResponse.json(resultsWithPhotos);
  } catch (error) {
    console.error('Foursquare API Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// Utility: Extract cuisine from category
function extractCuisine(categoryName) {
  if (!categoryName) return '';
  const cleaned = categoryName.replace(/(Restaurant|Place|Spot)$/i, '').trim();
  return cleaned.split(' ')[0] || '';
}

