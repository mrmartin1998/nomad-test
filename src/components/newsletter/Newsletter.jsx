'use client';

import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement newsletter subscription
      // For now, just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Hubo un error al suscribirte. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full bg-primary py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Left side - Title */}
          <div className="text-white text-lg font-medium">
            ¡Más viajes, menos dudas!
          </div>
          
          {/* Middle - Description */}
          <div className="text-white/80 text-sm flex-1">
            Consejos prácticos, novedades y ofertas para que tu próximo viaje sea increíble
          </div>
          
          {/* Right side - Form */}
          <form onSubmit={handleSubmit} className="flex w-full sm:w-auto gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              required
              className="flex-1 sm:w-64 px-4 py-2 rounded-md bg-white text-gray-900 placeholder-gray-500 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium whitespace-nowrap flex items-center gap-2"
            >
              Quiero estar informado
              <span className="text-lg">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 