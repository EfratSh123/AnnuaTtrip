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
        if (!searchId || !searchId.trim()) {
            alert("Please enter an ID number");
            return;
        }
        const data = await getStudentById(searchId, token);
        setResults(data ? [data] : []);
    }

    async function handleTeacherById() {
        if (!searchId || !searchId.trim()) {
            alert("Please enter an ID number");
            return;
        }
        const data = await getTeacherById(searchId, token);
        setResults(data ? [data] : []);
    }

    // clean sensitive data before displaying
    function cleanData(item) {
        const copy = { ...item };
        delete copy.password;
        delete copy._id;
        delete copy.__v;
        return copy;
    }

    const cleanedResults = results.map(cleanData);

    // check if there is any data to display
    const hasData = cleanedResults.length > 0;

    // get columns from the first item (if exists) to display table headers
    const columns = hasData ? Object.keys(cleanedResults[0]) : [];

    return (
        <div>
            <h2 className="section-title">Queries</h2>
            <div className="query-buttons">    
                <button className="btn-primary-custom" onClick={handleMyStudents}>
                    My Class Students
                </button>

                <button className="btn-primary-custom" onClick={handleAllTeachers}>
                    All Teachers
                </button>
            </div>
            <hr />

            <input
                className="form-control-custom"
                placeholder="Enter ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
            />

            <button className="btn-secondary-custom" onClick={handleStudentById}>
                Find Student
            </button>

            <button className="btn-secondary-custom" onClick={handleTeacherById}>
                Find Teacher
            </button>

            <hr />

            {hasData && (
                <div className="table-container">
                    <table className="table-custom">
                        <thead>
                            <tr>
                                {columns.map((key) => (
                                    <th key={key}>
                                        {key.toUpperCase()}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {cleanedResults.map((item, i) => (
                                <tr key={i}>
                                    {columns.map((key) => (
                                        <td key={key}>
                                            {item[key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}