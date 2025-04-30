import React from 'react';
import Link from 'next/link';

const ThailandVisaPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section with Card Overlay */}
      <section className="relative py-24 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2">
                    <div className="badge badge-primary mb-4">eVisa Tailandia</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Visa Electrónica para Tailandia</h1>
                    <p className="text-lg text-base-content/70 mb-8">Descubra las playas paradisíacas y la rica cultura tailandesa con una visa electrónica rápida y sencilla</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/thailand/apply" className="btn btn-primary btn-lg">
                        Solicitar eVisa
                      </Link>
                      <Link href="/status" className="btn btn-outline btn-lg">
                        Verificar Estado
                      </Link>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="stats stats-vertical shadow">
                      <div className="stat">
                        <div className="stat-title">Procesamiento</div>
                        <div className="stat-value">48h</div>
                        <div className="stat-desc">horas hábiles</div>
                      </div>
                      <div className="stat">
                        <div className="stat-title">Validez</div>
                        <div className="stat-value">60d</div>
                        <div className="stat-desc">días desde entrada</div>
                      </div>
                      <div className="stat">
                        <div className="stat-title">Costo</div>
                        <div className="stat-value">$30</div>
                        <div className="stat-desc">USD</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section with Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Requisitos y Documentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">📄</span>
                  </div>
                  <h3 className="card-title">Pasaporte</h3>
                </div>
                <p className="text-base-content/70">Válido por al menos 6 meses</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">📸</span>
                  </div>
                  <h3 className="card-title">Foto</h3>
                </div>
                <p className="text-base-content/70">Reciente con fondo blanco</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🏨</span>
                  </div>
                  <h3 className="card-title">Hotel</h3>
                </div>
                <p className="text-base-content/70">Reserva de alojamiento</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">✈️</span>
                  </div>
                  <h3 className="card-title">Vuelo</h3>
                </div>
                <p className="text-base-content/70">Boleto de salida</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section with Timeline */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Proceso de Solicitud</h2>
          <div className="max-w-4xl mx-auto">
            <div className="timeline timeline-vertical">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h3 className="card-title">Complete el Formulario</h3>
                      <p className="text-base-content/70">Rellene sus datos personales y de viaje</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h3 className="card-title">Suba los Documentos</h3>
                      <p className="text-base-content/70">Adjunte su pasaporte y foto</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h3 className="card-title">Realice el Pago</h3>
                      <p className="text-base-content/70">Pague de forma segura en línea</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h3 className="card-title">Reciba su Visa</h3>
                      <p className="text-base-content/70">Visa enviada por email</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Preguntas Frecuentes</h2>
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
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="text-3xl font-bold mb-4">¿Listo para Explorar Tailandia?</h2>
              <p className="text-xl mb-8">Solicite su eVisa ahora y reciba su autorización en 48 horas</p>
              <Link href="/thailand/apply" className="btn btn-secondary btn-lg">
                Solicitar eVisa
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThailandVisaPage;
