import axiosInstance from "../Interceptor/AxiosInterceptor";

const getLeaveBalanceByEmployeeAndYear = async (employeeId: any, year: any) => {
  return axiosInstance
    .get("/leave-balance/" + employeeId + "/" + year)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { getLeaveBalanceByEmployeeAndYear };
