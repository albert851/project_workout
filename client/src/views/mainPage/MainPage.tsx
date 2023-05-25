import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/user/userSlise";
import { getUserByCookie } from "../../features/user/userApi";
import NavBar from "../../components/navbar/NavBar";
import Exercises from "../../components/exercises/Exercises";
import Workouts from "../../components/workouts/Workouts";
import Search from "../../components/search/Search";
import Exresice from "../../components/exercises/exercise";
import NewWorkout from "../../components/newWorkout/NewWorkout";
import { changeNavBarDisp } from "../../features/navBarDisp/navBarDisp";

const Main = () => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [exercises, setExercisese] = useState<Exresice[]>([]);
  const [exercisesDisplay, setExerciseseDisplay] = useState<Exresice[]>([]);
  const [workOutDisp, setWorkOutDisp] = useState<boolean>(false);
  const [selectedWorkout, setSelectedWorkout] = useState<boolean>(false);
  const [workoutValue, setWorkoutValue] = useState<string>("");

  async function getExercises() {
    try {
      const { data } = await axios.get("/api/exercises");
      setExercisese(data.results);
      setExerciseseDisplay(data.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dispatch(getUserByCookie());
    getExercises();

    dispatch(
      changeNavBarDisp({
        home: "none",
        myWorkouts: "block",
      })
    );
  }, []);

  return (
    <div className="main">
      <NavBar
        userDisplay="block"
        setWorkouts={setWorkOutDisp}
        workouts={workOutDisp}
      />
      <p className="main__note">
        ❤️ please note that for maximum results, you must adhere to a healthy
        and proper diet!!!
      </p>
      <div className="main__container">
        <div className="main__container__box">
          <Search
            setExerciseseDisplay={setExerciseseDisplay}
            exercises={exercises}
          />
          <Exercises exercises={exercisesDisplay} />
        </div>
        {workOutDisp ? (
          <Workouts
            select={setSelectedWorkout}
            setWorkOutDisp={setWorkOutDisp}
            value={setWorkoutValue}
          />
        ) : null}
        {selectedWorkout ? (
          <NewWorkout
            selectedWorkout={setSelectedWorkout}
            value={workoutValue}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Main;
