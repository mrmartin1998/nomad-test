import React from 'react';
import FileUpload from './FileUpload';

const DocumentUpload = ({ formData, setFormData, errors }) => {
  const handleFileSelect = (file, documentType) => {
    setFormData(prev => ({
      ...prev,
      documentos: {
        ...prev.documentos,
        [documentType]: file
      }
    }));
  };

  return (
    <div className="form-control w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary/10 p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Documentos Requeridos</h2>
          <p className="text-base-content/70">Suba los documentos necesarios para su solicitud</p>
        </div>
      </div>

      <div className="alert alert-info mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <h3 className="font-bold">Requisitos de Documentos</h3>
          <div className="text-sm">
            <p>• Todos los documentos deben estar en formato PDF o imagen (JPG, JPEG, PNG)</p>
            <p>• Los documentos deben ser claros y legibles</p>
            <p>• El tamaño máximo por archivo es de 5MB</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-8">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
              Fotografía
            </h3>
            <p className="text-sm text-base-content/70 mb-4">
              Fotografía reciente tamaño pasaporte (fondo blanco, sin gafas, sin sombrero)
            </p>
            <FileUpload
              onFileSelect={(file) => handleFileSelect(file, 'fotoCarnet')}
              error={errors.documentos?.fotoCarnet}
              accept=".jpg,.jpeg,.png"
            />
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
              Pasaporte
            </h3>
            <p className="text-sm text-base-content/70 mb-4">
              Copia escaneada de su pasaporte válido (páginas con foto y datos personales)
            </p>
            <FileUpload
              onFileSelect={(file) => handleFileSelect(file, 'pasaporteEscaneado')}
              error={errors.documentos?.pasaporteEscaneado}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
              </svg>
              Boleto de Salida
            </h3>
            <p className="text-sm text-base-content/70 mb-4">
              Copia de su boleto de salida de Tailandia
            </p>
            <FileUpload
              onFileSelect={(file) => handleFileSelect(file, 'billeteSalida')}
              error={errors.documentos?.billeteSalida}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
              Reserva de Hotel
            </h3>
            <p className="text-sm text-base-content/70 mb-4">
              Confirmación de reserva de hotel o carta de invitación
            </p>
            <FileUpload
              onFileSelect={(file) => handleFileSelect(file, 'reservaHotel')}
              error={errors.documentos?.reservaHotel}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload; 