'use client'
import dynamic from 'next/dynamic';
import CategoryList from '@/components/Home/CategoryList';
import OpenStreetMapView from '../components/Home/OpenStreetMapView';
import RangeSelect from '@/components/Home/RangeSelect';
import SelectRating from '@/components/Home/SelectRating';
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { use, useContext, useEffect, useState } from 'react'
import GlobalApi from '@/Shared/GlobalApi';
import { UserLocationContext } from '@/context/UserlocationContext';
import BusinessList from '@/components/Home/BusinessList';
import HeaderNavBar from '@/components/HeaderNavBar';
import { useBusiness } from '@/context/SearchBusinessContext';


export default function Home() {


  const [mounted, setMounted] = useState(false);
   const [loading, setLoading] = useState(false);
   const {data:session}=useSession();
   const [category,setCategory]=useState();
   const [radius,setRadius]=useState(5);
   //const [businessList,setBusinessList]=useState([]);
   const { businessList, setBusinessList } = useBusiness();
   const {userLocation, setUserLocation} = useContext(UserLocationContext);
   const [searchResults, setSearchResults] = useState([]);


   const router = useRouter();

     useEffect(() => {
    setMounted(true);
  }, []);


    useEffect(()=>{
    if(mounted && !session?.user){
      router.push('/SignIn')
    }
  },[session, mounted])


useEffect(() => {
    if (mounted && userLocation?.lat && userLocation?.lng) {
      getPlace();
    }
}, [category, radius, userLocation,mounted]);




const getPlace = () => {
  setLoading(true); 
  GlobalApi.getPlace(category,radius,userLocation.lat,userLocation.lng)
    .then((resp) => {
      console.log("Places data:", resp.data); // <-- Should print to console
      setBusinessList(resp.data.places); // <-- Set the business list
      setLoading(false);
    })
    .catch((err) => {
      console.error("API error:", err);
      setLoading(false);
    });
};
 if (!mounted) return null; 

  return (
      <div className='grid grid-cols-1 md:grid-cols-4 h-screen '>
      <div >
        <CategoryList onCategoryChange={(value)=>setCategory(value)}/>
        <RangeSelect onRadiusChange={(value)=>setRadius(value)}/>
        <SelectRating/>
       
      </div>
      <div className='col-span-3 h-[600px]'><OpenStreetMapView  lat={userLocation.lat} lng={userLocation.lng}  businessList={businessList} />
          <div className="md:absolute relative md:w-[71%] md:right-5 w-full  -mb-10 left-0 lg:left-80 z-10 md:-bottom-5 bottom-48"> 
            <BusinessList businessList={businessList} />
          </div>
      </div>
     
    </div>
  
    
  );
}
