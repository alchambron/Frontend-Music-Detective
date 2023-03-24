import React, { useState } from "react";
import InputField from "../../StationUtility/InputField";

export const FieldEditEmail = ({ onEmailChange, formData }) => {
  const [email, setEmail] = useState(formData.email);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    onEmailChange({ email: newEmail });
  };

  return (
    <div className="edit__form__user__infos">
      <InputField
        label="Adresse mail"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />
    </div>
  );
};
