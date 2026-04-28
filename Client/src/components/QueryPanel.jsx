import { useState } from "react";
import {
    getStudents,
    getStudentById,
    getTeachers,
    getTeacherById,
} from "../services/api";

export default function QueryPanel({ token }) {
    const [results, setResults] = useState([]);
    const [searchId, setSearchId] = useState("");

    async function handleMyStudents() {
        const data = await getStudents(token);
        setResults(data);
    }

    async function handleAllTeachers() {
        const data = await getTeachers(token);
        setResults(data);
    }

    async function handleStudentById() {
        const data = await getStudentById(searchId, token);
        setResults(data ? [data] : []);
    }

    async function handleTeacherById() {
        const data = await getTeacherById(searchId, token);
        setResults(data ? [data] : []);
    }

    return (
        <div>
            <h2>Queries</h2>

            <button onClick={handleMyStudents}>
                My Class Students
            </button>

            <button onClick={handleAllTeachers}>
                All Teachers
            </button>

            <hr />

            <input
                placeholder="Enter ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
            />

            <button onClick={handleStudentById}>
                Find Student
            </button>

            <button onClick={handleTeacherById}>
                Find Teacher
            </button>

            <hr />

            <pre>
                {JSON.stringify(results, null, 2)}
            </pre>
        </div>
    );
}