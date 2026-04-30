// Dashboard.jsx

import { useState } from "react";
import QueryPanel from "./QueryPanel";
import RegisterTeacher from "./RegisterTeacher";
import RegisterStudent from "./RegisterStudent";

export default function Dashboard({ token, onLogout }) {
    const [activeSection, setActiveSection] = useState("queries");

    return (
        <div className="container-custom">
            {/* Header */}
            <div className="card-custom dashboard-header">
                <div className="dashboard-header-content">
                    <h1 className="page-title">
                        School Management System
                    </h1>

                    <button
                        className="btn-secondary-custom"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="dashboard-tabs">
                <button
                    className={`dashboard-tab ${
                        activeSection === "queries" ? "active" : ""
                    }`}
                    onClick={() => setActiveSection("queries")}
                >
                    Queries
                </button>

                <button
                    className={`dashboard-tab ${
                        activeSection === "teacher" ? "active" : ""
                    }`}
                    onClick={() => setActiveSection("teacher")}
                >
                    Register Teacher
                </button>

                <button
                    className={`dashboard-tab ${
                        activeSection === "student" ? "active" : ""
                    }`}
                    onClick={() => setActiveSection("student")}
                >
                    Register Student
                </button>
            </div>

            {/* Content */}
            <div className="card-custom">
                {activeSection === "queries" && (
                    <QueryPanel token={token} />
                )}

                {activeSection === "teacher" && (
                    <RegisterTeacher />
                )}

                {activeSection === "student" && (
                    <RegisterStudent />
                )}
            </div>
        </div>
    );
}