


// import { connectDB } from '../../lib/mongodb';
// import User from '@/models/user';

// export async function GET() {
//   try {
//     console.log('🌐 Attempting to connect to MongoDB...');
//     await connectDB();  // This should trigger your connection logs
//     console.log('✅ Connected to DB in /api/test');

//     // Optionally, list users to check if the model works
//     const users = await User.find({});
//     console.log('📦 Users in DB:', users.length);

//     return Response.json({
//       message: '✅ MongoDB connected successfully!',
//       usersCount: users.length,
//     });
//   } catch (error) {
//     console.error('❌ Error in /api/test:', error);
//     return Response.json({ error: 'Database connection failed' }, { status: 500 });
//   }
// }

