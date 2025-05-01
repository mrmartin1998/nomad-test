import './globals.css';

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
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}