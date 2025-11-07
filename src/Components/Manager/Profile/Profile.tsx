import {
  Avatar,
  Button,
  Divider,
  Table,
  Card,
  Group,
  Text,
  Badge,
  ScrollArea,
} from "@mantine/core";
import { IconEdit, IconUser } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getManager } from "../../../Service/ManagerProfileService";

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    getManager()
      .then((data) => setProfile({ ...data }))
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <Card
        shadow="sm"
        radius="lg"
        className="p-8 mb-5 bg-white border border-gray-100"
      >
        <Group justify="space-between" align="center">
          <Group gap="lg">
            <Avatar
              variant="filled"
              src="/download.jpg"
              size={120}
              alt="avatar"
              radius="xl"
            />
            <div>
              <Text size="xl" fw={700} className="text-gray-900">
                {profile.name || "Unknown"}
              </Text>
              <Text size="sm" c="dimmed">
                {profile.email || "No email"}
              </Text>

              <div className="mt-3 flex flex-wrap gap-2">
                {profile.role && (
                  <Badge
                    color={profile.role === "ROLE_MANAGER" ? "blue" : "gray"}
                    variant="light"
                    radius="sm"
                  >
                    {profile.role === "ROLE_MANAGER"
                      ? "Manager"
                      : profile.role.replace("ROLE_", "")}
                  </Badge>
                )}
              </div>
            </div>
          </Group>
        </Group>
      </Card>

      {/* Personal Info */}
      <Card
        shadow="md"
        radius="lg"
        className="p-8 bg-white border border-gray-100"
      >
        <Group gap="xs" className="mb-4">
          <IconUser size={24} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Personal Information
          </h2>
        </Group>

        <Divider my="sm" />

        <ScrollArea>
          <Table
            verticalSpacing="sm"
            highlightOnHover
            withColumnBorders={false}
            className="rounded-lg overflow-hidden 
             [&>tbody>tr:nth-child(odd)]:bg-gray-200 
             [&>tbody>tr:nth-child(even)]:bg-white 
             [&>tbody>tr:hover]:bg-indigo-100 
             transition-colors duration-200"
          >
            <colgroup>
              <col style={{ width: "55%" }} />
              <col style={{ width: "45%" }} />
            </colgroup>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td className="font-medium text-gray-600 text-base">
                  Name
                </Table.Td>
                <Table.Td className="text-gray-800 text-base">
                  {profile.name ?? "-"}
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-medium text-gray-600 text-base">
                  Email
                </Table.Td>
                <Table.Td className="text-gray-800 text-base">
                  {profile.email ?? "-"}
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-medium text-gray-600 text-base">
                  Title
                </Table.Td>
                <Table.Td className="text-gray-800 text-base">
                  {profile.title ?? "-"}
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-medium text-gray-600 text-base">
                  Department
                </Table.Td>
                <Table.Td className="text-gray-800 text-base">
                  {profile.department ?? "-"}
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-medium text-gray-600 text-base">
                  Role
                </Table.Td>
                <Table.Td className="text-gray-800 text-base">
                  {profile.role === "ROLE_MANAGER"
                    ? "Manager"
                    : profile.role ?? "-"}
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Profile;
