import { NextResponse } from 'next/server';
import Post from '@/lib/models/Post';
import connectDB from '@/lib/mongodb';

// Force route to be dynamic and skip static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  // Base URLs that don't require DB
  const baseUrls = [
    '/',
    '/blog',
    '/pages/cuba',
    '/pages/egypt',
    '/pages/esta',
    '/pages/thailand',
    '/pages/uk',
    '/pages/india'
  ];

  let urls = [...baseUrls];

  try {
    // Only try to connect to DB if we're not in build time
    if (process.env.NODE_ENV !== 'production' || process.env.VERCEL) {
      const db = await connectDB();
      
      if (db) {
        // Get all published posts
        const posts = await Post.find({ status: 'published' })
          .select('slug updatedAt')
          .lean();

        // Add blog post URLs
        const postUrls = posts.map(post => ({
          url: `/blog/${post.slug}`,
          lastModified: post.updatedAt
        }));

        urls = [...urls, ...postUrls];
      }
    }

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => {
        if (typeof url === 'string') {
          return `
            <url>
              <loc>${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
            </url>
          `;
        } else {
          return `
            <url>
              <loc>${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${url.url}</loc>
              <lastmod>${url.lastModified.toISOString()}</lastmod>
            </url>
          `;
        }
      }).join('')}
    </urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return basic sitemap with just static routes
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${baseUrls.map(url => `
        <url>
          <loc>${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      `).join('')}
    </urlset>`;

    return new NextResponse(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store'
      }
    });
  }
} 