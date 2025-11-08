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
  TextInput,
} from "@mantine/core";
import {
  IconCheck,
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
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
  getLeaveRequestByManager,
  scheduleLeaveRequest,
  setStatusLeaveRequest,
} from "../../../Service/LeaveRequestService";
import { formatDateWithTime } from "../../../Utility/DateUtility";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { Toolbar } from "primereact/toolbar";
import { useNavigate } from "react-router-dom";

const LeaveRequest = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("Today");
  const [managers, setManagers] = useState<any[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const user = useSelector((state: any) => state.user);
  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);

  console.log("User from Redux:", user);

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
    getLeaveRequestByManager()
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
    fetchLeaveRequests();
    getManagerDropdowns()
      .then((data) => {
        console.log(data);
        setManagers(
          data.map((manager: any) => ({
            value: "" + manager.id,
            label: manager.name,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching managers", error);
      });
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
      employeeId: "",
      managerId: user.profileId,
      startDate: new Date(),
      endDate: new Date(),
      type: "",
      reason: "",
    },

    validate: {
      employeeId: (value: any) => (!value ? "Manager is required" : undefined),
      startDate: (value: any) => (!value ? "From Date is required" : undefined),
      endDate: (value: any) => (!value ? "To Date is required" : undefined),
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

  const handleReject = (rowData: any) => {
    modals.openConfirmModal({
      title: <span className="text-xl font-semibold">Are you sure</span>,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to reject this leave request?
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        setStatusLeaveRequest(rowData.id, "REJECTED")
          .then(() => {
            successNotification("Leave request rejected successfully.");
            fetchLeaveRequests();
          })
          .catch((error) => {
            errorNotification(
              error?.response?.data?.errorMessage ||
                "Failed to reject leave request."
            );
          });
      },
    });
  };

  const handleApprove = (rowData: any) => {
    modals.openConfirmModal({
      title: <span className="text-xl font-semibold">Confirm Completion</span>,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to approve this leave request?
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "green" },
      onConfirm: () => {
        setStatusLeaveRequest(rowData.id, "APPROVED")
          .then(() => {
            successNotification("Leave request approved successfully.");
            fetchLeaveRequests();
          })
          .catch((error) => {
            errorNotification(
              error?.response?.data?.errorMessage ||
                "Failed to complete leave request."
            );
          });
      },
    });
  };

  const ActionCell = ({ rowData, fetchLeaveRequests }: any) => {
    const [comment, setComment] = useState("");

    const handleAction = (status: string) => {
      if (!status) return;
      setStatusLeaveRequest(rowData.id, status, comment)
        .then(() => {
          successNotification(
            `Leave request ${status.toLowerCase()} successfully.`
          );
          fetchLeaveRequests();
        })
        .catch((error) => {
          errorNotification(
            error?.response?.data?.errorMessage ||
              `Failed to ${status.toLowerCase()} leave request.`
          );
        });
    };

    return (
      <div className="flex flex-col gap-2">
        <TextInput
          size="xs"
          placeholder="Manager comment"
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
        />
        <div className="flex gap-1 justify-center">
          <ActionIcon
            color="green"
            variant="filled"
            onClick={() => handleAction("APPROVED")}
          >
            <IconCheck size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            color="red"
            variant="filled"
            onClick={() => handleAction("REJECTED")}
          >
            <IconX size={16} stroke={1.5} />
          </ActionIcon>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  // const handleSubmit = (values: any) => {
  //   console.log("Schedule Leave Request with values:", values);
  //   setLoading(true);
  //   scheduleLeaveRequest(values)
  //     .then((data) => {
  //       close();
  //       form.reset();
  //       successNotification("Leave request scheduled successfully.");
  //       fetchLeaveRequests();
  //     })
  //     .catch((error) => {
  //       errorNotification(
  //         error?.response?.data?.errorMessage ||
  //           "Failed to schedule leave request."
  //       );
  //     })
  //     .finally(() => setLoading(false));
  // };

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

  // const leftToolbarTemplate = () => {
  //   return (
  //     <Button leftSection={<IconPlus />} onClick={open} variant="filled">
  //       Schedule Leave Request
  //     </Button>
  //   );
  // };

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

  const leftToolbarTemplate = () => {
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
        globalFilterFields={["managerName", "leaveType", "status"]}
        emptyMessage="No leave request found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        className="text-[15px] shadow-sm rounded-xl overflow-hidden ml-3 mr-3 [&_.p-datatable-thead>tr>th]:bg-slate-300 [&_.p-datatable-tbody>tr:nth-child(even)]:bg-slate-200 
             [&_.p-datatable-tbody>tr:nth-child(odd)]:bg-white 
             [&_.p-datatable-tbody>tr:hover]:bg-indigo-200"
      >
        <Column headerStyle={{ width: "3rem" }}></Column>
        <Column
          header="Employee"
          sortable
          filterPlaceholder="Search by employee"
          style={{ minWidth: "14rem" }}
          body={(rowData) => rowData?.requestedBy?.name || "-"}
        />
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
        <Column
          header="Action"
          headerStyle={{ width: "5rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          style={{ minWidth: "14rem" }}
          body={(rowData) => (
            <ActionCell
              rowData={rowData}
              fetchLeaveRequests={fetchLeaveRequests}
            />
          )}
        />
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
        {/* <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="grid grid-cols-1 gap-5"
        >
          <Select
            {...form.getInputProps("employeeId")}
            withAsterisk
            data={managers}
            label="Manager"
            placeholder="Select Manager"
          />
          <DateTimePicker
            minDate={new Date()}
            {...form.getInputProps("startDate")}
            withAsterisk
            label="From Date"
            placeholder="Pick date and time"
          />
          <DateTimePicker
            minDate={new Date()}
            {...form.getInputProps("endDate")}
            withAsterisk
            label="To Date"
            placeholder="Pick date and time"
          />
          <Select
            {...form.getInputProps("leaveType")}
            withAsterisk
            data={leaveTypes}
            label="Leave Type"
            placeholder="Select Leave Type"
          />
          <Button type="submit" variant="filled" fullWidth>
            Submit
          </Button>
        </form> */}
      </Modal>
    </div>
  );
};

export default LeaveRequest;
