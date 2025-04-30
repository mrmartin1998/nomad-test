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
              Pasaporte
            </h3>
            <p className="text-sm text-base-content/70 mb-4">
              Copia escaneada de su pasaporte válido (páginas con foto y datos personales)
            </p>
            <FileUpload
              onFileSelect={(file) => handleFileSelect(file, 'passport')}
              error={errors.documentos?.passport}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              Comprobante de Empleo
            </h3>
            <p className="text-sm text-base-content/70 mb-4">
              Estados de cuenta bancarios de los últimos 3 meses o documentos que comprueben sus ingresos
            </p>
            <FileUpload
              onFileSelect={(file) => handleFileSelect(file, 'employmentProof')}
              error={errors.documentos?.employmentProof}
              accept=".pdf"
            />
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              Fotografía
            </h3>
            <p className="text-sm text-base-content/70 mb-4">
              Fotografía reciente tamaño pasaporte (fondo blanco, sin gafas, sin sombrero)
            </p>
            <FileUpload
              onFileSelect={(file) => handleFileSelect(file, 'photo')}
              error={errors.documentos?.photo}
              accept=".jpg,.jpeg,.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload; 