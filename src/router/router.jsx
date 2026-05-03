import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../components/AuthGuard";
import AppLayout from "../layouts/AppLayout/AppLayout";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Register from "../pages/Register/Register";
import Profiles from "../pages/Profiles/Profiles";
import CreateSamples from "../pages/CreateSamples/CreateSamples";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <AppLayout>
          <Dashboard />
        </AppLayout>
      </AuthGuard>
    ),
  },
  {
    path: "/profiles",
    element: (
      <AuthGuard>
        <AppLayout>
          <Profiles />
        </AppLayout>
      </AuthGuard>
    ),
  },
  {
    path: "/create",
    element: (
      <AuthGuard>
        <AppLayout>
          <CreateSamples />
        </AppLayout>
      </AuthGuard>
    ),
  },
]);
