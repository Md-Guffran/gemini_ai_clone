import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthContainer from './auth/AuthContainer';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <AuthContainer />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;