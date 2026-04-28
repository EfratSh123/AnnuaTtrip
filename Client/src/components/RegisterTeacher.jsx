import { useState } from "react";

export default function RegisterTeacher() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [className, setClassName] = useState("");
    const [password, setPassword] = useState("");

    // Register a new teacher
    async function register() {
        const res = await fetch(
            "http://localhost:5000/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    idNumber,
                    className,
                    password
                })
            }
        );

        const data = await res.json();
        alert("Teacher registered successfully!");
        console.log(data);
    }

    return (
        <div>
            <h2>Register Teacher</h2>

            <input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <input
                placeholder="ID Number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
            />

            <input
                placeholder="Class Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={register}>
                Register Teacher
            </button>
        </div>
    );
}