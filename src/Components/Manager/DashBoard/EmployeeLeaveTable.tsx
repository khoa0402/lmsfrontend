import { Card, Table, Text } from "@mantine/core";
import { TeamLeaveBalance } from "./DashboardType";

interface Props {
  data: TeamLeaveBalance[];
}

export function EmployeeLeaveTable({ data }: Props) {
  return (
    <Card shadow="sm" radius="md" p="md" withBorder>
      <Text fw={500} mb="sm">
        Team Leave Balance
      </Text>
      <Table highlightOnHover striped withTableBorder>
        <colgroup>
          <col style={{ width: "65%" }} />
          <col style={{ width: "35%" }} />
        </colgroup>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Remaining Days</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((emp) => (
            <Table.Tr key={emp.userId}>
              <Table.Td>{emp.name}</Table.Td>
              <Table.Td>{emp.remaining}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
