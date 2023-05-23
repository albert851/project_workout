import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface DaySelected {
  day: string; 
}

const initialState: DaySelected = {
  day: "",
};

export const daySelectedSlice = createSlice({
  name: "day",
  initialState,
  reducers: {
    daySelected: (state, action) => {
      state.day = action.payload.day;
    },
    resetSelected: (state) => {
      state = initialState;
    },
  },
});

export const { daySelected, resetSelected } = daySelectedSlice.actions;

export const daySelectedSelector = (state: RootState) => state.day;

export default daySelectedSlice.reducer;