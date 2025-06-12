// 'use client'
// import React from 'react'
// import { SessionProvider } from "next-auth/react"

// const Provider = () => {
//   return (
//     <div>
//         <SessionProvider>
//             {children}
//         </SessionProvider>
//     </div>
//   )
// }

// export default Provider


'use client'
import React from 'react';
import { SessionProvider } from "next-auth/react";

const Provider = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default Provider;
