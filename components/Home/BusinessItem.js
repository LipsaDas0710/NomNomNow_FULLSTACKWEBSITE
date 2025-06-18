import React from 'react'
import { useContext,useState,useEffect } from "react"
import { UserLocationContext } from '../../context/UserlocationContext'
import Heart from "react-heart"
import { AlignJustify } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'


const BusinessItem = ({business, image, showDir=false}) => {
  const {userLocation, setUserLocation} = useContext(UserLocationContext);
  const [distance,setDistance]=useState();
  const [active, setActive] = useState(false);
  const [isClick,setClick]=useState(false);
  const router= useRouter();
  const { data: session } = useSession();


    useEffect(()=>{
      calculateDistance(
        business.lat,
        business.lng,
        userLocation.lat,
        userLocation.lng
      )
    },[])


      const calculateDistance = (lat1, lng1, lat2, lng2) => {
     
      const earthRadius = 6371; // in kilometers
  
      const degToRad = (deg) => {
        return deg * (Math.PI / 180);
      };
  
      const dLat = degToRad(lat2 - lat1);
      const dlng = degToRad(lng2 - lng1);
  
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dlng / 2) * Math.sin(dlng / 2);
  
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      const distance = earthRadius * c;
      const formatted = `${distance.toFixed(2)}`;
     
      setDistance(formatted)
      return formatted; // Return the distance with 2 decimal places
    };

      const onDirectionClick=()=>{
      window.open('https://www.google.com/maps/dir/?api=1&origin='+
      userLocation.lat+','+userLocation.lng+'&destination='
      +business.lat
      +','+business.lng+'&travelmode=driving');

  }
  const handleClick = () => {
  const query = new URLSearchParams({
    name: business.name,
    address: business.address,
    category:business.category,
    id:business.id,
    dis:distance,
    lat:business.lat,
    lng:business.lng,

  }).toString();

  router.push(`/${session.user.urlname}/AboutRestaurant/BookTable?${query}`);
};

        
// fallback image using random()
       const randomIndex = Math.floor(parseInt(business.id?.slice(-2), 36) % 7) + 1;
       const fallbackImage = `/restaurant/${randomIndex}.png`;


  return (
    <div className='w-[180px] flex-shrink-0 p-2 
      rounded-lg shadow-md mb-1
      bg-white hover:scale-110 transition-all mt-[20px] cursor-pointer'>   
        <img src={business.image || fallbackImage}
        alt='restaurant' className='h-[100px] w-full object-cover rounded-md' 
        onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}/>
        
        <div className='flex justify-between'>
          <h2 className='text-[13px] font-bold mt-3 line-clamp-1 text-black'>{business.name}</h2>
          <div style={{ width: "17px" }} className='mr-3'>
			<Heart isActive={active} onClick={() => setActive(!active)} animationTrigger = "both" inactiveColor = "rgba(173, 48, 21)" activeColor = "#ad3015" style = {{marginTop:'15px'}} animationDuration = {0.1}/>
		</div>
        </div>        
          <h2 className='text-[10px] text-gray-400 
                line-clamp-2'>Category:{business.category}</h2>
          <h2 className='text-[10px] text-gray-400 
                line-clamp-2'>Address:{business.address }</h2>
          <h2 className='text-[10px] text-gray-400 
                line-clamp-2'>{business.id}</h2>
          <div className='flex justify-between'>
            <h2 className='text-[#0075ff] text-2px font-light 
               flex justify-between items-center'>Dist:{distance}</h2>
               
                {showDir?null:<h2 className='border-[1px] p-1 rounded-sm mr-1.5
             border-gray-300
               hover:text-white
               hover:bg-gray-300' onClick={handleClick}><AlignJustify color="gray" size={15} /></h2>}
            
         
          {showDir? <div className=' p-1 mt-1'>
            <h2 className='border-[1px] p-1 rounded-full text-2px text-[#0075ff]
             border-blue-500
               hover:text-white
               hover:bg-blue-500' onClick={()=>onDirectionClick()} >Get Direction</h2>
          </div>: null}

       
          </div>
                 
    </div>
  )
}

export default BusinessItem