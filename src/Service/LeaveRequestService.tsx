import axiosInstance from "../Interceptor/AxiosInterceptor";

const scheduleLeaveRequest = async (data: any) => {
  return axiosInstance
    .post("/leave-request/schedule", data)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const cancelLeaveRequest = async (id: any) => {
  return axiosInstance
    .put("/leave-request/cancel/" + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const completeLeaveRequest = async (id: any) => {
  return axiosInstance
    .put("/leave-request/complete/" + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getLeaveRequest = async (id: any) => {
  return axiosInstance
    .get("/leave-request/get/" + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getLeaveRequestDetails = async (id: any) => {
  return axiosInstance
    .get("/leave-request/get/details/" + id)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getLeaveRequestByEmployee = async (employeeId: any) => {
  return axiosInstance
    .get("/leave-request/getAllByEmployee/" + employeeId)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getLeaveRequestByManager = async (managerId: any) => {
  return axiosInstance
    .get("/leave-request/getAllByManager/" + managerId)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export {
  scheduleLeaveRequest,
  cancelLeaveRequest,
  getLeaveRequest,
  getLeaveRequestDetails,
  getLeaveRequestByEmployee,
  getLeaveRequestByManager,
  completeLeaveRequest,
};
