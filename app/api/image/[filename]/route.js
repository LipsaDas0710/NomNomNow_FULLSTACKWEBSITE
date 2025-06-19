// /api/image/[filename]/route.js
import { connectToGridFS } from '../../../lib/gridfs';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { filename } = params;

  try {
    const bucket = await connectToGridFS();
    const file = await bucket.find({ filename }).toArray();

    if (!file || file.length === 0) {
      return new NextResponse('File not found', { status: 404 });
    }

    const stream = bucket.openDownloadStreamByName(filename);
    const headers = new Headers();
    headers.set('Content-Type', file[0].contentType || 'image/jpeg');

    return new NextResponse(stream, { headers });
  } catch (error) {
    return new NextResponse('Failed to load image', { status: 500 });
  }
}
