import multer from 'multer';

// Use memory storage to keep image in buffer temporarily
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
