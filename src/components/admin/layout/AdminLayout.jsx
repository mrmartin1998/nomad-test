import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Admin Header */}
      <header className="bg-base-100 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src="/assets/brand/nomad-icon-dark.png"
                alt="Nomad Admin"
                width={32}
                height={32}
                priority
              />
              <span className="text-2xl font-bold">Panel de Administración</span>
            </Link>
            <nav className="flex gap-4">
              <Link href="/admin/posts" className="btn btn-ghost">
                Posts
              </Link>
              <Link href="/admin/categories" className="btn btn-ghost">
                Categorías
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-base-100 mt-8 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Panel de Administración - Blog</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout; 