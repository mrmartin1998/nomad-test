'use client';

import Link from 'next/link';
import Image from 'next/image';

const DestinationCard = ({ country, image, processingTime, feature, flag, link }) => {
  return (
    <div className="relative group overflow-hidden rounded-xl">
      {/* Background Image */}
      <div className="aspect-[4/3] relative">
        <Image
          src={image}
          alt={`${country} visa destination`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{flag}</span>
          <h3 className="text-xl font-bold">{country}</h3>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-primary-content">⏱️</span>
            <span className="text-sm">{processingTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary-content">✨</span>
            <span className="text-sm">{feature}</span>
          </div>
        </div>
        <Link 
          href={link}
          className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary-content transition-colors"
        >
          Solicitar ahora
          <span className="text-lg">→</span>
        </Link>
      </div>
    </div>
  );
};

const PopularDestinations = () => {
  const destinations = [
    {
      country: 'Estados Unidos (ESTA)',
      image: '/assets/destinations/usa.jpg',
      processingTime: 'Procesamiento en 72h',
      feature: 'Válido por 2 años',
      flag: '🇺🇸',
      link: '/esta'
    },
    {
      country: 'Tailandia',
      image: '/assets/destinations/thailand.jpg',
      processingTime: 'Procesamiento en 48h',
      feature: 'Válido por 60 días',
      flag: '🇹🇭',
      link: '/thailand'
    },
    {
      country: 'Egipto',
      image: '/assets/destinations/egypt.jpg',
      processingTime: 'Procesamiento en 48h',
      feature: 'Asistencia personalizada',
      flag: '🇪🇬',
      link: '/egypt'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Viaja por el mundo con Visapass</h2>
          <p className="text-lg text-base-content/70">
            Descubre qué necesitas para viajar a nuestros destinos más populares.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.country}
              {...destination}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations; 