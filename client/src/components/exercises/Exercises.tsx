import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addExreciseToArr } from "../../features/exercise/exercise";
import { daySelectedSelector } from "../../features/daySelected/daySelected";
import Card from "../card/Card";
import Exresice from "./exercise";

interface ExerciseshProps {
  exercises: Exresice[];
}

const Exercises: FC<ExerciseshProps> = ({ exercises }) => {
  const dispatch = useAppDispatch();
  const daySelected = useAppSelector(daySelectedSelector);
  const [middleChest, setMiddleChest] = useState<Exresice[]>();
  const [upperChest, setUpperChest] = useState<Exresice[]>();
  const [lowerChest, setLowerChest] = useState<Exresice[]>();
  const [middleBack, setMiddleBack] = useState<Exresice[]>();
  const [upperBack, setUpperBack] = useState<Exresice[]>();
  const [lowerBack, setLowerBack] = useState<Exresice[]>();
  const [calves, setCalves] = useState<Exresice[]>();
  const [quadriceps, setQuadriceps] = useState<Exresice[]>();
  const [hamstring, setHamstring] = useState<Exresice[]>();
  const [quadHams, setQuadHams] = useState<Exresice[]>();
  const [shoulders, setShoulders] = useState<Exresice[]>();
  const [forearms, setForearms] = useState<Exresice[]>();
  const [biceps, setBiceps] = useState<Exresice[]>();
  const [triceps, setTriceps] = useState<Exresice[]>();
  const [abs, setAbs] = useState<Exresice[]>();
  const [cardio, setCardio] = useState<Exresice[]>();

  const handleFullBody = () => {
    if (middleChest) {
      const currentExercise =
        middleChest[Math.floor(Math.random() * middleChest.length)];
      sendExercise(currentExercise);
    }

    if (middleBack) {
      const currentExercise =
        middleBack[Math.floor(Math.random() * middleBack.length)];
      sendExercise(currentExercise);
    }

    if (lowerBack) {
      const currentExercise =
        lowerBack[Math.floor(Math.random() * lowerBack.length)];
      sendExercise(currentExercise);
    }

    if (calves) {
      const currentExercise = calves[Math.floor(Math.random() * calves.length)];
      sendExercise(currentExercise);
    }

    if (quadHams) {
      const currentExercise =
        quadHams[Math.floor(Math.random() * quadHams.length)];
      sendExercise(currentExercise);
    }

    if (shoulders) {
      const currentExercise =
        shoulders[Math.floor(Math.random() * shoulders.length)];
      sendExercise(currentExercise);
    }

    if (abs) {
      const currentExercise = abs[Math.floor(Math.random() * abs.length)];
      sendExercise(currentExercise);
    }
  };

  const handleWeightLoss = () => {
    if (cardio) {
      const currentExercise = cardio[Math.floor(Math.random() * cardio.length)];
      sendExercise(currentExercise);
    }

    const exercise_1 = exercises.filter((e) => e.name == "Push-Ups");
    const exercise_2 = exercises.filter((e) => e.name == "Pull-Ups");
    const exercise_3 = exercises.filter((e) => e.name == "Barbell Squats");
    const exercise_4 = exercises.filter((e) => e.name == "Bear Crawls");
    const exercise_5 = exercises.filter((e) => e.name == "Bicycles/Cross-body Crunches");

    sendExercise(exercise_1[0]);
    sendExercise(exercise_2[0]);
    sendExercise(exercise_3[0]);
    sendExercise(exercise_4[0]);
    sendExercise(exercise_5[0]);
  };

  const handleStrength = () => {
    const workoutType = (Math.floor(Math.random() * 3)+1);

    if(workoutType == 1){
      if (middleChest) {
        const currentExercise =
          middleChest[Math.floor(Math.random() * middleChest.length)];
        sendExercise(currentExercise);
      }
      if (lowerChest) {
        const currentExercise =
          lowerChest[Math.floor(Math.random() * lowerChest.length)];
        sendExercise(currentExercise);
      }
      if (upperChest) {
        const currentExercise =
          upperChest[Math.floor(Math.random() * upperChest.length)];
        sendExercise(currentExercise);
      }
      if (biceps) {
        const currentExercise =
          biceps[Math.floor(Math.random() * biceps.length)];
        sendExercise(currentExercise);
      }
      if (forearms) {
        const currentExercise =
          forearms[Math.floor(Math.random() * forearms.length)];
        sendExercise(currentExercise);
      }
    }
    if(workoutType == 2){
      if (middleBack) {
        const currentExercise =
          middleBack[Math.floor(Math.random() * middleBack.length)];
        sendExercise(currentExercise);
      }
      if (lowerBack) {
        const currentExercise =
          lowerBack[Math.floor(Math.random() * lowerBack.length)];
        sendExercise(currentExercise);
      }
      if (upperBack) {
        const currentExercise =
          upperBack[Math.floor(Math.random() * upperBack.length)];
        sendExercise(currentExercise);
      }
      if (triceps) {
        const currentExercise =
          triceps[Math.floor(Math.random() * triceps.length)];
        sendExercise(currentExercise);
      }
      if (abs) {
        const currentExercise =
          abs[Math.floor(Math.random() * abs.length)];
        sendExercise(currentExercise);
      }
    }
    else{
      if (cardio) {
        const currentExercise =
          cardio[Math.floor(Math.random() * cardio.length)];
        sendExercise(currentExercise);
      }
      if (quadHams) {
        const currentExercise =
          quadHams[Math.floor(Math.random() * quadHams.length)];
        sendExercise(currentExercise);
      }
      if (quadriceps) {
        const currentExercise =
          quadriceps[Math.floor(Math.random() * quadriceps.length)];
        sendExercise(currentExercise);
      }
      if (hamstring) {
        const currentExercise =
          hamstring[Math.floor(Math.random() * hamstring.length)];
        sendExercise(currentExercise);
      }
      if (shoulders) {
        const currentExercise =
          shoulders[Math.floor(Math.random() * shoulders.length)];
        sendExercise(currentExercise);
      }
    }
  };

  const handleAerobic = () => {
    if (cardio) {
      const currentExercise = cardio[Math.floor(Math.random() * cardio.length)];
      sendExercise(currentExercise);
    }
  };

  const appropriatWorkout = () => {
    if (daySelected.day == "Full body") {
      handleFullBody();
    }
    if (daySelected.day == "Weight loss") {
      handleWeightLoss();
    }
    if (daySelected.day == "Strength") {
      handleStrength();
    }
    if (daySelected.day == "Aerobic") {
      handleAerobic();
    }
  };

  const sendExercise = (exercise: Exresice) => {
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
  };

  const exerciseByParts = () => {
    setMiddleChest(exercises.filter((e) => e.subcategory == "Middle chest"));
    setUpperChest(exercises.filter((e) => e.subcategory == "Upper chest"));
    setLowerChest(exercises.filter((e) => e.subcategory == "Lower chest"));
    setMiddleBack(exercises.filter((e) => e.subcategory == "Middle Back/Lats"));
    setUpperBack(exercises.filter((e) => e.subcategory == "Upper Back"));
    setLowerBack(exercises.filter((e) => e.subcategory == "Lower Back/Lats"));
    setCalves(exercises.filter((e) => e.subcategory == "Calves"));
    setQuadriceps(exercises.filter((e) => e.subcategory == "Quadriceps"));
    setHamstring(exercises.filter((e) => e.subcategory == "Hamstring"));
    setQuadHams(
      exercises.filter((e) => e.subcategory == "Quadriceps/Hamstring")
    );
    setShoulders(exercises.filter((e) => e.target == "Shoulders"));
    setBiceps(exercises.filter((e) => e.subcategory == "Biceps"));
    setTriceps(exercises.filter((e) => e.subcategory == "Triceps"));
    setForearms(exercises.filter((e) => e.subcategory == "Forearms"));
    setAbs(exercises.filter((e) => e.target == "Abs"));
    setCardio(exercises.filter((e) => e.target == "Full Body"));
  };

  useEffect(() => {
    appropriatWorkout();
  }, [daySelected]);

  useEffect(() => {
    exerciseByParts();
  }, [exercises]);

  return (
    <div className="exercises">
      {exercises.map((exercise, index) => {
        return <Card key={index} exercise={exercise} />;
      })};
    </div>
  );
};

export default Exercises;
