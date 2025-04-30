import React from 'react';
import Link from 'next/link';

const CubaVisaPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="bg-primary text-primary-content py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Visa para Cuba</h1>
          <p className="text-xl mb-8">Solicite su visa para Cuba de manera rápida y sencilla</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/cuba/apply" className="btn btn-secondary btn-lg">
              <span className="mr-2">👉</span> Solicitar Ahora
            </Link>
            <Link href="/status" className="btn btn-outline btn-lg">
              Verificar Estado
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <span className="text-4xl">⏱️</span>
                </div>
                <h3 className="card-title text-xl">Procesamiento Rápido</h3>
                <p className="text-base-content/70">Procesamiento en 24-48 horas</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <span className="text-4xl">✅</span>
                </div>
                <h3 className="card-title text-xl">Aprobación Garantizada</h3>
                <p className="text-base-content/70">O reembolso completo</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <span className="text-4xl">💬</span>
                </div>
                <h3 className="card-title text-xl">Soporte 24/7</h3>
                <p className="text-base-content/70">Asistencia en todo momento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-12 bg-base-200/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Requisitos para la Visa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Documentos Requeridos</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✅</span>
                    Pasaporte válido
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✅</span>
                    Foto reciente
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✅</span>
                    Comprobante de alojamiento
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✅</span>
                    Seguro de viaje
                  </li>
                </ul>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Información Importante</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Tiempo de Procesamiento</h4>
                    <p className="text-base-content/70">24-48 horas</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Validez</h4>
                    <p className="text-base-content/70">30 días desde la emisión</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Costo</h4>
                    <p className="text-base-content/70">Desde €50</p>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="card-title">Complete el Formulario</h3>
                <p className="text-base-content/70">Rellene sus datos personales y de viaje</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <span className="text-2xl">📎</span>
                </div>
                <h3 className="card-title">Suba los Documentos</h3>
                <p className="text-base-content/70">Adjunte los documentos requeridos</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="card-title">Realice el Pago</h3>
                <p className="text-base-content/70">Pague de forma segura</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <span className="text-2xl">✉️</span>
                </div>
                <h3 className="card-title">Reciba su Visa</h3>
                <p className="text-base-content/70">Visa enviada por correo electrónico</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-base-200/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-4">
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
                <p className="text-base-content/70">Necesitará un pasaporte válido, una foto reciente, comprobante de alojamiento y seguro de viaje.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 shadow-xl">
              <input type="radio" name="faq" />
              <div className="collapse-title text-xl font-medium">
                ¿Puedo solicitar una extensión?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">Las extensiones deben solicitarse en Cuba a través de las autoridades migratorias.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Solicitar su Visa?</h2>
          <p className="text-xl mb-8 text-base-content/70">Comience su solicitud ahora y reciba su visa en 24-48 horas</p>
          <Link href="/cuba/apply" className="btn btn-primary btn-lg">
            <span className="mr-2">👉</span> Solicitar Ahora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CubaVisaPage;
