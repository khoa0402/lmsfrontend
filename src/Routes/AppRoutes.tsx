import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Random from "../Components/Random";
import AdminDashboard from "../Layout/AdminDashboard";
import LoginPage from "../Pages/LoginPage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import EmployeeDashboard from "../Layout/EmployeeDashboard";
import EmployeeProfilePage from "../Pages/Employee/EmployeeProfilePage";
import ManagerDashboard from "../Layout/ManagerDashboard";
import ManagerProfilePage from "../Pages/Manager/ManagerProfilePage";
import EmployeeLeaveRequestPage from "../Pages/Employee/EmployeeLeaveRequestPage";
import ManagerLeaveRequestPage from "../Pages/Manager/ManagerLeaveRequestPage";
import ManagerLeaveRequestDetailsPage from "../Pages/Manager/ManagerLeaveRequestDetailsPage";
import ManagerDashBoardPage from "../Pages/Manager/ManagerDashBoardPage";
import ManagerEmployeePage from "../Pages/Manager/ManagerEmployeePage";
import EmployeeManagerPage from "../Pages/Employee/EmployeeManagerPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Random />} />
          <Route path="/departments" element={<Random />} />
          <Route path="/leave-requests" element={<Random />} />
          <Route path="/employees" element={<Random />} />
          <Route path="/view-leaves" element={<Random />} />
          <Route path="/charts" element={<Random />} />
        </Route>
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Random />} />
          <Route path="profile" element={<EmployeeProfilePage />} />
          <Route path="leave-requests" element={<EmployeeLeaveRequestPage />} />
          <Route path="managers" element={<EmployeeManagerPage />} />
        </Route>
        <Route
          path="/manager"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<ManagerDashBoardPage />} />
          <Route path="profile" element={<ManagerProfilePage />} />
          <Route path="leave-requests" element={<ManagerLeaveRequestPage />} />
          <Route
            path="leave-requests/:id"
            element={<ManagerLeaveRequestDetailsPage />}
          />
          <Route path="employees" element={<ManagerEmployeePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
