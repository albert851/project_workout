import express from "express";
import { getAllExercises, getExercisesByrId } from "./exercisesCtrl";

const router = express.Router();

router
    .get("/", getAllExercises)
    .post("/exercise", getExercisesByrId)

export default router;