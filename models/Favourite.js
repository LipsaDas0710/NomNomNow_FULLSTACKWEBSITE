import mongoose from "mongoose";

const favourtieSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurantId: { type: String, required: true }, // External API ID
  restaurantName: { type: String, required: true }, // External API ID
  address: { type: String, required: true }, // External API ID
  category: { type: String, required: true }, // External API ID
  dis: { type: Number, required: true }, // External API ID
  lat: { type: Number, required: true }, // External API ID
  lng: { type: Number, required: true }, // External API ID
});

const Favourite = mongoose.models.Favourite || mongoose.model("Favourite", favourtieSchema);
export default Favourite;

//  name: business.name,
//     address: business.address,
//     category:business.category,
//     id:business.id,
//     dis:distance,
//     lat:business.lat,
//     lng:business.lng,