import Post from '@/lib/models/Post';
import connectDB from '@/lib/mongodb';
import Category from '@/lib/models/Category';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Base URLs that don't require DB
const baseUrls = [
  {
    url: '/',
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  },
  {
    url: '/blog',
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    url: '/pages/cuba',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: '/pages/egypt',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: '/pages/esta',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: '/pages/thailand',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: '/pages/uk',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: '/pages/india',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }
];

export default function sitemap() {
  return baseUrls;
}