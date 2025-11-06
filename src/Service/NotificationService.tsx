import axiosInstance from "../Interceptor/AxiosInterceptor";

const getNotificationsByUser = async (
  recipientId: number | string,
  role: "MANAGER" | "EMPLOYEE"
) => {
  const url =
    role === "MANAGER"
      ? `/notifications/manager/${recipientId}`
      : `/notifications/employee/${recipientId}`;

  return axiosInstance
    .get(url)
    .then((response: any) => response.data)
    .catch((error: any) => {
      console.error("Error fetching notifications", error);
      throw error;
    });
};

const getUnreadCount = async (recipientId: number | string) => {
  return axiosInstance
    .get(`/notifications/user/${recipientId}/unread-count`)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const markNotificationAsRead = async (notificationId: number | string) => {
  return axiosInstance
    .put(`/notifications/read/${notificationId}`)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const markAllAsRead = async (recipientId: number | string) => {
  return axiosInstance
    .put(`/notifications/read-all/${recipientId}`)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const createNotification = async (notification: any) => {
  return axiosInstance
    .post("/notifications", notification)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export {
  getNotificationsByUser,
  getUnreadCount,
  markNotificationAsRead,
  markAllAsRead,
  createNotification,
};
