"use client"

import React, { useState } from 'react';
import Link from 'next/link';

const ThailandVisaPage = () => {
  // FAQ accordion state (top-level)
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);
  return (
    <div className="min-h-screen bg-base-100">
      {/* Media Grid Section (New) */}
      <section className="container mx-auto px-4 pt-8 pb-4">
        <div className="w-full aspect-[2/1] rounded-lg overflow-hidden bg-base-200 flex flex-col md:flex-row gap-0">
          {/* Video (left) */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full aspect-[1/1] md:aspect-auto relative">
            <iframe
              className="w-full h-full object-cover"
              src="https://www.youtube.com/embed/1bF3K1tGq8A"
              title="Thailand Inspiration Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-sm font-semibold">Thailand Visa for Spanish Citizens</div>
          </div>
          {/* Four Images (right) */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full grid grid-cols-2 grid-rows-2">
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Bangkok Skyline" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Thai Beach" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" alt="Thai Temple" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=400&q=80" alt="Thai Market" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      {/* Thai Hero/Info Section (copied) */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="badge badge-primary mb-4">eVisa Tailandia</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Visa Electrónica para Tailandia</h1>
              <p className="text-lg text-base-content/70 mb-8">Explore las playas paradisíacas y la rica cultura tailandesa con una visa electrónica rápida y sencilla</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/thailand/apply" className="btn btn-primary btn-lg w-full sm:w-auto">
                  Solicitar eVisa
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
                        <p className="text-sm text-base-content/70">2 años</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl">💳</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Costo</h4>
                        <p className="text-sm text-base-content/70">Desde £10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Simple Calendar Section (static, placeholder for future work) */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-base-100 rounded-xl shadow p-6 flex flex-col md:flex-row gap-8">
            {/* Calendar/Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Get a Guaranteed Visa on</h2>
              <div className="text-primary font-semibold mb-4">5 May 2025 at 01:34 PM</div>
              {/* Simple Calendar Table */}
              <div className="border rounded-lg p-4 bg-base-200">
                <div className="font-semibold mb-2">mayo 2025</div>
                <table className="w-full text-center text-sm">
                  <thead>
                    <tr className="text-base-content/70">
                      <th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>28</td><td>29</td><td>30</td><td className="bg-primary text-white rounded">1</td><td>2</td><td>3</td><td>4</td></tr>
                    <tr><td className="bg-primary text-white rounded">5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td></tr>
                    <tr><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td></tr>
                    <tr><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td></tr>
                    <tr><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td>1</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Good to Know Sidebar */}
            <div className="flex-1 bg-base-50 rounded-lg p-4 border">
              <div className="font-semibold mb-4">GOOD TO KNOW</div>
              <ul className="space-y-3 text-sm">
                <li><span className="font-bold">Nomad on your Visa!</span> Nomad works with the authorities to get your visa on time!</li>
                <li><span className="font-bold">Public Holidays</span> We take into account public holidays observed in the country you are traveling to.</li>
                <li><span className="font-bold">Weekends</span> Embassies are shut on Saturday & Sunday. Your visa cannot be processed then.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Requisitos y Proceso Section (copied from Egypt, now with real tabs) */}
      <section className="py-12 bg-base-200/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Requisitos y Proceso</h2>
          {(() => {
            const [activeTab, setActiveTab] = useState('Documentos');
            return (
              <>
                <div className="tabs tabs-boxed bg-base-100 mb-8">
                  <button className={`tab${activeTab === 'Documentos' ? ' tab-active' : ''}`} onClick={() => setActiveTab('Documentos')}>Documentos</button>
                  <button className={`tab${activeTab === 'Proceso' ? ' tab-active' : ''}`} onClick={() => setActiveTab('Proceso')}>Proceso</button>
                  <button className={`tab${activeTab === 'Preguntas' ? ' tab-active' : ''}`} onClick={() => setActiveTab('Preguntas')}>Preguntas Frecuentes</button>
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
                              <p className="text-base-content/70 text-sm">Adjunte su pasaporte y foto</p>
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
                              <p className="text-base-content/70 text-sm">Pague de forma segura en línea</p>
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
                              <p className="text-base-content/70 text-sm">Visa enviada por email</p>
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
                          <p className="text-base-content/70">El procesamiento típicamente toma 48 horas hábiles.</p>
                        </div>
                      </div>
                      <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                          <h3 className="card-title">¿Qué documentos necesito?</h3>
                          <p className="text-base-content/70">Necesitará un pasaporte válido, una foto reciente y comprobante de alojamiento.</p>
                        </div>
                      </div>
                      <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                          <h3 className="card-title">¿Cuánto tiempo es válida la visa?</h3>
                          <p className="text-base-content/70">La visa es válida por 60 días desde la entrada a Tailandia.</p>
                        </div>
                      </div>
                      <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                          <h3 className="card-title">¿Puedo viajar con la eVisa?</h3>
                          <p className="text-base-content/70">Sí, la eVisa le permite viajar a Tailandia por turismo o negocios.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </section>
      {/* CTA Section (copied from Egypt, adapted for Thailand) */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-4">¿Listo para Explorar Tailandia?</h2>
              <p className="text-xl mb-8">Comience su solicitud ahora y reciba su visa en 24-48 horas</p>
              <Link href="/thailand/apply" className="btn btn-secondary btn-lg">
                <span className="mr-2">✈️</span> Solicitar eVisa
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section (copied from ESTA, now with accordion state) */}
      <section className="py-12 bg-base-200/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Preguntas Frecuentes</h2>
          {(() => {
            const faqs = [
              {
                question: '¿Cuánto tiempo tarda el procesamiento?',
                answer: 'El procesamiento típicamente toma entre 24 y 48 horas hábiles.'
              },
              {
                question: '¿Qué documentos necesito?',
                answer: 'Necesitará un pasaporte válido y una tarjeta de crédito para el pago.'
              },
              {
                question: '¿Cuánto tiempo es válido el ESTA?',
                answer: 'El ESTA es válido por 2 años o hasta la expiración de su pasaporte.'
              },
              {
                question: '¿Puedo viajar con el ESTA?',
                answer: 'Sí, el ESTA le permite viajar a EE.UU. por turismo o negocios por hasta 90 días.'
              }
            ];
            return (
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
            );
          })()}
        </div>
      </section>
      
      {/* Reviews Section (inspired by Web Atlys) */}
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
      {/* Testimonials Section (inspired by landing page) */}
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
                  "El proceso fue mucho más sencillo de lo que esperaba. En menos de una semana tenía mi visa aprobada."
                </p>
                <div className="badge badge-primary">eVisa Tailandia</div>
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
                  "Excelente asesoramiento durante todo el proceso. El equipo siempre estuvo disponible para resolver mis dudas."
                </p>
                <div className="badge badge-primary">eVisa Tailandia</div>
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
                  "Como nómada digital, necesitaba un proceso rápido y sin complicaciones. ¡Lo conseguí!"
                </p>
                <div className="badge badge-primary">eVisa Tailandia</div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>

     
  );
};

export default ThailandVisaPage;
