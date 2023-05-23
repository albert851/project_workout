import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/user/userSlise";
import WorkoutModel from "../../views/myWorkouts/workoutModel";
import Workouts from "./../workouts/Workouts";

interface WorkoutCollectionsProps {
  setWorkoutId: CallableFunction;
  setWorkoutName: CallableFunction;
}

const WorkoutCollections: FC<WorkoutCollectionsProps> = ({
  setWorkoutId,
  setWorkoutName,
}) => {
  const user = useAppSelector(userSelector);
  const [worouts, setWorkouts] = useState<WorkoutModel[]>();

  async function handleGetWorkouts() {
    try {
      const { data } = await axios.post("/api/workoutUser/workouts", {
        user_id: user?.user_id,
      });
      setWorkouts(data.userArray);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectWorkout = (ev: any) => {
    ev.preventDefault();
    setWorkoutId(ev.target.value);
    setWorkoutName(ev.target.name);
  };

  useEffect(() => {
    // dispatch(
    //   changeNavBarDisp({
    //    home: "block",
    //    myWorkouts:"none"
    //   })
    // );
    handleGetWorkouts();
  }, []);

  return (
    <div className="wokoutCollections">
      <h4>Workouts</h4>
      <div className="wokoutCollections__box">
        {worouts?.map((worout) => {
          return (
            <button
              onClick={handleSelectWorkout}
              name={worout.workout_type}
              value={worout.workout_users_id}
            >
              {worout.workout_type}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutCollections;
