import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // List all blobs with the 'blog/' prefix
    const { blobs } = await list({
      prefix: 'blog/',
      limit: 100
    });

    // Format the response
    const images = blobs.map(blob => ({
      url: blob.url,
      filename: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt
    }));

    // Sort by upload date (newest first)
    images.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

    return NextResponse.json({ images });

  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}
