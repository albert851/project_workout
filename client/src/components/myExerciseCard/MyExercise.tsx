import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import Exercise from "../exercises/exercise";

interface MyExerciseProps {
  exercise_id: string;
  thisExercise: any;
  setRenderExercises: CallableFunction;
  renderExercises: boolean;
}

const MyExercise: FC<MyExerciseProps> = ({
  exercise_id,
  thisExercise,
  renderExercises,
  setRenderExercises,
}) => {
  const [exercise, setExercise] = useState<Exercise>();
  const [sets, setSets] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [distance, setdistance] = useState<number>(0);
  const [inputSetsValue, setInputSetsValue] = useState<string>();
  const [inputRepsValue, setInputRepsValue] = useState<string>();
  const [inputTimeValue, setInputTimeValue] = useState<string>();
  const [inputDistanceValue, setInputDistanceValue] = useState<string>();

  async function handleGetExercise() {
    try {
      const { data } = await axios.post("/api/exercises/exercise", {
        exercise_id,
      });
      setExercise(data.userArray[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSetData = () => {
    setSets(thisExercise.sets);
    setReps(thisExercise.reps);
    setdistance(thisExercise.distance);
    setTime(thisExercise.time);
  };

  const handleInput = (ev: any) => {
    if (ev.target.id == "1") {
      setSets(ev.target.value);
      setInputSetsValue(ev.target.value);
    }
    if (ev.target.id == "2") {
      setReps(ev.target.value);
      setInputRepsValue(ev.target.value);
    }
    if (ev.target.id == "3") {
      setTime(ev.target.value);
      setInputTimeValue(ev.target.value);
    }
    if (ev.target.id == "4") {
      setdistance(ev.target.value);
      setInputDistanceValue(ev.target.value);
    }
  };

  async function handleUpdate() {
    try {
      const { data } = await axios.patch(
        `/api/workoutExercise/update/${exercise_id}`,
        {
          sets,
          reps,
          time,
          distance,
        }
      );
      if (data) {
        setRenderExercises(!renderExercises);

        setInputSetsValue("");
        setInputRepsValue("");
        setInputTimeValue("");
        setInputDistanceValue("");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelte(ev: any) {
    const workout_exerecise_id = thisExercise.workout_exerecise_id
    try {
      const { data } = await axios.delete(`/api/workoutExercise/delete/:${workout_exerecise_id}`);
      console.log(data)

      if(data.deleteExercise){
        setRenderExercises(!renderExercises);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetExercise();
    handleSetData();
  }, [exercise_id]);

  return (
    <div className="myExerciseCard__containet">
      <div className="myExerciseCard__box">
        <div className="myExerciseCard__img">
          <img src={exercise?.pic_URL}></img>
        </div>
        <h3 className="myExerciseCard__name">{exercise?.name}</h3>
      </div>
      <div className="myExerciseCard__data">
        <div className="myExerciseCard__data__row">
          <h5>{`sets: ${thisExercise.sets}`}</h5>
          <h5>{`set new: `}</h5>
          <input
            type="text"
            id="1"
            value={inputSetsValue}
            onChange={handleInput}
          ></input>
        </div>
        <div className="myExerciseCard__data__row">
          <h5>{`reps: ${thisExercise.reps}`}</h5>
          <h5>{`set new: `}</h5>
          <input
            type="text"
            id="2"
            value={inputRepsValue}
            onChange={handleInput}
          ></input>
        </div>
        <div className="myExerciseCard__data__row">
          <h5>{`time: ${thisExercise.time}`}</h5>
          <h5>{`set new: `}</h5>
          <input
            type="text"
            id="3"
            value={inputTimeValue}
            onChange={handleInput}
          ></input>
        </div>
        <div className="myExerciseCard__data__row">
          <h5>{`distance: ${thisExercise.distance}`}</h5>
          <h5>{`set new: `}</h5>
          <input
            type="text"
            id="4"
            value={inputDistanceValue}
            onChange={handleInput}
          ></input>
        </div>
      </div>
      <div className="myExerciseCard__data__btns">
        <button className="myExerciseCard__data__set" onClick={handleUpdate}>
          Set
        </button>
        <button className="myExerciseCard__data__delex" onClick={handleDelte}>X</button>
      </div>
    </div>
  );
};

export default MyExercise;
