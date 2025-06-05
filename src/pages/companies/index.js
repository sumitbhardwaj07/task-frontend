import { useRouter } from 'next/router';
import DashboardLayout from '../../Layout/DashboardLayout';
import { useCompany } from '../../context/CompanyContext';

function CompaniesPage() {
  const { companies, loading } = useCompany();
  const router = useRouter();

  if (loading) return <p>Loading companies...</p>;
  if (!companies.length) return <p>No companies found</p>;

  const handleCompanyClick = (companyId) => {
    router.push(`/teams/${companyId}`);
  };

  const handleCreate = () => {
    // console.log("new project", teamId)
   router.push(`/companies/new`);
};

  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Companies</h1>
      <button
  onClick={handleCreate}
  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
>
  + New Company
</button>
      <ul>
        {companies.map((c) => (
          <li
            key={c.id}
            onClick={() => handleCompanyClick(c.id)}
            className="mb-2 border p-2 rounded cursor-pointer hover:bg-gray-100"
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

CompaniesPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CompaniesPage;
