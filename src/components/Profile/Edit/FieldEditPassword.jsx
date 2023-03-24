import InputField from "../../StationUtility/InputField";
import React, { useState } from "react";

export const FieldEditPassword = ({
  onPasswordChange,
  onPasswordConfirmationChange,
}) => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handlePasswordChange = (event) => {
    const newPasswordChange = event.target.value;
    setPassword(newPasswordChange);
    onPasswordChange({ password: newPasswordChange });
  };

  const handlePasswordConfirmationChange = (event) => {
    const newPasswordConfirmationChange = event.target.value;
    setPasswordConfirmation(newPasswordConfirmationChange);
    onPasswordConfirmationChange({
      passwordConfirmation: newPasswordConfirmationChange,
    });
  };
  return (
    <div className="edit__form__password">
      <div className="edit__form__password__new">
        <InputField
          label="Nouveau mot de passe"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="edit__form__password__new">
        <InputField
          label="Confirmer le mot de passe"
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
        />
      </div>
    </div>
  );
};
