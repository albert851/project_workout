import express from "express";
import { newWorkout, getWorkoutsByUserId, deleteWorkout } from "./workoutUserCtrl";

const router = express.Router();

router
    .post("/add", newWorkout)
    .post("/workouts", getWorkoutsByUserId)
    .delete("/delete/:id", deleteWorkout)

export default router;