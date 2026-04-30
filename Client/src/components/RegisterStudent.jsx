import { useState } from "react";

export default function RegisterStudent() {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [className, setClassName] = useState("");

    async function register() {
        if (!name || !id || !className) {
            alert("Please fill all fields");
            return;
        }
        const res = await fetch(
            "http://localhost:5000/auth/register/student",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    id,
                    className
                })
            }
        );

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Error registering student");
            return;
        }

        alert("Student registered successfully!");
        console.log(data);
    }

    return (
        <div>
            <h2>Register Student</h2>

            <input className="form-control-custom"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input className="form-control-custom"
                placeholder="Student ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            <input className="form-control-custom"
                placeholder="Class Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
            />

            <button className="btn-primary-custom" onClick={register}>
                Register Student
            </button>
        </div>
    );
}