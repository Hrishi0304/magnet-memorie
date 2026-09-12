import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated?: boolean;
}

export const PrivateRoute = ({ isAuthenticated = false }: PrivateRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};
