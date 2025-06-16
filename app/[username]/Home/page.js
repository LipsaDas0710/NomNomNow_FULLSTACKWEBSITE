import UserHomeClient from '@/components/UserHomeClient';
import {connectDB} from '../../lib/mongodb'; // your DB connection utility
import User from '@/models/user';       // your Mongoose model

export default async function Home({ params }) {
  await connectDB(); // ensure DB is connected

  const username = params.username;
  const user = await User.findOne({ username });

  if (!user) {
    return <div>User not found.</div>;
  }

  // Pass user data to client component
  return <UserHomeClient username={username} userId={user._id.toString()}  />;
}
 