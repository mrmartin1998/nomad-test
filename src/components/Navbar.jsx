'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close dropdown when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const visaOptions = [
    { icon: "🇺🇸", text: "ESTA Estados Unidos", href: "/pages/us-esta-visa-form" },
    { icon: "🇨🇷", text: "Visa Costa Rica", href: "/pages/costa-rica-form" },
    { icon: "🇮🇳", text: "Visa de turista de India", href: "/pages/india" },
    { icon: "🇨🇺", text: "Visa para Cuba", href: "/pages/cuba" },
    { icon: "🇬🇧", text: "Visa Reino Unido", href: "/pages/uk" },
    { icon: "🇹🇭", text: "Visa Tailandia", href: "/pages/thailand" },
    { icon: "🇪🇬", text: "Visa Egipto", href: "/pages/egypt" },
  ];

  const mainNavItems = [
    { text: "Obtener mi visa", href: "#", hasDropdown: true },
    { text: "Viaje con seguridad", href: "/seguridad", hasDropdown: false },
  ];

  const isActive = (href) => {
    if (href === '#') return false;
    if (href === '/' && pathname === '/') return true;
    return pathname.startsWith(href);
  };

  return (
    <div className="navbar container mx-auto px-4">
      <div className="flex-1">
        <Link href="/" className={`flex items-center ${isActive('/') ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}>
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
      <div className="flex-none gap-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Obtener mi visa dropdown */}
          <div className="relative">
            <button
              className={`flex items-center gap-1 text-base transition-colors duration-200 ${
                isDropdownOpen ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            >
              Obtener mi visa
              <svg
                className={`w-4 h-4 transition-transform duration-200 ease-in-out ${isDropdownOpen ? 'rotate-180 text-primary' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={`absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 transform transition-all duration-200 ease-in-out origin-top ${
                isDropdownOpen 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
              }`}
            >
              {visaOptions.map((option, index) => (
                <Link
                  key={index}
                  href={option.href}
                  className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-all duration-200 hover:pl-6 group ${
                    isActive(option.href)
                      ? 'text-primary bg-primary/5 pl-6'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  <span className={`text-xl transform transition-transform duration-200 ${isActive(option.href) ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {option.icon}
                  </span>
                  <span className="text-sm">{option.text}</span>
                  {isActive(option.href) && (
                    <span className="ml-auto text-primary">•</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <Link 
            href="/seguridad" 
            className={`text-base transition-colors duration-200 ${
              isActive('/seguridad')
                ? 'text-primary font-medium'
                : 'text-gray-700 hover:text-primary'
            }`}
          >
            Viaje con seguridad
          </Link>
        </div>
        
        {/* Language and Currency (desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          <button className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-200">ES</button>
          <button className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-200">€ EUR</button>
        </div>

        {/* Login button (desktop) */}
        <Link 
          href="/login" 
          className={`hidden lg:inline-flex btn btn-sm transition-all duration-200 hover:scale-105 ${
            isActive('/login') ? 'btn-primary' : 'btn-outline'
          }`}
        >
          Iniciar sesión
        </Link>

        {/* Mobile menu button */}
        <div className="dropdown dropdown-end lg:hidden">
          <label 
            tabIndex={0} 
            className={`btn btn-ghost btn-square transition-colors duration-200 ${isMobileMenuOpen ? 'bg-primary/10' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul 
            tabIndex={0} 
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 transform transition-all duration-200 ease-in-out ${
              isMobileMenuOpen 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
            }`}
          >
            {/* Mobile Visa Options */}
            {visaOptions.map((option, index) => (
              <li key={index}>
                <Link 
                  href={option.href} 
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isActive(option.href)
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-primary/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={`transform transition-transform duration-200 ${isActive(option.href) ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {option.icon}
                  </span>
                  <span className="text-sm">{option.text}</span>
                  {isActive(option.href) && (
                    <span className="ml-auto text-primary">•</span>
                  )}
                </Link>
              </li>
            ))}
            <li><hr className="my-2" /></li>
            <li>
              <Link 
                href="/seguridad" 
                className={`transition-all duration-200 ${
                  isActive('/seguridad')
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-primary/5'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Viaje con seguridad
              </Link>
            </li>
            <li><hr className="my-2" /></li>
            <li>
              <button className="text-left hover:bg-primary/5 transition-all duration-200">ES</button>
            </li>
            <li>
              <button className="text-left hover:bg-primary/5 transition-all duration-200">€ EUR</button>
            </li>
            <li><hr className="my-2" /></li>
            <li>
              <Link 
                href="/login" 
                className={`transition-all duration-200 ${
                  isActive('/login')
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-primary/5'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 