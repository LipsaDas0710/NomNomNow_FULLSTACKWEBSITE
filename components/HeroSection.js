// export default function HeroSection() {
//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute w-full h-full object-cover z-0"
//         src="/video1.mp4"
//       ></video>

//       {/* Overlay Content */}
//       <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center z-10 px-4">
//         <h1 className="text-4xl md:text-6xl font-bold text-white">
//           <span className="italic font-semibold">zomato</span><br />
//           India’s #1 <br /> <span className="font-normal">food delivery app</span>
//         </h1>
//         <p className="mt-4 text-lg md:text-xl font-light">
//           Experience fast & easy online ordering on the Zomato app
//         </p>

//         {/* App Badges */}
//         <div className="flex gap-4 mt-6 flex-wrap justify-center">
//           <img src="/google-play-badge.png" alt="Google Play" className="h-12" />
//           <img src="/app-store-badge.png" alt="App Store" className="h-12" />
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'
import React from 'react'
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router= useRouter();

  return (
    // <div className="relative w-full h-screen overflow-hidden">
    //   {/* Background Video */}
    //   <video
    //    autoPlay
    //    loop
    //    muted
    //    playsInline
    //    className="w-full h-screen object-cover"
    //   >
    //     <source src="/video1.mp4" type="video/mp4" />
    //     Your browser does not support the video tag.
    //   </video>

    //   {/* Overlay Content */}
    //   <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center z-10 px-4">
    //     <h1 className="text-4xl md:text-6xl font-bold text-white">
    //       <span className="italic font-semibold">zomato</span><br />
    //       India’s #1 <br /> <span className="font-normal">food delivery app</span>
    //     </h1>
    //     <p className="mt-4 text-lg md:text-xl font-light text-white">
    //       Experience fast & easy online ordering on the Zomato app
    //     </p>

    //     {/* App Badges */}
    //     <div className="flex gap-4 mt-6 flex-wrap justify-center">
    //       <img src="/google-play-badge.png" alt="Google Play" className="h-12" />
    //       <img src="/app-store-badge.png" alt="App Store" className="h-12" />
    //     </div>
    //   </div>
    // </div>


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

        <div className='flex gap-2 mt-5'>
          <h1 className='text-white font-medium border-2 rounded-md p-3 hover:bg-purple-400 ' onClick={()=>router.push('/Home')}>App</h1>
          <h1 className='text-white font-medium border-2 rounded-md p-3 hover:bg-purple-400' onClick={()=>router.push('/SignIn')}>signin </h1>
          <h1 className='text-white font-medium border-2 rounded-md p-3 hover:bg-purple-400' onClick={()=>router.push('/Login')}>login </h1>        
        </div>

        {/* ✅ App Store Badges
        <div className="flex gap-4 mt-6 flex-wrap justify-center">
          <img
            src="/google-play-badge.png"
            alt="Google Play"
            className="h-12"
          />
          <img
            src="/app-store-badge.png"
            alt="App Store"
            className="h-12"
          />
        </div> */}
      </div>
    </div>

    // 'use client'
// import React from 'react'
// import { useRouter } from 'next/navigation';


// export default function MainPage ()  {

//   const router = useRouter();

//   return (
//     <div>
//       uhugigrthgrht
//       <p>gjrhfrhfurj</p>
//       <h1 className='text-black dark:text-white' onClick={()=>router.push('/Home')}>App</h1>
//       <h1 className='text-black dark:text-white' onClick={()=>router.push('/SignIn')}>signin </h1>
//       <h1 className='text-black dark:text-white' onClick={()=>router.push('/Login')}>login </h1>
       
//     </div>
//   )
// }


    // <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
    //   <video
    //     autoPlay
    //     loop
    //     muted
    //     playsInline
    //     style={{
    //       width: "100%",
    //       height: "100%",
    //       objectFit: "cover",
    //     }}
    //   >
    //     <source src="/video1.mp4" type="video/mp4" />
    //     Your browser does not support the video tag.
    //   </video>
    // </div>
 

  );
};

export default HeroSection;
