import axiosInstance from "../Interceptor/AxiosInterceptor";

const getNotifications = async () => {
  return axiosInstance
    .get("/notifications")
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

// const getUnreadCount = async (recipientId: number | string) => {
//   return axiosInstance
//     .get(`/notifications/user/${recipientId}/unread-count`)
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });
// };

const markNotificationAsRead = async (notificationIds?: string[]) => {
  try {
    const body =
      notificationIds && notificationIds.length > 0 ? { notificationIds } : {};
    const response = await axiosInstance.post(
      "/notifications/mark-as-read",
      body
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// const markAllAsRead = async (recipientId: number | string) => {
//   return axiosInstance
//     .put(`/notifications/read-all/${recipientId}`)
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });
// };

// const createNotification = async (notification: any) => {
//   return axiosInstance
//     .post("/notifications", notification)
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });
// };

export {
  getNotifications,
  // getUnreadCount,
  markNotificationAsRead,
  // markAllAsRead,
  // createNotification,
};
