import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, User, LogOut, X, Bug } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Close,
  Container,
  Footer,
  Item,
  LogoutBtn,
  MobileOverlay,
  Nav,
  Top,
  Logo,
} from "./styles";

export default function Sidebar({ open, setOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Amostras", icon: Bug, path: "/samples" },
    { label: "Perfil", icon: User, path: "/profiles" },
  ];

  function go(path) {
    navigate(path);
    setOpen(false);
  }

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <>
      <MobileOverlay open={open} onClick={() => setOpen(false)} />

      <Container open={open}>
        <Top>
          <Logo src="/logo_vertical_branca.png" />
          <Close onClick={() => setOpen(false)}>
            <X size={20} />
          </Close>
        </Top>

        <Nav>
          {menu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Item
                key={item.path}
                active={active}
                onClick={() => go(item.path)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Item>
            );
          })}
        </Nav>

        <Footer>
          <LogoutBtn onClick={handleLogout}>
            <LogOut size={20} />
            <span>Sair</span>
          </LogoutBtn>
        </Footer>
      </Container>
    </>
  );
}
