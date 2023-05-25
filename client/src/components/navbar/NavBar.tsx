import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import menu from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser, userSelector } from "../../features/user/userSlise";
import workouts from "./../workouts/Workouts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import { navBarDispSelector } from "../../features/navBarDisp/navBarDisp";
interface NavBarProps {
  userDisplay: string;
  setWorkouts: CallableFunction;
  workouts: boolean;
}

const NavBar: FC<NavBarProps> = ({ userDisplay, workouts, setWorkouts }) => {
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);
  const [arrowDisp, setArrowDisp] = useState<string>();
  const navBarDisp = useAppSelector(navBarDispSelector);
  const [homeDisp, setHomeDisp] = useState<string>();
  const [myWorkoutsDisp, setMyWorkoutsDisp] = useState<string>();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  async function handleLogout() {
    try {
      console.log("trying to logout");
      const { data } = await axios.get("/api/users/logout");
      const { logout } = data;
      if (logout) {
        dispatch(logoutUser());
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleworkout = () => {
    setWorkouts(!workouts);
  };

  const handleMyWorkouts = () => {
    navigate("/my_workouts");
  };

  useEffect(() => {
    if (userDisplay == "block") {
      setArrowDisp("none");
    } else {
      setArrowDisp("block");
    }
  }, [userDisplay]);

  return (
    <div className="navBar">
      <div className="navBar__logo">
        <h2>BW</h2>
      </div>
      <div className="navBar__btns">
        {user == null ? (
          <ArrowBackIosIcon
            className="login__goBack__btn"
            onClick={handleGoBack}
            style={{ display: arrowDisp }}
          />
        ) : null}
        {user == null ? (
          <PersonOutlineOutlinedIcon
            className="navBar__user__btn"
            onClick={handleLogin}
            style={{ display: userDisplay }}
          />
        ) : null}
        {user != null ? (
          <HomeIcon
            className="navBar__menu__btn"
            style={{ display: navBarDisp.home }}
            onClick={handleGoBack}
          />
        ) : null}
        {user != null ? (
          <CalendarMonthIcon
            className="navBar__menu__btn"
            style={{ display: navBarDisp.myWorkouts }}
            onClick={handleMyWorkouts}
          />
        ) : null}
        {user != null ? (
          <MenuIcon
            className="navBar__menu__btn"
            style={{ display: navBarDisp.myWorkouts }}
            onClick={handleworkout}
          />
        ) : null}
        {user != null ? (
          <LogoutIcon
            className="navBar__exit__btn"
            onClick={handleLogout}
            style={{ display: "block" }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
