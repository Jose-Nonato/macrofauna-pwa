import { useLocalStorage } from "../../hooks/useLocalStorage";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { Content, Grid, Main } from "./styles";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage("sidebar", false);

  return (
    <Grid>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <Main>
        <Header setOpen={setSidebarOpen} />
        <Content>{children}</Content>
      </Main>
    </Grid>
  );
}
