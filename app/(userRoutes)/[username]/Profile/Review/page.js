"use client";

import { useEffect, useState } from "react";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const fetchReviews = async () => {
    const res = await fetch("/api/review/get");
    const json = await res.json();
    if (json.success) {
      setReviews(json.reviews);
    } else {
      console.error("Failed to fetch reviews", json.error);
    }
  };
  fetchReviews();
}, []);


  return (
    <div className="flex flex-col items-center justify-center mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">Your Reviews</h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
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

