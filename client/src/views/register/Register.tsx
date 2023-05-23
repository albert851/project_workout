import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from '../../components/navbar/NavBar';

const Register = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const navigate = useNavigate();
  const[workOutDisp, setWorkOutDisp] = useState<boolean>(false);

  async function handleSubmit(ev: any) {
    try {
      ev.preventDefault();
      const { data } = await axios.post("/api/users/register", {
        email,
        name,
        password,
        repeatPassword,
      });
      if (data.register) {
        navigate("/logIn");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='register'>
      <NavBar userDisplay="none" setWorkouts={setWorkOutDisp} workouts={workOutDisp} />
      <form className="register__form" onSubmit={handleSubmit}>
      <h2>Register</h2>
        <div className='register__form__box'>
          <h4>Email:</h4>
          <input
            className="register__input"
            value={email}
            type="email"
            placeholder="email"
            required
            onInput={(ev: any) => {
              setEmail(ev.target.value);
            }}
          />
        </div>
        <div className='register__form__box'>
          <h4>Name:</h4>
          <input
            className="register__input"
            value={name}
            type="trxt"
            placeholder="user name"
            required
            onInput={(ev: any) => {
              setName(ev.target.value);
            }}
          />
        </div>
        <div className='register__form__box'>
          <h4>Password</h4>
          <input
            className="register__input"
            value={password}
            type="password"
            placeholder="password"
            required
            onInput={(ev: any) => {
              setPassword(ev.target.value);
            }}
          />
        </div>
        <div className='register__form__box'>
          <h4>Repeat Password</h4>
          <input
            className="register__input"
            value={repeatPassword}
            type="password"
            placeholder="repeat password"
            required
            onInput={(ev: any) => {
              setRepeatPassword(ev.target.value);
            }}
        />
        </div>
        <button className="register__form__submit" type="submit">Register</button>
        <Link className="register__loginLink"
          style={{ textDecoration: "none" }}
          to={`/login`} >
          <p>To log-in click here</p>
        </Link>
      </form>
    </div>
  )
}

export default Register