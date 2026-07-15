import type { Task } from "../types/task";

export function renderUpcoming(tasks: Task[]): void {

    const container = document.getElementById("deadline-list");

    if (!container) return;

    container.innerHTML = "";

    const upcoming = [...tasks]
        .filter(task => !task.completed)
        .sort(
            (a, b) =>
                new Date(a.due_date).getTime() -
                new Date(b.due_date).getTime()
        )
        .slice(0, 5);

    if (upcoming.length === 0) {
        container.innerHTML = "<p>No upcoming deadlines 🎉</p>";
        return;
    }

    upcoming.forEach(task => {

        const div = document.createElement("div");

        div.className = "deadline";

        div.innerHTML = `
            <strong>${task.title}</strong>
            <span>${new Date(task.due_date).toLocaleDateString()}</span>
        `;

        container.appendChild(div);

    });

}