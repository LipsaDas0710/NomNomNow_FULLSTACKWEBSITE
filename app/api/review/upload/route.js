import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectDB } from '../../../lib/mongodb';
import Review from '@/models/Review';
import { connectToGridFS } from '../../../lib/gridfs';
import { Readable } from 'stream';

export async function POST(req) {
  try {
    console.log("API hit: /api/review/upload");
    
    // Connect to database
    await connectDB();
    console.log("DB connected.");
    
    // Check authentication
    const session = await getServerSession(authOptions);
    console.log("Session:", session);
    console.log("Session user:", session?.user);
    
    if (!session || !session.user) {
      console.error("User not authenticated");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user ID - adjust based on your session structure
    const userId = session.user._id || session.user.id || session.user.email;
    console.log("User ID:", userId);
    
    if (!userId) {
      console.error("User ID not found in session");
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    // Parse form data
    const formData = await req.formData();
    console.log("Form data received");
    
    const reviewText = formData.get('reviewText');
    const rating = Number(formData.get('rating'));
    const restaurantId = formData.get('restaurantId');
    const restaurantName = formData.get('restaurantName');
    
    // Get all image files - formData.getAll() returns array of all files with same name
    const imageFiles = formData.getAll('images');
    console.log(`Received ${imageFiles.length} image files`);
    
    console.log({ reviewText, rating, restaurantId,restaurantName, imageCount: imageFiles.length });

    let uploadedImageFilenames = [];

    // Handle multiple image uploads
    if (imageFiles.length > 0) {
      try {
        console.log("Processing multiple image uploads...");
        
        // Connect to GridFS
        const bucket = await connectToGridFS();
        
        // Process each image
        for (let i = 0; i < imageFiles.length; i++) {
          const imageFile = imageFiles[i];
          
          // Skip if file is empty or not actually a file
          if (!imageFile || imageFile.size === 0 || typeof imageFile === 'string') {
            console.log(`Skipping empty file at index ${i}`);
            continue;
          }
          
          console.log(`Processing image ${i + 1}/${imageFiles.length}: ${imageFile.name}`);
          
          // Generate unique filename
          const imageFilename = `${Date.now()}-${i}-${imageFile.name}`;
          
          // Convert File to buffer
          const buffer = Buffer.from(await imageFile.arrayBuffer());
          
          // Create readable stream from buffer
          const readableStream = new Readable();
          readableStream.push(buffer);
          readableStream.push(null);
          
          // Upload to GridFS
          await new Promise((resolve, reject) => {
            const uploadStream = bucket.openUploadStream(imageFilename, {
              metadata: {
                originalName: imageFile.name,
                contentType: imageFile.type,
                uploadDate: new Date(),
                userId: session.user._id,
                reviewIndex: i // Track which image this is in the review
              }
            });
            
            uploadStream.on('finish', () => {
              console.log(`Image ${i + 1} uploaded successfully:`, imageFilename);
              uploadedImageFilenames.push(imageFilename);
              resolve();
            });
            
            uploadStream.on('error', (error) => {
              console.error(`GridFS upload error for image ${i + 1}:`, error);
              reject(error);
            });
            
            readableStream.pipe(uploadStream);
          });
        }
        
        console.log(`Successfully uploaded ${uploadedImageFilenames.length} images`);
        
      } catch (imageError) {
        console.error("Image processing error:", imageError);
        
        // If some images were uploaded before the error, you might want to clean them up
        // or continue with partial upload - depends on your requirements
        
        return NextResponse.json({ 
          error: "Failed to upload images: " + imageError.message 
        }, { status: 500 });
      }
    }

    // Create and save review with multiple images
    const newReview = new Review({
      user: userId,
      restaurantId,
      restaurantName,
      rating,
      comment: reviewText,
      images: uploadedImageFilenames, // Array of filenames
      createdAt: new Date()
    });
    
    console.log("Review object:", newReview);
    console.log("Images saved:", uploadedImageFilenames);
    
    await newReview.save();
    console.log("Review saved:", newReview._id);
    
    return NextResponse.json({
      success: true,
      message: 'Review uploaded successfully!',
      reviewId: newReview._id,
      imagesUploaded: uploadedImageFilenames.length,
      imageFilenames: uploadedImageFilenames
    }, { status: 200 });
    
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ 
      error: "Internal server error: " + error.message 
    }, { status: 500 });
  }
}