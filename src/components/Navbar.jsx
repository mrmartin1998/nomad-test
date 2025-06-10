import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => (
  <div className="w-full bg-white border-b border-gray-200">
    <div className="navbar container mx-auto px-4">
      <div className="flex-1">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/visapass-logo.svg"
            alt="Visapass"
            width={120}
            height={32}
            priority
          />
        </Link>
      </div>
      <div className="flex-none gap-4">
        {/* Placeholder for dropdown menus */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="#" className="text-base text-gray-700 hover:text-primary">
            Obtener mi visa
          </Link>
          <Link href="#" className="text-base text-gray-700 hover:text-primary">
            Viaje con seguridad
          </Link>
        </div>
        
        {/* Language and Currency (desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          <button className="btn btn-ghost btn-sm">ES</button>
          <button className="btn btn-ghost btn-sm">€ EUR</button>
        </div>

        {/* Login button (desktop) */}
        <Link href="/login" className="hidden lg:inline-flex btn btn-outline btn-sm">
          Iniciar sesión
        </Link>

        {/* Mobile menu button */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="#">Obtener mi visa</Link></li>
            <li><Link href="#">Viaje con seguridad</Link></li>
            <li><hr className="my-2" /></li>
            <li><button className="text-left">ES</button></li>
            <li><button className="text-left">€ EUR</button></li>
            <li><hr className="my-2" /></li>
            <li><Link href="/login">Iniciar sesión</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar; 