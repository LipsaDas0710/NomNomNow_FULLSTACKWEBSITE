// import { MongoClient, GridFSBucket } from 'mongodb';

// let bucket;

// export async function connectToGridFS() {
//   if (!bucket) {
//     const client = await MongoClient.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const db = client.db(); // your DB name is pulled from URI
//     bucket = new GridFSBucket(db, { bucketName: 'reviewImages' });
//   }

//   return bucket;
// }


import { MongoClient, GridFSBucket } from 'mongodb';

let client;
let bucket;

export async function connectToGridFS() {
  if (!bucket) {
    try {
      // Create new client if it doesn't exist
      if (!client) {
        client = new MongoClient(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        await client.connect();
        console.log("MongoDB client connected for GridFS");
      }
      
      const db = client.db(); // Uses database name from URI
      bucket = new GridFSBucket(db, { bucketName: 'uploads' });
      console.log("GridFS bucket initialized");
    } catch (error) {
      console.error("GridFS connection error:", error);
      throw error;
    }
  }
  
  return bucket;
}

// Optional: Function to retrieve images
export async function getImageFromGridFS(filename) {
  try {
    const bucket = await connectToGridFS();
    return bucket.openDownloadStreamByName(filename);
  } catch (error) {
    console.error("Error retrieving image:", error);
    throw error;
  }
}

// Optional: Function to delete images
export async function deleteImageFromGridFS(filename) {
  try {
    const bucket = await connectToGridFS();
    const files = await bucket.find({ filename }).toArray();
    
    if (files.length > 0) {
      await bucket.delete(files[0]._id);
      console.log("Image deleted:", filename);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}