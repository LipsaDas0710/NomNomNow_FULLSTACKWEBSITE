'use client'
import HeroSection from '@/components/HeroSection'
import InfoSection from '@/components/InfoSection'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {

  const { data: session, status } = useSession(); // ✅ define session here
  const router = useRouter();
  
  //   useEffect(() => {
  //   if (status === 'authenticated' && session?.user?.urlname) {
  //     router.replace(`/${session.user.urlname}/Home`);
  //   }
  // }, [status, session, router]);

  return (
    <main className="bg-black text-white">
      <HeroSection />
      <InfoSection />
    </main>
  )
}
