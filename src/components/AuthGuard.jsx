import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando ...</div>;

  if (!user) return <Navigate to={"/"} replace />;

  return children;
}
