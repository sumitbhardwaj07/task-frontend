import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin({ email, password });
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100" >
    <div className="auth-box">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/register')}
            className="text-sm text-blue-600 hover:underline"
          >
            Don&apos;t have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
}
