'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const HeroSection = () => {
  const router= useRouter();
  const { data: session } = useSession();

  
  const handleClick = () => {
    if (session?.user?.urlname) {
      router.push(`/${session.user.urlname}/Home`);
    } else {
      alert('You must be logged in to access this page.');
    }
  };


  return (
   <div className="relative h-screen w-screen overflow-hidden">
      {/* ✅ Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ✅ Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/40 text-white px-4 z-10">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight  font-sans">
          <span className=" font-semibold">NomNomNow</span>
          <div className="grid m-6">
            <span className="font-normal text-3xl mb-1">Because “I’ll eat anything” is a lie.</span>
            <span className="font-normal text-3xl">Search smarter. Eat better. Cry never.</span>
          </div>
        </h1>
        <p className="mt-4 text-lg md:text-xl grid">
          <span>Fast, easy restaurant discovery</span> <span>because your cravings deserve better.</span><span>Only on NomNomNow</span>
        </p>

        <div className='grid gap-3'>
          <div className='flex gap-4 mt-6 flex-wrap justify-center'>
            <h1 className='text-white font-medium border-2 rounded-md bg-black p-3 hover:text-lg cursor-pointer' onClick={()=>router.push('/SignIn')}>Sign in </h1>
          <h1 className='text-white font-medium border-2 rounded-md bg-black p-3 hover:text-lg 1cursor-pointer' onClick={()=>router.push('/Login')}>Log in </h1>
          </div>
             <h1 className='text-white font-medium border-2 rounded-md bg-black p-3 hover:text-lg cursor-pointer' onClick={handleClick}>Let’s Find a Spot </h1>     
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
