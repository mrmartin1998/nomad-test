import React from 'react';
import Link from 'next/link';

const EgyptVisaPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section with Gradient */}
      <section className="bg-gradient-to-br from-primary to-primary-focus text-primary-content py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Visa para Egipto</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Explore las maravillas del antiguo Egipto con una visa electrónica rápida y sencilla</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/egypt/apply" className="btn btn-secondary btn-lg">
                <span className="mr-2">✈️</span> Solicitar Ahora
              </Link>
              <Link href="/status" className="btn btn-outline btn-lg">
                <span className="mr-2">🔍</span> Verificar Estado
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-12 -mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-primary">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">⏱️</div>
                  <div>
                    <h3 className="card-title text-lg">Procesamiento Rápido</h3>
                    <p className="text-base-content/70">24-48 horas</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-secondary">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">✅</div>
                  <div>
                    <h3 className="card-title text-lg">Aprobación Garantizada</h3>
                    <p className="text-base-content/70">O reembolso completo</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-accent">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">💬</div>
                  <div>
                    <h3 className="card-title text-lg">Soporte 24/7</h3>
                    <p className="text-base-content/70">Asistencia personalizada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section with Tabs */}
      <section className="py-12 bg-base-200/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Requisitos y Proceso</h2>
          <div className="tabs tabs-boxed bg-base-100 mb-8">
            <a className="tab tab-active">Documentos</a>
            <a className="tab">Proceso</a>
            <a className="tab">Preguntas Frecuentes</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        </div>
      </section>

      {/* Application Steps */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Proceso de Solicitud</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
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
            <div className="flex-1">
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <span className="text-2xl">📎</span>
                    </div>
                    <div>
                      <h3 className="card-title">Suba los Documentos</h3>
                      <p className="text-base-content/70">Adjunte los documentos requeridos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
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
            <div className="flex-1">
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <span className="text-2xl">✉️</span>
                    </div>
                    <div>
                      <h3 className="card-title">Reciba su Visa</h3>
                      <p className="text-base-content/70">Visa enviada por correo electrónico</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-12 bg-base-200/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Preguntas Frecuentes</h2>
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="faq" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                ¿Cuánto tiempo tarda el procesamiento?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">El procesamiento típicamente toma entre 24 y 48 horas hábiles.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="faq" />
              <div className="collapse-title text-xl font-medium">
                ¿Qué documentos necesito?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">Necesitará un pasaporte válido, una foto reciente, comprobante de alojamiento y billete de vuelo.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="faq" />
              <div className="collapse-title text-xl font-medium">
                ¿Puedo solicitar una extensión?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">Las extensiones deben solicitarse en Egipto a través de las autoridades migratorias.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-4">¿Listo para Explorar Egipto?</h2>
              <p className="text-xl mb-8">Comience su solicitud ahora y reciba su visa en 24-48 horas</p>
              <Link href="/egypt/apply" className="btn btn-secondary btn-lg">
                <span className="mr-2">✈️</span> Solicitar Ahora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EgyptVisaPage;
