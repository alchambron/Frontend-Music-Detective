import React, { useState } from "react";
import useFetch from "../../services/useFetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, } from "react-redux";
import { loginUser } from "../../actions/userAction";

export default function SignInForm() {
  const dispatch = useDispatch();
  const [popupLoading, setPopUpLoading] = useState(false);
  const state = useSelector((state) => {
    return state;
  });

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
      setErrorMessage("Your email or password was incorrect");
    } else {
      Cookies.set("user_token", token);
      navigate("/");
      dispatch(loginUser(data.data.user));
    }
  }

  const sendpasswordinstructions = (e) => {
    const form = e.currentTarget;

    fetch(import.meta.env.VITE_BASE_URL + "/users/password", {
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
    }).then((response) => {
      return response.json();
    });
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
          <p onClick={() => setPopUpLoading(true)} className="forgotpassword">
            Mot de passe oublié ?
          </p>
        </form>
        {errorMessage}
      </div>

      {popupLoading ? (
        <>
          <div className="" onClick={() => setPopUpLoading(false)}></div>
          <div className="account__title">
            <h1>Mot de passe oublié</h1>
          </div>
          <div className="account__body__forms">
            <form onSubmit={sendpasswordinstructions} className="">
              <input
                type="email"
                placeholder="Enter your email"
                id="sendemail"
                autoComplete="off"
              />
              <button type="submit">Obtenir instruction</button>
            </form>
          </div>{" "}
        </>
      ) : null}
    </>
  );
}
