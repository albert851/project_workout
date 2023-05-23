import express from "express";
import connection from "./DB/database";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("client"));

import exercisesRoutes from "./API/exercises/exercisesRoutes";
app.use("/api/exercises", exercisesRoutes);

import userRoutes from "./API/user/userRoutes";
app.use("/api/users", userRoutes);

import workoutUserRoutes from "./API/workout_user/workoutUserRoutes";
app.use("/api/workoutUser", workoutUserRoutes);

import workoutExerciseRoutes from "./API/workout_exercise/workoutExerciseRoute";
app.use("/api/workoutExercise", workoutExerciseRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
