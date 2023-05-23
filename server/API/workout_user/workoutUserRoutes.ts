import express from "express";
import { newWorkout, getWorkoutsByUserId } from "./workoutUserCtrl";

const router = express.Router();

router
    .post("/add", newWorkout)
    .post("/workouts", getWorkoutsByUserId)

export default router;