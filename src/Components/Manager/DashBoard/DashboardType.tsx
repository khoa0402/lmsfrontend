export interface EmployeeLeaveSummary {
  employeeId: number;
  employeeName: string;
  usedDays: number;
  remainingDays: number;
  carriedOverDays: number;
}

export interface ManagerDashboard {
  managerId: number;
  totalEmployees: number;
  totalLeaveRequests: number;
  leaveRequestsThisMonth: number;
  leaveTypeByMonth: Record<number, Record<string, number>>;
  leaveStatusSummary: Record<string, number>;
  employeeLeaveSummary: EmployeeLeaveSummary[];
}
