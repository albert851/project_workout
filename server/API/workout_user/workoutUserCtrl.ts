import connection from "../../DB/database";
import express from "express";

export async function newWorkout(req, res) {
  try {
    const { user_id, workout_type } = req.body;
    const query = `INSERT INTO bestworkouts.workout_users (user_id, workout_type) VALUES ("${user_id}", "${workout_type}");`;
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

export async function getWorkoutsByUserId(req, res) {
  try {
    const { user_id } = req.body;
    const query = `SELECT * FROM bestworkouts.workout_users WHERE user_id='${user_id}'`;
    connection.query(query, async (err, results, fields) => {
      try {
        if (err) throw err;

        res.send({ workoutsrById: true, userArray: results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: error });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }    
}

export async function deleteWorkout(req, res) {
  try {
    const { workout_users_id } = req.params;
    const query = `DELETE FROM bestworkouts.workout_users WHERE 'workout_users_id'='${workout_users_id}'`;
    connection.query(query, async (err, results, fields) => {
      try {
        if (err) throw err;

        res.send({ deleteWorkout: true, userArray: results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: error });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}