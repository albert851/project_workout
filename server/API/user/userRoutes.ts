import express from "express";
import {
  getAllUsers,
  register,
  login,
  logout,
  getUserByCookie,
} from "./userCtrl";

const router = express.Router();

router
  .get("/logout", logout)
  .get("/", getAllUsers)
  .get("/get-user-by-cookie", getUserByCookie)
  .post("/register", register)
  .post("/login", login);

export default router;
