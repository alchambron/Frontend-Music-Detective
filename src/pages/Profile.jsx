import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { logoutUser } from '../actions/userAction';
import Sign from '../components/Log/Sign';
import { getUserProfile } from '../services/userService';

export default function Profile() {
    const [nickname, setNickname] = useState("");
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const token = Cookies.get("user_token");
    const dispatch = useDispatch();
    const loggedUser = useSelector((state) => {
        return state.user
    })
    useEffect(() => {
        if (loggedUser?.id) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false)
        }
    }, [loggedUser]);

    const handleClickLogOut = () => {
        Cookies.remove('user_token');
        dispatch(logoutUser())
    }

    const fetchData = async () => {
        try {
            const user = await getUserProfile();
            setNickname(user.nickname);
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
            await fetch(import.meta.env.VITE_BASE_URL + "/users", params);
            handleClickLogOut()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Mon compte</h1>
            {!userLoggedIn ? (
                <Sign />
            ) : (
                <>
                    <p>Nickname: {nickname}</p>
                    <NavLink to="/edit">
                        <button>Edit Account</button>
                    </NavLink>
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

