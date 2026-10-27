import { Navigate } from 'react-router'; // o 'react-router-dom' dependiendo de tu versión

export default function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}