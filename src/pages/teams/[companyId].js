import { useRouter } from 'next/router';
import DashboardLayout from '../../Layout/DashboardLayout';
import { useEffect, useState } from 'react';
import { getCompanyTeams } from '../../services/teams';
import { useRoleAccess } from '../../hooks/useRoleAccess';

function CompanyTeams() {
  const [teams, setTeams] = useState([]);
  const router = useRouter();


  const { companyId } = router.query;
  console.log(companyId);

  const canCreate = useRoleAccess(['Owner', 'Manager', 'Member']);
  
  

  useEffect(() => {
    if(companyId){
      getCompanyTeams(companyId)
        .then(setTeams)
        .catch(console.error);
    }
  }, [companyId]);

  const handleTeamClick = (teamId) => {
    router.push(`/projects/${teamId}`);
  };

  const handleCreate = () => {
   router.push(`/teams/newteam/${companyId}`);
};
if (!canCreate) return <p>Access Denied</p>;


  // if (!teams.length) return <p>No teams available for this company.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Company Teams</h1>
      <button
  onClick={handleCreate}
  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
>
  + New Team
</button>
      <ul className="space-y-2">
        {teams.map((team) => (
          <li
            key={team.id}
            onClick={() => handleTeamClick(team.id)}
            className="border p-3 rounded cursor-pointer hover:bg-gray-100"
          >
            <p className="font-semibold">{team.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}



CompanyTeams.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CompanyTeams;
