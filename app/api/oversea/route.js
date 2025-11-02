import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = (searchParams.get("category") || "restaurant").toLowerCase();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || 1000;

  // ✅ Validate required fields
  if (!lat || !lng) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 });
  }

  // ✅ Build Overpass API query (using OpenStreetMap data)
  const query = `
    [out:json][timeout:25];
    node
      ["amenity"="restaurant"]
      ["cuisine"~"${category}",i]
      (around:${radius},${lat},${lng});
    out body; 
  `.trim();

  const overpassUrl = "https://overpass-api.de/api/interpreter";

  try {
    // ✅ Fetch from Overpass
    const res = await fetch(overpassUrl, {
      method: "POST",
      body: query,
      headers: { "Content-Type": "text/plain" },
    });

    if (!res.ok) {
      throw new Error(`Overpass API returned ${res.status}`);
    }

    const data = await res.json();

    // ✅ Transform results into a simpler structure
    const results = (data.elements || []).map((el) => ({
      id: el.id,
      name: el.tags?.name || "Unnamed Restaurant",
      lat: el.lat,
      lng: el.lon,
      address: el.tags?.["addr:street"] || "Unknown address",
      cuisine: el.tags?.cuisine || category,
      image: `/restaurant/default.jpg`, // use your default restaurant image
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Overpass API Error:", error);
    return NextResponse.json({ error: "Failed to fetch Overpass data" }, { status: 500 });
  }
}
