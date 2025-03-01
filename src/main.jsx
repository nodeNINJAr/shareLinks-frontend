import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import '@ant-design/v5-patch-for-react-19';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
        </Route>
        {/* auth */}
        <Route path="auth/login" element={<Login/>} />
        <Route path="auth/register" element={<Register />} />
        {/*  */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);