import UserHomeClient from '@/components/UserHomeClient';
import {connectDB} from '../../lib/mongodb'; // your DB connection utility
import User from '@/models/user';       // your Mongoose model

export default async function Home({ params }) {
  await connectDB(); // ensure DB is connected

  // Since your folder is named [username], the param will be params.username
  // But you're redirecting with urlname, so you need to search by urlName field
  const urlname = params.username; // This gets the dynamic route parameter
  
  // Search by urlName field in your database (not username field)
  const user = await User.findOne({ urlName: urlname });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">User not found</h1>
          <p className="text-gray-600 mt-2">No user found with URL: {urlname}</p>
        </div>
      </div>
    );
  }

  // Pass user data to client component
  return (
    <UserHomeClient 
      username={user.username} // Pass the actual username from DB
      userId={user._id.toString()} 
      urlName={user.urlName} // Also pass urlName if needed
    />
  );
}