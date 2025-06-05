import React from 'react';
import { useRouter } from 'next/router';
import Register from '../../components/auth/Register';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async ({ name, email, password, role }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) throw new Error('Registration failed');

      // Redirect to login after success
      router.push('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-md">
      <Register onRegister={handleRegister} />
    </div>
  );
}
