const BASE_URL = "http://localhost:5000/api/tasks";

function getAuthHeaders() {

    const token = localStorage.getItem("token");

    return {

        "Content-Type": "application/json",

        "Authorization": `Bearer ${token}`

    };

}

export async function getTasks() {

    const response = await fetch(BASE_URL, {

        headers: getAuthHeaders()

    });

    return response.json();

}

export async function createTask(task: any) {

    const response = await fetch(BASE_URL, {

        method: "POST",

        headers: getAuthHeaders(),

        body: JSON.stringify(task)

    });

    return response.json();

}

export async function updateTask(
    id: number,
    task: any
) {

    const response = await fetch(`${BASE_URL}/${id}`, {

        method: "PUT",

        headers: getAuthHeaders(),

        body: JSON.stringify(task)

    });

    return response.json();

}

export async function deleteTask(id: number) {

    const response = await fetch(`${BASE_URL}/${id}`, {

        method: "DELETE",

        headers: getAuthHeaders()

    });

    return response.json();

}

export async function completeTask(id: number) {

    const response = await fetch(`${BASE_URL}/${id}/complete`, {

        method: "PATCH",

        headers: getAuthHeaders()

    });

    return response.json();

}