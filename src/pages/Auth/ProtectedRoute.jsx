import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Header from "../AdminDashboard/Header.jsx";
import Sidebar from "../AdminDashboard/Sidebar.jsx";
import { useAuth } from "../../context/contextApi.jsx";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  if (!user) return <Navigate to="/" />;
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <main className="main-container">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedRoute;
