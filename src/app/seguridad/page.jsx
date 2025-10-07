export default function SeguridadPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">
            🛡️ Viaje con Seguridad
          </h1>
          <p className="text-xl text-center mt-4 opacity-90">
            Información importante para un viaje seguro
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose lg:prose-xl">
            <h2>Consejos de Seguridad para Viajeros</h2>
            <p>Información sobre seguridad en viajes internacionales...</p>
            
            <h3>Documentación</h3>
            <ul>
              <li>Mantenga copias de su pasaporte y visa</li>
              <li>Registre su viaje en el consulado</li>
              <li>Tenga contactos de emergencia</li>
            </ul>

            <h3>Seguridad Personal</h3>
            <ul>
              <li>Investigue sobre su destino</li>
              <li>Mantenga contacto regular con familiares</li>
              <li>Tenga un plan de emergencia</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
