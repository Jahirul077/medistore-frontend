import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "@/utils/localStorage";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const token = getLocalStorage("MEDISTORE_ACCESS_TOKEN");
    const userStr = getLocalStorage("MEDISTORE_USER");
    let user = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch (e) {
        user = null;
      }
    }
    return {
      token: token || null,
      user: user || null,
      isAuthenticated: Boolean(token),
    };
  }
  return {
    token: null,
    user: null,
    isAuthenticated: false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
