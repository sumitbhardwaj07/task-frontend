import { useRouter } from 'next/router';
import DashboardLayout from '../../../Layout/DashboardLayout';
import { getTeamProjects } from '../../../services/projects';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

function TeamProjects() {
  const router = useRouter();
  const { teamId } = router.query;
    const { user } = useAuth();
  console.log(user)

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(teamId)
    if (!teamId) return;

    setLoading(true);
    getTeamProjects(teamId)
      .then((res) => {
        setProjects(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [teamId]);

  const handleProjectClick = (projectId) => {
    router.push(`/tasks/projects/${projectId}/tasks`);
  };

  const handleCreate = () => {
    console.log("new project", teamId)
  if (teamId) router.push(`/projects/newproject/${teamId}`);
};

  if (loading) return <p>Loading projects...</p>;
  // if (!projects.length) return <p>No projects found for this team.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Team Projects</h1>
      <button
  onClick={handleCreate}
  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
>
  + New Project
</button>

      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className="mb-2 border p-2 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => handleProjectClick(project.id)}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
}



TeamProjects.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default TeamProjects;
