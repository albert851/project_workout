import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  exerciseSelector,
  removeFromArr,
} from "../../features/exercise/exercise";
import { resetExercise } from "../../features/exercise/exercise";
import { Exercise } from "../exercises/exercise";
import { daySelected } from "../../features/daySelected/daySelected";

interface SelectedProps {
  workout: string;
}

const Selected: FC<SelectedProps> = ({ workout }) => {
  const exercises = useAppSelector(exerciseSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(daySelected({ day: workout }));
  }, []);

  return (
    <div className="selected">
      {exercises.value.map((exercise) => {
        return (
          <div className="selected__exercise">
            <div className="selected__exercise__img">
              <button
                id={exercise.id}
                onClick={(event: any) =>
                  dispatch(removeFromArr(event?.target.id))
                }
              >
                Delete
              </button>
              <img src={exercise.pic_URL} />
            </div>
            <h5 className="selected__exercise__name">{exercise.name}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default Selected;
