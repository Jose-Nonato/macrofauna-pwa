import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log(user);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
