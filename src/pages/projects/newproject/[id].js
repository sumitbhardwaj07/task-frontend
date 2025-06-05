import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../Layout/DashboardLayout';
import { createProject } from '../../../services/projects';
import { useRoleAccess } from '../../../hooks/useRoleAccess';

function NewProjectPage() {
  const { user } = useAuth();
  const router = useRouter();
  // const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const canCreate = useRoleAccess(['Manager']);
  const { id } = router.query;

  const teamId = id;


  // if (!mounted || !user) return null;

  // Only render on client
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null; // prevents SSR mismatch

  if (!canCreate) return <p>Access Denied</p>;
  console.log(canCreate)

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await createProject({ name, description, teamId });
      router.push(`/projects/${teamId}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create New Project</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded p-2 hover:bg-green-700"
        >
          Create
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

NewProjectPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewProjectPage;
