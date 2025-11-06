import axiosInstance from "../Interceptor/AxiosInterceptor";

const getEmployee = async (id: any) => {
  return axiosInstance
    .get("/profile/employee/get/" + id)
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
    .get("/profile/employee/getAll")
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getEmployeesByManager = async (managerId: any) => {
  return axiosInstance
    .get("/profile/employee/getByManager/" + managerId)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { getEmployee, updateEmployee, getAllEmployees, getEmployeesByManager };
