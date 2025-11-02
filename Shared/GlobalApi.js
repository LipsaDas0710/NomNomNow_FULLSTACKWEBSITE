// app/_utils/GlobalApi.js  (or wherever you keep it)
import axios from "axios";

// ✅ Fetch places from Overpass (OpenStreetMap)
const getPlace = (category, radius, lat, lng) =>
  axios.get("/api/oversea", {
    params: { category, radius, lat, lng },
  });

// You can keep other API calls here too (like for reviews, users, etc.)
export default {
  getPlace,
};
