import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonMyAccount from "../components/StationUtility/ButtonMyAccount";
import homeSVG1 from "../assets/home_icon_1.svg";
import homeSVG2 from "../assets/home_icon_2.svg";
import homeSVG3 from "../assets/home_icon_3.svg";
import { useSelector } from "react-redux";
import ButtonAdmin from "../components/Home/ButtonAdmin";

export default function Home() {
  const [AdminLoggedIn, setAdminLoggedIn] = useState(false);

  const navigate = useNavigate();

  function Startplay() {
    navigate("./choice/");
  }

  const loggedUser = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (loggedUser && loggedUser.is_admin) {
      setAdminLoggedIn(true);
    } else {
      setAdminLoggedIn(false);
    }
  }, [loggedUser]);
  return (
    <div className="home">
      {AdminLoggedIn &&
        <div >
          <ButtonAdmin />
        </div>
      }
      <div className="navBar">
        <ButtonMyAccount />
      </div>
      <div className="home__body">
        <div className="home__body__title">
          <h1>Music Detective</h1>
        </div>

        <div className="home__body__content">
          <div className="home__body__content__title">
            <h2>Le Concept</h2>
            <hr />
          </div>

          <div className="home__body__content__element1">
            <img src={homeSVG1} alt="" />
            <p>Choisis ta playlist! </p>
          </div>

          <div className="home__body__content__element2">
            <img src={homeSVG2} alt="" />
            <p>Devines la musique !</p>
          </div>

          <div className="home__body__content__element3">
            <img src={homeSVG3} alt="" />
            <p>Deviens le meilleur !</p>
          </div>
        </div>
        <div className="home__cta">
          <button onClick={Startplay}>Jouer</button>
        </div>
      </div>
      <div className="orange-background"></div>
    </div>
  );
}
