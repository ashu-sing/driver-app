import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  uid: null,
  role: null,
  phone: null,
  name: null,
  city: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.uid = action.payload.uid;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.city = action.payload.city;
      
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.uid = null;
      state.role = null;
      state.name = null;
      state.city = null;
      state.phone = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = UserSlice.actions;

export default UserSlice.reducer;
