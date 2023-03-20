import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function Sign() {
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(true);

  const handleModals = (e) => {
    if (e.target.id == "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id == "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="account__body">
      <div className="account__body__buttons">
        {signUpModal ? (
          <div className="account__body__buttons__on">
            <button onClick={handleModals} id="register">
              S'inscrire{" "}
            </button>
          </div>
        ) : (
          <div className="account__body__buttons__off">
            <button onClick={handleModals} id="register">
              S'inscrire{" "}
            </button>
          </div>
        )}
        {signInModal ? (
          <div className="account__body__buttons__on">
            <button onClick={handleModals} id="login">
              Se connecter
            </button>
          </div>
        ) : (
          <div className="account__body__buttons__off">
            <button onClick={handleModals} id="login">
              Se connecter
            </button>
          </div>
        )}
      </div>
      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}
    </div>
  );
}
