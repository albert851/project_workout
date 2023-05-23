import React, { FC, useState, useEffect } from "react";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  exerciseSelector,
  removeFromArr,
} from "../../features/exercise/exercise";
import CloseIcon from "@mui/icons-material/Close";
import Exresice from "../exercises/exercise";
import Selected from "../selcted/Selected";
import axios from "axios";
import { userSelector } from "../../features/user/userSlise";
import { daySelected } from "../../features/daySelected/daySelected";

interface NewWorkoutProps {
  selectedWorkout: CallableFunction;
  value: string;
}

const NewWorkout: FC<NewWorkoutProps> = ({ selectedWorkout, value }) => {
  const user = useAppSelector(userSelector);
  const exercises = useAppSelector(exerciseSelector);
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState<string>();
  const [repsSets, setRepsSets] = useState<string>();
  const [workout_id, setWorkout_id] = useState<number>();
  const [trainingDay, setTrainingDay] = useState<number>();
  const [exercise_id, setExercise_id] = useState<number>();
  const [sets, setSets] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>();

  const handleCloseDesc = () => {
    selectedWorkout(false);
  };

  const handleSetData = () => {
    if (value == "Full body") {
      setDescription(
        "This workout consists of separate exercises for the muscles of the whole body."
      );
      setRepsSets(
        "Our recommendation is 3-4 sets and about 10 repetitions for each exercise."
      );
      setSets(3);
      setReps(10);
      setTime(0);
      setDistance(0);
    } else if (value == "Weight loss") {
      setDescription(
        "This workout consists of aerobics and complex exercises that raise the heart rate."
      );
      setRepsSets(
        "We recommend about 45 minutes of aerobics and about 10-12 repetitions and about 3-4 sets of each exercise."
      );
      setSets(3);
      setReps(12);
      setTime(0);
      setDistance(0);
    } else if (value == "Strength") {
      setDescription(
        "This workout works on muscle mass or toning, depending on the number of sets and repetitions in each exercise."
      );
      setRepsSets(
        "Recommend 3-4 sets and about 6-8 repetitions for muscle mass or 15-20 repetitions for toning."
      );
      setSets(3);
      setReps(8);
      setTime(0);
      setDistance(0);
    } else if (value == "Aerobic") {
      setDescription("This workout is for aerobics lovers.");
      setRepsSets("About an hour or 6-7 km is recommended.");
      setSets(0);
      setReps(0);
      setTime(60);
      setDistance(6);
    } else {
      setDescription(
        "Self-assembled training, you can choose favorite exercises."
      );
      setRepsSets(
        "Our recommendation is 3-4 sets and about 10 repetitions for each exercise."
      );
      setSets(4);
      setReps(10);
      setTime(0);
      setDistance(0);
    }
  };

  const handleSelect = (ev: any) => {
    setTrainingDay(Number(ev.target.value));
  };

  const handleCreateWorkout = (ev: any) => {
    ev.preventDefault();

    handleAddWorkout();
  };

  async function handleAddWorkout() {
    if(trainingDay){
      try {
        const { data } = await axios.post("/api/workoutUser/add", {
          user_id: user?.user_id,
          workout_type: value,
        });
  
        if (data.ok) {
          setWorkout_id(data.results.insertId);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handleAddExercises() {
    exercises.value.map((exercise: any) => {
      addExercise(exercise);
    });
  }

  async function addExercise(exercise: Exresice) {
    let currentSets: number = 0;
    let currentReps: number = 0;
    let currentTime: number = 0;

    try {
      if (value == "Strength") {
        if (exercise.training_type == "Cardio") {
          currentSets = 0;
          currentReps = 0;
          currentTime = 15;
        } else {
          currentSets = 3;
          currentReps = 8;
          currentTime = 0;
        }
      } else if (value == "Weight loss") {
        if (exercise.training_type == "Cardio") {
          currentSets = 0;
          currentReps = 0;
          currentTime = 45;
        } else {
          currentSets = 3;
          currentReps = 12;
          currentTime = 0;
        }
      } else if (value == "Personal") {
        if (exercise.training_type == "Cardio") {
          currentSets = 0;
          currentReps = 0;
          currentTime = 15;
        } else {
          currentSets = 4;
          currentReps = 10;
          currentTime = 0;
        }
      } else {
        currentSets = sets;
        currentReps = reps;
        currentTime = time;
      }

      const { data } = await axios.post("/api/workoutExercise/add", {
        workout_id: workout_id,
        exercise_id: exercise.id,
        day: trainingDay,
        sets: currentSets,
        reps: currentReps,
        time: currentTime,
        distance: distance,
      });

      if (data) {
        selectedWorkout(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleSetData();
  }, []);

  useEffect(() => {
    handleAddExercises();
  }, [workout_id]);

  return (
    <div className="newWorkout">
      <div className="newWorkout__header">
        <h3 className="newWorkout__header__title">{value}</h3>
        <CloseIcon
          className="newWorkout__header__CloseBtn"
          onClick={handleCloseDesc}
        />
      </div>
      <div className="newWorkout__exerciseSelect">
        <p className="newWorkout__exerciseSelect__description">{description}</p>
        <p className="newWorkout__exerciseSelect__description">{repsSets}</p>
        <form className="newWorkout__form" onSubmit={handleCreateWorkout}>
          <div className="newWorkout__form__trainingDay">
            <p>Choose a training day:</p>
            <select
              className="newWorkout__form__select"
              onChange={handleSelect}
            >
              <option>Day</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
          </div>
          <div className="exerciseSelect__form__box">
            {trainingDay ? <Selected workout={value} /> : null}
          </div>
          <button type="submit">train</button>
        </form>
      </div>
    </div>
  );
};

export default NewWorkout;
