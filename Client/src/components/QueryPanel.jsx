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

    // מסנן שדות לא רצויים
    function cleanData(item) {
        if (item.password) delete item.password;
        if (item._id) delete item._id;
        return item;
    }

    const cleanedResults = results.map(cleanData);

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

            {/* ✅ טבלה במקום JSON */}
            {cleanedResults.length > 0 && (
                <table border="1" cellPadding="8">
                    <thead>
                        <tr>
                            {Object.keys(cleanedResults[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {cleanedResults.map((item, i) => (
                            <tr key={i}>
                                {Object.values(item).map((val, j) => (
                                    <td key={j}>{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}