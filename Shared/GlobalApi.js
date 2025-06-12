import axios from 'axios';
//const { default: axios } = require("axios");
// import axios from '../app/lib/axiosConfig';


const getPlace=(category,radius,lat,lng)=>axios.get('http://localhost:3000/api/openStreet-place?'+
'category='+category+'&lat='+lat+'&lng='+lng+'&radius='+radius)
// 'category='+category+'&radius='+radius+'&lat='+lat+'&lng='+lng)

// const getPixabayImage = (query) =>
//   axios.get('https://pixabay.com/api/', {
//     params: {
//       key: process.env.NEXT_PUBLIC_PIXABAY_KEY,  // ✅ must be set
//       q: `${query}`,                              // ✅ clean query
//       image_type: 'photo',
//       per_page: 1,
//       safesearch: true
//     },
//     timeout: 10000
//   });
//   console.log("Pixabay key:", process.env.NEXT_PUBLIC_PIXABAY_KEY);





// const getWikimediaImage = async (query) => {
//   const apiUrl = 'https://en.wikipedia.org/w/api.php';

//   try {
//     // Step 1: Search for a related Wikipedia title
//     const searchRes = await axios.get(apiUrl, {
//       params: {
//         action: 'query',
//         list: 'search',
//         srsearch: query,
//         format: 'json',
//         origin: '*',
//       },
//     });

//     const title = searchRes.data?.query?.search?.[0]?.title;
//     if (!title) {
//       console.warn(`No search result for: ${query}`);
//       return null;
//     }

//     // Step 2: Get thumbnail image for that title
//     const imageRes = await axios.get(apiUrl, {
//       params: {
//         action: 'query',
//         format: 'json',
//         origin: '*',
//         prop: 'pageimages',
//         titles: title,
//         pithumbsize: 500,
//       },
//     });

//     const pages = imageRes.data?.query?.pages;
//     const page = pages && Object.values(pages)[0];

//     if (!page?.thumbnail?.source) {
//       console.warn(`No image found for title: ${title}`);
//     }

//     return page?.thumbnail?.source || null;
//   } catch (err) {
//     console.error(`Wikimedia fetch error for "${query}":`, err.message);
//     return null;
//   }
// };



export default{
    getPlace,
    // getPixabayImage,
    // //getUnsplashImage,
    // getWikimediaImage
}


//http://localhost:3000/api/google-place?category=italian&lat=37.7749&lng=-122.4194&radius=5
//http://localhost:3000/api/google-place?category=[restaurant]&lat=37.7749&lng=-122.4194&radius=5


