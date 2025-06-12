// // /app/api/unsplash/route.js
// import axios from 'axios';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const query = searchParams.get('query') || 'restaurant';

//   try {
//     const response = await axios.get('https://api.unsplash.com/photos/random', {
//       params: {
//         query,
//         count: 1,
//         orientation: 'landscape'
//       },
//       headers: {
//         Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
//       },
//     });

//     console.log("Query:", query);
// console.log("API Key Present?", !!process.env.UNSPLASH_ACCESS_KEY);


//     return new Response(JSON.stringify(response.data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Unsplash API error:', error.response?.data || error.message);
//     return new Response(JSON.stringify({ error: 'Failed to fetch image' }), { status: 500 });
//   }
// }
