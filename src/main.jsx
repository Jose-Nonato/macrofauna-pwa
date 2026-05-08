import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import "./index.css";

import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
