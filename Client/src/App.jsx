import { useState } from "react";
import Login from "./components/Login.jsx";
import StudentsList from "./components/StudentsList.jsx";
import Dashboard from "./components/Dashboard";

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
        <div>
            {!token ? (
                <Login onLogin={handleLogin} />
            ) : (
                <Dashboard token={token} onLogout={handleLogout} />
            )}
        </div>
    );
}

export default App;