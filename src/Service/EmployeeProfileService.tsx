import axiosInstance from "../Interceptor/AxiosInterceptor";

const getEmployee = async () => {
  return axiosInstance
    .get("/auth/me")
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const updateEmployee = async (employee: any) => {
  return axiosInstance
    .put("/profile/employee/update", employee)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getAllEmployees = async () => {
  return axiosInstance
    .get("/users")
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getEmployeesByManager = async (managerId: any) => {
  return axiosInstance
    .get("/users/" + managerId)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { getEmployee, updateEmployee, getAllEmployees, getEmployeesByManager };
