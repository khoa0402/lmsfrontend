import React from "react";
import Sidebar from "../Components/Manager/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";

const ManagerDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full overflow-hidden flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerDashboard;
