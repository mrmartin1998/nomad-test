"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Calendar from '@/components/calendar';

const CubaVisaPage = () => {
  // State declarations at component level
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('Documentos');

  // FAQ data
  const faqs = [
    {
      question: '¿Cuánto tiempo tarda el procesamiento?',
      answer: 'El procesamiento típicamente toma entre 24 y 48 horas hábiles.'
    },
    {
      question: '¿Qué documentos necesito?',
      answer: 'Necesitará un pasaporte válido, una foto reciente, comprobante de alojamiento y seguro de viaje.'
    },
    {
      question: '¿Puedo solicitar una extensión?',
      answer: 'Las extensiones deben solicitarse en Cuba a través de las autoridades migratorias.'
    }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Media Grid Section (New) */}
      <section className="container mx-auto px-4 pt-8 pb-4">
        <div className="w-full aspect-[2/1] rounded-lg overflow-hidden bg-base-200 flex flex-col md:flex-row gap-0">
          {/* Video (left) */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full aspect-[1/1] md:aspect-auto relative">
            <iframe
              className="w-full h-full object-cover"
              src="https://www.youtube.com/embed/1bF3K1tGq8A" // Placeholder video, update if you have a Cuba-specific video
              title="Cuba Inspiration Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-sm font-semibold">Cuba Visa for Spanish Citizens</div>
          </div>
          {/* Four Images (right) */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full grid grid-cols-2 grid-rows-2">
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Havana Skyline" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Cuban Beach" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" alt="Cuban Classic Car" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=400&q=80" alt="Cuban Market" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      {/* Hero/Info Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="badge badge-primary mb-4">Visa Cuba</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Visa para Cuba</h1>
              <p className="text-lg text-base-content/70 mb-8">Solicite su visa para Cuba de manera rápida y sencilla</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/cuba/apply" className="btn btn-primary btn-lg w-full sm:w-auto">
                  Solicitar Ahora
                </Link>
                <Link href="/status" className="btn btn-outline btn-lg w-full sm:w-auto">
                  Verificar Estado
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title mb-4">Información Rápida</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl">⏱️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Procesamiento</h4>
                        <p className="text-sm text-base-content/70">24-48 horas</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl">✅</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Validez</h4>
                        <p className="text-sm text-base-content/70">30 días desde la emisión</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl">💳</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Costo</h4>
                        <p className="text-sm text-base-content/70">Desde €50</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Calendar Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-base-100 rounded-xl shadow p-6 flex flex-col md:flex-row gap-8">
            {/* Calendar/Info */}
            <div className="flex-1">
              <Calendar />
            </div>
          </div>
        </div>
      </section>
      {/* Requisitos y Proceso Section (tabs/cards/steps) */}
      <section className="py-12 bg-base-200/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Requisitos y Proceso</h2>
          <div className="tabs tabs-boxed bg-base-100 mb-8">
            <button 
              className={`tab${activeTab === 'Documentos' ? ' tab-active' : ''}`} 
              onClick={() => setActiveTab('Documentos')}
            >
              Documentos
            </button>
            <button 
              className={`tab${activeTab === 'Proceso' ? ' tab-active' : ''}`} 
              onClick={() => setActiveTab('Proceso')}
            >
              Proceso
            </button>
            <button 
              className={`tab${activeTab === 'Preguntas' ? ' tab-active' : ''}`} 
              onClick={() => setActiveTab('Preguntas')}
            >
              Preguntas Frecuentes
            </button>
          </div>
          {activeTab === 'Documentos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Documentos Tab Content */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title mb-4">Documentos Requeridos</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <span className="text-primary text-xl">📄</span>
                      <div>
                        <h4 className="font-semibold">Pasaporte Válido</h4>
                        <p className="text-sm text-base-content/70">Mínimo 6 meses de validez</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <span className="text-primary text-xl">📸</span>
                      <div>
                        <h4 className="font-semibold">Foto Reciente</h4>
                        <p className="text-sm text-base-content/70">Fondo blanco, tamaño pasaporte</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <span className="text-primary text-xl">🏨</span>
                      <div>
                        <h4 className="font-semibold">Reserva de Hotel</h4>
                        <p className="text-sm text-base-content/70">Confirmación de alojamiento</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <span className="text-primary text-xl">✈️</span>
                      <div>
                        <h4 className="font-semibold">Billete de Vuelo</h4>
                        <p className="text-sm text-base-content/70">Itinerario de viaje</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title mb-4">Información Importante</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-base-200 rounded-lg">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span className="text-primary">⏱️</span>
                        Tiempo de Procesamiento
                      </h4>
                      <p className="text-base-content/70 mt-1">24-48 horas hábiles</p>
                    </div>
                    <div className="p-4 bg-base-200 rounded-lg">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span className="text-primary">📅</span>
                        Validez
                      </h4>
                      <p className="text-base-content/70 mt-1">30 días desde la emisión</p>
                    </div>
                    <div className="p-4 bg-base-200 rounded-lg">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span className="text-primary">💰</span>
                        Costo
                      </h4>
                      <p className="text-base-content/70 mt-1">Desde €50</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Proceso' && (
            <div className="mt-8">
              <div className="relative max-w-3xl mx-auto w-full">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block"></div>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold shrink-0">
                      1
                    </div>
                    <div className="card bg-base-100 shadow-xl flex-1">
                      <div className="card-body p-4">
                        <h3 className="card-title text-lg">Complete el Formulario</h3>
                        <p className="text-base-content/70 text-sm">Rellene sus datos personales y de viaje</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold shrink-0">
                      2
                    </div>
                    <div className="card bg-base-100 shadow-xl flex-1">
                      <div className="card-body p-4">
                        <h3 className="card-title text-lg">Suba los Documentos</h3>
                        <p className="text-base-content/70 text-sm">Adjunte los documentos requeridos</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold shrink-0">
                      3
                    </div>
                    <div className="card bg-base-100 shadow-xl flex-1">
                      <div className="card-body p-4">
                        <h3 className="card-title text-lg">Realice el Pago</h3>
                        <p className="text-base-content/70 text-sm">Pague de forma segura</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold shrink-0">
                      4
                    </div>
                    <div className="card bg-base-100 shadow-xl flex-1">
                      <div className="card-body p-4">
                        <h3 className="card-title text-lg">Reciba su Visa</h3>
                        <p className="text-base-content/70 text-sm">Visa enviada por correo electrónico</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Preguntas' && (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title">¿Cuánto tiempo tarda el procesamiento?</h3>
                    <p className="text-base-content/70">El procesamiento típicamente toma entre 24 y 48 horas hábiles.</p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title">¿Qué documentos necesito?</h3>
                    <p className="text-base-content/70">Necesitará un pasaporte válido, una foto reciente, comprobante de alojamiento y seguro de viaje.</p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title">¿Puedo solicitar una extensión?</h3>
                    <p className="text-base-content/70">Las extensiones deben solicitarse en Cuba a través de las autoridades migratorias.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-4">¿Listo para Solicitar su Visa?</h2>
              <p className="text-xl mb-8">Comience su solicitud ahora y reciba su visa en 24-48 horas</p>
              <Link href="/cuba/apply" className="btn btn-secondary btn-lg">
                <span className="mr-2">✈️</span> Solicitar Ahora
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-12 bg-base-200/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Preguntas Frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="collapse collapse-plus bg-base-100 shadow-xl">
                <input
                  type="radio"
                  name="faq-accordion"
                  checked={faqOpenIndex === idx}
                  onChange={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                  className="hidden"
                />
                <div
                  className="collapse-title text-xl font-medium cursor-pointer"
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                >
                  {faq.question}
                </div>
                <div className={`collapse-content${faqOpenIndex === idx ? ' block' : ' hidden'}`}>
                  <p className="text-base-content/70">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Reviews Section (static placeholder) */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
            {/* Left: Main Rating */}
            <div className="flex-1 flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-bold mb-2 w-full">Reviews</h2>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-5xl font-extrabold text-primary">4.86</span>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold text-sm">Outstanding</span>
              </div>
              <div className="text-base-content/70 text-sm mb-2">821 Reviews</div>
            </div>
            {/* Right: Stats */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-base-content/80">
                <span className="text-lg">⭐</span>
                <span>Avg rating of recent 10 travellers:</span>
                <span className="text-success font-semibold">5.00 Stars</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/80">
                <span className="text-lg">👨‍👩‍👧‍👦</span>
                <span>Most common traveller type:</span>
                <span className="text-success font-semibold">Family</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section (static placeholder) */}
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
                <div className="badge badge-primary">Visa Cuba</div>
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
                <div className="badge badge-primary">Visa Cuba</div>
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
                <div className="badge badge-primary">Visa Cuba</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubaVisaPage;
