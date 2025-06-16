'use client'
import { useState } from "react";
import { Star } from "lucide-react";
import { useSearchParams } from 'next/navigation';

export default function AddReviewForm() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const address = searchParams.get('address');
  const id = searchParams.get('id');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send `reviewText`, `rating`, `image` to the backend
    console.log({ reviewText, rating, image });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto text-gray-900 dark:text-gray-100  min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Your Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Star Rating */}
        <div>
          <label className="block mb-1 text-sm font-medium">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer transition ${
                  rating >= star ? "text-yellow-400" : "text-gray-500"
                }`}
                size={24}
                fill={rating >= star ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label className="block mb-1 text-sm font-medium">Your Review</label>
          <textarea
            className="w-full p-2 rounded dark:bg-gray-800 bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write something about the restaurant..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium">Upload a Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
