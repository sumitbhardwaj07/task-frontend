// hooks/useRoleAccess.js
import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';

export function useRoleAccess(allowedRoles = []) {
  const { user } = useAuth();
  // console.log(allowedRoles)
  // console.log(allowedRoles.includes(user.role))

  if (!user || !user.role) return false;

  return allowedRoles.includes(user.role);
}
