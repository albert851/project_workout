import React from "react";
import axios from "axios";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./views/mainPage/MainPage";
import LogIn from "./views/login/LogIn";
import Register from "./views/register/Register";
import MyWorkouts from "./views/myWorkouts/MyWorkouts";


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/my_workouts" element={<MyWorkouts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
