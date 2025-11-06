import axiosInstance from "../Interceptor/AxiosInterceptor";

const getManager = async (id: any) => {
  return axiosInstance
    .get("/profile/manager/get/" + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const updateManager = async (manager: any) => {
  return axiosInstance
    .put("/profile/manager/update", manager)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getManagerDropdowns = async () => {
  return axiosInstance
    .get("/profile/manager/dropdowns")
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getAllManagers = async () => {
  return axiosInstance
    .get("/profile/manager/getAll")
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getManagerByEmployee = async (employeeId: any) => {
  return axiosInstance
    .get("/profile/manager/getByEmployee/" + employeeId)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export {
  getManager,
  updateManager,
  getManagerDropdowns,
  getAllManagers,
  getManagerByEmployee,
};
