import React, { FC, useEffect, useState } from "react";
import { Exercise } from "../exercises/exercise";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addExreciseToArr } from "../../features/exercise/exercise";
import { daySelectedSelector } from "../../features/daySelected/daySelected";

interface CardProps {
  exercise: Exercise;
}

const Card: FC<CardProps> = ({ exercise }) => {
  const dispatch = useAppDispatch();
  const daySelected = useAppSelector(daySelectedSelector);

  const handleSelect = () => {
    if (daySelected.day == "Personal") {
      dispatch(
        addExreciseToArr({
          id: exercise.exercise_id,
          name: exercise.name,
          target: exercise.target,
          subcategory: exercise.subcategory,
          training_type: exercise.training_type,
          body_machine_dumbells: exercise.body_machine_dumbells,
          pic_URL: exercise.pic_URL,
        })
      );
    }
  };

  return (
    <div className="card" onClick={handleSelect}>
      <div className="card__img">
        <img src={exercise.pic_URL}></img>
        <h3 className="card__name">{exercise.name}</h3>
      </div>
    </div>
  );
};

export default Card;
