import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonMyAccount from "../components/ButtonMyAccount";

export default function Home() {
  const navigate = useNavigate();

  function Startplay() {
    navigate("./choice");
  }

  return (
    <div className="home">
      <ButtonMyAccount />
      <h1>Music Detective</h1>

      <h2>Le Concept</h2>

      <div className="hr">
        <hr></hr>
      </div>

      <div className="ChoicePlaylistHome">
        <img src=""></img>
        <p>Choisi ta playlist!</p>
      </div>

      <div className="ChoiceMusicHome">
        <img src=""></img>
        <p>Devine la musique!</p>
      </div>

      <div className="becomes the best">
        <img src=""></img>
        <p>Devien le meilleur!</p>
      </div>
      <button onClick={Startplay}>Jouer</button>
    </div>
  );
}
