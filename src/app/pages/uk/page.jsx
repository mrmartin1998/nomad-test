import React from 'react';
import Link from 'next/link';

const UKVisaPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section with Split Layout */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="badge badge-primary mb-4">ETA UK</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Autorización Electrónica para el Reino Unido</h1>
              <p className="text-lg text-base-content/70 mb-8">Explore la rica historia y cultura británica con una autorización electrónica rápida y sencilla</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/uk/apply" className="btn btn-primary btn-lg w-full sm:w-auto">
                  Solicitar ETA
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

      {/* Requirements Section with Tabs */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Requisitos y Documentos</h2>
          <div className="tabs tabs-boxed justify-center mb-8">
            <a className="tab tab-active">Documentos</a>
            <a className="tab">Proceso</a>
            <a className="tab">Preguntas Frecuentes</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl">📄</span>
                  </div>
                  <h3 className="card-title">Pasaporte</h3>
                </div>
                <p className="text-base-content/70">Pasaporte válido con al menos 6 meses de validez</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl">📸</span>
                  </div>
                  <h3 className="card-title">Foto</h3>
                </div>
                <p className="text-base-content/70">Foto reciente con fondo blanco</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl">💳</span>
                  </div>
                  <h3 className="card-title">Pago</h3>
                </div>
                <p className="text-base-content/70">Tarjeta de crédito o débito válida</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Proceso de Solicitud</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block"></div>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold shrink-0">
                  1
                </div>
                <div className="card bg-base-100 shadow-xl flex-1">
                  <div className="card-body">
                    <h3 className="card-title">Complete el Formulario</h3>
                    <p className="text-base-content/70">Rellene sus datos personales y de viaje</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold shrink-0">
                  2
                </div>
                <div className="card bg-base-100 shadow-xl flex-1">
                  <div className="card-body">
                    <h3 className="card-title">Suba los Documentos</h3>
                    <p className="text-base-content/70">Adjunte su pasaporte y foto</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold shrink-0">
                  3
                </div>
                <div className="card bg-base-100 shadow-xl flex-1">
                  <div className="card-body">
                    <h3 className="card-title">Realice el Pago</h3>
                    <p className="text-base-content/70">Pague de forma segura en línea</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold shrink-0">
                  4
                </div>
                <div className="card bg-base-100 shadow-xl flex-1">
                  <div className="card-body">
                    <h3 className="card-title">Reciba su ETA</h3>
                    <p className="text-base-content/70">Autorización enviada por email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
          <div className="max-w-3xl mx-auto">
            <div className="join join-vertical w-full">
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="faq" />
                <div className="collapse-title text-xl font-medium">
                  ¿Cuánto tiempo tarda el procesamiento?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">El procesamiento típicamente toma 24-48 horas.</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="faq" />
                <div className="collapse-title text-xl font-medium">
                  ¿Qué documentos necesito?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">Necesitará un pasaporte válido y una foto reciente.</p>
                </div>
              </div>
              <div className="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="faq" />
                <div className="collapse-title text-xl font-medium">
                  ¿Cuánto tiempo es válida la ETA?
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">La ETA es válida por 2 años o hasta que expire su pasaporte.</p>
                </div>
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
              <h2 className="text-3xl font-bold mb-4">¿Listo para Explorar el Reino Unido?</h2>
              <p className="text-xl mb-8">Solicite su ETA ahora y reciba su autorización en 24-48 horas</p>
              <Link href="/uk/apply" className="btn btn-secondary btn-lg">
                Solicitar ETA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UKVisaPage;
