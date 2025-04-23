'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="app-background">
      {/* New Hero Section */}
      <div className="min-h-screen bg-base-100 relative overflow-hidden">
        <div className="container mx-auto px-4 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Consigue tu visado
              <span className="block">sin complicaciones, sin estrés,</span>
              <span className="block italic text-primary">sin papeleos y en 48H</span>
            </h1>
            <p className="text-xl md:text-2xl text-base-content/70 mb-12">
              Tramitamos visados de turismo, nómadas digitales, estudiantes y más. 
              Servicio rápido, online y con asesoría personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg">
                <span className="mr-2">👉</span> Solicita tu visado
              </button>
              <button className="btn btn-outline btn-lg">
                Descubre si cumples los requisitos
              </button>
            </div>
          </div>
        </div>

        {/* Floating Cards Container */}
        <div className="relative mt-20 h-[300px] overflow-hidden">
          <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center w-full">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="absolute w-64 h-40 bg-base-200 rounded-lg shadow-xl"
                style={{
                  transform: `rotate(${(i - 3) * 5}deg) translateX(${(i - 3) * 30}px)`,
                  zIndex: i
                }}
              >
                <div className="w-full h-full bg-base-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Visa Categories Section */}
      <div className="container mx-auto px-4 py-16">

        <h2 className="text-4xl font-bold text-center mb-12">¿Qué tipo de visado necesitas?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Tourism */}
          <div 
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group relative"
            onMouseEnter={() => setActiveCategory('tourism')}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="card-body items-center text-center">
              <div className="rounded-full bg-primary/10 p-6 mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-4xl">✈️</span>
              </div>
              <h3 className="card-title text-2xl mb-4">Turismo</h3>
              <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full 
                bg-base-300 p-4 rounded-lg shadow-lg w-72 transition-all duration-300 z-10
                ${activeCategory === 'tourism' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <p className="text-sm">Visados para viajes de turismo, visitas familiares o estancias cortas.</p>
              </div>
              <div className="space-y-2 w-full">
                <Link href="/pages/costa-rica-form" className="btn btn-primary w-full gap-2">
                  <span>🇨🇷</span> Costa Rica
                </Link>
                <Link href="/pages/us-esta-visa-form" className="btn btn-outline w-full gap-2">
                  <span>🇺🇸</span> ESTA (EE.UU.)
                </Link>
              </div>
            </div>
          </div>

          {/* Digital Nomad */}
          <div 
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group relative"
            onMouseEnter={() => setActiveCategory('nomad')}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="card-body items-center text-center">
              <div className="rounded-full bg-primary/10 p-6 mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-4xl">💻</span>
              </div>
              <h3 className="card-title text-2xl mb-4">Nómada Digital</h3>
              <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full 
                bg-base-300 p-4 rounded-lg shadow-lg w-72 transition-all duration-300 z-10
                ${activeCategory === 'nomad' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <p className="text-sm">Visados especiales para profesionales que trabajan de forma remota.</p>
              </div>
              <div className="space-y-2 w-full">
                <Link href="/pages/costa-rica-form" className="btn btn-primary w-full gap-2">
                  <span>🇨🇷</span> Costa Rica
                </Link>
              </div>
            </div>
          </div>

          {/* Student */}
          <div 
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group relative"
            onMouseEnter={() => setActiveCategory('student')}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="card-body items-center text-center">
              <div className="rounded-full bg-primary/10 p-6 mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-4xl">🎓</span>
              </div>
              <h3 className="card-title text-2xl mb-4">Estudiante</h3>
              <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full 
                bg-base-300 p-4 rounded-lg shadow-lg w-72 transition-all duration-300 z-10
                ${activeCategory === 'student' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <p className="text-sm">Visados para estudios, intercambios académicos y programas educativos.</p>
              </div>
              <div className="space-y-2 w-full">
                <Link href="/pages/costa-rica-form" className="btn btn-primary w-full gap-2">
                  <span>🇨🇷</span> Costa Rica
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-base-200/50 rounded-3xl py-16 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Tu tranquilidad, nuestro compromiso</h2>
            <p className="text-center text-base-content/70 mb-12 text-lg">
              Descubre por qué somos tu mejor opción para tramitar tu visa
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Worldwide Processing */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body items-center text-center">
                  <div className="rounded-full bg-primary/10 p-6 mb-4">
                    <span className="text-4xl">🌍</span>
                  </div>
                  <h3 className="card-title text-xl">Tramitación 100% Online</h3>
                  <p className="text-base-content/70">
                    Gestiona tu visa desde cualquier parte del mundo
                  </p>
                </div>
              </div>

              {/* Expert Network */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body items-center text-center">
                  <div className="rounded-full bg-primary/10 p-6 mb-4">
                    <span className="text-4xl">👥</span>
                  </div>
                  <h3 className="card-title text-xl">Expertos en +20 países</h3>
                  <p className="text-base-content/70">
                    Red internacional de especialistas en inmigración
                  </p>
                </div>
              </div>

              {/* Legal Support */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body items-center text-center">
                  <div className="rounded-full bg-primary/10 p-6 mb-4">
                    <span className="text-4xl">⚖️</span>
                  </div>
                  <h3 className="card-title text-xl">Soporte Legal Completo</h3>
                  <p className="text-base-content/70">
                    Acompañamiento legal y logístico personalizado
                  </p>
                </div>
              </div>

              {/* Success Rate */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body items-center text-center">
                  <div className="rounded-full bg-primary/10 p-6 mb-4">
                    <span className="text-4xl">📈</span>
                  </div>
                  <h3 className="card-title text-xl">Alta Tasa de Éxito</h3>
                  <p className="text-base-content/70">
                    Más del 95% de solicitudes aprobadas
                  </p>
                </div>
              </div>

              {/* Partner Network */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body items-center text-center">
                  <div className="rounded-full bg-primary/10 p-6 mb-4">
                    <span className="text-4xl">🤝</span>
                  </div>
                  <h3 className="card-title text-xl">Red de Partners</h3>
                  <p className="text-base-content/70">
                    Seguros, coworkings, escuelas y más servicios
                  </p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="card bg-primary text-primary-content shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body items-center text-center">
                  <div className="stats bg-transparent text-primary-content">
                    <div className="stat">
                      <div className="stat-title text-primary-content/80">Visas Procesadas</div>
                      <div className="stat-value text-white">1,000+</div>
                      <div className="stat-desc text-primary-content/80">En el último año</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestro Proceso</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-200">
            <div className="card-body items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                </svg>
              </div>
              <h2 className="card-title text-2xl mb-2">Proceso Simple</h2>
              <p className="text-base-content/80">Formulario intuitivo con guía paso a paso para completar tu solicitud de manera eficiente.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-200">
            <div className="card-body items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h2 className="card-title text-2xl mb-2">Documentación Clara</h2>
              <p className="text-base-content/80">Lista detallada y organizada de todos los documentos necesarios para tu visa.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-200">
            <div className="card-body items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h2 className="card-title text-2xl mb-2">Seguimiento</h2>
              <p className="text-base-content/80">Mantente informado sobre el estado de tu solicitud en todo momento.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div>
          <p className="font-bold">
            Visa Costa Rica <br/>Portal Oficial de Solicitud
          </p>
          <p>Copyright © 2024 - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
} 
 