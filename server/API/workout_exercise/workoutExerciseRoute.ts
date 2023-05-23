import express from "express";
import { newExercise, getExercisesByWorkoutId, updateExercise } from "./workoutExerciseCtrl";

const router = express.Router();

router
    .post("/add", newExercise)
    .post("/exercises", getExercisesByWorkoutId)
    .patch("/update/:id", updateExercise)

export default router;