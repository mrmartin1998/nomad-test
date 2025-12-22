'use client';

import PostsList from './PostsList';

export default function RecentPosts() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Posts</h3>
      </div>
      <PostsList limit={5} showActions={false} />
    </div>
  );
}
