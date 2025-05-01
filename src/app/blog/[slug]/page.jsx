import React from 'react';
import Post from '@/lib/models/Post';
import connectDB from '@/lib/mongodb';
import { notFound } from 'next/navigation';

// Make the page dynamic since content can change
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    await connectDB();
    const post = await Post.findOne({ slug: params.slug }).populate('category');
    
    if (!post) {
      return {
        title: 'Post no encontrado',
        description: 'El post que buscas no existe'
      };
    }

    return {
      title: post.title,
      description: post.meta_description,
      openGraph: {
        title: post.title,
        description: post.meta_description,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        images: post.image ? [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ] : [],
        ...(post.category && {
          tags: [post.category.name, ...(post.tags || [])]
        })
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.meta_description,
        ...(post.image && { images: [post.image] })
      },
      alternates: {
        canonical: `/blog/${post.slug}`
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'Hubo un error al cargar el post'
    };
  }
}

async function getPost(slug) {
  try {
    await connectDB();
    const post = await Post.findOne({ slug }).populate('category');
    if (!post) return null;
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  // Add JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author
    },
    ...(post.category && {
      articleSection: post.category.name
    }),
    keywords: post.tags?.join(', ')
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span>{new Date(post.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span>·</span>
            <span>{post.author}</span>
            {post.category && (
              <>
                <span>·</span>
                <span>{post.category.name}</span>
              </>
            )}
          </div>
        </header>

        {post.image && (
          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
        )}

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-4 border-t">
            <h2 className="text-xl font-semibold mb-4">Etiquetas:</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
} 