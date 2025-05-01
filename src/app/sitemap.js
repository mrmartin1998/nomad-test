import connectDB from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import Category from '@/lib/models/Category';

export default async function sitemap() {
  await connectDB();

  // Get all posts
  const posts = await Post.find({ status: 'published' }).select('slug updatedAt').lean();
  const postEntries = posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Get all categories
  const categories = await Category.find().select('slug updatedAt').lean();
  const categoryEntries = categories.map((category) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/category/${category.slug}`,
    lastModified: category.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Add static routes
  const routes = [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  return [...routes, ...postEntries, ...categoryEntries];
} 