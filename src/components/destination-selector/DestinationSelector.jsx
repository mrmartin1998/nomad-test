'use client';

import { useState } from 'react';
import Image from 'next/image';

const DestinationSelector = () => {
  const [originCountry, setOriginCountry] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto bg-base-200 rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
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
            <option value="australia">🇦🇺 Australia</option>
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
            {/* We'll add destinations based on origin country */}
          </select>
        </div>

        {/* CTA Button */}
        <button className="btn btn-primary">
          ¡Comenzar ahora! →
        </button>
      </div>
    </div>
  );
};

export default DestinationSelector; 