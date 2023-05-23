import connection from "../../DB/database";
import express from "express";

export async function getAllExercises(req, res) {
  try {
    const query = "SELECT * FROM bestworkouts.exercises";
    connection.query(query, (err, results) => {
      try {
        if (err) throw err;
        res.send({ results });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getExercisesByrId(req, res) {
  try {
    const { exercise_id } = req.body;
    const query = `SELECT * from bestworkouts.exercises WHERE exercise_id='${exercise_id}'`;
    connection.query(query, async (err, results, fields) => {
      try {
        if (err) throw err;

        res.send({ exerciseId: true, userArray: results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: error });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }    
}


  