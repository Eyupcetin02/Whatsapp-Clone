import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  auth: "",
};

export const authRegister = createAsyncThunk("authRegister", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/register",
      user
    );
    console.log(response.data.name.username);
    
    window.localStorage.setItem("user", response.data.name.username);
    window.location = "/home"

    return response.data;
    
  } catch (error) {
    console.log(error);
  }
});


export const authlogin = createAsyncThunk("authlogin", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/login",
      user
    );
    
    window.localStorage.setItem("user", response.data.name);
    console.log(response.data.name)
    window.location = "/home"

    return response.data;
    
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
      registerSuccess: (state, action) => {
          state.auth = action.payload; 
      },
  },
  extraReducers: (builder) => {
      builder.addCase(authRegister.fulfilled, (state, action) => {
          state.auth = action.payload;
      });
  }
})




export const {register} = authSlice.actions

export default authSlice.reducer