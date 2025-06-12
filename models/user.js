// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: false, // not required if using Google only
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true, // avoids duplicate users
//   },
//   password: {
//     type: String,
//     required: false, // optional for Google-auth users
//   },
//   provider: {
//     type: String,
//     default: 'credentials', // or 'google' if signed in with Google
//   }
// }, { timestamps: true });

// export default mongoose.models.User || mongoose.model('User', userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Google users won't have one
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

