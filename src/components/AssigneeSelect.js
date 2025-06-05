import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api';

export default function AssigneeSelect({ onChange, value }) {
  const [users, setUsers] = useState([]);
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  useEffect(() => {
    getUsers();
}, []);

  const getUsers = async () => {
  try {
    const res = await api.get('/users');
    const membersOnly = res.data.filter(user => user.role === 'Member');
      setUsers(membersOnly);
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch users' };
  }
};

  return (
    <select value={value || ''} onChange={e => onChange(e.target.value)} required>
      <option value="">Select Assignee</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name} ({user.email})
        </option>
      ))}
    </select>
  );
}
