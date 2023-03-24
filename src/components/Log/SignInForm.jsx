import React, { useState } from "react";
import useFetch from "../../services/useFetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/userAction";

export default function SignInForm() {
  const dispatch = useDispatch();
  const [popupLoading, setPopUpLoading] = useState(false);

  const [form, setForm] = useState({
    email: " ",
    password: " ",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({
      ...form,
      user: {
        ...form.user,
        [e.target.id]: e.target.value,
      },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const sendData = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    };
    const data = await useFetch(
      import.meta.env.VITE_BASE_URL + "/users/sign_in",
      sendData
    );
    const token = data.token;
    if (!token) {
      setErrorMessage(
        <div className="error">
          <p>Votre email ou votre mot de passe est incorrect</p>
        </div>
      );
    } else {
      Cookies.set("user_token", token);
      navigate("/");
      dispatch(loginUser(data.data.user));
    }
  }

  const sendpasswordinstructions = async (e) => {
    const form = e.currentTarget;

    const sendInstruction = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          email: form.elements.sendemail.value,
        },
      }),
    };

    const sendPassword = await fetch(
      import.meta.env.VITE_BASE_URL + "/users/password",
      sendInstruction
    );
    const instructionPassword = await sendPassword.json();
    return instructionPassword;
  };

  return (
    <>
      <div className="account__body__forms">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" name="" id="email" onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name=""
            id="password"
            onChange={handleChange}
          />

          <button type="submit">Se Connecter</button>
          <div className="account__body__forms__forget">
            <p onClick={() => setPopUpLoading(true)} className="forgotpassword">
              Mot de passe oublié ?
            </p>
          </div>
        </form>

        {errorMessage}
      </div>

      {popupLoading ? (
        <>
          <div className="" onClick={() => setPopUpLoading(false)}></div>
          <div className="account__body__forms__forget__title">
            <h1>Mot de passe oublié</h1>
          </div>
          <div className="account__body__forms__forget__content">
            <form onSubmit={sendpasswordinstructions} className="">
              <input
                type="email"
                placeholder="Renseignez votre email"
                id="sendemail"
                autoComplete="off"
              />
              <button type="submit">Envoyer</button>
            </form>
          </div>{" "}
        </>
      ) : null}
    </>
  );
}
