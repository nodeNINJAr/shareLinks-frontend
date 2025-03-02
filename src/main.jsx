import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "@ant-design/v5-patch-for-react-19";
import AuthProvider from "./context/AuthProvider.jsx";
import Layout from "./Layout.jsx";
import App from "./pages/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path="app" element={<App />} />
          </Route>
          {/* auth */}
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          {/*  */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
