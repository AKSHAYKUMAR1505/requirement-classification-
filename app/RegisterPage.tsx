'use client';

import { useState } from 'react';
import axios from 'axios';

interface RegisterPageProps {
  onRegister: (token: string) => void;
  onSwitchToLogin: () => void;
}

export default function RegisterPage({ onRegister, onSwitchToLogin }: RegisterPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8003/auth/register', {
        email,
        password,
        full_name: fullName,
      });
      onRegister(response.data.access_token);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-blue-900 text-white">
        <div className="max-w-3xl mx-auto py-3 px-4 md:px-6 text-center">
          <p className="text-sm md:text-base font-semibold uppercase tracking-widest">Government of India</p>
          <h1 className="text-xl md:text-2xl font-bold">Ministry of Electronics &amp; Information Technology</h1>
        </div>
      </header>

      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="p-6 text-center border-b border-slate-200">
              <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto flex items-center justify-center border-2 border-blue-500 mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-900">Requirements Portal</h2>
              <p className="text-sm text-slate-500 mt-1">AI-Powered Requirements Analysis System</p>
            </div>
            <div className="px-6 py-5">
              <div className="border border-blue-200 rounded-lg overflow-hidden mb-4 bg-blue-50">
                <div className="grid grid-cols-2 text-center text-sm font-semibold">
                  <button className="px-3 py-2 text-blue-700" type="button" onClick={onSwitchToLogin}>Login</button>
                  <button className="px-3 py-2 bg-blue-500 text-white" type="button">Register</button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
                    required
                  />
                </div>
                {error && (
                  <div className="text-red-600 text-sm rounded-md bg-red-50 p-2">{error}</div>
                )}
                <div className="relative">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-800 text-white rounded-md px-4 py-2 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {loading ? 'Registering...' : 'Secure Register'}
                  </button>
                </div>
              </form>
              <p className="mt-4 text-center text-xs text-slate-400">This is a secure portal. Unauthorized access is prohibited.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}