'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';

const DevLogin = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // Only show in development mode and when not logged in
  if (process.env.NODE_ENV !== 'development' || session) {
    return null;
  }

  const handleDevLogin = async () => {
    setIsLoading(true);
    try {
      // Use Google provider but with a redirect that we'll intercept in development
      // This is a workaround since we can't easily mock Google auth
      await signIn('google', {
        callbackUrl: window.location.pathname,
      });
    } catch (error) {
      console.error('Dev login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 text-center">
      <button 
        onClick={handleDevLogin}
        disabled={isLoading}
        className="btn btn-sm btn-warning btn-outline"
      >
        {isLoading ? 'Loading...' : '🧪 Development Login'}
      </button>
      <p className="text-xs text-base-content/50 mt-1">
        For testing only (dev mode)
      </p>
    </div>
  );
};

export default DevLogin;
