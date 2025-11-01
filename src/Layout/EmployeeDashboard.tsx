import React from "react";
import Sidebar from "../Components/Employee/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full overflow-hidden flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
