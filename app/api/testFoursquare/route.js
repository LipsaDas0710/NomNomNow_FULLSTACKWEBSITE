import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '28.6139';
  const lng = searchParams.get('lng') || '77.2090';
  const category = searchParams.get('category') || 'restaurant';

  try {
    const response = await axios.get('https://api.foursquare.com/v3/places/search', {
      headers: {
        Authorization: process.env.FOURSQUARE_API_KEY,
      },
      params: {
        ll: `${lat},${lng}`,
        query: category,
        radius: 5000,
        limit: 10,
      },
    });

    return Response.json(response.data);
  } catch (error) {
    console.error('Foursquare error:', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: 'Foursquare API failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
