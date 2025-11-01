import { Avatar, Text } from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconCalendarSearch,
  IconChartPie4,
  IconLayoutDashboard,
  IconUsers,
  IconClipboardText,
  IconBuildings,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    url: "/manager/dashboard",
    icon: <IconLayoutDashboard stroke={1.5} />,
  },
  {
    name: "Profile",
    url: "/manager/profile",
    icon: <IconUser stroke={1.5} />,
  },
  {
    name: "Leave Requests",
    url: "/manager/leave-requests",
    icon: <IconClipboardText stroke={1.5} />,
  },
  {
    name: "Employees",
    url: "/manager/employees",
    icon: <IconUsers stroke={1.5} />,
  },
  {
    name: "Departments",
    url: "/manager/departments",
    icon: <IconBuildingSkyscraper stroke={1.5} />,
  },
  {
    name: "View Leaves",
    url: "/manager/view-leaves",
    icon: <IconCalendarSearch stroke={1.5} />,
  },
  {
    name: "Charts",
    url: "/manager/charts",
    icon: <IconChartPie4 stroke={1.5} />,
  },
];

const Sidebar = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <div className="flex">
      <div className="w-64"></div>
      <div className="w-64 fixed h-screen bg-black flex flex-col items-center gap-7 pt-3">
        <div className="flex flex-col items-center">
          <div className="flex items-end text-cyan-500 gap-1">
            <IconBuildings size={35} stroke={1.5} />
            <h1 className="font-bold text-2xl">LMS</h1>
          </div>
          <p className="text-cyan-100/70 text-xs">
            Employee Leave Management System
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="p-2 bg-slate-500 rounded-full shadow-lg shadow-gray-500">
            <Avatar src="/download.jpg" size="xl" alt="it's me" />
          </div>
          <span className="text-white font-medium text-md">{user.name}</span>
          <Text c="dimmed" tt="uppercase" size="xs" fw="bold">
            {user.role}
          </Text>
        </div>
        <div className="flex flex-col items-center gap-1">
          {links.map((link) => {
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
