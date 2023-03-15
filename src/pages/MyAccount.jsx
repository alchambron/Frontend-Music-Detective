import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export default function MyAccount() {
    const [nickname, setNickname] = useState("");
    const token = Cookies.get("user_token");

    const handleClickLogOut = () => {
        Cookies.remove('user_token');
    }

    const fetchData = async () => {
        const params = {
            headers: {
                Authorization: `${token}`
            }
        }
        try {
            const response = await fetch("https://musicdetective.herokuapp.com/member-data", params)
            const data = await response.json();
            setNickname(data.user.nickname);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();

    }, [])

    async function handleClickDeleteAccount(e) {
        const params = {
            method: "DELETE",
            headers: {
                Authorization: `${token}`,
            },
        };
        try {
            await fetch("https://musicdetective.herokuapp.com/users", params);
            handleClickLogOut()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Mon compte</h1>
            {token == null || token == undefined ? (
                <>
                    <NavLink to="/register">
                        <button>Sign up</button>
                    </NavLink>
                    <NavLink to="/login">
                        <button>Login</button>
                    </NavLink>
                </>
            ) : (
                <>
                    <p>Nickname: {nickname}</p>
                    <NavLink to="/" onClick={handleClickLogOut}>
                        <button>Log out</button>
                    </NavLink>
                    <NavLink to="/" onClick={handleClickDeleteAccount}>
                        <button>Delete my account</button>
                    </NavLink>
                </>
            )}
        </div>
    )
}

