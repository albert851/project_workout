import express from "express";
import connection from "../../DB/database";
import { UserValidation } from "./userValidation";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import { error } from "console";
const saltRounds = 10;

export async function register(req: express.Request, res: express.Response) {
  try {
    const { email, name, password, repeatPassword } = req.body;
    if (!email || !name || !password || !repeatPassword)
      throw new Error("Couldn't get all fields from req.body");

    const { error } = UserValidation.validate({
      email,
      name,
      password,
      repeatPassword,
    });
    if (error) throw error;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const query = `INSERT INTO users (email, password, name) VALUES ('${email}', '${hash}', '${name}')`;
    connection.query(query, (error, results, fields) => {
      try {
        //sending cookie
        if (error) throw error;
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("Couldn't load secret from .env");
        //@ts-ignore
        const cookie = { user_Id: results.insertId };
        const JWTCookie = jwt.encode(cookie, secret);

        res.cookie("userID", JWTCookie);
        res.send({ register: true, results });
      } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, error: error });
      }
    });
  } catch (error) {
    res.status(500).send({ notOK: error });
  }
}

export async function login(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Couldn't get all fields from req.body");

    const query = `SELECT * from users WHERE email='${email}'`;
    connection.query(query, async (err, results, fields) => {
      try {
        if (err) throw err;

        const isMatch = await bcrypt.compare(password, results[0].password);
        if (!isMatch) throw new Error("Email or password do not match");

        //sending cookie
        const cookie = { userId: results[0].user_id };
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("Couldn't load secret from .env");

        const JWTCookie = jwt.encode(cookie, secret);

        res.cookie("userID", JWTCookie);
        res.send({ login: true, userArray: results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: error });
      }
    });
  } catch (error) {
    res.status(500).send({ notOK: error });
  }
}

export async function getAllUsers(req, res) {
  try {
    const query = "SELECT * FROM bestworkouts.users";
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

export async function getUserByCookie(req: express.Request, res: express.Response) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;
    if (!userID) throw new Error("Couldn't find user from cookies");

    const decodedUserId = jwt.decode(userID, secret);
    const { userId } = decodedUserId;

    const query = `SELECT * from users WHERE user_id='${userId}'`;
    connection.query(query, async (err, results, fields) => {
      try {
        if (err) throw err;

        res.send({ userById: true, userArray: results });
      } catch (error) {
        console.log(err);
        res.status(500).send({ ok: false, error: error });
      }
    });
  } catch (error) {
    res.send({ error: error.message });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("userID");
    res.send({ logout: true });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}