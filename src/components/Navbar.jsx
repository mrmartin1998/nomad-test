'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const visaOptions = [
    { icon: "🇺🇸", text: "ESTA Estados Unidos", href: "/pages/us-esta-visa-form" },
    { icon: "🇨🇷", text: "Visa Costa Rica", href: "/pages/costa-rica-form" },
    { icon: "🇮🇳", text: "Visa de turista de India", href: "/pages/india" },
    { icon: "🇨🇺", text: "Visa para Cuba", href: "/pages/cuba" },
    { icon: "🇬🇧", text: "Visa Reino Unido", href: "/pages/uk" },
    { icon: "🇹🇭", text: "Visa Tailandia", href: "/pages/thailand" },
    { icon: "🇪🇬", text: "Visa Egipto", href: "/pages/egypt" },
  ];

  return (
    <div className="navbar container mx-auto px-4">
      <div className="flex-1">
        <Link href="/" className="flex items-center">
          {/* Desktop Logo */}
          <div className="hidden md:block">
            <Image
              src="/assets/brand/nomad-logo-horizontal.png"
              alt="Nomad"
              width={120}
              height={32}
              priority
            />
          </div>
          {/* Mobile Logo */}
          <div className="block md:hidden">
            <Image
              src="/assets/brand/nomad-icon-light.png"
              alt="Nomad"
              width={32}
              height={32}
              priority
            />
          </div>
        </Link>
      </div>
      {/* Rest of the navbar code remains the same */}
      <div className="flex-none gap-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Obtener mi visa dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-base text-gray-700 hover:text-primary"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            >
              Obtener mi visa
              <svg
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                {visaOptions.map((option, index) => (
                  <Link
                    key={index}
                    href={option.href}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary transition-colors"
                  >
                    <span className="text-xl">{option.icon}</span>
                    <span className="text-sm">{option.text}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
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
            {/* Mobile Visa Options */}
            {visaOptions.map((option, index) => (
              <li key={index}>
                <Link href={option.href} className="flex items-center gap-2">
                  <span>{option.icon}</span>
                  <span className="text-sm">{option.text}</span>
                </Link>
              </li>
            ))}
            <li><hr className="my-2" /></li>
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
  );
};

export default Navbar; 