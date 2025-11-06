import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Text,
  Group,
  Loader,
  ThemeIcon,
  Stack,
} from "@mantine/core";
import { useSelector } from "react-redux";
import {
  IconUsers,
  IconCalendarStats,
  IconCalendarMonth,
} from "@tabler/icons-react";
import { ManagerDashboard } from "./DashboardType";
import { getManagerDashboard } from "../../../Service/DashboardService";
import LeaveBarChart from "./LeaveBarChart";
import LeavePieChart from "./LeavePieChart";
import { EmployeeLeaveTable } from "./EmployeeLeaveTable";

const Dashboard = () => {
  const [data, setData] = useState<ManagerDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.user);
  console.log("User from Redux:", user);
  const managerId = user?.id;

  useEffect(() => {
    if (!managerId) return;
    (async () => {
      try {
        const res = await getManagerDashboard(managerId);
        setData(res);
      } catch (error) {
        console.error("Dashboard API error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [managerId]);

  if (loading)
    return (
      <Group justify="center" mt="xl">
        <Loader size="lg" />
      </Group>
    );

  if (!data) return <Text ta="center">Error loading dashboard</Text>;

  return (
    <div
      style={{ padding: 24, backgroundColor: "#f9fafb", minHeight: "100vh" }}
    >
      {/* ================= Thẻ tổng hợp ================= */}
      <Grid gutter="md" mb="lg">
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card
            shadow="md"
            radius="lg"
            p="lg"
            style={{
              background: "linear-gradient(135deg, #4dabf7 0%, #228be6 100%)",
              color: "white",
            }}
          >
            <Group align="center" justify="space-between">
              <ThemeIcon size={48} radius="md" variant="light" color="white">
                <IconUsers size={32} />
              </ThemeIcon>
              <Stack gap={0}>
                <Text size="sm" opacity={0.9}>
                  Total Employees
                </Text>
                <Text fz="xl" fw={700}>
                  {data.totalEmployees}
                </Text>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card
            shadow="md"
            radius="lg"
            p="lg"
            style={{
              background: "linear-gradient(135deg, #40c057 0%, #2b8a3e 100%)",
              color: "white",
            }}
          >
            <Group align="center" justify="space-between">
              <ThemeIcon size={48} radius="md" variant="light" color="white">
                <IconCalendarStats size={32} />
              </ThemeIcon>
              <Stack gap={0}>
                <Text size="sm" opacity={0.9}>
                  Total Leave Requests
                </Text>
                <Text fz="xl" fw={700}>
                  {data.totalLeaveRequests}
                </Text>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card
            shadow="md"
            radius="lg"
            p="lg"
            style={{
              background: "linear-gradient(135deg, #fcc419 0%, #f08c00 100%)",
              color: "white",
            }}
          >
            <Group align="center" justify="space-between">
              <ThemeIcon size={48} radius="md" variant="light" color="white">
                <IconCalendarMonth size={32} />
              </ThemeIcon>
              <Stack gap={0}>
                <Text size="sm" opacity={0.9}>
                  Leave Requests This Month
                </Text>
                <Text fz="xl" fw={700}>
                  {data.leaveRequestsThisMonth}
                </Text>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* ================= Biểu đồ ================= */}
      <Grid gutter="md" mb="lg" align="stretch">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card shadow="sm" radius="md" p="sm" withBorder>
            <LeaveBarChart data={data.leaveTypeByMonth} />
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card
            shadow="sm"
            radius="md"
            p="sm"
            withBorder
            style={{ height: "100%" }}
          >
            <LeavePieChart data={data.leaveStatusSummary} />
          </Card>
        </Grid.Col>
      </Grid>

      {/* ================= Bảng dữ liệu ================= */}
      <Card shadow="sm" radius="md" p="md" withBorder>
        <EmployeeLeaveTable data={data.employeeLeaveSummary} />
      </Card>
    </div>
  );
};

export default Dashboard;
