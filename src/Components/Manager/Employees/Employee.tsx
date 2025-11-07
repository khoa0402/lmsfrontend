import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode } from "primereact/api";
import { ActionIcon, Badge, Card, Group, Text } from "@mantine/core";
import {
  IconSearch,
  IconBriefcase,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import {
  getAllEmployees,
  getEmployeesByManager,
} from "../../../Service/EmployeeProfileService";
import { getAllDepartment } from "../../../Service/UserService";

const roleLabel = (role: string) => {
  switch (role) {
    case "ROLE_ADMIN":
      return "Admin";
    case "ROLE_MANAGER":
      return "Manager";
    case "ROLE_EMPLOYEE":
      return "Employee";
    default:
      return role ?? "-";
  }
};

const Employee = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({
    department: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empRes = await getAllEmployees();
        const list = empRes.content || empRes || [];

        const enrichedEmployees = await Promise.all(
          list.map(async (emp: any) => {
            try {
              const detail = await getEmployeesByManager(emp.id);
              return { ...emp, department: detail.department || "-" };
            } catch (err) {
              console.warn(`Không lấy được department của user ${emp.id}`);
              return { ...emp, department: "-" };
            }
          })
        );
        setEmployees(enrichedEmployees);

        const deptRes = await getAllDepartment();
        const deptOptions = deptRes.map((d: any) => ({
          label: d.name,
          value: d.name,
        }));
        setDepartments(deptOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleViewDetail = async (userId: any) => {
    try {
      const data = await getEmployeesByManager(userId);
      setSelectedEmployee(data);
      setShowDetail(true);
    } catch (error) {
      console.error(error);
    }
  };

  const actionBodyTemplate = (rowData: any) => (
    <ActionIcon
      variant="subtle"
      color="blue"
      onClick={() => handleViewDetail(rowData.id)}
      title="View Details"
    >
      <IconSearch size={18} stroke={1.7} />
    </ActionIcon>
  );

  const roleBodyTemplate = (rowData: any) => {
    const label = roleLabel(rowData.role);
    const color =
      label === "Admin" ? "red" : label === "Manager" ? "teal" : "blue";
    return (
      <Badge color={color} variant="light" radius="sm">
        {label}
      </Badge>
    );
  };

  const departmentFilterTemplate = (options: any) => (
    <Dropdown
      value={options.value}
      options={departments}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="All departments"
      showClear
      className="p-column-filter"
      style={{
        width: "13rem",
        height: "3rem",
        marginTop: "-20px",
      }}
    />
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex gap-2 items-center">
          <IconUsers stroke={3} className="text-blue-400" />
          User Directory
        </h2>
      </div>

      <Card shadow="sm" radius="md" padding="lg" withBorder>
        <DataTable
          value={employees}
          paginator
          rows={8}
          stripedRows
          responsiveLayout="scroll"
          className="text-[15px] shadow-sm [&_.p-datatable-thead>tr>th]:bg-slate-300 [&_.p-datatable-tbody>tr:nth-child(even)]:bg-slate-200 
             [&_.p-datatable-tbody>tr:nth-child(odd)]:bg-white 
             [&_.p-datatable-tbody>tr:hover]:bg-indigo-200"
          filters={filters}
          onFilter={(e) => setFilters(e.filters)}
          filterDisplay="row"
          emptyMessage="No employees found."
          rowHover
        >
          <Column
            field="name"
            header="Full Name"
            sortable
            style={{ minWidth: "180px" }}
            body={(row) => (
              <div className="flex items-center gap-2">
                <IconUser size={18} className="text-blue-500" />
                <span>{row.name}</span>
              </div>
            )}
          ></Column>

          <Column
            field="department"
            header="Department"
            sortable
            filter
            filterElement={departmentFilterTemplate}
            showFilterMenu={false}
            style={{ minWidth: "180px" }}
            body={(row) => (
              <div className="flex items-center gap-2">
                <IconBriefcase size={16} className="text-gray-600" />
                <span>{row.department || "-"}</span>
              </div>
            )}
          ></Column>

          <Column
            header="Role"
            body={roleBodyTemplate}
            sortable
            style={{ width: "150px" }}
          ></Column>

          <Column
            header="Action"
            body={actionBodyTemplate}
            style={{ width: "100px", textAlign: "center" }}
          ></Column>
        </DataTable>
      </Card>

      {/* Employee detail dialog */}
      <Dialog
        header={
          <div className="flex items-center gap-2">
            <IconUser size={20} className="text-blue-500" />
            <span className="font-semibold text-gray-800">
              Employee Details
            </span>
          </div>
        }
        visible={showDetail}
        onHide={() => setShowDetail(false)}
        style={{ width: "30vw" }}
        className="rounded-xl"
      >
        {selectedEmployee ? (
          <div className="space-y-4 text-sm text-gray-700">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium text-gray-600">Name:</span>
              <span>
                {selectedEmployee.name ??
                  `${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
              </span>
              <span className="font-medium text-gray-600">Email:</span>
              <span>{selectedEmployee.email}</span>
              <span className="font-medium text-gray-600">Role:</span>
              <span>{roleLabel(selectedEmployee.role)}</span>
              <span className="font-medium text-gray-600">Department:</span>
              <span>{selectedEmployee.department ?? "-"}</span>
              <span className="font-medium text-gray-600">Title:</span>
              <span>{selectedEmployee.title ?? "-"}</span>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Dialog>
    </div>
  );
};

export default Employee;
