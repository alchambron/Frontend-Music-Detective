import React from "react";

export default function LogoutProfile({handleClickLogOut}) {
    return (
      <div className="account__logged__buttons__up__logout">
        <button onClick={handleClickLogOut}>Se déconnecter</button>
      </div>
    );
}
