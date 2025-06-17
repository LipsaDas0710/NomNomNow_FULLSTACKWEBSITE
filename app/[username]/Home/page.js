// import UserHomeClient from '@/components/UserHomeClient';
// import { connectDB } from '../../lib/mongodb';
// import User from '@/models/user';

// export default async function Home({ params }) {
//   await connectDB();

//   if (!params || !params.username) {
//     return <div>Invalid route.</div>;
//   }

//   const urlname = params.username.toLowerCase(); // sanitize input
//   const user = await User.findOne({ urlname });  // ✅ user declared properly here

//   if (!user) {
//     return <div>User not found.</div>;
//   }

//   return (
//     <UserHomeClient 
//       username={user.username} 
//       userId={user._id.toString()} 
//     />
//   );
// }


import UserHomeClient from '@/components/UserHomeClient';
import {connectDB} from '../../lib/mongodb'; // your DB connection utility
import User from '@/models/user';       // your Mongoose model

export default async function Home({ params }) {
  await connectDB(); // ensure DB is connected

  const username = params.urlname;
  const user = await User.findOne({ username });

  if (!user) {
    return <div>User not found.</div>;
  }

  // Pass user data to client component
  return <UserHomeClient username={username} userId={user._id.toString()}  />;
}