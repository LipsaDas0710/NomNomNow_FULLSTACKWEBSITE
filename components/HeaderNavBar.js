"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState,useContext,useRef } from "react";
import { UserLocationContext } from '@/context/UserlocationContext';
import GlobalApi from '@/Shared/GlobalApi';
import RangeSelect from '@/components/Home/RangeSelect';
import debounce from 'lodash/debounce';
import { RadiusContext } from "../context/RadiusContext";
import BusinessList from '@/components/Home/BusinessList';
import { useBusiness } from '@/context/SearchBusinessContext';
import VoiceSearchButton from "./VoiceSearchButton";


function HeaderNavBar() {
  const {userLocation, setUserLocation} = useContext(UserLocationContext);
  const {radius, setRadius} = useContext(RadiusContext);
  const { setBusinessList } = useBusiness();
  // const [businessList,setBusinessList]=useState([]);
  const { data: session } = useSession();
  const [profileClick,setProfileClick]=useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // const [radius,setRadius]=useState(5);
  const isMounted = useRef(true); // ✅ Track if component is mounted

  useEffect(()=>{
    setTimeout(()=>{
      setProfileClick(false)
    },6000)
  },[profileClick==true])


  // useEffect(() => {
  //   return () => {
  //     isMounted.current = false; // Clean up on unmount
  //   };
  // }, []);


//Function that does the API call from SearchBar and sends the data to businessList
const handleCuisineSearch = debounce(async (searchTerm) => {
  try {
    const radiusInM= radius * 1000;
    const res = await GlobalApi.getFoursquarePlaces(
      searchTerm,
      radiusInM,
      userLocation.lat,
      userLocation.lng
    );
    console.log("Calling API with:")
    console.log("Fetched restaurants:", res.data);
    setBusinessList(res.data);
    // Optionally update state here, e.g.:
    // setRestaurants(res.data);

  } catch (error) {
    console.error("Search error:", error);
  }
}, 1000);

//starts teh search when "Enter" is clicked on the keyboard
       const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleCuisineSearch(searchTerm.trim().toLowerCase()); // Call parent function with search term
      // setSearchTerm(''); // Clear search after searching
      // console.log(setSearchTerm);
    }
  };

//Starts the search without pressing enter and clicking on the screen 
    const handleSearchClick = () => {
    if (searchTerm.trim()) {
     handleCuisineSearch(searchTerm.trim().toLowerCase());
      // setSearchTerm(''); // Clear search after searching
      // console.log(searchTerm);
    }
  
  };
//Handles the search for Voice String form the voiceSearchButton.js!!
  const handleVoiceResult = (transcript) => {
    setSearchTerm(transcript);
    handleCuisineSearch(transcript);
  };

  

  return session?.user&&(
   <div
      className="flex items-center
    justify-between p-2 shadow-md"
    >

      <div className="flex gap-7 items-center">
        <div className=" md:flex">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <h2 className="cursor-pointer hover:text-blue-500 mt-2.5 text-sm md:text-lg ml-1">NomNomNow</h2>
        </div>
        <div className=" md:ml-70 ">
          {/* md configure for navBar and search */}
          <div className="flex space-x-6 mb-4 ">
          <h2 className="cursor-pointer hover:text-blue-500 m-3">Home</h2>
          <h2 className="cursor-pointer hover:text-blue-500 m-3">Profile</h2>
          <h2 className="cursor-pointer hover:text-blue-500 m-3">Favourite</h2>
        </div>
      </div>
      <div
        className="flex items-center bg-gray-100 p-2 rounded-md w-[90%] gap-3 md:mr-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-black"
          onClick={handleSearchClick} // Add click handler
         onRadiusChange={(value) => setRadius(Number(value))}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Whats your favorite cuisine?"
          className="bg-transparent 
        outline-none w-full text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearch}
         
        />
        {/* 🎤 Voice button will send result to handleSearch */}
          <VoiceSearchButton onResult={handleVoiceResult} />
      </div>
      </div>
        
      <div>
        {session?.user ? (
          <>
            <Image
              src={session.user.image || "/profilePlaceholder.png"}
              alt="user"
              width={40}
              height={40}
              onClick={()=>setProfileClick(!profileClick)}
              className="rounded-full cursor-pointer  m-3
              hover:border-[2px] border-blue-500"
            />
           {profileClick? <div className="absolute bg-white p-3
            shadow-md border-[1px] mt-2 z-30
            right-4 ">
              <h2 className="cursor-pointer text-black
               hover:text-blue-500 hover:font-bold"
               onClick={()=>signOut()}>Logout</h2>
            </div>:null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default HeaderNavBar;