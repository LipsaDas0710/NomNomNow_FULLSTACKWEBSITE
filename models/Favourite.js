import mongoose from "mongoose";

const favourtieSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurantId: { type: String, required: true }, // External API ID
  restaurantName: { type: String, required: true }, // External API ID
});

const Favourite = mongoose.models.Favourite || mongoose.model("Favourite", favourtieSchema);
export default Favourite;
