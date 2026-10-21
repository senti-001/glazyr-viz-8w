'use client';

import { useEffect, useState } from 'react';

export default function McpSetupPage() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Dynamically load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Expose callback globally
    (window as any).handleCredentialResponse = async (response: any) => {
      try {
        const res = await fetch('https://mcp.glazyr.com/mint_token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ credential: response.credential })
        });
        
        const data = await res.json();
        if (res.ok) {
          setToken(data.token);
          setError(null);
        } else {
          setError(data.error || 'Failed to generate token');
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    return () => {
      delete (window as any).handleCredentialResponse;
    };
  }, []);

  const handleCopy = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 font-sans text-gray-100 p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold mb-2 text-white">MCP Token Setup</h1>
        <p className="text-gray-400 mb-8 text-sm">
          Sign in with your Google account to generate a secure, long-lived token for Manus or other desktop MCP clients.
        </p>
        
        {!token && (
          <>
            <div 
              id="g_id_onload"
              data-client_id="1023229815857-rspo2a77ta7c67astlg0lkkrodtdvche.apps.googleusercontent.com"
              data-context="signin"
              data-ux_mode="popup"
              data-callback="handleCredentialResponse"
              data-auto_prompt="false"
            ></div>
            
            <div className="flex justify-center mb-6">
              <div 
                className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
              ></div>
            </div>
          </>
        )}

        {token && (
          <div className="mt-6">
            <p className="text-sm text-green-400 font-semibold mb-2">Token Generated Successfully!</p>
            <p className="text-xs text-gray-400 mb-2">
              Copy this token into Manus's Server URL as <code className="bg-gray-800 px-1 py-0.5 rounded">?api_key=TOKEN</code>
            </p>
            <div className="relative">
              <input 
                type="text" 
                value={token}
                readOnly
                className="w-full bg-gray-950 border border-gray-700 text-gray-300 rounded p-2 text-xs font-mono pr-16" 
              />
              <button 
                onClick={handleCopy} 
                className="absolute right-1 top-1 bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-1.5 rounded transition-colors"
              >
                Copy
              </button>
            </div>
            {copied && <p className="text-xs text-red-400 mt-3">Copied to clipboard!</p>}
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded text-sm text-red-400">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
