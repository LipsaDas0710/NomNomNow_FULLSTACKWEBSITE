"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState, useContext, useRef } from "react";
import { UserLocationContext } from '@/context/UserlocationContext';
import GlobalApi from '@/Shared/GlobalApi';
import RangeSelect from '@/components/Home/RangeSelect';
import debounce from 'lodash/debounce';
import { RadiusContext } from "../context/RadiusContext";
import BusinessList from '@/components/Home/BusinessList';
import { useBusiness } from '@/context/SearchBusinessContext';
import VoiceSearchButton from "./VoiceSearchButton";
import { useRouter } from "next/navigation";

function HeaderNavBar() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { radius, setRadius } = useContext(RadiusContext);
  const { setBusinessList } = useBusiness();
  const { data: session } = useSession();
  const [profileClick, setProfileClick] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const isMounted = useRef(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setProfileClick(false)
    }, 6000)
  }, [profileClick])

  // Handle logout with proper redirect
  const handleLogout = async () => {
    try {
      // Close the profile dropdown
      setProfileClick(false);
      
      // Sign out and redirect to home page
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback redirect if signOut fails
      router.push('/');
    }
  };

  //Function that does the API call from SearchBar and sends the data to businessList
  const handleCuisineSearch = debounce(async (searchTerm) => {
    try {
      const radiusInM = radius * 1000;
      const res = await GlobalApi.getFoursquarePlaces(
        searchTerm,
        radiusInM,
        userLocation.lat,
        userLocation.lng
      );
      console.log("Calling API with:")
      console.log("Fetched restaurants:", res.data);
      setBusinessList(res.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  }, 1000);

  //starts the search when "Enter" is clicked on the keyboard
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleCuisineSearch(searchTerm.trim().toLowerCase());
    }
  };

  //Starts the search without pressing enter and clicking on the screen 
  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      handleCuisineSearch(searchTerm.trim().toLowerCase());
    }
  };

  //Handles the search for Voice String from the voiceSearchButton.js!!
  const handleVoiceResult = (transcript) => {
    setSearchTerm(transcript);
    handleCuisineSearch(transcript);
  };

  return session?.user && (
    <div className="flex items-center justify-between p-2 shadow-md">
      <div className="flex gap-7 items-center">
        <div className=" md:flex ">
          <Image src='/logo.png' alt="logo" width={50} height={50}/>
          <h2 className="cursor-pointer hover:text-blue-500 mt-2.5 text-sm md:text-lg ml-1" 
              onClick={() => router.push('/')}>
            NomNomNow
          </h2>
        </div>
        <div className=" md:ml-50 md:flex md:mt-2 ml-20">
          {/* md configure for navBar and search */}
          <div className="flex space-x-6 mb-4 gap-3  md:mr-20 md:gap-6">
            <h2 className="cursor-pointer hover:text-blue-500 m-3" 
                onClick={() => router.push(`/${session.user.urlname}/Home`)}>
              Home
            </h2>
            <h2 className="cursor-pointer hover:text-blue-500 m-3" 
                onClick={() => router.push(`/${session.user.urlname}/Profile/Review`)}>
              Profile
            </h2>
            <h2 className="cursor-pointer hover:text-blue-500 m-3" 
                onClick={() => router.push(`/${session.user.urlname}/Profile/Favourite`)}>
              Favourite
            </h2>
          </div>
        
        <div className="flex items-center bg-gray-100  rounded-md h-12 w-70 md:w-100 gap-3 md:mr-3 md:ml-10 -ml-3 ">
          {/* search bar text area  and svg */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black cursor-pointer ml-2"
            onClick={handleSearchClick}
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
            className="bg-transparent outline-none w-full text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearch}
          />
          {/* 🎤 Voice button will send result to handleSearch */}
          <VoiceSearchButton onResult={handleVoiceResult} />
        </div>
        </div>
      </div>

      <div className="relative">
        {session?.user ? (
          <>
            <Image
              src={session.user.image || "/profilePlaceholder.png"}
              alt="user"
              width={40}
              height={40}
              onClick={() => setProfileClick(!profileClick)}
              className="rounded-full cursor-pointer m-3 hover:border-[2px] border-blue-500"
            />
            {profileClick ? (
              <div className="absolute bg-white p-3 shadow-md border-[1px] mt-2 z-30 right-4 rounded-md">
                <h2 
                  className="cursor-pointer text-black hover:text-blue-500 hover:font-bold"
                  onClick={handleLogout}
                >
                  Logout
                </h2>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default HeaderNavBar;