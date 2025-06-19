'use client';

import Image from 'next/image';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-base-100/50 p-6 rounded-xl">
      <div className="flex flex-col items-center text-center">
        <span className="text-3xl mb-4">{icon}</span>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-base-content/70 text-sm">{description}</p>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      icon: '⌛',
      title: 'Sencillez',
      description: 'Nuestro proceso es mucho más sencillo y ágil que el del gobierno.'
    },
    {
      icon: '🛡️',
      title: 'Seguro',
      description: 'Your security is our priority.'
    },
    {
      icon: '✅',
      title: 'Orientación al éxito',
      description: 'El 99% de nuestras solicitudes son aprobadas.'
    },
    {
      icon: '💬',
      title: 'Compromiso',
      description: 'Estamos aquí para ayudarte 24/7.'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/assets/traveler-boarding.jpg"
                alt="Viajero abordando avión"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right side - Content */}
            <div>
              <h2 className="text-4xl font-bold mb-4">Por qué elegirnos</h2>
              <p className="text-base-content/70 text-lg mb-8">
                Estos son los motivos por los cuales iVisa es la mejor opción
                para ti y por qué deberías probar nuestros servicios.
              </p>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 