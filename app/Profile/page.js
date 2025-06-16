'use client';
import React from 'react'
import { useSession } from 'next-auth/react'
import Image from "next/image";

const ProfilePage = () => {
  const {data:session}=useSession();
  return  session?.user&&(
    <div>
     <div className='md:flex '>
       {session?.user ? (
                <>
                  <Image
                    src={session.user.image || "/profilePlaceholder.png"}
                    alt="user"
                    width={100}
                    height={100}
                    onClick={()=>setProfileClick(!profileClick)}
                    className="rounded-full cursor-pointer  m-10
                    hover:border-[2px] border-blue-500 md:w-50 md:h-50"
                  />
                </>
              ) : null}
              <h2 className='md:mt-25 md:text-3xl md:ml-10'>Name:{session.user.name}</h2>
       
     </div>
        <div>
            <h2>Your fav restaurant</h2>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
        </div>
    </div>
  )
}

export default ProfilePage