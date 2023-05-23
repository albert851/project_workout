import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./userModel";

export const getUserByCookie = createAsyncThunk(
  "getUserByCookie",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/api/users/get-user-by-cookie");
      if (!data) throw new Error("no data from get_user_by_cookie");
      if (data.error) throw new Error("an error accord")
      const {userArray} = data
      return userArray[0];
    } catch (error: any) {
      console.error(error);
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
);