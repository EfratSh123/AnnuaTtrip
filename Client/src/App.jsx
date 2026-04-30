import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import MapView from "./components/MapView";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    function handleLogin(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <BrowserRouter>
            <Routes>
                {}
                <Route
                    path="/map"
                    element={<MapView />}
                />

                {}
                <Route
                    path="/"
                    element={
                        !token ? (
                            <Login onLogin={handleLogin} />
                        ) : (
                            <Dashboard
                                token={token}
                                onLogout={handleLogout}
                            />
                        )
                    }
                />

                {}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;