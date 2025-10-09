'use client';

import { useState, useEffect } from 'react';

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalCategories: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [postsRes, categoriesRes] = await Promise.all([
        fetch('/api/blog/posts'),
        fetch('/api/blog/categories')
      ]);

      const postsData = await postsRes.json();
      const categoriesData = await categoriesRes.json();

      if (postsRes.ok && categoriesRes.ok) {
        const posts = postsData.posts || [];
        const publishedPosts = posts.filter(post => post.status === 'published');
        const draftPosts = posts.filter(post => post.status === 'draft');

        setStats({
          totalPosts: posts.length,
          publishedPosts: publishedPosts.length,
          draftPosts: draftPosts.length,
          totalCategories: categoriesData.length || 0,
          recentActivity: posts.slice(0, 5) // Last 5 posts
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="skeleton h-4 w-20 mb-2"></div>
              <div className="skeleton h-8 w-16 mb-2"></div>
              <div className="skeleton h-3 w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      description: 'All blog posts',
      icon: '📝',
      color: 'text-primary'
    },
    {
      title: 'Published',
      value: stats.publishedPosts,
      description: 'Live posts',
      icon: '✅',
      color: 'text-success'
    },
    {
      title: 'Drafts',
      value: stats.draftPosts,
      description: 'Work in progress',
      icon: '📄',
      color: 'text-warning'
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      description: 'Content categories',
      icon: '🏷️',
      color: 'text-info'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-base-content/70">
                    {stat.title}
                  </h3>
                  <p className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-base-content/60 mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className="text-3xl opacity-80">
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title">Recent Activity</h3>
          {stats.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.map((post) => (
                <div key={post._id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`badge ${post.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                      {post.status}
                    </div>
                    <span className="font-medium">{post.title}</span>
                  </div>
                  <span className="text-sm text-base-content/60">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-base-content/60">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}
