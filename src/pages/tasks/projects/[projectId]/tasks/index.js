import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProjectTasks } from '../../../../../services/tasks';
import DashboardLayout from '../../../../../Layout/DashboardLayout';
import { useRoleAccess } from '../../../../../hooks/useRoleAccess';
import { useAuth } from '../../../../../context/AuthContext';

function ProjectTasksPage() {
  const router = useRouter();
  const { projectId } = router.query;
  const [tasks, setTasks] = useState([]);

  const { user } = useAuth();

  const canCreate = useRoleAccess(['Owner', 'Manager', 'Member']);
    

    // console.log(user)
  

  useEffect(() => {
    
      getProjectTasks(projectId)
        .then(data => {
          if (user.role === 'Member') {
            const filtered = data.filter(task => task.assigneeId === user.id);
            setTasks(filtered);
          } else {
            setTasks(data);
          }
        })
        .catch(console.error);
    
  }, [projectId, user]);


   const handleCreate = () => {
    console.log("new project", projectId)
  if (projectId) router.push(`/tasks/projects/newtask/${projectId}`);
};

if (!canCreate) return <p>Access Denied</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Project Tasks</h1>
      <button
  onClick={handleCreate}
  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
>
  + New Task
</button>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border p-3 rounded hover:bg-gray-100 cursor-pointer"
            
          >
            <p className="font-semibold">Task Title: {task.title}</p>
            <p className="text-sm text-gray-600">Task Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

ProjectTasksPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProjectTasksPage;
