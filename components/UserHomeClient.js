'use client'
import CategoryList from '@/components/Home/CategoryList';
import OpenStreetMapView from './Home/OpenStreetMapView';
import RangeSelect from '@/components/Home/RangeSelect';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import GlobalApi from '@/Shared/GlobalApi';
import { UserLocationContext } from '@/context/UserlocationContext';
import BusinessList from '@/components/Home/BusinessList';
import { useBusiness } from '@/context/SearchBusinessContext';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [category, setCategory] = useState();
  const [radius, setRadius] = useState(5);

  const { businessList, setBusinessList } = useBusiness();
  const { userLocation } = useContext(UserLocationContext);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && userLocation?.lat && userLocation?.lng) {
      fetchData();
    }
  }, [category, radius, userLocation, mounted]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const radiusInM = radius * 1000;
      const res = await GlobalApi.getPlace(
        category,
        radiusInM,
        userLocation.lat,
        userLocation.lng
      );
      setBusinessList(res.data);
    } catch (err) {
      console.error('Error fetching Foursquare data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !userLocation?.lat || !userLocation?.lng) {
    return (
      <div className='flex items-center justify-center h-screen text-lg font-semibold'>
        Loading your location...
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 h-screen'>
      <div>
        <CategoryList onCategoryChange={(value) => setCategory(value)} />
        <RangeSelect onRadiusChange={(value) => setRadius(value)} />
      </div>

      <div className='col-span-3 h-[600px]'>
        <OpenStreetMapView businessList={businessList} />
        <div className='md:absolute relative md:w-[71%] md:right-5 w-full -mb-10 left-0 lg:left-80 z-10 md:-bottom-5 bottom-48'>
          <BusinessList businessList={businessList} />
        </div>
      </div>
    </div>
  );
}
