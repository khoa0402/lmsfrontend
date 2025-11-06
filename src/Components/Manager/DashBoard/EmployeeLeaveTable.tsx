import { Card, Table, Text } from "@mantine/core";
import { EmployeeLeaveSummary } from "./DashboardType";

interface Props {
  data: EmployeeLeaveSummary[];
}

export function EmployeeLeaveTable({ data }: Props) {
  return (
    <Card shadow="sm" radius="md" p="md" withBorder>
      <Text fw={500} mb="sm">
        Employee Leave Summary
      </Text>
      <Table highlightOnHover striped withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Used</Table.Th>
            <Table.Th>Remaining</Table.Th>
            <Table.Th>Carried Over</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((emp) => (
            <Table.Tr key={emp.employeeId}>
              <Table.Td>{emp.employeeName}</Table.Td>
              <Table.Td>{emp.usedDays}</Table.Td>
              <Table.Td>{emp.remainingDays}</Table.Td>
              <Table.Td>{emp.carriedOverDays}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
