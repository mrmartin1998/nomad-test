import './globals.css';

export const metadata = {
  title: 'Visa Costa Rica',
  description: 'Portal de solicitud de visa para Costa Rica',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="light">
      <body className="min-h-screen bg-base-100">
        {children}
      </body>
    </html>
  );
}