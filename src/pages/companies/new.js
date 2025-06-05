import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createCompany } from '../../services/companies';
import { useRoleAccess } from '../../hooks/useRoleAccess';
import { useRouter } from 'next/router';

export default function NewCompanyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const canCreate = useRoleAccess(['Owner']);

  if (!canCreate) return <p>Access Denied</p>;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await createCompany({ name });
      router.push('/companies');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create New Company</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Create
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
