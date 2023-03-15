import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export default function MyAccount() {
    const [nickname, setNickname] = useState("");
    const token = Cookies.get("user_token");

    const fetchData = async () => {
        const params = {
            headers: {
                Authorization: `${token}`
            }
        }
        const response = await fetch("https://musicdetective.herokuapp.com/member-data", params)
        const data = await response.json();
        setNickname(data.user.nickname);
    }

    useEffect(() => {
        fetchData();

    }, [])

    const handleClick = () => {
        Cookies.remove('user_token');
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
                    <NavLink to="/" onClick={handleClick}>
                        <button>Log out</button>
                    </NavLink>
                </>
            )}
        </div>
    )
}

