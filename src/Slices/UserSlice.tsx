import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

function getDecodedUser() {
  const token = localStorage.getItem("token");
  if (!token) return {}; // chưa login

  // Nếu token không hợp lệ (ví dụ "Bearer eyJ..."), loại bỏ prefix
  const pureToken = token.startsWith("Bearer ") ? token.substring(7) : token;

  // Chỉ decode khi đúng format JWT (có dấu '.')
  if (!pureToken.includes(".")) {
    console.warn("Invalid token format, skipping decode:", pureToken);
    return {};
  }

  try {
    return jwtDecode(pureToken);
  } catch (err) {
    console.error("Failed to decode JWT:", err);
    return {};
  }
}

const userSlice = createSlice({
  name: "user",
  initialState: getDecodedUser(),
  reducers: {
    setUser: (state, action) => action.payload,
    removeUser: () => ({}),
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
