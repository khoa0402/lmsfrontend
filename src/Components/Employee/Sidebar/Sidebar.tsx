import React, { useEffect, useState } from "react";
import { Avatar, Text } from "@mantine/core";
import {
  IconClipboardText,
  IconBuildings,
  IconUser,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getEmployee } from "../../../Service/EmployeeProfileService";

const links = [
  {
    name: "Profile",
    url: "/role_employee/profile",
    icon: <IconUser stroke={1.5} />,
  },
  {
    name: "Leave Requests",
    url: "/role_employee/leave-requests",
    icon: <IconClipboardText stroke={1.5} />,
  },
];

const Sidebar = () => {
  const user = useSelector((state: any) => state.user);
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEmployee();
        setEmployee(res); // {name, email, role,...}
      } catch (error) {
        console.error("Failed to fetch employee info:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <div className="w-64"></div>
      <div className="w-64 fixed h-screen bg-black flex flex-col items-center gap-7 pt-3">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="flex items-end text-cyan-500 gap-1">
            <IconBuildings size={35} stroke={1.5} />
            <h1 className="font-bold text-2xl">LMS</h1>
          </div>
          <p className="text-cyan-100/70 text-xs">Leave Management System</p>
        </div>

        {/* Avatar + User information */}
        <div className="flex flex-col items-center gap-1">
          <div className="p-2 bg-slate-500 rounded-full shadow-lg shadow-gray-500">
            <Avatar src="/download.jpg" size="xl" alt="avatar" />
          </div>

          <span className="text-white font-medium text-md">
            {employee?.name}
          </span>

          <Text c="dimmed" tt="uppercase" size="xs" fw="bold">
            {employee?.role === "ROLE_EMPLOYEE" ? "Employee" : "Unknown Role"}
          </Text>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col items-center gap-1 mt-3">
          {links.map((link) => (
            <NavLink
              to={link.url}
              key={link.url}
              className={({ isActive }) =>
                `flex items-center gap-3 w-48 text-sm px-5 py-2 rounded-lg ${
                  isActive
                    ? "bg-zinc-600 font-bold text-white"
                    : "hover:bg-neutral-700 font-normal text-gray-300"
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
