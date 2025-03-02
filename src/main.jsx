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
import MyLinksTable from "./pages/MyLinksTable.jsx";
import PrivateRoute from "./private/PrivateRoute.jsx";
import UpdateForm from "./components/UpdateForm.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
         <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout/>}>
               <Route index element={<Home />} />
                <Route path="app" element={<App />} />
                <Route path="my-links" element={<PrivateRoute><MyLinksTable /></PrivateRoute>} />
                <Route path="my-links/:id/update" element={<PrivateRoute><UpdateForm /></PrivateRoute>} />
              </Route>
             {/* auth */}
              <Route path="auth/login" element={<Login />} />
              <Route path="auth/register" element={<Register />} />
             {/*  */}
           </Routes>
         </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
