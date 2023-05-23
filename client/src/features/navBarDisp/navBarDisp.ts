import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface NavBarDisp {
  home: string;
  myWorkouts: string; 
}

const initialState: NavBarDisp = {
  home: "",
  myWorkouts: "",
};

export const navBarDispSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    changeNavBarDisp: (state, action) => {
      state.home = action.payload.home;
      state.myWorkouts = action.payload.myWorkouts;
    },
    resetNavBarDisp: (state) => {
      state = initialState;
    },
  },
});

export const { changeNavBarDisp, resetNavBarDisp } = navBarDispSlice.actions;

export const navBarDispSelector = (state: RootState) => state.navBar;

export default navBarDispSlice.reducer;
