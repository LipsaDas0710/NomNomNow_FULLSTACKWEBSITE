// 'use client'
// import dynamic from 'next/dynamic';
// import CategoryList from '@/components/Home/CategoryList';
// import OpenStreetMapView from '../components/Home/OpenStreetMapView';
// import RangeSelect from '@/components/Home/RangeSelect';
// import SelectRating from '@/components/Home/SelectRating';
// import { signOut, useSession } from 'next-auth/react'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation';
// import { use, useContext, useEffect, useState } from 'react'
// import GlobalApi from '@/Shared/GlobalApi';
// import { UserLocationContext } from '@/context/UserlocationContext';
// import BusinessList from '@/components/Home/BusinessList';
// import HeaderNavBar from '@/components/HeaderNavBar';
// import { useBusiness } from '@/context/SearchBusinessContext';


// export default function Home() {


//   const [mounted, setMounted] = useState(false);
//    const [loading, setLoading] = useState(false);
//    const {data:session}=useSession();
//    const [category,setCategory]=useState();
//    const [radius,setRadius]=useState(5);
//    //const [businessList,setBusinessList]=useState([]);
//    const { businessList, setBusinessList } = useBusiness();
//    const {userLocation, setUserLocation} = useContext(UserLocationContext);
//    const [searchResults, setSearchResults] = useState([]);


//    const router = useRouter();

//      useEffect(() => {
//     setMounted(true);
//   }, []);
// // gives me the session conformation?

//     useEffect(()=>{
//     if(mounted && !session?.user){
//       router.push('/SignIn')
//     }
//   },[session, mounted])

// //gets me the cat. radius and mounted conformation ?
// useEffect(() => {
//     if (mounted && userLocation?.lat && userLocation?.lng) {
//       getPlace();
//       fetchData();
//     }
// }, [category, radius, userLocation ,mounted]);


// // frontend api route for FourSquare for richer data

//   const fetchData = async () => {
//     setLoading(true); // Show spinner
//     try {
//       const radiusInM= radius * 1000;
//       const res = await GlobalApi.getFoursquarePlaces(category, radiusInM, userLocation.lat, userLocation.lng); // sample coords
//       console.log('Foursquare Data:', res.data);
//       setBusinessList(res.data);
//       setLoading(false);//hide spinner
//     } catch (err) {
//       console.error('Error fetching Foursquare data:', err);
//     }
//   };
//  if (!mounted) return null; 


// //openstreetmap frontend api intial use and less data 
// const getPlace = () => {
//   // setLoading(true); //  Show spinner
//   // GlobalApi.getPlace(category,radius,userLocation.lat,userLocation.lng)
//   //   .then((resp) => {
//   //     // console.log("Places data:", resp.data); // <-- Should print to console
//   //     // setBusinessList(resp.data.places); // <-- Set the business list
//   //     setLoading(false);// Hide spinner
//   //   })
//   //   .catch((err) => {
//   //     console.error("API error:", err);
//   //     setLoading(false);
//   //   });
// };
//  if (!mounted) return null; 


//   return (
//     //ui of the home page
//       <div className='grid grid-cols-1 md:grid-cols-4 h-screen '>
//       <div >
//         <CategoryList onCategoryChange={(value)=>setCategory(value)}/>
//         <RangeSelect onRadiusChange={(value)=>setRadius(value)}/>
//         <SelectRating/>
       
//       </div>
//       <div className='col-span-3 h-[600px]'><OpenStreetMapView  lat={userLocation.lat} lng={userLocation.lng}  businessList={businessList} />
//           <div className="md:absolute relative md:w-[71%] md:right-5 w-full  -mb-10 left-0 lg:left-80 z-10 md:-bottom-5 bottom-48"> 
//             <BusinessList businessList={businessList} /> 
//             {/* sending the data to businessList for extraction */}
//           </div>
//       </div>
     
//     </div>
  
    
//   );
// }


'use client'
import React from 'react'
import { useRouter } from 'next/navigation';

export default function MainPage ()  {

  const router = useRouter();

  return (
    <div>
      uhugigrthgrht
      <p>gjrhfrhfurj</p>
      <h1 className='text-black dark:text-white' onClick={()=>router.push('/Home')}>App</h1>
      <h1 className='text-black dark:text-white' onClick={()=>router.push('/SignIn')}>signin </h1>
      <h1 className='text-black dark:text-white' onClick={()=>router.push('/Login')}>login </h1>
    </div>
  )
}

