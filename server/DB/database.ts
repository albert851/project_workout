import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const sqlPassword = process.env.SQLPASSWORD;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: sqlPassword,
  database: "bestworkouts",
});

connection.connect((err) => {
  try {
    if (err) throw err;
    console.log("👌 MySQL is connected");
  } catch (error) {
    console.error(error);
  }
});

export default connection;