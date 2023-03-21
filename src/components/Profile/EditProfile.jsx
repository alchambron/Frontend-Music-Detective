import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function EditProfile() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = Cookies.get("user_token");
  const navigate = useNavigate();

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage("The passwords do not match.");
      return;
    }

    const params = {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          nickname: nickname,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/users",
        params
      );
      await response.json();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    const params = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/member-data",
        params
      );
      const data = await response.json();
      setNickname(data.user.nickname);
      setEmail(data.user.email);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="leave">
        <NavLink to="/">
          <p>Retour</p>
        </NavLink>
      </div>

      <div className="edit">
        <h1>Modifier votre profil</h1>
        <form className="edit__form" onSubmit={handleSubmit}>
          <h3>Vos informations</h3>
          <div className="edit__form__user">
            <div className="edit__form__user__infos">
              <label htmlFor="nickname">Pseudo</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={handleNicknameChange}
              />
            </div>
            <div className="edit__form__user__infos">
              <label htmlFor="email">Adresse mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <h3>Réinitialiser votre mot mot de passe</h3>
          <div className="edit__form__password">
            <div className="edit__form__password__new">
              <label htmlFor="password">Nouveau mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="edit__form__password__new">
              <label htmlFor="password_confirmation">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                onChange={handlePasswordConfirmationChange}
              />
            </div>
          </div>
          <div>
            <button type="submit">Enregistrer</button>
          </div>
          {errorMessage}
        </form>
      </div>
      <div className="orange-background"></div>
    </>
  );
}
