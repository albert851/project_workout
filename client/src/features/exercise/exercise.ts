import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SelectedExerciseSlice {
  value: Exresice[];
}

export interface Exresice {
  id: "";
  name: "";
  target: "";
  subcategory: "";
  training_type: "";
  body_machine_dumbells: "";
  pic_URL: "";
}

const initialState: SelectedExerciseSlice = {
  value: [],
};

export const selectedExerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    addExreciseToArr: (state, action) => {
      state.value.push(action.payload);
    },
    resetExercise: (state) => {
      state = initialState;
    },
    removeFromArr: (state, action) => {
      state.value = state.value.filter((exercise) => {
        return exercise.id != action.payload;
      });
    },
  },
});

export const { addExreciseToArr, resetExercise, removeFromArr } =
  selectedExerciseSlice.actions;

export const exerciseSelector = (state: RootState) => state.exercise;

export default selectedExerciseSlice.reducer;
