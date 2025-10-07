'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login?callbackUrl=/dashboard');
      return;
    }

    // Fetch user's applications
    fetchUserApplications();
  }, [session, status, router]);

  const fetchUserApplications = async () => {
    try {
      setLoading(true);
      
      // Fetch from all country endpoints
      const endpoints = [
        { name: 'ESTA (USA)', api: '/api/esta', flag: '🇺🇸' },
        { name: 'India eVisa', api: '/api/india', flag: '🇮🇳' },
        { name: 'UK ETA', api: '/api/uk', flag: '🇬🇧' },
        { name: 'Cuba Visa', api: '/api/cuba', flag: '🇨🇺' },
        { name: 'Thailand eVisa', api: '/api/thailand', flag: '🇹🇭' },
        { name: 'Egypt eVisa', api: '/api/egypt', flag: '🇪🇬' },
      ];

      const allApplications = [];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint.api);
          if (response.ok) {
            const data = await response.json();
            // Filter applications for current user
            const userApps = data.data?.filter(app => app.userId === session.user.id) || [];
            
            // Add country info to each application
            userApps.forEach(app => {
              app.countryName = endpoint.name;
              app.countryFlag = endpoint.flag;
            });
            
            allApplications.push(...userApps);
          }
        } catch (error) {
          console.error(`Error fetching ${endpoint.name} applications:`, error);
        }
      }

      // Sort by creation date (newest first)
      allApplications.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
      
      setApplications(allApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'pendiente': 'badge-warning',
      'aprobado': 'badge-success',
      'rechazado': 'badge-error'
    };
    
    return statusColors[status] || 'badge-neutral';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      'pendiente': 'En Proceso',
      'aprobado': 'Aprobado',
      'rechazado': 'Rechazado'
    };
    
    return statusTexts[status] || status;
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="avatar">
                <div className="w-20 h-20 rounded-full ring-4 ring-white/30">
                  <Image
                    src={session.user?.image || '/assets/default-avatar.png'}
                    alt={session.user?.name || 'Usuario'}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">¡Bienvenido, {session.user?.name?.split(' ')[0]}!</h1>
                <p className="text-white/80 text-lg">{session.user?.email}</p>
                <p className="text-white/70">Gestiona todas tus solicitudes de visa desde aquí</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="stat bg-base-200 rounded-xl shadow-sm">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="stat-title">Total Solicitudes</div>
              <div className="stat-value text-primary">{applications.length}</div>
              <div className="stat-desc">Solicitudes enviadas</div>
            </div>

            <div className="stat bg-base-200 rounded-xl shadow-sm">
              <div className="stat-figure text-success">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="stat-title">Aprobadas</div>
              <div className="stat-value text-success">
                {applications.filter(app => app.estado === 'aprobado').length}
              </div>
              <div className="stat-desc">Visas aprobadas</div>
            </div>

            <div className="stat bg-base-200 rounded-xl shadow-sm">
              <div className="stat-figure text-warning">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div className="stat-title">En Proceso</div>
              <div className="stat-value text-warning">
                {applications.filter(app => app.estado === 'pendiente').length}
              </div>
              <div className="stat-desc">En revisión</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-base-200 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/pages/us-esta-visa-form" className="btn btn-outline btn-sm">
                🇺🇸 Nueva ESTA
              </Link>
              <Link href="/pages/india" className="btn btn-outline btn-sm">
                🇮🇳 Nueva India
              </Link>
              <Link href="/pages/uk" className="btn btn-outline btn-sm">
                🇬🇧 Nueva UK
              </Link>
              <Link href="/pages/thailand" className="btn btn-outline btn-sm">
                🇹🇭 Nueva Tailandia
              </Link>
            </div>
          </div>

          {/* Applications List */}
          <div className="bg-base-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Mis Solicitudes</h2>
              <button 
                onClick={fetchUserApplications}
                className="btn btn-sm btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                )}
                Actualizar
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="loading loading-spinner loading-lg"></div>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold mb-2">No tienes solicitudes aún</h3>
                <p className="text-base-content/70 mb-6">¡Comienza tu primera solicitud de visa!</p>
                <Link href="/" className="btn btn-primary">
                  Explorar Destinos
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app, index) => (
                  <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="card-body">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{app.countryFlag}</div>
                          <div>
                            <h3 className="font-semibold text-lg">{app.countryName}</h3>
                            <p className="text-base-content/70">{app.nombreCompleto}</p>
                            <p className="text-sm text-base-content/50">
                              Enviado el {formatDate(app.fechaCreacion)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`badge ${getStatusBadge(app.estado)} mb-2`}>
                            {getStatusText(app.estado)}
                          </div>
                          <div className="text-sm text-base-content/60">
                            ID: {app._id.slice(-8).toUpperCase()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Additional Info */}
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-base-content/60">Email:</span>
                          <div className="font-medium">{app.email}</div>
                        </div>
                        <div>
                          <span className="text-base-content/60">Teléfono:</span>
                          <div className="font-medium">{app.telefono}</div>
                        </div>
                        <div>
                          <span className="text-base-content/60">Pasaporte:</span>
                          <div className="font-medium">{app.numeroPasaporte}</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="card-actions justify-end mt-4">
                        <button className="btn btn-sm btn-outline">
                          Ver Detalles
                        </button>
                        {app.estado === 'pendiente' && (
                          <button className="btn btn-sm btn-primary">
                            Editar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
