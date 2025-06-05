import { createContext, useContext, useState, useEffect } from 'react';
import { getMyCompanies } from '../services/companies';
import { useAuth } from './AuthContext';

const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const {token} = useAuth();

  useEffect(() => {
    if(token){
      setLoading(true);
      getMyCompanies()
        .then((res) => {
          setCompanies(res);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
      }
  }, [token]);

  return (
    <CompanyContext.Provider value={{
      companies,
      loading,
    }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  return useContext(CompanyContext);
}
