import React from "react";
import { NavLink } from "react-router-dom";
import LoggedUser from "../StationUtility/LoggedUser";

export default function ButtonMyAccount() {
  const userLoggedIn = LoggedUser();

  return (
    <div className="button-my-account">
      <NavLink to="/profile">
        {!userLoggedIn ? (
          <h3>Connexion</h3>
        ) : (
          <h3>Mon compte</h3>
        )}
      </NavLink>
    </div>
  );
}