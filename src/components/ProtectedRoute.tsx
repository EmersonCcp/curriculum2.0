import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (!user) {
    // Redirect to login if there is no user session
    return <Navigate to="/login" replace />;
  }

  // Render the child routes if the user is authenticated
  return <Outlet />;
};
