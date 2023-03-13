import React, { useState } from 'react';
import useFetch from '../services/useFetch';
import Cookies from 'js-cookie';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sendData = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        const apiURL = 'https://musicdetective.herokuapp.com';
        try {
            const data = await useFetch({ apiURL }, sendData);
            const token = data.token;

            Cookies.set("user_token", token);
        } catch (error) {
            console.log(error.message);
            alert("Une erreur s'est produite lors de la connexion.");
        }
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
