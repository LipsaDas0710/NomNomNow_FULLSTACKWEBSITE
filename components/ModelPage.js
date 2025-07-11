"use client";
import React from "react";
import Image from "next/image";
import { useSession } from 'next-auth/react'


const ProfilePage = () => {
    const {data:session}=useSession();
  return session?.user&&(
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div
        className="relative h-64 w-full bg-cover bg-center"
        style={{ backgroundImage: 'url("/banner.jpg")' }}
       >
        {/* <img src={'/bgFoodImg.jpg'}  height={4}/> */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Profile Section */}
        <div className="absolute left-32 top-4 flex items-center gap-6 ">
          <div className="  ">
           {session?.user ? (
                           <>
                             <Image
                               src={session.user.image || "/profilePlaceholder.png"}
                               alt="user"
                                width={300}
                                height={300}
                               onClick={()=>setProfileClick(!profileClick)}
                               className="rounded-full cursor-pointer  md:m-2  -ml-15 mt-9 md:w-50 md:h-50
                               hover:border-[4px]   border-4 border-white"
                             />
                           </>
                         ) : null}
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-semibold md:mt-20">{session.user.name}</h2>
            <div className="flex space-x-6 mt-2 text-sm md:ml-90 md:mt-10">
              <span className="flex flex-col items-center">
                <span className="text-xl font-bold">0</span>
                Reviews
              </span>
              <span className="flex flex-col items-center">
                <span className="text-xl font-bold">0</span>
                Photos
              </span>
              <span className="flex flex-col items-center">
                <span className="text-xl font-bold">0</span>
                Followers
              </span>
            </div>
          </div>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg mr-2 md:ml-15">
            Edit profile
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex px-32 pt-20 pb-10">
        {/* Sidebar */}
        <div className="w-1/4 pr-10">
          <h3 className="text-gray-700 font-semibold mb-4 tracking-wide">
            ACTIVITY
          </h3>
          <ul className="space-y-4 text-lg">
            <li className="hover:text-pink-500 hover:border-l-4 hover:border-pink-500 hover:pl-3 cursor-pointer text-gray-500">Reviews</li>
            <li className="hover:text-pink-500 hover:border-l-4 hover:border-pink-500 hover:pl-3 cursor-pointer text-gray-500">Photos</li>
            <li className="hover:text-pink-500 hover:border-l-4 hover:border-pink-500 hover:pl-3 cursor-pointer text-gray-500">Followers</li>
            <li className="hover:text-pink-500 hover:border-l-4 hover:border-pink-500 hover:pl-3 cursor-pointer text-gray-500">Recently Viewed</li>
          </ul>

          <h3 className="mt-10 text-gray-700 font-semibold mb-4 tracking-wide">
            ONLINE ORDERING
          </h3>
          <ul className="space-y-4 text-lg">
            <li className="hover:text-pink-500 hover:border-l-4 hover:border-pink-500 hover:pl-3 cursor-pointer text-gray-500">My addresses</li>
          </ul>

          <h3 className="mt-10 text-gray-700 font-semibold mb-4 tracking-wide">
            PAYMENTS
          </h3>
          <ul className="space-y-4 text-lg">
            <li className="hover:text-pink-500 hover:border-l-4 hover:border-pink-500 hover:pl-3 cursor-pointer text-gray-500">Manage Cards</li>
          </ul>

          <h3 className="mt-10 text-gray-700 font-semibold mb-4 tracking-wide">
            TABLE BOOKING
          </h3>
          <ul className="space-y-4 text-lg">
            <li className="hover:text-pink-500 hover:border-l-4 hover:border-pink-500 hover:pl-3 cursor-pointer text-gray-500">
              Your Bookings
            </li>
          </ul>

          <h3 className="mt-10 text-gray-700 font-semibold mb-4 tracking-wide">
            ACCOUNT SETTINGS
          </h3>
          <ul className="space-y-4 text-lg">
            <li className="hover:text-pink-500 hover:border-l-4 hover:border-pink-500 hover:pl-3 cursor-pointer text-gray-500">
              Delete Account
            </li>
          </ul>
        </div>

        {/* Review Content */}
        <div className="w-3/4">
          <h2 className="text-2xl font-semibold mb-6 dark:text-gray-700">Reviews</h2>
          <div className="flex flex-col items-center justify-center mt-20">
            <Image
              src="/review-placeholder.png"
              alt="Empty"
              width={200}
              height={200}
              className="mb-4"
            />
            <p className="text-lg text-gray-500">Nothing here yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
