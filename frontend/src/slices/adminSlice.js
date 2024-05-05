import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logindetails: {
    id: "",
    name: "",
    email: "",
    isLogin: false,
  },
  tasks: [],
  employees: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      const { id, name, email, isLogin } = action.payload; // Destructure payload
      state.logindetails.id = id;
      state.logindetails.name = name;
      state.logindetails.email = email;
      state.logindetails.isLogin = isLogin;
    },
    adminLogout: (state, action) => {
      state.logindetails.id = "";
      state.logindetails.email = "";
      state.logindetails.name = "";
      state.logindetails.isLogin = false;
    },
    getTask: (state, action) => {
      state.tasks = action.payload;
    },
    getEmployee: (state, action) => {
      state.employees = action.payload;
    },
  },
});

export const { adminLogin, adminLogout, getTask, getEmployee } = adminSlice.actions;
export default adminSlice.reducer;
