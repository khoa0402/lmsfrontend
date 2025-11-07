import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Divider,
  Table,
  Badge,
  Group,
  Loader,
} from "@mantine/core";
import {
  IconMail,
  IconBriefcase,
  IconUser,
  IconBuilding,
  IconCalendarStats,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import {
  getEmployee,
  getEmployeesByManager,
} from "../../../Service/EmployeeProfileService";
import { getLeaveBalanceByEmployee } from "../../../Service/LeaveBalanceService";

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [profile, setProfile] = useState<any>(null);
  const [leaveBalance, setLeaveBalance] = useState<any>(null);

  // Fetch profile
  useEffect(() => {
    getEmployee()
      .then((data) => setProfile(data))
      .catch((error) => console.error(error));
  }, []);

  // Fetch leave balance
  useEffect(() => {
    getLeaveBalanceByEmployee()
      .then((data) =>
        setLeaveBalance({
          year: data.year,
          totalDefaultDays: data.annualAllowance,
          carriedOverDays: data.carryOver,
          usedDays: data.taken,
          pendingDays: data.pending,
          remainingDays: data.remaining,
        })
      )
      .catch((err) => console.error(err));
  }, [user?.profileId]);

  if (!profile || !leaveBalance) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader color="blue" size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-6">
          <Avatar src="/download.jpg" size={110} radius="xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <IconMail size={18} />
              <span>{profile.email}</span>
            </div>
            <Badge
              color={
                profile.role === "ROLE_ADMIN"
                  ? "red"
                  : profile.role === "ROLE_MANAGER"
                  ? "teal"
                  : "blue"
              }
              variant="light"
              mt="sm"
            >
              {profile.role === "ROLE_EMPLOYEE"
                ? "Employee"
                : profile.role.replace("ROLE_", "")}
            </Badge>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <Card
        withBorder
        shadow="md"
        radius="lg"
        className="mb-8 transition-all hover:shadow-lg"
      >
        <Group gap="xs" className="mb-4">
          <IconUser size={24} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Personal Information
          </h2>
        </Group>

        <Divider mb="md" />

        <Table striped highlightOnHover verticalSpacing="sm">
          <colgroup>
            <col style={{ width: "55%" }} /> {/* Label nhỏ hơn */}
            <col style={{ width: "45%" }} /> {/* Value rộng hơn */}
          </colgroup>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td className="font-medium text-gray-700">Name</Table.Td>
              <Table.Td className="text-gray-800">{profile.name}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-gray-700">Email</Table.Td>
              <Table.Td className="text-gray-800">{profile.email}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-gray-700">Title</Table.Td>
              <Table.Td className="text-gray-800">
                {profile.title ?? "-"}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-gray-700">
                Department
              </Table.Td>
              <Table.Td className="flex items-center gap-2 text-gray-800">
                <IconBuilding size={16} className="text-gray-500" />
                {profile.department ?? "-"}
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Card>

      {/* Leave Balance Card */}
      <Card
        withBorder
        shadow="md"
        radius="lg"
        className="transition-all hover:shadow-lg"
      >
        <Group gap="xs" className="mb-4">
          <IconCalendarStats size={24} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Leave Balance Summary
          </h2>
        </Group>

        <Divider mb="md" />

        <Table striped highlightOnHover verticalSpacing="sm">
          <colgroup>
            <col style={{ width: "55%" }} />
            <col style={{ width: "45%" }} />
          </colgroup>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td className="font-medium text-gray-700">
                Annual Leave Entitlement
              </Table.Td>
              <Table.Td className="text-gray-800">
                {leaveBalance.totalDefaultDays}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-gray-700">
                Carried Over
              </Table.Td>
              <Table.Td className="text-gray-800">
                {leaveBalance.carriedOverDays}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-gray-700">
                Leave Taken
              </Table.Td>
              <Table.Td className="text-gray-800">
                {leaveBalance.usedDays}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-gray-700">
                Pending Approval
              </Table.Td>
              <Table.Td className="text-gray-800">
                {leaveBalance.pendingDays}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="font-medium text-gray-700">
                Remaining Balance
              </Table.Td>
              <Table.Td>
                <Badge
                  color={
                    leaveBalance.remainingDays < 5
                      ? "red"
                      : leaveBalance.remainingDays < 10
                      ? "yellow"
                      : "green"
                  }
                  variant="filled"
                  size="lg"
                >
                  {leaveBalance.remainingDays}
                </Badge>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Profile;
