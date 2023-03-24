import React, { useState } from "react";
import InputField from "../../StationUtility/InputField";

export const FieldEditNickname = ({ onNicknameChange, formData }) => {
  const [nickname, setNickname] = useState(formData.nickname);

  const handleNicknameChange = (event) => {
    const newNickname = event.target.value;
    setNickname(newNickname);
    onNicknameChange({ nickname: newNickname });
  };

  return (
    <div className="edit__form__user__infos">
      <InputField
        label="Pseudo"
        type="text"
        id="nickname"
        name="nickname"
        value={nickname}
        onChange={handleNicknameChange}
      />
    </div>
  );
};
