// 'use client'
// import { useState } from "react";
// import { Star } from "lucide-react";
// import { useSearchParams } from 'next/navigation';

// export default function AddReviewForm() {
//   const searchParams = useSearchParams();
//   const name = searchParams.get('name');
//   const address = searchParams.get('address');
//   const id = searchParams.get('id');
//   const lat = searchParams.get('lat');
//   const lng = searchParams.get('lng');
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(0);
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('reviewText', reviewText);
//     formData.append('rating', rating);
//     formData.append('restaurantId', id); // from URL
//     if (image) formData.append('image', image);

//     console.log("📤 Submitting:", Object.fromEntries(formData.entries()));

//     try {
//       const res = await fetch('/api/review/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (res.ok) {
//         const result = await res.json();
//         alert('Review submitted!');
//         console.log(result);
//         // Optionally reset form
//         setReviewText('');
//         setRating(0);
//         setImage(null);
//         setImagePreview(null);
//       } else {
//         console.error('Error submitting review');
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//     }
//   };



//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // Send `reviewText`, `rating`, `image` to the backend
//   //   console.log({ reviewText, rating, image });
//   // };

//   return (
//     <div className="p-4 max-w-4xl mx-auto text-gray-900 dark:text-gray-100  min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Add Your Review</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
        
//         {/* Star Rating */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Rating</label>
//           <div className="flex space-x-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 onClick={() => setRating(star)}
//                 className={`cursor-pointer transition ${
//                   rating >= star ? "text-yellow-400" : "text-gray-500"
//                 }`}
//                 size={24}
//                 fill={rating >= star ? "currentColor" : "none"}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Review Text */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Your Review</label>
//           <textarea
//             className="w-full p-2 rounded dark:bg-gray-800 bg-white border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="4"
//             placeholder="Write something about the restaurant..."
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             required
//           />
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Upload a Photo</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
//           />
//           {imagePreview && (
//             <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
//           )}
//         </div>

        

//         {/* Submit */}
//         <button
//           type="submit"
//           className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
//         >
//           Submit Review
//         </button>
//       </form>
//     </div>
//   );
// }

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!reviewText.trim()) {
      alert('Please enter a review');
      setIsSubmitting(false);
      return;
    }
    if (rating === 0) {
      alert('Please select a rating');
      setIsSubmitting(false);
      return;
    }
    if (!id) {
      alert('Restaurant ID is missing');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('reviewText', reviewText.trim());
    formData.append('rating', rating.toString());
    formData.append('restaurantId', id);
    if (image) {
      formData.append('image', image);
      console.log("Image details:", {
        name: image.name,
        size: image.size,
        type: image.type
      });
    }

    console.log("📤 Form data being sent:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    try {
      console.log("🚀 Sending request to /api/review/upload");
      
      const res = await fetch('/api/review/upload', {
        method: 'POST',
        body: formData,
      });

      console.log("📥 Response status:", res.status);
      console.log("📥 Response ok:", res.ok);

      if (res.ok) {
        const result = await res.json();
        console.log("✅ Success:", result);
        alert('Review submitted successfully!');
        
        // Reset form
        setReviewText('');
        setRating(0);
        setImage(null);
        setImagePreview(null);
      } else {
        // Try to get error details
        const errorText = await res.text();
        console.error('❌ Server responded with error:', {
          status: res.status,
          statusText: res.statusText,
          body: errorText
        });
        
        let errorMessage = 'Error submitting review';
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || errorMessage;
        } catch (e) {
          // Response wasn't JSON
          console.log("Response wasn't JSON:", errorText);
        }
        
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('🔥 Network/fetch error:', error);
      alert('Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Your Review</h1>
      
      {/* Debug info */}
      <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
        <strong>Debug Info:</strong>
        <br />Restaurant ID: {id || 'Missing!'}
        <br />Name: {name || 'N/A'}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Star Rating */}
        <div>
          <label className="block mb-1 text-sm font-medium">Rating *</label>
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
          <p className="text-xs text-gray-500 mt-1">Current rating: {rating}/5</p>
        </div>

        {/* Review Text */}
        <div>
          <label className="block mb-1 text-sm font-medium">Your Review *</label>
          <textarea
            className="w-full p-2 rounded dark:bg-gray-800 bg-white border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write something about the restaurant..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium">Upload a Photo (Optional)</label>
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
          disabled={isSubmitting}
          className={`mt-4 font-semibold px-4 py-2 rounded ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}