import axiosInstance from "../Interceptor/AxiosInterceptor";

const loginUser = async (user: any) => {
  return axiosInstance
    .post("/auth/login", user)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const createUser = async (user: any) => {
  return axiosInstance
    .post("/auth/create", user)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

const getAllDepartment = async () => {
  return axiosInstance
    .get("/departments")
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export { loginUser, getAllDepartment, createUser };
