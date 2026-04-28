import { useEffect, useState } from "react";
import { getStudents } from "../services/api";

export default function StudentsList({ token }) {
    const [students, setStudents] = useState([]);
    console.log(students);
    useEffect(() => {
        async function fetchData() {
            const data = await getStudents(token);
            setStudents(data);
        }

        fetchData();
    }, [token]);

    return (
        <div>
            <h2>Students</h2>

            {students.map((s, i) => (
                <div key={i}>
                    <p>{s.id} {s.name}</p>
                    <p>{s.className}</p>
                </div>
            ))}
        </div>
    );
}