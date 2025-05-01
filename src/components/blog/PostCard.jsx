'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PostCard = ({ post }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={post.image || '/images/blog-placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover rounded-t-xl"
          />
        </div>
        <div className="card-body">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          <h2 className="card-title text-xl font-bold mb-2">
            {post.title}
          </h2>
          <p className="text-gray-600 line-clamp-3">
            {post.metaDescription}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags?.map((tag, index) => (
              <span
                key={index}
                className="badge badge-outline text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard; 