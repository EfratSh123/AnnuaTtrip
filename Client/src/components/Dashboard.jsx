import QueryPanel from "./QueryPanel";
import RegisterTeacher from "./RegisterTeacher";
import RegisterStudent from "./RegisterStudent";

export default function Dashboard({ token, onLogout }) {
    return (
        <div style={{ padding: "30px" }}>
            <h1>School Management System</h1>

            <button onClick={onLogout}>
                Logout
            </button>

            <hr />

            <QueryPanel token={token} />

            <hr />

            <RegisterTeacher />
            <RegisterStudent />
        </div>
    );
}