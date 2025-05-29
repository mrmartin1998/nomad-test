import { NextResponse } from 'next/server';
import Post from '@/lib/models/Post';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await connectDB();
    
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

    // Only add dynamic URLs if DB is connected
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
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return basic sitemap on error
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    </urlset>`;

    return new NextResponse(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });
  }
} 