import React, { useState } from 'react'
import useFetch from '../services/useFetch'
export default function SignUpForm() {
    const [formData, setFormData] = useState({
        email: " ",
        password: " ",
    });
    console.log("🚀 ~ file: SignUpForm.jsx:9 ~ SignUpForm ~ formData:", formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sendData = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        const apiURL = 'https://musicdetective.herokuapp.com/';
        const data = await useFetch({ apiURL }, sendData)
        const token = await data.token

        Cookies.set("user_token", token)
        navigate("/");

    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                onChange={handleChange} />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                onChange={handleChange} />

            <button type="submit">Login</button>
        </form>
    )
}