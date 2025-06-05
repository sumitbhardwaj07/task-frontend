import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createTask } from '../../../../../services/tasks';
import DashboardLayout from '../../../../../Layout/DashboardLayout';
import AssigneeSelect from '../../../../../components/AssigneeSelect';
import { useRoleAccess } from '../../../../../hooks/useRoleAccess';

function CreateTaskPage() {
  const router = useRouter();
  const { projectId } = router.query;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [status, setStatus] = useState('Todo'); // Default status
  const [error, setError] = useState('');

  const canCreate = useRoleAccess(['Manager']);
    if (!canCreate) return <p>Access Denied</p>;
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description, status, ProjectId: projectId, assigneeId });
      // router.push(`/projects/${projectId}/tasks`);
    } catch (err) {
      setError(err.message || 'Failed to create task');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Task</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <AssigneeSelect onChange={val => setAssigneeId(val)} value={assigneeId} />

        <select
          className="border rounded p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button className="bg-blue-600 text-white p-2 rounded">Create</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

CreateTaskPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateTaskPage;
