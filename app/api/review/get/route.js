// /api/review/get/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectDB } from '../../../lib/mongodb';
import Review from '@/models/Review';

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user._id || session.user.id || session.user.email;

  try {
    const reviews = await Review.find({ user: userId }).sort({ createdAt: -1 });

    const formattedReviews = reviews.map((review) => ({
      restaurantName: review.restaurantName,
      rating: review.rating,
      comment: review.comment,
      images: review.images.map((filename) => `/api/image/${filename}`), // Construct image URLs
    }));

    return NextResponse.json({ success: true, reviews: formattedReviews });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
