import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "restaurant"; // fallback
  const radius = parseFloat(searchParams.get("radius")) || 5; // in km
  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing lat or lng" }, { status: 400 });
  }

  // Calculate bounding box
  const radiusInDegrees = radius / 111; // rough km to degrees
  const left = lng - radiusInDegrees;
  const right = lng + radiusInDegrees;
  const top = lat + radiusInDegrees;
  const bottom = lat - radiusInDegrees; 

  // Dynamically filter cuisine if category is provided
  const cuisineFilter = category
    ? `["amenity"="restaurant"]["cuisine"="${category}"]`
    : `["amenity"="restaurant"]`;

  // const query = `
  // [out:json][timeout:25];
  // (
  //   node["amenity"="restaurant"]["cuisine"="${category}"](${bottom},${left},${top},${right});
  //   way["amenity"="restaurant"]["cuisine"="${category}"](${bottom},${left},${top},${right});
  //   relation["amenity"="restaurant"]["cuisine"="${category}"](${bottom},${left},${top},${right});
  // );
  // out center;`;

  const query = `
[out:json][timeout:25];
(
  node["amenity"="restaurant"]["cuisine"~"${category}"](${bottom},${left},${top},${right});
  way["amenity"="restaurant"]["cuisine"~"${category}"](${bottom},${left},${top},${right});
  relation["amenity"="restaurant"]["cuisine"~"${category}"](${bottom},${left},${top},${right});
);
out center;
`;



  const url = "https://overpass-api.de/api/interpreter";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ data: query }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from Overpass" }, { status: res.status });
    }

    const data = await res.json();

    // Map Overpass elements to simpler format
    const places = data.elements.map((el) => ({
      id: el.id,
      name: el.tags?.name || "Unnamed",
      cuisine: el.tags?.cuisine || "unknown",
      lat: el.lat || el.center?.lat,
      lon: el.lon || el.center?.lon,
      tags: el.tags || {},
    }));

    return NextResponse.json({ places });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
