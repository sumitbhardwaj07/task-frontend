import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Login from '../components/auth/Login';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.push('/companies');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return <Login onLogin={handleLogin} loading={loading} error={error} />;
}
