import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { Tag } from "primereact/tag";
import {
  ActionIcon,
  Button,
  LoadingOverlay,
  Modal,
  SegmentedControl,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconEdit, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { getManagerDropdowns } from "../../../Service/ManagerProfileService";
import { DateTimePicker } from "@mantine/dates";
import { leaveTypes } from "../../../Data/DropdownData";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import {
  errorNotification,
  successNotification,
} from "../../../Utility/NotificationUtil";
import {
  getLeaveRequestByEmployee,
  scheduleLeaveRequest,
} from "../../../Service/LeaveRequestService";
import { formatDateWithTime } from "../../../Utility/DateUtility";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { Toolbar } from "primereact/toolbar";
import { getEmployee } from "../../../Service/EmployeeProfileService";

const LeaveRequest = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("Today");
  const [managers, setManagers] = useState<any[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const user = useSelector((state: any) => state.user);
  console.log("User from Redux:", user);
  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    managerName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    leaveTypes: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    status: { value: null, matchMode: FilterMatchMode.IN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const getSeverity = (status: any) => {
    switch (status) {
      case "REJECTED":
        return "danger";

      case "APPROVED":
        return "success";

      case "PENDING":
        return "info";

      default:
        return null;
    }
  };

  const fetchLeaveRequests = () => {
    getLeaveRequestByEmployee()
      .then((data) => {
        console.log("Leave request API data:", data);
        setLeaveRequests(getCustomers(data.data));
      })
      .catch((error) => {
        errorNotification("Failed to fetch leave requests.");
        console.error("Error fetching leave requests:", error);
      });
  };

  useEffect(() => {
    const fetchLeaveRequests = () => {
      getLeaveRequestByEmployee()
        .then((data) => {
          const customers = getCustomers(data.data);
          const sorted = customers.sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
          setLeaveRequests(sorted);
        })
        .catch((error) => {
          errorNotification("Failed to fetch leave requests.");
          console.error("Error fetching leave requests:", error);
        });
    };

    fetchLeaveRequests();

    //Polling mỗi 10 giây
    const interval = setInterval(fetchLeaveRequests, 10000);

    return () => clearInterval(interval);
  }, []);

  const getCustomers = (data: any[]) => {
    if (!data) return [];
    return data.map((d) => ({
      ...d,
      startDate: new Date(d.startDate),
      endDate: new Date(d.endDate),
    }));
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters: any = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const form = useForm({
    initialValues: {
      employeeId: user.profileId,
      startDate: new Date(),
      endDate: new Date(),
      type: "",
      reason: "",
    },

    validate: {
      startDate: (value: any) =>
        !value ? "Start Date is required" : undefined,
      endDate: (value: any) => (!value ? "End Date is required" : undefined),
      type: (value: any) => (!value ? "Leave Type is required" : undefined),
      reason: (value: any) => (!value ? "Reason is required" : undefined),
    },
  });

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <Button leftSection={<IconPlus />} onClick={open} variant="filled">
          Schedule Leave Request
        </Button>
        <TextInput
          leftSection={<IconSearch />}
          fw={500}
          placeholder="Search"
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
        />
      </div>
    );
  };

  const statusBodyTemplate = (rowData: any) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  // const handleDelete = (rowData: any) => {
  //   modals.openConfirmModal({
  //     title: <span className="text-xl font-semibold">Are you sure</span>,
  //     centered: true,
  //     children: (
  //       <Text size="sm">
  //         Are you sure you want to cancel this leave request? This action cannot
  //         be undone.
  //       </Text>
  //     ),
  //     labels: { confirm: "Confirm", cancel: "Cancel" },
  //     onConfirm: () => {
  //       cancelLeaveRequest(rowData.id)
  //         .then(() => {
  //           successNotification("Leave request cancelled successfully.");
  //           fetchLeaveRequests();
  //         })
  //         .catch((error) => {
  //           errorNotification(
  //             error?.response?.data?.errorMessage ||
  //               "Failed to cancel leave request."
  //           );
  //         });
  //     },
  //   });
  // };

  // const actionBodyTemplate = (rowData: any) => {
  //   return (
  //     <div className="flex gap-2">
  //       <ActionIcon>
  //         <IconEdit size={20} stroke={1.5} />
  //       </ActionIcon>
  //       <ActionIcon color="red" onClick={() => handleDelete(rowData)}>
  //         <IconTrash size={20} stroke={1.5} />
  //       </ActionIcon>
  //     </div>
  //   );
  // };

  const header = renderHeader();

  const handleSubmit = (values: any) => {
    const payload = {
      leaveType: values.type,
      startDate: new Date(values.startDate).toISOString(),
      endDate: new Date(values.endDate).toISOString(),
      reason: values.reason,
    };
    console.log("Schedule Leave Request with values:", payload);
    setLoading(true);
    scheduleLeaveRequest(payload)
      .then((data) => {
        close();
        form.reset();
        successNotification("Leave request scheduled successfully.");
        fetchLeaveRequests();
      })
      .catch((error) => {
        errorNotification(
          error?.response?.data?.errorMessage ||
            "Failed to schedule leave request."
        );
      })
      .finally(() => setLoading(false));
  };

  const timeTemplateFrom = (rowData: any) => {
    const date = new Date(rowData.startDate);
    return (
      <span>
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    );
  };

  const timeTemplateTo = (rowData: any) => {
    const date = new Date(rowData.endDate);
    return (
      <span>
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <Button leftSection={<IconPlus />} onClick={open} variant="filled">
        Schedule Leave Request
      </Button>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <TextInput
        leftSection={<IconSearch />}
        fw={500}
        placeholder="Search"
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
      />
    );
  };

  const centerToolbarTemplate = () => {
    return (
      <SegmentedControl
        value={tab}
        variant="filled"
        color={tab === "Today" ? "blue" : tab === "Upcoming" ? "green" : "red"}
        onChange={setTab}
        data={["Today", "Upcoming", "Past"]}
      />
    );
  };

  const filteredLeaveRequests = leaveRequests.filter((leaveRequest) => {
    const startDate = new Date(leaveRequest.startDate);
    const today = new Date();

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startOfstartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    if (tab === "Today") {
      return startOfstartDate.getTime() === startOfToday.getTime();
    } else if (tab === "Upcoming") {
      return startOfstartDate > startOfToday;
    } else if (tab === "Past") {
      return startOfstartDate < startOfToday;
    }

    return true;
  });

  return (
    <div className="card">
      <Toolbar
        className="mb-4"
        start={leftToolbarTemplate}
        center={centerToolbarTemplate}
        end={rightToolbarTemplate}
      ></Toolbar>
      <DataTable
        stripedRows
        value={filteredLeaveRequests}
        size="small"
        paginator
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={["type", "status"]}
        emptyMessage="No leave request found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        className="text-[15px] shadow-sm [&_.p-datatable-thead>tr>th]:bg-slate-300 [&_.p-datatable-tbody>tr:nth-child(even)]:bg-slate-200 
             [&_.p-datatable-tbody>tr:nth-child(odd)]:bg-white 
             [&_.p-datatable-tbody>tr:hover]:bg-indigo-200"
      >
        <Column headerStyle={{ width: "3rem" }}></Column>
        <Column
          field="type"
          header="Leave Type"
          sortable
          filterPlaceholder="Search by name"
          style={{ minWidth: "14rem" }}
          body={(rowData) => rowData.type?.replaceAll("_", " ") || "-"}
        />
        <Column
          field="startDate"
          header="Start Date"
          sortable
          filterPlaceholder="Search by name"
          style={{ minWidth: "16rem" }}
          body={timeTemplateFrom}
        />
        <Column
          field="endDate"
          header="End Date"
          sortable
          filterPlaceholder="Search by name"
          style={{ minWidth: "16rem" }}
          body={timeTemplateTo}
        />
        <Column
          field="reason"
          header="Reason"
          sortable
          filterPlaceholder="Search by reason"
          style={{ minWidth: "16rem" }}
        />
        <Column
          field="status"
          header="Status"
          sortable
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={statusBodyTemplate}
        />

        {/* <Column
          headerStyle={{ width: "5rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
        /> */}
      </DataTable>
      <Modal
        opened={opened}
        size="lg"
        onClose={close}
        title={
          <div className="text-lg font-semibold text-zinc-600">
            Schedule Leave Request
          </div>
        }
        centered
      >
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="grid grid-cols-1 gap-5"
        >
          <Select
            {...form.getInputProps("type")}
            withAsterisk
            data={leaveTypes}
            label="Leave Type"
            placeholder="Select Leave Type"
          />
          <DateTimePicker
            minDate={new Date()}
            {...form.getInputProps("startDate")}
            withAsterisk
            label="Start Date"
            placeholder="Pick date and time"
          />
          <DateTimePicker
            minDate={new Date()}
            {...form.getInputProps("endDate")}
            withAsterisk
            label="End Date"
            placeholder="Pick date and time"
          />

          <Textarea
            {...form.getInputProps("reason")}
            withAsterisk
            label="Reason"
            placeholder="Enter reason for leave"
            autosize
            minRows={2}
          />
          <Button type="submit" variant="filled" fullWidth>
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default LeaveRequest;
