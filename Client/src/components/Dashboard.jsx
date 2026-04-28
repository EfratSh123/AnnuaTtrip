import QueryPanel from "./QueryPanel";
import RegisterTeacher from "./RegisterTeacher";
import RegisterStudent from "./RegisterStudent";
import { useState } from "react";
import MapView from "./MapView";

export default function Dashboard({ token, onLogout }) {
    const [showMap, setShowMap] = useState(false);

    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "white",
        zIndex: 1000,
        padding: "20px",
        overflow: "auto"
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>School Management System</h1>

            <button onClick={onLogout}>
                Logout
            </button>

            <hr />

            <QueryPanel token={token} />

            <hr />

            {/* כפתור פתיחת מפה */}
            <button onClick={() => setShowMap(true)}>
                Open Map
            </button>

            {/* מפה בחלון נפרד */}
            {showMap && (
                <div style={overlayStyle}>
                    <button onClick={() => setShowMap(false)}>
                        Close Map
                    </button>

                    <MapView />
                </div>
            )}

            <hr />

            <RegisterTeacher />

            <hr />

            <RegisterStudent />
        </div>
    );
}