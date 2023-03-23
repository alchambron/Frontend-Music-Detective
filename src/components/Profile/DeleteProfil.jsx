import Cookies from "js-cookie";
import React from "react";

export default function DeleteProfile({ handleClickLogOut }) {
  const token = Cookies.get("user_token");

    async function handleClickDeleteAccount() {
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
        }
    }
    return (
        <div className='account__logged__buttons__down__delete'>
            <button onClick={handleClickDeleteAccount}>Supprimer votre compte</button>
        </div>
    );
}
