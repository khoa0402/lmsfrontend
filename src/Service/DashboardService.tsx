import axiosInstance from "../Interceptor/AxiosInterceptor";

const getManagerDashboard = async (managerId: any) => {
  return axiosInstance
    .get("/dashboard/" + managerId)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { getManagerDashboard };
