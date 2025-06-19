'use client'
import { useState } from "react";
import { Star, X } from "lucide-react";
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
  const [images, setImages] = useState([]); // Changed from single image to array
  const [imagePreviews, setImagePreviews] = useState([]); // Array for previews
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_IMAGES = 5; // Set maximum number of images

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate number of images
    if (images.length + files.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} images`);
      return;
    }

    // Validate file sizes (optional - e.g., 5MB limit per file)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      alert('Some files are too large. Maximum size is 5MB per image.');
      return;
    }

    // Add new images to existing ones
    const newImages = [...images, ...files];
    setImages(newImages);

    // Create previews for new images
    const newPreviews = [...imagePreviews];
    files.forEach(file => {
      newPreviews.push(URL.createObjectURL(file));
    });
    setImagePreviews(newPreviews);
  };

  const removeImage = (index) => {
    // Remove image and its preview
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
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
    formData.append('restaurantName', name);
    
    // Append all images
    images.forEach((image, index) => {
      formData.append(`images`, image); // Use 'images' as the field name
      console.log(`Image ${index + 1} details:`, {
        name: image.name,
        size: image.size,
        type: image.type
      });
    });

    console.log("📤 Form data being sent:");
    console.log(`Number of images: ${images.length}`);
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
        
        // Reset form and clean up previews
        setReviewText('');
        setRating(0);
        setImages([]);
        // Clean up preview URLs
        imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
        setImagePreviews([]);
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

        {/* Multiple Image Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Upload Photos (Optional) - {images.length}/{MAX_IMAGES}
          </label>
          <input
            type="file"
            accept="image/*"
            multiple // Enable multiple file selection
            onChange={handleImageChange}
            disabled={images.length >= MAX_IMAGES}
            className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 disabled:file:bg-gray-400"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can select multiple images at once. Maximum {MAX_IMAGES} images, 5MB each.
          </p>
          
          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Selected Images:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-32 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <X size={16} />
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {images[index]?.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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