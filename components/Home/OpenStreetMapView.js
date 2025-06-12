'use client'
import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { UserLocationContext } from '@/context/UserlocationContext';


const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false, // prevent SSR issues
});

export default function OpenStreetMapView({businessList}) {
  const {userLocation , setuserlopcation} = useContext(UserLocationContext);

  return <LeafletMap center={userLocation} businessList={businessList}/>;
}