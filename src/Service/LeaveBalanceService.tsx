import axiosInstance from "../Interceptor/AxiosInterceptor";

const getLeaveBalanceByEmployee = async () => {
  return axiosInstance
    .get("/leave-balance/me")
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { getLeaveBalanceByEmployee };
