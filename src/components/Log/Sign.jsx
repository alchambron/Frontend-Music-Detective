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
    <div>
      <div>
        <button onClick={handleModals} id="register">
          SIGN UP{" "}
        </button>
        <button onClick={handleModals} id="login">
          SIGN IN
        </button>
      </div>
      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}
    </div>
  );
}
