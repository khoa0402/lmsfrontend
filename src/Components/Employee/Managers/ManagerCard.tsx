import { Avatar } from "@mantine/core";
import React from "react";
import { formatDate } from "../../../Utility/DateUtility";

interface EmployeeCardProps {
  name: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  department: string;
}

const ManagerCard: React.FC<EmployeeCardProps> = ({
  name,
  email,
  dob,
  phone,
  address,
  department,
}) => {
  // 🎨 Danh sách màu có sẵn của Mantine
  const colors = [
    "blue",
    "green",
    "red",
    "orange",
    "grape",
    "teal",
    "indigo",
    "cyan",
    "lime",
    "violet",
  ];

  // 🔢 Hàm chọn màu dựa trên ký tự đầu tiên của tên (giúp ổn định, không đổi mỗi lần render)
  const getColorFromName = (name: string) => {
    if (!name) return "gray";
    const index = name.toUpperCase().charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="border p-3 rounded-lg shadow-sm hover:shadow-md cursor-pointer space-y-2 transition-all duration-200">
      <div className="flex items-center gap-3">
        <Avatar
          name={name}
          color={getColorFromName(name)}
          variant="filled"
          radius="xl"
          size="md"
        />
        <div className="font-semibold">{name}</div>
      </div>
      <div className="flex justify-between text-sm items-center gap-2">
        <div className="text-gray-600">Email:</div>
        <div>{email}</div>
      </div>
      <div className="flex justify-between text-sm items-center gap-2">
        <div className="text-gray-600">Date of Birth:</div>
        <div>{formatDate(dob)}</div>
      </div>
      <div className="flex justify-between text-sm items-center gap-2">
        <div className="text-gray-600">Phone:</div>
        <div>{phone}</div>
      </div>
      <div className="flex justify-between text-sm items-center gap-2">
        <div className="text-gray-600">Address:</div>
        <div>{address}</div>
      </div>
      <div className="flex justify-between text-sm items-center gap-2">
        <div className="text-gray-600">Department:</div>
        <div>{department}</div>
      </div>
    </div>
  );
};

export default ManagerCard;
