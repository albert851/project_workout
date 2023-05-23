import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userSlise from "../features/user/userSlise";
import selectedExerciseSlice from "../features/exercise/exercise";
import daySelectedSlice from "../features/daySelected/daySelected";
import navBarDispSlice from "../features/navBarDisp/navBarDisp";

export const store = configureStore({
  reducer: {
    user: userSlise,
    exercise: selectedExerciseSlice,
    day: daySelectedSlice,
    navBar: navBarDispSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
