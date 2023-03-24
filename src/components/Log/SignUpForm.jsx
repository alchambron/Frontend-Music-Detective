import React, { useState } from "react";
import useFetch from "../../services/useFetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/userAction";
import { checkEmail, checkPassword } from "../../services/fieldService";

export default function SignUpForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    user: {
      email: " ",
      password: " ",
    },
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
    if (checkEmail && checkPassword) {
      e.preventDefault();
      const sendData = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      };
      const data = await useFetch(
        import.meta.env.VITE_BASE_URL + "/users/",
        sendData
      );
      const token = data.token;
      if (!token) {
        setErrorMessage("La création du compte à échouer, veuillez réessayer");
      } else {
        Cookies.set("user_token", token);
        navigate("/");
        dispatch(loginUser(data.data.user));
      }
    }
  }

  return (
    <div className="account__body__forms">
      <form onSubmit={handleSubmit}>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name=""
          id="email"
          onChange={handleChange}
          onBlur={(e) => { checkEmail(e.target.value, { setErrorMessage }) }}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name=""
          id="password"
          onChange={handleChange}
          onBlur={(e) => { checkPassword(e.target.value, { setErrorMessage }) }}
        />

        <button type="submit">S'inscrire </button>
      </form>
      <div className="error"> <p>{errorMessage}</p></div>
    </div>
  );
}