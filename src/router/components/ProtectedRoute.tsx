import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

export const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
