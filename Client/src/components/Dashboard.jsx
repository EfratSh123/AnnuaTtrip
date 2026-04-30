// Dashboard.jsx

import { useState } from "react";
import QueryPanel from "./QueryPanel";
import RegisterTeacher from "./RegisterTeacher";
import RegisterStudent from "./RegisterStudent";

export default function Dashboard({ token, onLogout }) {
    const [activeSection, setActiveSection] = useState("queries");

    return (
        <div className="container-center" >
            {/* Header */}
            <div className="card-custom dashboard-header">
                <div className="dashboard-header-content">
                    <h1 className="page-title" className="dashboard-title">
                        School Trip Management System
                    </h1>

                    <button
                        className="btn-secondary-custom" 
                        className="logout-fixed" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="dashboard-tabs">
                <button
                    className={`btn-secondary-custom tab-btn ${
                        activeSection === "queries" ? "active" : ""
                    }`}
                    onClick={() => setActiveSection("queries")}
                >
                    Queries
                </button>

                <button
                    className={`btn-secondary-custom tab-btn ${
                        activeSection === "teacher" ? "active" : ""
                    }`}
                    onClick={() => setActiveSection("teacher")}
                >
                    Register Teacher
                </button>

                <button
                    className={`btn-secondary-custom tab-btn ${
                        activeSection === "student" ? "active" : ""
                    }`}
                    onClick={() => setActiveSection("student")}
                >
                    Register Student
                </button>
            </div>

            {/* Content */}
            <div className="card-custom">
                <div className="table-wrapper">
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
        </div>
    );
}