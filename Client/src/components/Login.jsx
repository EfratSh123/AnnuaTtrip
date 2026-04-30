import { useState } from "react";
import { Link } from "react-router-dom";
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
        <div className="container-custom">
            <div className="card-custom">
                <h1 className="page-title">
                    Teacher Login
                </h1>

                <input
                    className="form-control-custom"
                    placeholder="ID Number"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control-custom"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="btn-primary-custom"
                    onClick={handleLogin}
                >
                    Enter System
                </button>

                <div style={{ marginTop: "20px" }}>
                    <Link
                        to="/map"
                        className="btn-secondary-custom"
                    >
                        View Live Map
                    </Link>
                </div>
            </div>
        </div>
    );
}