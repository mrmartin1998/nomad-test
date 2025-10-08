'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // Add client-side hydration check
  const mobileMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsUserMenuOpen(false);
    // Close mobile menu when route changes
    if (mobileMenuRef.current) {
      mobileMenuRef.current.removeAttribute('open');
    }
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        mobileMenuRef.current.removeAttribute('open');
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const visaOptions = [
    { icon: "🇺🇸", text: "ESTA Estados Unidos", href: "/pages/us-esta-visa-form" },
    { icon: "🇨🇷", text: "Visa Costa Rica", href: "/pages/costa-rica-form" },
    { icon: "🇮🇳", text: "Visa de turista de India", href: "/pages/india" },
    { icon: "🇨🇺", text: "Visa para Cuba", href: "/pages/cuba" },
    { icon: "🇬🇧", text: "Visa Reino Unido", href: "/pages/uk" },
    { icon: "🇹🇭", text: "Visa Tailandia", href: "/pages/thailand" },
    { icon: "🇪🇬", text: "Visa Egipto", href: "/pages/egypt" },
  ];

  const isActive = (href) => {
    if (href === '#') return false;
    if (href === '/' && pathname === '/') return true;
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  // Don't render auth-related content until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="navbar container mx-auto px-4">
        <div className="flex-1">
          <Link href="/" className="flex items-center">
            <div className="hidden md:block">
              <Image
                src="/assets/brand/nomad-logo-horizontal.png"
                alt="Nomad"
                width={120}
                height={32}
                priority
              />
            </div>
            <div className="block md:hidden">
              <Image
                src="/assets/brand/nomad-icon-dark.png"
                alt="Nomad"
                width={32}
                height={32}
                priority
              />
            </div>
          </Link>
        </div>
        <div className="flex-none">
          <div className="skeleton w-24 h-8 rounded"></div>
        </div>
      </div>
    );
  }

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
              src="/assets/brand/nomad-icon-dark.png"
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
              style={{ outline: 'none' }}
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
                  style={{ outline: 'none' }}
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
            style={{ outline: 'none' }}
          >
            Viaje con seguridad
          </Link>
        </div>
        
        {/* Language and Currency (desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          <button 
            className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-200"
            style={{ outline: 'none' }}
          >
            ES
          </button>
          <button 
            className="btn btn-ghost btn-sm hover:bg-primary/10 transition-colors duration-200"
            style={{ outline: 'none' }}
          >
            € EUR
          </button>
        </div>

        {/* Authentication Section (desktop) */}
        {status === 'loading' ? (
          <div className="hidden lg:flex items-center">
            <div className="skeleton w-8 h-8 rounded-full"></div>
          </div>
        ) : session ? (
          /* Authenticated User Menu */
          <div className="hidden lg:flex items-center relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 hover:bg-primary/5 rounded-lg p-2 transition-colors duration-200"
              style={{ outline: 'none' }}
            >
              <div className="avatar">
                <div className="w-8 h-8 rounded-full ring-2 ring-primary/20">
                  <Image
                    src={session.user?.image || '/assets/default-avatar.png'}
                    alt={session.user?.name || 'Usuario'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {session.user?.name?.split(' ')[0] || 'Usuario'}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* User Dropdown Menu */}
            <div className={`absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 transform transition-all duration-200 ease-in-out origin-top-right ${
              isUserMenuOpen 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
            }`}>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                <p className="text-sm text-gray-500">{session.user?.email}</p>
              </div>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                <span className="text-sm">Mi Panel</span>
              </Link>
              <Link
                href="/applications"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span className="text-sm">Mis Solicitudes</span>
              </Link>
              <hr className="my-2" />
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-200 w-full text-left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15.75m3-7.5l3 3m0 0l-3 3m3-3H9" />
                </svg>
                <span className="text-sm">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login button when not authenticated */
          <Link 
            href="/login" 
            className={`hidden lg:inline-flex btn btn-sm transition-all duration-200 hover:scale-105 ${
              isActive('/login') ? 'btn-primary' : 'btn-outline'
            }`}
            style={{ outline: 'none' }}
          >
            Iniciar sesión
          </Link>
        )}

        {/* Mobile menu button */}
        <details ref={mobileMenuRef} className="dropdown dropdown-end lg:hidden">
          <summary className="btn btn-ghost btn-square transition-colors duration-200" style={{ outline: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <ul className="dropdown-content menu menu-sm bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {/* Mobile Authentication Section */}
            {session ? (
              <>
                <li className="menu-title">
                  <div className="flex items-center gap-2 px-0">
                    <div className="avatar">
                      <div className="w-6 h-6 rounded-full">
                        <Image
                          src={session.user?.image || '/assets/default-avatar.png'}
                          alt={session.user?.name || 'Usuario'}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium">{session.user?.name}</span>
                  </div>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    Mi Panel
                  </Link>
                </li>
                <li>
                  <Link href="/applications" className="text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    Mis Solicitudes
                  </Link>
                </li>
                <li><hr className="my-2" /></li>
                <li>
                  <button onClick={handleSignOut} className="text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15.75m3-7.5l3 3m0 0l-3 3m3-3H9" />
                    </svg>
                    Cerrar Sesión
                  </button>
                </li>
                <li><hr className="my-2" /></li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15.75m3-7.5l3 3m0 0l-3 3m3-3H9" />
                    </svg>
                    Iniciar sesión
                  </Link>
                </li>
                <li><hr className="my-2" /></li>
              </>
            )}

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
                  style={{ outline: 'none' }}
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
                style={{ outline: 'none' }}
              >
                Viaje con seguridad
              </Link>
            </li>
            <li><hr className="my-2" /></li>
            <li>
              <button 
                className="text-left hover:bg-primary/5 transition-all duration-200"
                style={{ outline: 'none' }}
              >
                ES
              </button>
            </li>
            <li>
              <button 
                className="text-left hover:bg-primary/5 transition-all duration-200"
                style={{ outline: 'none' }}
              >
                € EUR
              </button>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Navbar;