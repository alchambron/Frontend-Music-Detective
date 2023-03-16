import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonMyAccount from "../components/ButtonMyAccount";
import homeSVG1 from "../assets/home_icon_1.svg"
import homeSVG2 from "../assets/home_icon_2.svg"
import homeSVG3 from "../assets/home_icon_3.svg"

export default function Home() {
  const navigate = useNavigate();

  function Startplay() {
    navigate("./choice");
  }

  return (
    <div className="home">
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
