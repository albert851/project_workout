import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [workOutDisp, setWorkOutDisp] = useState<boolean>(false);

  async function handleSubmit(ev: any) {
    try {
      ev.preventDefault();
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      if (data.login) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login">
      <NavBar
        userDisplay="none"
        setWorkouts={setWorkOutDisp}
        workouts={workOutDisp}
      />
      <form className="login__form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div className="login__form__box">
          <h4>Email:</h4>
          <input
            className="login__input"
            value={email}
            type="email"
            placeholder="email"
            required
            onInput={(ev: any) => {
              setEmail(ev.target.value);
            }}
          />
        </div>
        <div className="login__form__box">
          <h4>Password:</h4>
          <input
            className="login__input"
            value={password}
            type="password"
            placeholder="password"
            required
            onInput={(ev: any) => {
              setPassword(ev.target.value);
            }}
          />
        </div>
        <button className="login__form__submit" type="submit">
          Login
        </button>
        <Link
          className="login__registrationLink"
          style={{ textDecoration: "none" }}
          to={`/registration`}
        >
          <p>To register click here</p>
        </Link>
      </form>
    </div>
  );
};

export default LogIn;
