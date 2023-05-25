import React, { FC, useState, useEffect } from "react";
import workouts from "./Workouts";
import { updateExpressionWithTypeArguments } from "typescript";

interface WorkoutsProps {
  select: CallableFunction;
  setWorkOutDisp: CallableFunction;
  value: CallableFunction;
}

const Workouts: FC<WorkoutsProps> = ({ select, setWorkOutDisp, value }) => {
  const handleSelectWorkout = (ev: any) => {
    select(true);
    setWorkOutDisp(false);
    value(ev.target.value);
  };

  useEffect(() => {
    select(false);
  }, []);

  return (
    <div className="workouts">
      <button value={"Full body"} onClick={handleSelectWorkout}>
        Full body
      </button>
      <p>All parts of the body training</p>
      <button value={"Weight loss"} onClick={handleSelectWorkout}>
        Weight loss
      </button>
      <p>Intense high heart rate training</p>
      <button value={"Strength"} onClick={handleSelectWorkout}>
        Strength
      </button>
      <p>Strength training to build muscle mass</p>
      <button value={"Aerobic"} onClick={handleSelectWorkout}>
        Aerobic
      </button>
      <p>Aerobic exercise</p>
      <button value={"Personal"} onClick={handleSelectWorkout}>
        Personal
      </button>
      <p>Building personal training</p>
      <p className="workouts__setsAndReps">
        Number of sets and repetitions can be changed after creating a workout
      </p>
    </div>
  );
};

export default Workouts;
