import connection from "../../DB/database";
import express from "express";

export async function newExercise(req, res) {
  try {
    const { workout_id, exercise_id, day, sets, reps, time, distance } =
      req.body;
    const query = `INSERT INTO bestworkouts.workout_exerecise (workout_id, 
        exercise_id, 
        day, 
        sets, 
        reps, 
        time, 
        distance) VALUES ("${workout_id}",
        "${exercise_id}", 
        "${day}", 
        "${sets}", 
        "${reps}", 
        "${time}", 
        "${distance}");`;
    connection.query(query, (err, results) => {
      try {
        if (err) throw err;
        res.send({ results, ok: true });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getExercisesByWorkoutId(req, res) {
  try {
    const { workout_id } = req.body;
    const query = `SELECT * from bestworkouts.workout_exerecise WHERE workout_id='${workout_id}'`;
    connection.query(query, async (err, results, fields) => {
      try {
        if (err) throw err;

        res.send({ exersisesById: true, userArray: results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: error });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function updateExercise(req, res) {
  try {
    const { id } = req.params;
    const { sets, reps, time, distance } = req.body;

    console.log(id)
    console.log(sets)
    console.log(reps)
    console.log(time)
    console.log(distance)

    const query = `UPDATE bestworkouts.workout_exerecise SET 
      sets = ${sets}, 
      reps = ${reps}, 
      time = ${time}, 
      distance = ${distance} 
      WHERE (exercise_id=${id})`;
    connection.query(query, async (err, results, fields) => {
      try {
        if (err) throw err;

        res.send({ updateExersises: true, userArray: results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: error });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
