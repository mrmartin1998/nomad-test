'use client';

import Image from 'next/image';

const ProcessStep = ({ number, title, description }) => {
  return (
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-2xl font-semibold text-primary">{number}</span>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-base-content/70">{description}</p>
      </div>
    </div>
  );
};

const ApplicationProcess = () => {
  const steps = [
    {
      number: '01',
      title: 'Inicia tu solicitud',
      description: 'Responde algunas preguntas, realiza el pago y completa los detalles finales.'
    },
    {
      number: '02',
      title: 'Nosotros nos encargamos del resto',
      description: 'Recibe tu documento por correo electrónico. En caso necesites una cita en la embajada, nos encargaremos de agendarla por ti.'
    },
    {
      number: '03',
      title: '¡Disfruta de tu viaje!',
      description: 'Prepárate para mostrar tu pasaporte y tus documentos cuando llegues a tu destino.'
    }
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nuestro proceso de aplicación</h2>
            <p className="text-xl text-base-content/70">
              Te explicamos cómo solicitar los diferentes documentos de viaje con nosotros.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Steps Column */}
            <div className="space-y-12">
              {steps.map((step) => (
                <ProcessStep
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
              
              {/* CTA Button */}
              <div className="mt-8">
                <button className="btn btn-primary">
                  Aplica ahora
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/assets/professional-woman.jpg"
                alt="Profesional usando su teléfono"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess; 