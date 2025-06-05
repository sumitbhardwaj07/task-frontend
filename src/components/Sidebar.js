// components/Sidebar.js
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';


export default function Sidebar() {
  const { user, logout } = useAuth();
  // const isOwner = useRoleAccess(['Owner']);
  // const isManager = useRoleAccess(['Owner', 'Manager']);
  // const isMember = useRoleAccess(['Owner', 'Manager', 'Member']);

  const router = useRouter();

  // console.log(isManager)
  // console.log(isMember)
  // console.log(isOwner)

  // const { selectedTeamId } = useTeam();

  // console.log(selectedTeamId)

  const handleLogout = ()=>{
    logout();
    router.push(`/login`);
  }


  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-3">
        {/* {isMember && (
          <>
            <Link href="/companies" className="hover:text-blue-400">My Companies</Link>
            <Link href={`/projects/${selectedTeamId}`} className="hover:text-blue-400">Projects</Link>
            <Link href={`/tasks/project`} className="hover:text-blue-400">Tasks</Link>
            <Link href={`/teams/${selectedCompanyId}`} className="hover:text-blue-400">Team</Link>
          </>
        )} */}

        {/* {isManager && (
          <>
            <Link href="/teams/new" className="hover:text-blue-400">Create Team</Link>
            <Link href="/projects/new" className="hover:text-blue-400">Create Project</Link>
            <Link href="/tasks/new" className="hover:text-blue-400">Create Task</Link>
          </>
        )} */}

        {/* {isOwner && (
          <>
            <Link href="/companies/new" className="hover:text-blue-400">Create Company</Link>
            <Link href="/admin" className="hover:text-blue-400">Admin Panel</Link>
          </>
        )} */}
        <Link href="/companies" className="hover:text-blue-400">My Companies</Link>
        {/* <Link  className="hover:text-blue-400">Logout</Link> */}
        
      </nav>

      
      <div className="mt-auto pt-4 border-t border-gray-600 text-sm">
        Logged in as: <span className="font-semibold">{user?.role}</span>

        <button
          onClick={handleLogout}
          className="block mt-2 text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
