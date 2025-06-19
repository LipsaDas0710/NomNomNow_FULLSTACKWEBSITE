// // import nextConnect from 'next-connect';
// // import upload from '@/lib/multerMemory';
// // import { connectToGridFS } from '@/lib/gridfs';
// // import mongoose from 'mongoose';
// // import Review from '@/models/Review';
// // import { getServerSession } from 'next-auth'; // Adjust for your session config
// // import { authOptions } from '../auth/[...nextauth]'; // adjust path

// // const handler = nextConnect();

// // handler.use(upload.single('image')); // parse form-data with image

// // handler.post(async (req, res) => {
// //   const session = await getServerSession(req, res, authOptions);
// //   if (!session) return res.status(401).json({ error: 'Unauthorized' });

// //   const { reviewText, rating, restaurantId } = req.body;
// //   const userId = session.user._id;

// //   const bucket = await connectToGridFS();

// //   // Save image to GridFS
// //   let imageId = null;
// //   if (req.file) {
// //     const uploadStream = bucket.openUploadStream(req.file.originalname, {
// //       contentType: req.file.mimetype,
// //     });

// //     uploadStream.end(req.file.buffer);

// //     uploadStream.on('finish', async (uploadedFile) => {
// //       imageId = uploadedFile._id;

// //       const newReview = new Review({
// //         user: new mongoose.Types.ObjectId(userId),
// //         restaurantId,
// //         rating,
// //         comment: reviewText,
// //         images: [imageId.toString()],
// //       });

// //       await newReview.save();
// //       return res.status(201).json({ message: 'Review saved with image in DB' });
// //     });
// //   } else {
// //     // No image uploaded
// //     const newReview = new Review({
// //       user: new mongoose.Types.ObjectId(userId),
// //       restaurantId,
// //       rating,
// //       comment: reviewText,
// //       images: [],
// //     });

// //     await newReview.save();
// //     return res.status(201).json({ message: 'Review saved without image' });
// //   }
// // });

// // export const config = {
// //   api: {
// //     bodyParser: false, // Important for multer to parse form-data
// //   },
// // };

// // export default handler;


// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../auth/[...nextauth]/route';
// import {connectDB} from '../../../lib/mongodb';
// import Review from '@/models/Review';


// import { GridFsStorage } from 'multer-gridfs-storage';
// import mongoose from 'mongoose';

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // Set up multer GridFS storage
// const storage = new GridFsStorage({
//   url: process.env.MONGODB_URI,
//   file: (req, file) => {
//     return {
//       filename: `${Date.now()}-${file.originalname}`,
//       bucketName: 'uploads',
//     };
//   },
// });
// const upload = multer({ storage });

// export async function POST(req) {
//   try {
//     console.log("API hit: /api/review/upload");

//     await connectDB();
//     console.log("DB connected.");



//     const session = await getServerSession({ req }, authOptions);

//     console.log("Session:", session);

//     if (!session) {
//       console.error("User not authenticated");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     return await new Promise((resolve, reject) => {
//       upload.single('image')(req, {}, async (err) => {
//         if (err) {
//           console.error("Upload error:", err);
//           return reject(
//             NextResponse.json({ error: err.message }, { status: 500 })
//           );
//         }
//         console.log("Multer middleware finished:", req.file);

//         try {
//           const formData = await req.formData();
//          console.log("Form data:", Object.fromEntries(formData.entries()));

//           const reviewText = formData.get('reviewText');
//           const rating = Number(formData.get('rating'));
//           const restaurantId = formData.get('restaurantId');

//           console.log({ reviewText, rating, restaurantId });


//           const newReview = new Review({
//             user: session.user._id,
//             restaurantId,
//             rating,
//             comment: reviewText,
//             images: req.file ? [req.file.filename] : [],
//           });
//           console.log("Review object:", newReview);

//           await newReview.save();
//           console.log("Review saved:", newReview._id);

//           resolve(NextResponse.json({
//             success: true,
//             message: 'Review uploaded!',
//             reviewId: newReview._id
//           }, { status: 200 }));
//         } catch (e) {
//           console.error("Inner error:", e);
//           reject(NextResponse.json({ error: e.message }, { status: 500 }));
//         }
//       });
//     });
//   } catch (err) {
//     console.error("Outer error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }


// // export async function POST(req) {
// //   await connectDB();

// //   const session = await getServerSession(authOptions);
// //   if (!session) {
// //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// //   }

// //   return new Promise((resolve, reject) => {
// //     upload.single('image')(req, {}, async (err) => {
// //       if (err) {
// //         reject(NextResponse.json({ error: err.message }, { status: 500 }));
// //         return;
// //       }

// //       try {
// //         const formData = await req.formData();
// //         const reviewText = formData.get('reviewText');
// //         const rating = formData.get('rating');
// //         const restaurantId = formData.get('restaurantId');

// //         const newReview = new Review({
// //           user: session.user._id,
// //           restaurantId,
// //           rating,
// //           comment: reviewText,
// //           images: [req.file.filename], // Saved GridFS filename
// //         });

// //         await newReview.save();
// //         resolve(NextResponse.json({ success: true, message: 'Review uploaded!' }));
// //       } catch (error) {
// //         reject(NextResponse.json({ error: error.message }, { status: 500 }));
// //       }
// //     });
// //   });
// // }


import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectDB } from '../../../lib/mongodb';
import Review from '@/models/Review';
import { connectToGridFS } from '../../../lib/gridfs';
import { Readable } from 'stream';

// Remove any Multer imports - they cause issues in Next.js App Router

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
    const imageFile = formData.get('image');
    
    console.log({ reviewText, rating, restaurantId, hasImage: !!imageFile });

    let imageFilename = null;

    // Handle image upload if present
    if (imageFile && imageFile.size > 0) {
      try {
        console.log("Processing image upload...");
        
        // Connect to GridFS
        const bucket = await connectToGridFS();
        
        // Generate unique filename
        imageFilename = `${Date.now()}-${imageFile.name}`;
        
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
              userId: session.user._id
            }
          });
          
          uploadStream.on('finish', () => {
            console.log("Image uploaded successfully:", imageFilename);
            resolve();
          });
          
          uploadStream.on('error', (error) => {
            console.error("GridFS upload error:", error);
            reject(error);
          });
          
          readableStream.pipe(uploadStream);
        });
        
      } catch (imageError) {
        console.error("Image processing error:", imageError);
        return NextResponse.json({ 
          error: "Failed to upload image: " + imageError.message 
        }, { status: 500 });
      }
    }

    // Create and save review
    const newReview = new Review({
      user: userId, // Use the userId we extracted above
      restaurantId,
      rating,
      comment: reviewText,
      images: imageFilename ? [imageFilename] : [],
      createdAt: new Date()
    });
    
    console.log("Review object:", newReview);
    
    await newReview.save();
    console.log("Review saved:", newReview._id);
    
    return NextResponse.json({
      success: true,
      message: 'Review uploaded successfully!',
      reviewId: newReview._id,
      imageUploaded: !!imageFilename
    }, { status: 200 });
    
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ 
      error: "Internal server error: " + error.message 
    }, { status: 500 });
  }
}