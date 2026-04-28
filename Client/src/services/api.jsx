const BASE_URL = "http://localhost:5000";

// login function
export async function login(idNumber, password) {
    console.log(BASE_URL);
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ idNumber, password })
    });

    return res.json();
}

// get all students (teacher's class)
export async function getStudents(token) {
    console.log(BASE_URL);
    const res = await fetch(`${BASE_URL}/students`, {
        headers: {
            Authorization: token
        }
    });

    return res.json();
}

// Get student by ID
export async function getStudentById(id, token) {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
        headers: {
            Authorization: token
        }
    });

    return res.json();
}

// Get all teachers
export async function getTeachers(token) {
    const res = await fetch(`${BASE_URL}/teachers`, {
        headers: {
            Authorization: token
        }
    });

    return res.json();
}

// Get teacher by ID
export async function getTeacherById(id, token) {
    const res = await fetch(`${BASE_URL}/teachers/${id}`, {
        headers: {
            Authorization: token
        }
    });

    return res.json();
}