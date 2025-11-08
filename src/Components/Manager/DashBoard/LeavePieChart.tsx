import { Card, Text, Group, Badge, Center } from "@mantine/core";
import { PieChart } from "@mantine/charts";

interface LeaveType {
  type: string;
  days: number;
}

interface LeavePieChartProps {
  data: LeaveType[];
}

const LeavePieChart = ({ data }: LeavePieChartProps) => {
  if (!data) return null;

  const colors = [
    "teal.6",
    "orange.6",
    "blue.6",
    "grape.6",
    "red.6",
    "indigo.6",
  ];

  const chartData = data.map((item, index) => ({
    name: item.type,
    value: item.days,
    color: colors[index % colors.length],
  }));

  return (
    <Card shadow="xs" radius="md" p="lg" withBorder>
      <Text fw={500} mb="sm" ta="center" size="sm">
        Leave Type Distribution
      </Text>

      <Center mb="xs">
        <PieChart data={chartData} withLabels withTooltip w={220} h={220} />
      </Center>

      <Group justify="center" mt="sm" gap="xs" wrap="wrap">
        {chartData.map((item) => (
          <Badge key={item.name} color={item.color} variant="light" size="sm">
            {item.name} ({item.value})
          </Badge>
        ))}
      </Group>
    </Card>
  );
};

export default LeavePieChart;
