import { Card, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";

interface Trend {
  month: number;
  days: number;
}

interface LeaveBarChartProps {
  data: Trend[];
}

const LeaveBarChart = ({ data }: LeaveBarChartProps) => {
  if (!data) return null;

  const chartData = data.map((item) => ({
    month: new Date(2024, item.month - 1).toLocaleString("default", {
      month: "short",
    }),
    days: item.days,
  }));

  return (
    <Card shadow="sm" radius="md" p="sm" withBorder>
      <Text fw={500} mb="sm">
        Leave Days In Year
      </Text>
      <BarChart
        h={300}
        data={chartData}
        dataKey="month"
        series={[{ name: "days", color: "blue.6" }]}
      />
    </Card>
  );
};

export default LeaveBarChart;
