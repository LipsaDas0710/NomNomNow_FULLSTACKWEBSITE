
import React from "react";

export default function InfoSection() {
  return (
    <div
      className="relative h-screen w-screen bg-center bg-cover flex items-center justify-center text-white text-center px-4"
      style={{
        backgroundImage: "url('/image1.jpg')",
      }}
    >
      <div className=" p-6  max-w-3xl text-black">
        <p className="text-lg md:text-5xl font-bold mb-4 leading-tight grid">
         Life’s too short for mid meals.<span>Find places that slap. Every. Single. Time</span>
        </p>
        <p className="text-lg md:text-xl">
          For over a decade, we’ve enabled our customers to discover new tastes,
          delivered right to their doorstep.
        </p>
      </div>
    </div>
  );
}
