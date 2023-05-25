import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import Exercise from "../exercises/exercise";
import MyExercise from "../myExerciseCard/MyExercise";

interface ExerciseCollectionsProps {
  workoutId: string;
  workoutName: string;
}

const ExerciseCollections: FC<ExerciseCollectionsProps> = ({
  workoutId,
  workoutName,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [renderExercises, setRenderExercises] = useState<boolean>(false);

  async function handleGetExercises() {
    try {
      const { data } = await axios.post("/api/workoutExercise//exercises", {
        workout_id: workoutId,
      });
      setExercises(data.userArray);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetExercises();
  }, [workoutId, renderExercises]);

  return (
    <div className="exerciseCollections">
      <h4>Exercises</h4>
      <h5>{workoutName}</h5>
      <div className="exerciseCollections__container">
        <div className="exerciseCollections__box">
          {exercises?.map((exercise) => {
            return (
              <MyExercise
                exercise_id={exercise.exercise_id}
                thisExercise={exercise}
                setRenderExercises={setRenderExercises}
                renderExercises={renderExercises}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCollections;
