import { useState } from "react";
import { login } from "../services/api";

export default function Login({ onLogin }) {
    const [idNumber, setIdNumber] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const data = await login(idNumber, password);

        if (data.token) {
            localStorage.setItem("token", data.token);
            onLogin(data.token);
        } else {
            alert("Login failed");
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Teacher Login</h2>

            <input
                placeholder="ID Number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
            />

            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />

            <button onClick={handleLogin}>
                Enter System
            </button>
        </div>
    );
}