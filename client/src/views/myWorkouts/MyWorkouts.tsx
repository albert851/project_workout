import React, { FC, useState, useEffect} from 'react';
import NavBar from '../../components/navbar/NavBar';
import { changeNavBarDisp } from '../../features/navBarDisp/navBarDisp';
import WorkoutCollections from '../../components/workoutCollections/WorkoutCollections';
import ExerciseCollections from '../../components/exerciseCollections/ExerciseCollections';
import Workouts from './../../components/workouts/Workouts';
import WorkoutModel from './workoutModel';
import { useAppDispatch } from '../../app/hooks';

const MyWorkouts = () => {
    const[workOutDisp, setWorkOutDisp] = useState<boolean>(false);
    const[workoutId, setWorkoutId] = useState<string>("");
    const[workoutName, setWorkoutName] = useState<string>("");
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(
        changeNavBarDisp({
         home: "block",
         myWorkouts:"none"
        })
      );
    }, []);

  return (
    <div className="myWorkout">
      <NavBar userDisplay="block" 
      setWorkouts={setWorkOutDisp} 
      workouts={workOutDisp} />
      <p className="main__note">
        ❤️ please note that for maximum results, you must adhere to a healthy
        and proper diet!!!
      </p>
      <div className="myWorkout__container">
        <WorkoutCollections setWorkoutId={setWorkoutId} setWorkoutName={setWorkoutName} />
        <ExerciseCollections workoutId={workoutId} workoutName={workoutName} />
      </div>
    </div>
  )
}

export default MyWorkouts

function dispatch(arg0: { payload: any; type: "navBar/changeNavBarDisp"; }) {
  throw new Error('Function not implemented.');
}
