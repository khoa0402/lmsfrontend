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
import {
  getLeaveBalanceDashboard,
  getSummaryDashboard,
} from "../../../Service/DashboardService";
import { DashboardData } from "./DashboardType";
import LeaveBarChart from "./LeaveBarChart";
import LeavePieChart from "./LeavePieChart";
import { EmployeeLeaveTable } from "./EmployeeLeaveTable";

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    (async () => {
      try {
        const [leaveBalance, summary] = await Promise.all([
          getLeaveBalanceDashboard(),
          getSummaryDashboard(),
        ]);
        console.log("Leave Balance Data:", leaveBalance);
        console.log("Summary Data:", summary);
        setData({ leaveBalance, summary });
      } catch (error) {
        console.error("Dashboard API error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <Group justify="center" mt="xl">
        <Loader size="lg" />
      </Group>
    );

  if (!data) return <Text ta="center">Error loading dashboard</Text>;

  const { leaveBalance, summary } = data;

  return (
    <div
      style={{ padding: 24, backgroundColor: "#f9fafb", minHeight: "100vh" }}
    >
      {/* Summary Cards */}
      <Grid gutter="md" mb="lg">
        {/* Team Members */}
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card
            shadow="sm"
            radius="lg"
            p="lg"
            style={{
              background: "linear-gradient(135deg, #e7f5ff 0%, #d0ebff 100%)",
              color: "#0b7285", // chữ đậm hơn
            }}
          >
            <Group align="center" justify="space-between">
              <ThemeIcon
                size={48}
                radius="md"
                variant="light"
                color="blue"
                style={{ backgroundColor: "#a5d8ff" }}
              >
                <IconUsers size={32} />
              </ThemeIcon>
              <Stack gap={0}>
                <Text size="sm" fw={600}>
                  Team Members
                </Text>
                <Text fz="xl" fw={800}>
                  {leaveBalance.length}
                </Text>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>

        {/* Total Leave Requests */}
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card
            shadow="sm"
            radius="lg"
            p="lg"
            style={{
              background: "linear-gradient(135deg, #ebfbee 0%, #d3f9d8 100%)",
              color: "#2b8a3e",
            }}
          >
            <Group align="center" justify="space-between">
              <ThemeIcon
                size={48}
                radius="md"
                variant="light"
                color="green"
                style={{ backgroundColor: "#b2f2bb" }}
              >
                <IconCalendarStats size={32} />
              </ThemeIcon>
              <Stack gap={0}>
                <Text size="sm" fw={600}>
                  Total Leave Requests
                </Text>
                <Text fz="xl" fw={800}>
                  {summary.totalRequests}
                </Text>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>

        {/* Total Days Taken */}
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card
            shadow="sm"
            radius="lg"
            p="lg"
            style={{
              background: "linear-gradient(135deg, #fff9db 0%, #fff3bf 100%)",
              color: "#ad6800", // vàng đậm hơn
            }}
          >
            <Group align="center" justify="space-between">
              <ThemeIcon
                size={48}
                radius="md"
                variant="light"
                color="yellow"
                style={{ backgroundColor: "#ffe066" }}
              >
                <IconCalendarMonth size={32} />
              </ThemeIcon>
              <Stack gap={0}>
                <Text size="sm" fw={600}>
                  Total Days Taken
                </Text>
                <Text fz="xl" fw={800}>
                  {summary.totalDaysTaken}
                </Text>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Charts */}
      <Grid gutter="md" mb="lg" align="stretch">
        <Grid.Col span={{ base: 12, md: 7.5 }}>
          <Card shadow="xs" radius="md" p="md" withBorder>
            <LeaveBarChart data={summary.trendsByMonth} />
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4.5 }}>
          <Card
            shadow="xs"
            radius="md"
            p="md"
            withBorder
            style={{ height: "100%" }}
          >
            <LeavePieChart data={summary.countByLeaveType} />
          </Card>
        </Grid.Col>
      </Grid>

      {/* Employee Leave Table */}
      <Card shadow="xs" radius="md" p="md" withBorder>
        <EmployeeLeaveTable data={leaveBalance} />
      </Card>
    </div>
  );
};

export default Dashboard;
