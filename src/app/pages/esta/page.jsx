import React from 'react';
import Link from 'next/link';

const ESTAVisaPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section with Background Pattern */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="badge badge-primary mb-4">ESTA USA</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Autorización Electrónica de Viaje a EE.UU.</h1>
            <p className="text-xl md:text-2xl mb-8 text-base-content/70">Solicite su ESTA para viajar a Estados Unidos de forma rápida y segura</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/esta/apply" className="btn btn-primary btn-lg group">
                <span className="mr-2 group-hover:translate-x-1 transition-transform">✈️</span>
                Solicitar ESTA
              </Link>
              <Link href="/status" className="btn btn-outline btn-lg group">
                <span className="mr-2 group-hover:translate-x-1 transition-transform">🔍</span>
                Verificar Estado
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="stats shadow w-full">
            <div className="stat">
              <div className="stat-figure text-primary">
                <span className="text-3xl">⏱️</span>
              </div>
              <div className="stat-title">Tiempo de Procesamiento</div>
              <div className="stat-value">24-48h</div>
              <div className="stat-desc">Aprobación rápida</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <span className="text-3xl">✅</span>
              </div>
              <div className="stat-title">Tasa de Aprobación</div>
              <div className="stat-value">98%</div>
              <div className="stat-desc">Alta probabilidad</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-accent">
                <span className="text-3xl">💬</span>
              </div>
              <div className="stat-title">Soporte</div>
              <div className="stat-value">24/7</div>
              <div className="stat-desc">Asistencia personalizada</div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-12 bg-base-200/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Requisitos y Documentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Documentos Necesarios</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                    <div className="rounded-full bg-primary/10 p-3">
                      <span className="text-xl">📄</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Pasaporte Válido</h4>
                      <p className="text-sm text-base-content/70">Mínimo 6 meses de validez</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                    <div className="rounded-full bg-primary/10 p-3">
                      <span className="text-xl">💳</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Tarjeta de Crédito</h4>
                      <p className="text-sm text-base-content/70">Para el pago de la tasa</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                    <div className="rounded-full bg-primary/10 p-3">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Email Válido</h4>
                      <p className="text-sm text-base-content/70">Para recibir la autorización</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Información Importante</h3>
                <div className="space-y-4">
                  <div className="alert alert-info">
                    <span className="text-xl">ℹ️</span>
                    <div>
                      <h4 className="font-semibold">Validez</h4>
                      <p className="text-sm">2 años o hasta la expiración del pasaporte</p>
                    </div>
                  </div>
                  <div className="alert alert-success">
                    <span className="text-xl">✅</span>
                    <div>
                      <h4 className="font-semibold">Procesamiento</h4>
                      <p className="text-sm">24-48 horas hábiles</p>
                    </div>
                  </div>
                  <div className="alert alert-warning">
                    <span className="text-xl">⚠️</span>
                    <div>
                      <h4 className="font-semibold">Costo</h4>
                      <p className="text-sm">$14 USD por solicitud</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Proceso de Solicitud</h2>
          <div className="timeline timeline-vertical">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-4">
                        <span className="text-2xl">📝</span>
                      </div>
                      <div>
                        <h3 className="card-title">Complete el Formulario</h3>
                        <p className="text-base-content/70">Rellene sus datos personales y de viaje</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-4">
                        <span className="text-2xl">💳</span>
                      </div>
                      <div>
                        <h3 className="card-title">Realice el Pago</h3>
                        <p className="text-base-content/70">Pague de forma segura</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-4">
                        <span className="text-2xl">✉️</span>
                      </div>
                      <div>
                        <h3 className="card-title">Reciba su ESTA</h3>
                        <p className="text-base-content/70">Autorización enviada por email</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-base-200/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Preguntas Frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="collapse collapse-plus bg-base-100 shadow-xl">
              <input type="radio" name="faq" />
              <div className="collapse-title text-xl font-medium">
                ¿Cuánto tiempo tarda el procesamiento?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">El procesamiento típicamente toma entre 24 y 48 horas hábiles.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 shadow-xl">
              <input type="radio" name="faq" />
              <div className="collapse-title text-xl font-medium">
                ¿Qué documentos necesito?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">Necesitará un pasaporte válido y una tarjeta de crédito para el pago.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 shadow-xl">
              <input type="radio" name="faq" />
              <div className="collapse-title text-xl font-medium">
                ¿Cuánto tiempo es válido el ESTA?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">El ESTA es válido por 2 años o hasta la expiración de su pasaporte.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 shadow-xl">
              <input type="radio" name="faq" />
              <div className="collapse-title text-xl font-medium">
                ¿Puedo viajar con el ESTA?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">Sí, el ESTA le permite viajar a EE.UU. por turismo o negocios por hasta 90 días.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="text-3xl font-bold mb-4">¿Listo para Viajar a EE.UU.?</h2>
              <p className="text-xl mb-8">Solicite su ESTA ahora y reciba su autorización en 24-48 horas</p>
              <Link href="esta/apply" className="btn btn-secondary btn-lg group">
                <span className="mr-2 group-hover:translate-x-1 transition-transform">✈️</span>
                Solicitar ESTA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ESTAVisaPage;
