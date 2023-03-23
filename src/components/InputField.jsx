import React from "react";

export default function InputField({ label, type, id, value, onChange }) {

    return (
        <>
            <label
                htmlFor={id}>{label}
            </label>

            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
            />
        </>
    );
}