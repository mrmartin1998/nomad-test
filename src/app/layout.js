import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/whatsapp-button';
import { getServerSession } from 'next-auth/next';
import SessionProvider from '@/components/providers/SessionProvider';

export const metadata = {
  title: 'Portal de Visas',
  description: 'Portal de solicitud de visas',
};

export default async function RootLayout({ children }) {
  let session = null;
  
  try {
    session = await getServerSession();
  } catch (error) {
    // Handle JWT errors gracefully during development
    console.warn('Session error (likely old JWT tokens):', error.message);
    
    // In development, clear any problematic session data
    if (process.env.NODE_ENV === 'development') {
      session = null;
    }
  }

  return (
    <html lang="es" data-theme="nomad">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="app-background text-base-content">
        <SessionProvider session={session}>
          <Navbar />
          <main className="relative">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </SessionProvider>
      </body>
    </html>
  );
}