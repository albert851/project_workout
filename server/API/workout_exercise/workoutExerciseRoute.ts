import express from "express";
import { newExercise, getExercisesByWorkoutId, updateExercise, deleteExerciseByWorkoutId, deleteExercise } from "./workoutExerciseCtrl";

const router = express.Router();

router
    .post("/add", newExercise)
    .post("/exercises", getExercisesByWorkoutId)
    .patch("/update/:id", updateExercise)
    .delete("/deleteWorkout/:workoutId", deleteExerciseByWorkoutId)
    .delete("/delete/:id", deleteExercise)

export default router;