import React from 'react';
import Link from 'next/link';

const IndiaVisaPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section with Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="badge badge-primary mb-4">eVisa India</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Visa Electrónica para la India</h1>
            <p className="text-xl md:text-2xl mb-8 text-base-content/70">Explore la rica cultura y tradiciones de la India con una visa electrónica rápida y sencilla</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/india/apply" className="btn btn-primary btn-lg group">
                <span className="mr-2 group-hover:translate-x-1 transition-transform">🛕</span>
                Solicitar eVisa
              </Link>
              <Link href="/status" className="btn btn-outline btn-lg group">
                <span className="mr-2 group-hover:translate-x-1 transition-transform">🔍</span>
                Verificar Estado
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <span className="text-4xl">⏱️</span>
                </div>
                <h3 className="card-title text-xl">Procesamiento Rápido</h3>
                <p className="text-base-content/70">72 horas hábiles</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <span className="text-4xl">✅</span>
                </div>
                <h3 className="card-title text-xl">Aprobación Garantizada</h3>
                <p className="text-base-content/70">O reembolso completo</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
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
                      <span className="text-xl">📸</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Foto Reciente</h4>
                      <p className="text-sm text-base-content/70">Fondo blanco, tamaño pasaporte</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                    <div className="rounded-full bg-primary/10 p-3">
                      <span className="text-xl">🏨</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Reserva de Hotel</h4>
                      <p className="text-sm text-base-content/70">Confirmación de alojamiento</p>
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
                      <p className="text-sm">30 días desde la entrada</p>
                    </div>
                  </div>
                  <div className="alert alert-success">
                    <span className="text-xl">✅</span>
                    <div>
                      <h4 className="font-semibold">Procesamiento</h4>
                      <p className="text-sm">72 horas hábiles</p>
                    </div>
                  </div>
                  <div className="alert alert-warning">
                    <span className="text-xl">⚠️</span>
                    <div>
                      <h4 className="font-semibold">Costo</h4>
                      <p className="text-sm">Desde $25 USD</p>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="card-title">Complete el Formulario</h3>
                <p className="text-base-content/70">Rellene sus datos personales</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <span className="text-2xl">📎</span>
                </div>
                <h3 className="card-title">Suba los Documentos</h3>
                <p className="text-base-content/70">Adjunte los documentos requeridos</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="card-title">Realice el Pago</h3>
                <p className="text-base-content/70">Pague de forma segura</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <span className="text-2xl">✉️</span>
                </div>
                <h3 className="card-title">Reciba su Visa</h3>
                <p className="text-base-content/70">Visa enviada por email</p>
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
                <p className="text-base-content/70">El procesamiento típicamente toma 72 horas hábiles.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 shadow-xl">
              <input type="radio" name="faq" />
              <div className="collapse-title text-xl font-medium">
                ¿Qué documentos necesito?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">Necesitará un pasaporte válido, una foto reciente y comprobante de alojamiento.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 shadow-xl">
              <input type="radio" name="faq" />
              <div className="collapse-title text-xl font-medium">
                ¿Cuánto tiempo es válida la visa?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">La visa es válida por 30 días desde la entrada a la India.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 shadow-xl">
              <input type="radio" name="faq" />
              <div className="collapse-title text-xl font-medium">
                ¿Puedo viajar con la eVisa?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">Sí, la eVisa le permite viajar a la India por turismo o negocios.</p>
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
              <h2 className="text-3xl font-bold mb-4">¿Listo para Explorar la India?</h2>
              <p className="text-xl mb-8">Solicite su eVisa ahora y reciba su autorización en 72 horas</p>
              <Link href="/india/apply" className="btn btn-secondary btn-lg group">
                <span className="mr-2 group-hover:translate-x-1 transition-transform">🛕</span>
                Solicitar eVisa
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndiaVisaPage;
