import React, { useState } from "react";
import useFetch from '../services/useFetch'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        user: {
            email: " ",
            password: " ",
        },
    });
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({
            ...form,
            user: {
                ...form.user,
                [e.target.id]: e.target.value,
            },
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const sendData = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(form),
        };
        try {
            const data = await useFetch("https://musicdetective.herokuapp.com/users/", sendData);
            const token = data.token;

            Cookies.set("user_token", token);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                name=""
                id="email"
                onChange={handleChange} />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                name=""
                id="password"
                onChange={handleChange} />

            <button type="submit">Login</button>
        </form>
    )
}