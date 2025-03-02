import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { HomeOutlined, AppstoreOutlined, LinkOutlined, UserOutlined, MenuOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  // Toggle login/logout
  const handleLoginLogout = async () => {
    if (user) {
      await logOut();
      navigate("/");
    } else {
      navigate("/auth/login");
    }
    setMenuVisible(false);
  };

  // Handle navigation for menu items
  const handleNavigation = (path) => {
    navigate(path);
    setMenuVisible(false);
  };

  return (
    <header className=" w-full bg-transparent z-50 px-6 py-4 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button onClick={() => setMenuVisible(!menuVisible)} className="md:hidden text-xl cursor-pointer">
          <MenuOutlined />
        </button>
        <h1 className="text-lg font-semibold text-gray-700">MyApp</h1>
      </div>
      
      {/* Mobile Menu */}
      {menuVisible && (
        <nav className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50">
          <ul className="flex flex-col items-start p-4 space-y-3">
            <li onClick={() => handleNavigation("/")} className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-blue-500"><HomeOutlined /> Home</li>
            <li onClick={() => handleNavigation("/app")} className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-blue-500"><AppstoreOutlined /> App</li>
            <li onClick={() => handleNavigation("/my-links")} className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-blue-500"><LinkOutlined /> My Links</li>
          </ul>
        </nav>
      )}
      
      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-500 flex items-center gap-2"><HomeOutlined /> Home</Link>
        <Link to="/app" className="text-gray-700 hover:text-blue-500 flex items-center gap-2"><AppstoreOutlined /> App</Link>
        <Link to="/my-links" className="text-gray-700 hover:text-blue-500 flex items-center gap-2"><LinkOutlined /> My Links</Link>
      </nav>
      
      {/* Profile & Login/Logout */}
      <div className="flex items-center gap-4">
        {user ? (
          <img src={user?.displayURL} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
        ) : (
          <UserOutlined className="text-xl text-gray-700 cursor-pointer" />
        )}
        <button onClick={handleLoginLogout} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
          {user ? <LogoutOutlined /> : <LoginOutlined />} {user ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
