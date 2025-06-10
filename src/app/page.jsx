'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import DestinationSelector from '@/components/destination-selector/DestinationSelector';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="app-background">
      {/* Hero Section */}
      <div className="min-h-[90vh] bg-base-100 relative overflow-hidden">
        <div className="container mx-auto px-4 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Consigue tu visado
              <span className="block mt-2">sin complicaciones, sin estrés,</span>
              <span className="block mt-2 text-primary italic">sin papeleos y en 48H</span>
            </h1>
            <p className="text-xl text-base-content/70 mb-12 max-w-3xl mx-auto">
              Tramitamos visados de turismo, nómadas digitales, estudiantes y más. 
              Servicio rápido, online y con asesoría personalizada.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-16 text-center max-w-5xl mx-auto">
              <div>
                <div className="text-xl font-bold mb-1">1000+</div>
                <div className="text-sm text-base-content/70">clientes atendidos</div>
              </div>
              <div>
                <div className="text-lg font-bold mb-1">Soporte rápido y personalizado</div>
                <div className="text-sm text-base-content/70">Resolvermos dudas en menos de 24h</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image src="/assets/trustpilot.svg" alt="Trustpilot" width={100} height={20} className="mb-1" />
                <div className="text-sm">Valoración media: 4.8/5</div>
              </div>
              <div>
                <div className="text-lg font-bold mb-1">Compromiso total</div>
                <div className="text-sm text-base-content/70">Acompañamiento durante todo el proceso</div>
              </div>
              <div>
                <div className="text-xl font-bold mb-1">99%</div>
                <div className="text-sm text-base-content/70">visados aprobados</div>
              </div>
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

      {/* Destination Selector Section */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 mb-16">
        <DestinationSelector />
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

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Testimonios y casos reales</h2>
          <p className="text-center text-base-content/70 mb-12 text-lg">
            Experiencias de personas que confiaron en nosotros
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-6 pt-10 pb-6">
                <div className="avatar">
                  <div className="w-24 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-4">
                    <img src="https://placehold.co/100x100" alt="Ana Martínez" />
                  </div>
                </div>
              </figure>
              <div className="card-body items-center text-center pt-2">
                <h3 className="card-title text-xl">Ana Martínez</h3>
                <p className="text-base-content/70 italic">
                  &quot;El proceso fue mucho más sencillo de lo que esperaba. En menos de una semana tenía mi visa aprobada.&quot;
                </p>
                <div className="badge badge-primary">Visa Costa Rica</div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-6 pt-10 pb-6">
                <div className="avatar">
                  <div className="w-24 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-4">
                    <img src="https://placehold.co/100x100" alt="Carlos Ruiz" />
                  </div>
                </div>
              </figure>
              <div className="card-body items-center text-center pt-2">
                <h3 className="card-title text-xl">Carlos Ruiz</h3>
                <p className="text-base-content/70 italic">
                  &quot;Excelente asesoramiento durante todo el proceso. El equipo siempre estuvo disponible para resolver mis dudas.&quot;
                </p>
                <div className="badge badge-primary">ESTA EE.UU.</div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-6 pt-10 pb-6">
                <div className="avatar">
                  <div className="w-24 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-4">
                    <img src="https://placehold.co/100x100" alt="María González" />
                  </div>
                </div>
              </figure>
              <div className="card-body items-center text-center pt-2">
                <h3 className="card-title text-xl">María González</h3>
                <p className="text-base-content/70 italic">
                  &quot;Como nómada digital, necesitaba un proceso rápido y sin complicaciones. ¡Lo conseguí!&quot;
                </p>
                <div className="badge badge-primary">Visa Nómada Digital</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="py-16 px-4 md:px-8 bg-base-200/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Empecemos hoy mismo con tu visado</h2>
            <p className="text-base-content/70 text-lg">Complete el formulario y nos pondremos en contacto con usted</p>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-8">
              <form className="space-y-6">
                {/* Visa Type Selection */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">¿Qué tipo de visa necesitas?</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option disabled selected>Selecciona el tipo de visa</option>
                    <option>Visa Turista</option>
                    <option>Visa Trabajo</option>
                    <option>Visa Estudiante</option>
                    <option>Visa Nómada Digital</option>
                    <option>ESTA (Estados Unidos)</option>
                  </select>
                </div>

                {/* Destination Country */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">País de destino</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option disabled selected>Selecciona el país</option>
                    <option>Estados Unidos</option>
                    <option>Costa Rica</option>
                    <option>Reino Unido</option>
                    <option>España</option>
                    <option>Canadá</option>
                  </select>
                </div>

                {/* Nationality */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Nacionalidad</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option disabled selected>Selecciona tu nacionalidad</option>
                    <option>Costa Rica</option>
                    <option>México</option>
                    <option>Colombia</option>
                    <option>Argentina</option>
                    <option>España</option>
                  </select>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">Email</span>
                    </label>
                    <input 
                      type="email" 
                      placeholder="tu@email.com" 
                      className="input input-bordered w-full" 
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg">WhatsApp</span>
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+1 234 567 8900" 
                      className="input input-bordered w-full" 
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="form-control mt-8">
                  <button className="btn btn-primary btn-lg w-full text-lg">
                    Solicitar asesoría gratuita
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
                  </button>
                </div>
              </form>
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

      {/* Available Visas Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Visas Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ESTA USA */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🇺🇸</span>
                  </div>
                  <h3 className="card-title">ESTA USA</h3>
                </div>
                <p className="text-base-content/70 mb-4">Autorización electrónica para viajar a Estados Unidos</p>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Procesamiento: 72h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Validez: 2 años</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Estadía: 90 días</span>
                  </div>
                </div>
                <Link href="pages/esta" className="btn btn-primary w-full">
                  Solicitar ESTA
                </Link>
              </div>
            </div>

            {/* India eVisa */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🇮🇳</span>
                  </div>
                  <h3 className="card-title">eVisa India</h3>
                </div>
                <p className="text-base-content/70 mb-4">Visa electrónica para viajar a la India</p>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Procesamiento: 72h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Validez: 30 días</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Estadía: 30 días</span>
                  </div>
                </div>
                <Link href="pages/india" className="btn btn-primary w-full">
                  Solicitar eVisa
                </Link>
              </div>
            </div>

            {/* Thailand eVisa */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🇹🇭</span>
                  </div>
                  <h3 className="card-title">eVisa Tailandia</h3>
                </div>
                <p className="text-base-content/70 mb-4">Visa electrónica para viajar a Tailandia</p>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Procesamiento: 48h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Validez: 60 días</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Estadía: 30 días</span>
                  </div>
                </div>
                <Link href="pages/thailand" className="btn btn-primary w-full">
                  Solicitar eVisa
                </Link>
              </div>
            </div>

            {/* UK ETA */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🇬🇧</span>
                  </div>
                  <h3 className="card-title">ETA Reino Unido</h3>
                </div>
                <p className="text-base-content/70 mb-4">Autorización electrónica para viajar al Reino Unido</p>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Procesamiento: 48h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Validez: 2 años</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Estadía: 6 meses</span>
                  </div>
                </div>
                <Link href="pages/uk" className="btn btn-primary w-full">
                  Solicitar ETA
                </Link>
              </div>
            </div>

            {/* Egypt eVisa */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🇪🇬</span>
                  </div>
                  <h3 className="card-title">eVisa Egipto</h3>
                </div>
                <p className="text-base-content/70 mb-4">Visa electrónica para viajar a Egipto</p>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Procesamiento: 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Validez: 90 días</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Estadía: 30 días</span>
                  </div>
                </div>
                <Link href="pages/egypt" className="btn btn-primary w-full">
                  Solicitar eVisa
                </Link>
              </div>
            </div>

            {/* Cuba Visa */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🇨🇺</span>
                  </div>
                  <h3 className="card-title">Visa Cuba</h3>
                </div>
                <p className="text-base-content/70 mb-4">Visa para viajar a Cuba</p>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Procesamiento: 5 días</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Validez: 30 días</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Estadía: 30 días</span>
                  </div>
                </div>
                <Link href="pages/cuba" className="btn btn-primary w-full">
                  Solicitar Visa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <span className="text-4xl">⚡</span>
                </div>
                <h3 className="card-title text-xl">Procesamiento Rápido</h3>
                <p className="text-base-content/70">Reciba su visa en tiempo récord</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <span className="text-4xl">✅</span>
                </div>
                <h3 className="card-title text-xl">Aprobación Garantizada</h3>
                <p className="text-base-content/70">O reembolso completo</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <span className="text-4xl">💬</span>
                </div>
                <h3 className="card-title text-xl">Soporte 24/7</h3>
                <p className="text-base-content/70">Asistencia personalizada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="text-3xl font-bold mb-4">¿Listo para viajar?</h2>
              <p className="text-xl mb-8">Solicite su visa ahora y reciba su autorización en tiempo récord</p>
              <Link href="pages/apply" className="btn btn-secondary btn-lg">
                Solicitar Visa
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
} 
 