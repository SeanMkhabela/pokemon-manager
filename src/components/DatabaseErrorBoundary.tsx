'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DatabaseErrorBoundaryProps {
  children: React.ReactNode;
}

export function DatabaseErrorBoundary({ children }: DatabaseErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Check if there's an error message in the URL (we'll add this later)
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('db_error');
    
    if (errorParam === 'true') {
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-4">Database Connection Issue</h1>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-amber-800 dark:bg-amber-900 dark:border-amber-800 dark:text-amber-200">
            <p className="mb-2">We&apos;re currently experiencing database connectivity issues.</p>
            <p className="text-sm">Neon&apos;s US-East-1 region appears to be experiencing problems.</p>
          </div>
          <p className="mb-6">Our team has been notified and is working to restore service.</p>
          <div className="space-y-4">
            <button 
              onClick={() => {
                // Remove the error param and reload
                const url = new URL(window.location.href);
                url.searchParams.delete('db_error');
                window.location.href = url.toString();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <div>
              <Link href="/" className="text-blue-600 dark:text-blue-400 underline">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 