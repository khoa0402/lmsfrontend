import axiosInstance from "../Interceptor/AxiosInterceptor";

const scheduleLeaveRequest = async (data: any) => {
  return axiosInstance
    .post("/leave-requests", data)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const setStatusLeaveRequest = async (
  requestId: any,
  status: string,
  managerComment?: string
) => {
  return axiosInstance
    .put("/leave-requests/status/" + requestId, {
      status,
      managerComment: managerComment || "",
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

// const cancelLeaveRequest = async (id: any) => {
//   return axiosInstance
//     .put("/leave-request/cancel/" + id)
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });
// };

// const completeLeaveRequest = async (id: any) => {
//   return axiosInstance
//     .put("/leave-request/complete/" + id)
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });
// };

// const getLeaveRequest = async (id: any) => {
//   return axiosInstance
//     .get("/leave-request/get/" + id)
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });
// };

// const getLeaveRequestDetails = async (id: any) => {
//   return axiosInstance
//     .get("/leave-request/get/details/" + id)
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });
// };

const getLeaveRequestByEmployee = async () => {
  return axiosInstance
    .get("/leave-requests/my-history")
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getLeaveRequestByManager = async () => {
  return axiosInstance
    .get("/leave-requests/pending")
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export {
  scheduleLeaveRequest,
  setStatusLeaveRequest,
  // cancelLeaveRequest,
  // getLeaveRequest,
  // getLeaveRequestDetails,
  getLeaveRequestByEmployee,
  getLeaveRequestByManager,
  // completeLeaveRequest,
};
