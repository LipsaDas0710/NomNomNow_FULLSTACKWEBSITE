// export default function ReviewsPage({params}) {
//   return (
//     <div className="flex flex-col items-center justify-center mt-10">
//       <h1 className="text-2xl font-bold mb-4 text-gray-700">Your Reviews</h1>
//       <p className="text-gray-500">You haven’t written any reviews yet.</p>
//       <h2>resta name</h2>
//       <p>your rating</p>
//       <p>your review</p>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      // Replace with your real API call
      const data = [
        {
          restaurantName: "Spicy Villa",
          rating: 4.5,
          comment: "Amazing flavors and cozy vibe!",
          images: ["/api/image/1", "/api/image/2"],
        },
        {
          restaurantName: "Sushi Zen",
          rating: 5,
          comment: "Best sushi in town. Highly recommend!",
          images: [],
        },
      ];
      setReviews(data);
    };
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">Your Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">You haven’t written any reviews yet.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {review.restaurantName}
              </h2>
              <p className="text-yellow-500 font-medium">Rating: {review.rating} / 5</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{review.comment}</p>

              {review.images && review.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                  {review.images.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`Review Image ${idx + 1}`}
                      className="w-full h-40 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

