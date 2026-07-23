import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/users";

interface AuthState {
  userInfo: User | null;
}

const storedUserInfo = localStorage.getItem("userInfo");
const initialState: AuthState = {
  userInfo: storedUserInfo ? (JSON.parse(storedUserInfo) as User) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
