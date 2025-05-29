import Post from '@/lib/models/Post';
import connectDB from '@/lib/mongodb';
import Category from '@/lib/models/Category';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap() {
  // Base URLs that don't require DB
  const baseUrls = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pages/cuba`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pages/egypt`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pages/esta`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pages/thailand`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pages/uk`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pages/india`,
      lastModified: new Date(),
    }
  ];

  // Only try to get dynamic blog posts in production
  if (process.env.NODE_ENV === 'production') {
    try {
      const db = await connectDB();
      if (db) {
        const posts = await Post.find({ status: 'published' }).select('slug updatedAt').lean();
        const postUrls = posts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt,
        }));

        // Get all categories
        const categories = await Category.find().select('slug updatedAt').lean();
        const categoryEntries = categories.map((category) => ({
          url: `${baseUrl}/blog/category/${category.slug}`,
          lastModified: category.updatedAt || new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        }));

        return [...baseUrls, ...postUrls, ...categoryEntries];
      }
    } catch (error) {
      console.error('Error fetching posts for sitemap:', error);
    }
  }

  // Get all posts
  const posts = await Post.find({ status: 'published' }).select('slug updatedAt').lean();
  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Get all categories
  const categories = await Category.find().select('slug updatedAt').lean();
  const categoryEntries = categories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.slug}`,
    lastModified: category.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Add static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  return [...routes, ...postEntries, ...categoryEntries];
} 