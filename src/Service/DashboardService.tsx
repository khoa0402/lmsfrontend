import axiosInstance from "../Interceptor/AxiosInterceptor";

const getLeaveBalanceDashboard = async () => {
  return axiosInstance
    .get("/leave-balance/team")
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getSummaryDashboard = async (params?: {
  departmentId?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return axiosInstance
    .get("/reports/summary", { params })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { getLeaveBalanceDashboard, getSummaryDashboard };
