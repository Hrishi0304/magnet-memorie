import { Navigate, Outlet } from "react-router-dom";

interface PublicRouteProps {
  isAuthenticated?: boolean;
  restricted?: boolean; // if true, authenticated users cannot access (e.g. login page)
}

export const PublicRoute = ({ isAuthenticated = false, restricted = false }: PublicRouteProps) => {
  if (isAuthenticated && restricted) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};
