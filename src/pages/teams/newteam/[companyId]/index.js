import { useState } from 'react';
import { createTeam } from '../../../../services/teams';
import { useRoleAccess } from '../../../../hooks/useRoleAccess';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../../Layout/DashboardLayout';

function CreateTeamPage() {
  const canCreate = useRoleAccess(['Owner', 'Manager']);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const { companyId } = router.query;

  if (!canCreate) return <p>Access Denied</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await createTeam({ name, companyId});
      router.push(`/teams/${companyId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!canCreate) return <p>Access Denied</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create New Team</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded p-2"
        />

        
        <button className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
          Create Team
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}


CreateTeamPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};


 export default CreateTeamPage;
