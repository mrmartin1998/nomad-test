'use client';

import { useState } from 'react';
import Image from 'next/image';

const DestinationSelector = () => {
  const [originCountry, setOriginCountry] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto bg-base-200 rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Origin Country Selector */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">¿De dónde soy?</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={originCountry}
            onChange={(e) => setOriginCountry(e.target.value)}
          >
            <option value="" disabled>Selecciona tu país</option>
            <option value="spain">🇪🇸 España</option>
            {/* We'll add more countries later */}
          </select>
        </div>

        {/* Destination Country Selector */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">¿A dónde viajo?</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
          >
            <option value="" disabled>Viaje a</option>
            <option value="us">🇺🇸 ESTA Estados Unidos</option>
            <option value="cr">🇨🇷 Visa Costa Rica</option>
            <option value="in">🇮🇳 Visa de turista de India</option>
            <option value="cu">🇨🇺 Visa para Cuba</option>
            <option value="gb">🇬🇧 Visa Reino Unido</option>
            <option value="th">🇹🇭 Visa Tailandia</option>
            <option value="eg">🇪🇬 Visa Egipto</option>
          </select>
        </div>

        {/* CTA Button */}
        <div className="form-control">
          <label className="label opacity-0">
            <span className="label-text">Spacer</span>
          </label>
          <button className="btn btn-primary w-full">
            ¡Comenzar ahora! →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationSelector; 