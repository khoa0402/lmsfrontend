import { Card, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";

interface LeaveBarChartProps {
  data: Record<number, Record<string, number>>;
}

const LeaveBarChart = ({ data }: LeaveBarChartProps) => {
  if (!data) return null;

  // ✅ Chuyển dữ liệu từ object sang mảng
  const chartData = Object.entries(data).map(([month, types]) => ({
    month: new Date(2024, Number(month) - 1).toLocaleString("default", {
      month: "short",
    }),
    ...types,
  }));

  // ✅ Danh sách các loại leave (VD: Annual Leave, Sick Leave,…)
  const leaveTypes =
    chartData.length > 0
      ? Object.keys(chartData[0]).filter((k) => k !== "month")
      : [];

  // 🎨 Màu sắc khác nhau cho từng loại leave
  const colorPalette = [
    "indigo.6",
    "teal.6",
    "orange.6",
    "blue.6",
    "grape.6",
    "red.6",
    "cyan.6",
    "lime.6",
  ];

  // ✅ Cấu hình series với màu tự động
  const series = leaveTypes.map((type, index) => ({
    name: type,
    color: colorPalette[index % colorPalette.length],
  }));

  return (
    <Card shadow="sm" radius="md" p="sm" withBorder>
      <Text fw={500} mb="sm">
        Leave Requests by Month (Leave Type)
      </Text>
      <BarChart
        h={300}
        data={chartData}
        dataKey="month"
        series={series}
        withLegend
        legendProps={{
          verticalAlign: "bottom",
          layout: "horizontal",
          align: "center",
          wrapperStyle: { marginTop: 10 },
        }}
      />
    </Card>
  );
};

export default LeaveBarChart;
