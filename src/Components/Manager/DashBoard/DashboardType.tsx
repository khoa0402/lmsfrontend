export interface TeamLeaveBalance {
  userId: string;
  name: string;
  remaining: number;
}

export interface SummaryReport {
  totalRequests: number;
  totalDaysTaken: number;
  trendsByMonth: {
    month: number;
    days: number;
  }[];
  countByLeaveType: {
    type: string;
    days: number;
  }[];
}

// Gộp hai phần này cho Dashboard
export interface DashboardData {
  leaveBalance: TeamLeaveBalance[];
  summary: SummaryReport;
}
