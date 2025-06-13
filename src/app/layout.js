import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/whatsapp-button';

export const metadata = {
  title: 'Portal de Visas',
  description: 'Portal de solicitud de visas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="nomad">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="app-background text-base-content">
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}