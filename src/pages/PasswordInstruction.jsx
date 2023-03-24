import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const Passwordinstructions = () => {
  const token = useParams().tokenId;
  const navigate = useNavigate();

  const changePassword = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const instruction = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          reset_password_token: token,
          password: form.elements.newpassword.value,
          password_confirmation: form.elements.confirmnewpassword.value,
        },
      }),
    };
    try {
      await fetch(
        import.meta.env.VITE_BASE_URL + "/users/password",
        instruction
      );
      navigate('/profile')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <Link to="/">
          <i className=""></i>
        </Link>

        <div className="">
          <div className="">
            <h2>Changer le mot de passe</h2>
          </div>
          <br></br>
          <div>
            <form onSubmit={changePassword} className="">
              <input
                placeholder="new password"
                type="password"
                id="newpassword"
              />
              <input
                placeholder="confirme new password"
                type="password"
                id="confirmnewpassword"
              />
              <button type="submit">Valider changement</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Passwordinstructions;
