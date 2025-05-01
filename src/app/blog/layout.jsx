import React from 'react';

export const metadata = {
  title: 'Blog | Nomad',
  description: 'Explora nuestros artículos sobre visas y viajes',
  openGraph: {
    title: 'Blog | Nomad',
    description: 'Explora nuestros artículos sobre visas y viajes',
    type: 'website',
  },
};

export default function BlogLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-50">
      {children}
    </main>
  );
} 