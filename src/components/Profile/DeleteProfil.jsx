import Cookies from "js-cookie";
import React from "react";

export default function DeleteProfile({ handleClickLogOut }) {
  const token = Cookies.get("user_token");

  async function handleClickDeleteAccount(e) {
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      await fetch(import.meta.env.VITE_BASE_URL + "/users", params);
      handleClickLogOut();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button onClick={handleClickDeleteAccount}>Delete my account</button>
    </div>
  );
}
