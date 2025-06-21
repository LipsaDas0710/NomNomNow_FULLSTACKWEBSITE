"use client";
import React from "react";
import Image from "next/image";
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";

const ProfileLayout = ({ children }) => {
  const { data: session } = useSession();
  const router= useRouter();

  return session?.user && (
    <div className="min-h-screen  ">
      {/* Banner */}
      <div
        className="relative h-64 w-full bg-cover bg-center"
        style={{ backgroundImage: 'url("/banner.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Profile Section */}
        <div className="absolute left-32 top-4 flex items-center gap-6">
          {session?.user && (
            <Image
              src={session.user.image || "/profilePlaceholder.png"}
              alt="user"
              width={120}
              height={120}
              className="rounded-full cursor-pointer  border-4 border-white md:m-2  -ml-15 mt-9 md:w-50 md:h-50"
            />
          )}
          <h2 className="text-2xl text-white font-semibold md:mt-4">{session.user.name}</h2>

        </div>
      </div>

      {/* Content Area */}
      <div className="flex px-32 pt-20 pb-10">
        {/* Sidebar */}
        <div className="w-1/4 pr-10">
          <h3 className="text-gray-700 dark:text-white font-semibold mb-4 tracking-wide">ACTIVITY</h3>
          <ul className="space-y-4 text-lg">
            <li className="block hover:text-blue-500 hover:border-l-4 hover:border-blue-500 hover:pl-3 cursor-pointer text-gray-500" onClick={() => router.push(`/${session.user.urlname}/Profile/Review`)}>
              Reviews
            </li>
            <li className="hover:text-blue-500 hover:border-l-4 hover:border-blue-500 hover:pl-3 cursor-pointer text-gray-500" onClick={() => router.push(`/${session.user.urlname}/Profile/Favourite`)}>Favourites</li>
          </ul>

          <h3 className="mt-10 text-gray-700 font-semibold mb-4 tracking-wide dark:text-white">TABLE BOOKING</h3>
          <ul className="space-y-4 text-lg">
            <li className="block hover:text-blue-500 hover:border-l-4 hover:border-blue-500 hover:pl-3 cursor-pointer text-gray-500" onClick={() => router.push(`/${session.user.urlname}/Profile/YourBooking`)}>
              Your Bookings
            </li>
          </ul>

        </div>

        {/* Main content that changes: reviews/bookings */}
        <div className="w-3/4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
