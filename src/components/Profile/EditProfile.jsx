import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FieldEditEmail } from "./Edit/FieldEditEmail";
import { FieldEditNickname } from "./Edit/FieldEditNickname";
import { FieldEditPassword } from "./Edit/FieldEditPassword";

export default function EditProfile() {
  const token = Cookies.get("user_token");
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState();
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleFormDataChange = (newData) => {
    setFormData({
      ...formData,
      ...newData,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
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
        user: formData,
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
      const { user } = await response.json();
      setFormData(user);
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
          <FieldEditNickname onNicknameChange={handleFormDataChange} formData={formData} />
          <FieldEditEmail onEmailChange={handleFormDataChange} formData={formData} />

          <h3>Réinitialiser votre mot mot de passe</h3>
          <FieldEditPassword
            onPasswordChange={handleFormDataChange}
            onPasswordConfirmationChange={handleFormDataChange}
            formData={formData}
          />
          <div>
            <button type="submit">Enregistrer</button>
          </div>
          {errorMessage}
        </form>
      </div >
      <div className="orange-background"></div>
    </>
  );
}